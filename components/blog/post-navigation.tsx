import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import type { PostMeta } from "@/lib/posts"

interface PostNavigationProps {
  prev: PostMeta | null
  next: PostMeta | null
}

export function PostNavigation({ prev, next }: PostNavigationProps) {
  if (!prev && !next) {
    return null
  }

  return (
    <nav className="mt-12 pt-8 border-t border-border">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        {prev ? (
          <Link
            href={`/posts/${prev.slug}`}
            className="group flex items-center gap-3 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors flex-1"
          >
            <ArrowLeft className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            <div className="text-left">
              <span className="text-sm text-muted-foreground">Previous</span>
              <p className="font-medium text-foreground line-clamp-1">{prev.title}</p>
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {next ? (
          <Link
            href={`/posts/${next.slug}`}
            className="group flex items-center justify-end gap-3 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors flex-1 text-right"
          >
            <div>
              <span className="text-sm text-muted-foreground">Next</span>
              <p className="font-medium text-foreground line-clamp-1">{next.title}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </nav>
  )
}
