import Image from "next/image"
import Link from "next/link"
import type { PostMeta } from "@/lib/posts"
import { TagBadge } from "./tag-badge"
import { formatDate } from "@/lib/format"

interface PostCardProps {
  post: PostMeta
  featured?: boolean
}

export function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col bg-card rounded-xl border border-border overflow-hidden transition-all hover:border-foreground/20 hover:shadow-lg",
        featured && "md:flex-row"
      )}
    >
      {post.thumbnail && (
        <Link
          href={`/posts/${post.slug}`}
          className={cn(
            "relative block overflow-hidden",
            featured ? "md:w-1/2 aspect-[16/9] md:aspect-auto" : "aspect-[16/9]"
          )}
        >
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
          />
        </Link>
      )}

      <div className={cn("flex flex-col flex-1 p-6", featured && "md:p-8 justify-center")}>
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>

        <Link href={`/posts/${post.slug}`} className="group/title">
          <h2
            className={cn(
              "font-semibold text-foreground leading-tight mb-3 group-hover/title:text-primary transition-colors text-balance",
              featured ? "text-2xl md:text-3xl" : "text-xl"
            )}
          >
            {post.title}
          </h2>
        </Link>

        <p className={cn("text-muted-foreground mb-4 line-clamp-2", featured && "md:line-clamp-3 text-lg")}>
          {post.summary}
        </p>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {post.tags.slice(0, 3).map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
