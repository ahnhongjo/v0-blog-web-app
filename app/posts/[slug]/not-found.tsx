import Link from "next/link"
import { ArrowLeft, FileQuestion } from "lucide-react"
import { Header } from "@/components/blog/header"
import { Footer } from "@/components/blog/footer"

export default function PostNotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-6">
            <FileQuestion className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3">Post Not Found</h1>
          <p className="text-muted-foreground mb-8 max-w-md">
            The post you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-primary-foreground bg-primary rounded-xl hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all posts
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
