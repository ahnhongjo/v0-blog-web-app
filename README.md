# v0-blog-web-app

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## GitHub Pages deployment

This project is configured to build a static export on the `deploy` branch with GitHub Actions and publish the generated site into `docs/`.

### How it works

- Push to `deploy`
- GitHub Actions installs dependencies and runs `pnpm build`
- The generated `out/` directory is copied into `docs/` on the same `deploy` branch
- GitHub Pages serves from the `deploy` branch `docs/` folder

### Repository settings

1. Open `Settings > Pages` in GitHub.
2. Set `Source` to `Deploy from a branch`.
3. Select branch `deploy` and folder `/docs`.
4. Save.

### Base path behavior

- For a project site such as `https://<user>.github.io/v0-blog-web-app`, the workflow automatically sets `BASE_PATH=/v0-blog-web-app`.
- For a user or organization site such as `https://<user>.github.io`, the workflow automatically uses an empty base path when the repository name matches `<user>.github.io`.
- If you want to override this, add a repository variable named `BASE_PATH` in `Settings > Secrets and variables > Actions`.

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

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.

<a href="https://v0.app/chat/api/kiro/clone/ahnhongjo/v0-blog-web-app" alt="Open in Kiro"><img src="https://pdgvvgmkdvyeydso.public.blob.vercel-storage.com/open%20in%20kiro.svg?sanitize=true" /></a>
