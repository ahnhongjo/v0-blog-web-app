"use client"

import { useState, useMemo } from "react"
import type { PostMeta } from "@/lib/posts"
import { PostCard } from "./post-card"
import { SearchBar } from "./search-bar"
import { TagBadge } from "./tag-badge"
import { FileText } from "lucide-react"

interface PostListProps {
  posts: PostMeta[]
  allTags: string[]
}

const POSTS_PER_PAGE = 6

export function PostList({ posts, allTags }: PostListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE)

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesTag = !selectedTag || post.tags.includes(selectedTag)

      return matchesSearch && matchesTag
    })
  }, [posts, searchQuery, selectedTag])

  const visiblePosts = filteredPosts.slice(0, visibleCount)
  const hasMore = visibleCount < filteredPosts.length

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag)
    setVisibleCount(POSTS_PER_PAGE)
  }

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + POSTS_PER_PAGE)
  }

  const handleClearFilters = () => {
    setSearchQuery("")
    setSelectedTag(null)
    setVisibleCount(POSTS_PER_PAGE)
  }

  return (
    <div className="space-y-12">
      {/* Search and Filter Section */}
      <div className="space-y-6">
        <SearchBar
          value={searchQuery}
          onChange={(value) => {
            setSearchQuery(value)
            setVisibleCount(POSTS_PER_PAGE)
          }}
          placeholder="Search by title, summary, or tag..."
        />

        {/* Tags Filter */}
        <div id="tags" className="scroll-mt-20">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-sm font-medium text-muted-foreground">Filter by topic:</span>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <TagBadge
                  key={tag}
                  tag={tag}
                  isActive={selectedTag === tag}
                  onClick={() => handleTagClick(tag)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Info */}
      {(searchQuery || selectedTag) && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredPosts.length} {filteredPosts.length === 1 ? "result" : "results"} found
            {searchQuery && <span> for &quot;{searchQuery}&quot;</span>}
            {selectedTag && <span> in {selectedTag}</span>}
          </p>
          <button
            onClick={handleClearFilters}
            className="text-sm text-primary hover:underline underline-offset-4"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Posts Grid */}
      <div id="posts" className="scroll-mt-20">
        {filteredPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="p-4 rounded-full bg-secondary mb-4">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No posts found</h3>
            <p className="text-muted-foreground max-w-sm">
              {searchQuery || selectedTag
                ? "Try adjusting your search or filter criteria."
                : "No posts have been published yet."}
            </p>
            {(searchQuery || selectedTag) && (
              <button
                onClick={handleClearFilters}
                className="mt-4 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {!searchQuery && !selectedTag && visiblePosts.length > 0 && (
              <div className="mb-8">
                <PostCard post={visiblePosts[0]} featured />
              </div>
            )}

            {/* Post Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {(searchQuery || selectedTag ? visiblePosts : visiblePosts.slice(1)).map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={handleLoadMore}
                  className="px-6 py-3 text-sm font-medium text-foreground bg-secondary rounded-xl hover:bg-secondary/80 transition-colors"
                >
                  Load more posts
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
