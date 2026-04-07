import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "posts")

export interface PostFrontmatter {
  title: string
  date: string
  summary: string
  tags: string[]
  thumbnail?: string
  relatedPosts?: string[]
}

export interface Post extends PostFrontmatter {
  slug: string
  content: string
}

export interface PostMeta extends PostFrontmatter {
  slug: string
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "")
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title || "Untitled",
        date: data.date || new Date().toISOString(),
        summary: data.summary || "",
        tags: data.tags || [],
        thumbnail: data.thumbnail,
        relatedPosts: data.relatedPosts,
      } as PostMeta
    })

  return allPosts.sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  return {
    slug,
    content,
    title: data.title || "Untitled",
    date: data.date || new Date().toISOString(),
    summary: data.summary || "",
    tags: data.tags || [],
    thumbnail: data.thumbnail,
    relatedPosts: data.relatedPosts,
  }
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tagsSet = new Set<string>()

  posts.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag))
  })

  return Array.from(tagsSet).sort()
}

export function getRelatedPosts(currentPost: Post, allPosts: PostMeta[]): PostMeta[] {
  // First, check if relatedPosts is specified in frontmatter
  if (currentPost.relatedPosts && currentPost.relatedPosts.length > 0) {
    const related = currentPost.relatedPosts
      .map((slug) => allPosts.find((p) => p.slug === slug))
      .filter((p): p is PostMeta => p !== undefined)

    if (related.length > 0) {
      return related.slice(0, 3)
    }
  }

  // Otherwise, find posts with overlapping tags
  const otherPosts = allPosts.filter((p) => p.slug !== currentPost.slug)
  const scoredPosts = otherPosts.map((post) => {
    const commonTags = post.tags.filter((tag) => currentPost.tags.includes(tag))
    return { post, score: commonTags.length }
  })

  return scoredPosts
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.post)
}

export function getAdjacentPosts(
  currentSlug: string,
  allPosts: PostMeta[]
): { prev: PostMeta | null; next: PostMeta | null } {
  const currentIndex = allPosts.findIndex((p) => p.slug === currentSlug)

  return {
    prev: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null,
    next: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
  }
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.filter((fileName) => fileName.endsWith(".md")).map((fileName) => fileName.replace(/\.md$/, ""))
}
