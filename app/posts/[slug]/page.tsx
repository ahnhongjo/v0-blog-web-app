import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getPostBySlug, getAllPosts, getRelatedPosts, getAdjacentPosts, getAllSlugs } from "@/lib/posts"
import { Header } from "@/components/blog/header"
import { Footer } from "@/components/blog/footer"
import { MarkdownRenderer } from "@/components/blog/markdown-renderer"
import { RelatedPosts } from "@/components/blog/related-posts"
import { PostNavigation } from "@/components/blog/post-navigation"
import { TagBadge } from "@/components/blog/tag-badge"
import { TableOfContents } from "@/components/blog/table-of-contents"
import { formatDate, formatReadingTime } from "@/lib/format"

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} | DevBlog`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
      images: post.thumbnail ? [{ url: post.thumbnail }] : [],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const allPosts = getAllPosts()
  const relatedPosts = getRelatedPosts(post, allPosts)
  const { prev, next } = getAdjacentPosts(slug, allPosts)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-16 border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all posts
            </Link>

            <div className="max-w-3xl">
              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <TagBadge key={tag} tag={tag} />
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="flex items-center gap-4 text-muted-foreground">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                <span>{formatReadingTime(post.content)}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Thumbnail */}
        {post.thumbnail && (
          <section className="py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative aspect-[21/9] max-w-5xl mx-auto rounded-2xl overflow-hidden">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
              </div>
            </div>
          </section>
        )}

        {/* Content Section */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-12 max-w-5xl mx-auto">
              {/* Main Content */}
              <article className="flex-1 min-w-0">
                <MarkdownRenderer content={post.content} />

                {/* Post Navigation */}
                <PostNavigation prev={prev} next={next} />

                {/* Related Posts */}
                <RelatedPosts posts={relatedPosts} />
              </article>

              {/* Table of Contents */}
              <TableOfContents content={post.content} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
