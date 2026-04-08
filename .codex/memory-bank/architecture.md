# Architecture

## Overview

This repository is a content-driven blog built with Next.js App Router, React 19, and TypeScript. The app renders a homepage of posts and statically generated post detail pages sourced from local Markdown files in `posts/`.

## Top-Level Structure

- `app/`: App Router entrypoints, layout, global styling, and route files.
- `components/blog/`: Blog-specific UI such as header, footer, post list, markdown rendering, related posts, and table of contents.
- `components/ui/`: Shared UI primitives and reusable presentational components.
- `components/theme-provider.tsx`: Theme bridge for `next-themes`.
- `lib/`: Post loading, formatting, and utility helpers.
- `posts/`: Markdown source content with frontmatter.
- `public/`: Static images and icons.
- `styles/`: Additional global styling assets.

## Routing

- `app/layout.tsx`: Root layout, Google font setup, metadata, theme provider, and production analytics.
- `app/page.tsx`: Homepage. Reads post metadata and tags from `lib/posts.ts`, then renders the hero and post list.
- `app/posts/[slug]/page.tsx`: Dynamic post page. Generates static params from Markdown slugs, loads post content, computes related and adjacent posts, and renders the article page.
- `app/posts/[slug]/not-found.tsx`: Not-found UI for missing post slugs.

## Data Flow

The project uses filesystem-backed content instead of a CMS or API.

1. Markdown files live in `posts/*.md`.
2. `lib/posts.ts` reads files from disk with Node `fs`.
3. Frontmatter is parsed with `gray-matter`.
4. Homepage listing data comes from `getAllPosts()` and `getAllTags()`.
5. Detail pages use `getPostBySlug()`, `getRelatedPosts()`, `getAdjacentPosts()`, and `getAllSlugs()`.

Because `lib/posts.ts` depends on filesystem access, it is intended for server-side and build-time execution.

## Rendering Model

- `app/page.tsx` is a server route that passes content data into child components.
- `components/blog/post-list.tsx` is a client component handling search, tag filters, and "load more" pagination in browser state.
- `components/blog/header.tsx` is a client component because it uses `next-themes` and mobile menu state.
- `components/blog/markdown-renderer.tsx` renders Markdown with `react-markdown`, `remark-gfm`, and Prism syntax highlighting.

## Content Model

Posts are expected to provide frontmatter with:

- `title`
- `date`
- `summary`
- `tags`
- optional `thumbnail`
- optional `relatedPosts`

The slug is derived from the Markdown filename.

## Change Hotspots

- Replace or extend content sourcing in `lib/posts.ts`.
- Update global shell, metadata, fonts, or theme setup in `app/layout.tsx`.
- Adjust homepage filtering behavior in `components/blog/post-list.tsx`.
- Adjust article presentation in `components/blog/markdown-renderer.tsx` and `app/posts/[slug]/page.tsx`.
