import { getAllPosts, getAllTags } from "@/lib/posts"
import { PostList } from "@/components/blog/post-list"
import { Header } from "@/components/blog/header"
import { Footer } from "@/components/blog/footer"

export default function HomePage() {
  const posts = getAllPosts()
  const allTags = getAllTags()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
                Insights on Web Development
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Explore articles about modern web technologies, best practices, and tutorials.
                Discover insights on React, Next.js, TypeScript, and more.
              </p>
            </div>
          </div>
        </section>

        {/* Posts Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <PostList posts={posts} allTags={allTags} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
