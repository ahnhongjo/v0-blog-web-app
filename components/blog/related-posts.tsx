import Link from "next/link"
import Image from "next/image"
import type { PostMeta } from "@/lib/posts"
import { formatDate } from "@/lib/format"

interface RelatedPostsProps {
  posts: PostMeta[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null
  }

  return (
    <section className="mt-16 pt-12 border-t border-border">
      <h2 className="text-2xl font-semibold text-foreground mb-8">Related Posts</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden transition-all hover:border-foreground/20 hover:shadow-md"
          >
            {post.thumbnail && (
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            )}
            <div className="p-4">
              <time className="text-sm text-muted-foreground">{formatDate(post.date)}</time>
              <h3 className="font-medium text-foreground mt-1 line-clamp-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{post.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
