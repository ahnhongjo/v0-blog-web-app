# v0-blog-web-app

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_YBRbGhNDaSHECES32syk0EIXR9mZ)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Deploying to Vercel

This project is configured for Vercel with:

- `pnpm` as the package manager
- Node.js `22.x`
- A committed [`vercel.json`](/Users/hongjo/git/v0-blog-web-app/vercel.json) for explicit install/build commands

### 1. Import the repository

1. Push this repository to GitHub.
2. In Vercel, click **Add New Project**.
3. Import this GitHub repository.

### 2. Confirm the project settings

- Framework Preset: `Next.js`
- Install Command: `pnpm install --frozen-lockfile`
- Build Command: `pnpm build`

Vercel should pick these up automatically from [`vercel.json`](/Users/hongjo/git/v0-blog-web-app/vercel.json).

### 3. Environment variables

No custom environment variables are required for the current app.

If you add secrets later:

1. Add them in the Vercel project settings under **Environment Variables**.
2. Mirror them locally in `.env.local`.
3. Keep `.env` files out of git. [`/Users/hongjo/git/v0-blog-web-app/.gitignore`](/Users/hongjo/git/v0-blog-web-app/.gitignore) already covers this, and [`/Users/hongjo/git/v0-blog-web-app/.env.example`](/Users/hongjo/git/v0-blog-web-app/.env.example) is available as a template.

### 4. Deploy

Every push to the connected branch can trigger a new Vercel deployment.

For local production verification:

```bash
pnpm build
pnpm start
```

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.

<a href="https://v0.app/chat/api/kiro/clone/ahnhongjo/v0-blog-web-app" alt="Open in Kiro"><img src="https://pdgvvgmkdvyeydso.public.blob.vercel-storage.com/open%20in%20kiro.svg?sanitize=true" /></a>
