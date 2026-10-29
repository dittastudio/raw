# RAW

[![Netlify Status](https://api.netlify.com/api/v1/badges/caffae43-3fca-4096-9364-ad10f325c335/deploy-status)](https://app.netlify.com/projects/raw-london/deploys)

The website for [RAW](https://raw.london), built by [ditta](https://ditta.studio).

It is a [Nuxt 4](https://nuxt.com) app that gets all of its content from [Storyblok](https://www.storyblok.com) (a headless CMS) and is deployed to [Netlify](https://www.netlify.com) as a fully prerendered static site.

## Tech stack

| Area | Tools |
|------|-------|
| Framework | Nuxt 4, Vue 3, TypeScript |
| CMS | Storyblok (`@storyblok/nuxt`), with the schema defined in code (`@storyblok/schema`) |
| Styling | Tailwind CSS v4, plus `postcss-nested` |
| Animation and scroll | GSAP (ScrollTrigger, SplitText, DrawSVG), Lenis smooth scroll, Keen Slider |
| Video | Mux (`@mux/mux-player` and `@mux/mux-node`) |
| Images | `@nuxt/image`, using the Storyblok image service |
| State | Pinia, with `pinia-plugin-persistedstate` |
| Forms and validation | Regle on the client, Zod on the server |
| CRM | GoHighLevel (newsletter sign-up and video data capture) |
| SEO | `@nuxtjs/seo` (sitemaps, robots, meta, link checker) and `nuxt-gtag` (Google Analytics, loaded only after cookie consent) |
| Tooling | ESLint (`@antfu/eslint-config`), Husky, Commitlint |

## Getting started

### Prerequisites

- Node.js: use a current release. The project is developed on Node 26.
- Access to the RAW Storyblok space (ID `289672313529140`, EU region)
- The environment values below. Ask a team member for them.

### Install

```bash
npm install
```

`postinstall` runs `nuxt prepare`, which generates `.nuxt/` (types and the ESLint config). `prepare` installs the Husky git hooks.

### Environment variables

Copy the example file and fill it in:

```bash
cp .env.example .env
```

| Variable | Purpose |
|----------|---------|
| `NUXT_STORYBLOK_TOKEN` | Storyblok Content Delivery API token. Use a preview token locally so you can see draft content. |
| `NUXT_STORYBLOK_VERSION` | `draft` or `published`. Any value other than `published` fetches draft content. |
| `NUXT_STORYBLOK_SPACE_ID` | Storyblok space ID |
| `NUXT_STORYBLOK_MANAGEMENT_TOKEN` | Storyblok Management API token, used for schema and CLI work |
| `NUXT_MUX_ACCESS_TOKEN` / `NUXT_MUX_SECRET_KEY` | Mux API credentials for `/api/mux-assets` |
| `NUXT_GHL_TOKEN` / `NUXT_GHL_LOCATION_ID` | GoHighLevel private integration token and location, used by the form endpoints |
| `NUXT_CORS_ORIGINS` | Comma-separated list of allowed origins for server routes. `*` allows all origins, and an empty value turns CORS handling off. |
| `NUXT_OG_IMAGE_SECRET` | Secret for OG image generation |
| `IS_SPA` | `true` turns off SSR and prerendering, which makes the app a client-only SPA. Leave it as `false` for normal development and production builds. |

### Run it

```bash
npm run dev
```

The site runs on [http://localhost:3000](http://localhost:3000). It is also exposed on your network because the dev server uses `--host 0.0.0.0`.

#### HTTPS for the Storyblok Visual Editor

The Storyblok Visual Editor loads the site in an iframe, which has to be served over HTTPS. Run the dev server, then start the SSL proxy in a second terminal:

```bash
npm run dev
npm run dev:ssl   # https://localhost:3010 → http://localhost:3000
```

The proxy uses `localhost.pem` and `localhost-key.pem` from the project root. Those files are gitignored, so you need to create your own, for example with [mkcert](https://github.com/FiloSottile/mkcert):

```bash
mkcert -install
mkcert -key-file localhost-key.pem -cert-file localhost.pem localhost
```

Then set the preview URL in Storyblok to `https://localhost:3010/`.

## How it works

### Routing and content

There is one catch-all page, `app/pages/[...slug].vue`. For each request:

1. The route path is turned into a Storyblok slug (`storyblokSlug` in `app/utils/storyblok.ts`) and fetched with the `useStory` composable (`app/composables/useStory.ts`).
2. The story's content type picks the template that renders it:
   - `page`: `TemplatePage`
   - `post`: `TemplatePost`
   - `event`: `TemplateEvent`
   - `project`: `TemplateProject`
3. The template loops over `story.content.blocks` and renders the matching `Block*` component for each block (for example, `block_hero` renders `BlockHero`).

`app/app.vue` also fetches the global `settings` story, which supplies the navigation, footer, statement and company details, and renders the cookie banner.

`useStory` handles draft and published content, Storyblok releases (`?_storyblok_release=`), relation resolving, and the live-preview bridge. If a story is missing, it throws a 404.

### Adding or changing a block

1. Define or update the block in `.storyblok/schema/blocks/` (see [Storyblok schema](#storyblok-schema)) and register it in `.storyblok/schema/schema.ts`.
2. Create the Vue component in `app/components/block/`. Type its props with `Block<'block_name'>` from `#storyblok-schema`.
3. Add a `v-else-if` branch for it in the relevant template in `app/components/template/`.
4. If the block references other stories, add the field to the `relations` list in `app/pages/[...slug].vue`.
5. Validate the schema, preview the diff and push it to Storyblok.

### Project structure

```
app/
├── app.vue              # Root layout: header, page, statement, footer, cookie banner
├── error.vue            # Error page
├── pages/[...slug].vue  # Catch-all route that renders any Storyblok story
├── components/          # Auto-imported. Prefixed by folder, e.g. block/Hero.vue → <BlockHero>
│   ├── app/             # Site chrome: header, navigation, footer, statement
│   ├── block/           # One component per Storyblok block
│   ├── template/        # One template per content type: Page, Post, Event, Project
│   ├── card/            # Cards for posts, events, people and projects
│   ├── ui/              # Shared UI: buttons, carousels, modal, Mux video, theme wrapper
│   ├── form/            # Form primitives
│   ├── effect/          # Visual effects: text reveal, gradients, blur
│   ├── storyblok/       # Storyblok link and rich-text renderers
│   ├── newsletter/      # Newsletter sign-up
│   ├── filter/          # Datasource-driven filters
│   └── dev/             # Dev-only tools, e.g. the grid overlay (<DevGuide>)
├── composables/         # useStory, useAtMedia, useSmoothMouse, useMergedAttrs
├── stores/app.ts        # Pinia store: cookie consent, video data capture, header state
├── utils/               # Storyblok helpers, carousels, themes, screens, twMerge
├── assets/css/          # Tailwind entry (app.css), theme, type, prose, utils, transitions
├── assets/icons/        # SVGs imported as Vue components (vite-svg-loader)
└── types/

server/
├── api/
│   ├── ghl-newsletter.post.ts     # Newsletter sign-up → GoHighLevel contact
│   ├── ghl-data-capture.post.ts   # Gated-video data capture → GoHighLevel contact
│   ├── mux-assets.get.ts          # Lists public, ready Mux assets (for the Storyblok Mux field plugin)
│   ├── oembed.post.ts             # oEmbed lookup for the post embed block
│   └── sitemap/                   # Sitemap sources for pages and posts
└── middleware/
    ├── cors.ts                    # CORS, from NUXT_CORS_ORIGINS
    └── junk.ts                    # Rejects bot probes (/wp-*, /.env, etc.) before they reach Storyblok

.storyblok/schema/       # Storyblok schema as code (see below)
public/                  # Fonts, favicons, manifest and Netlify _redirects
```

### Storyblok schema

The Storyblok component schema is kept as TypeScript in `.storyblok/schema/` and is the source of truth for both the CMS and the app's types:

- `blocks/types/`: content types (`page`, `post`, `event`, `project`, `person`, `settings`)
- `blocks/page-blocks/`: blocks used on pages (`block_*`)
- `blocks/post-blocks/`: blocks used in posts (`post_*`)
- `blocks/elements/`: nestable building blocks (links, images, Mux videos, slides and others)
- `datasources/`, `folders.ts`, `field-plugins/`: datasources, component folders and custom field plugins
- `schema.ts`: registers everything and exports the app's types

Import the types through the `#storyblok-schema` alias:

```ts
import type { Block, StoryOf } from '#storyblok-schema'

defineProps<{ block: Block<'block_hero'> }>()  // a block's content
const story = await useStory<StoryOf<'page'>>(route.path)  // a story of a given type
```

Because the types are inferred from the schema files, there is no separate type-generation step. A change to the schema shows up in the types straight away.

#### Schema workflow

Log in to the Storyblok CLI first with `npm run sb:login`. Then:

```bash
npm run sb:schema-validate   # Check the local schema for errors
npm run sb:schema-diff       # Dry run: show what would change in Storyblok
npm run sb:schema-push       # Push the local schema to the space
npm run sb:schema-rollback   # Roll back to a previous changeset
```

Run `sb:schema-diff` before every push. Pushes are recorded as changesets in `.storyblok/schema/changesets/`, and those are the rollback points. CLI logs and reports are written to `.storyblok/logs/` and `.storyblok/reports/`. Reports are gitignored.

To change existing content when a schema changes, for example when a field is renamed, use the content migration scripts:

```bash
npm run sb:migrations-generate
npm run sb:migrations-dry    # Always dry-run first
npm run sb:migrations-run
npm run sb:migrations-rollback
```

`sb:schema-init` pulls the remote schema into code. It was used to bootstrap `.storyblok/schema/`, and you should not need it again in normal work.

## Build and deployment

```bash
npm run build      # Production build, with every route prerendered
npm run generate   # Static generation
npm run preview    # Preview the production build locally
```

The site is **fully prerendered**:

- `routeRules` sets `prerender: true` on `/**`, and Nitro crawls links starting from `/`.
- Some posts are not linked from anywhere on the site, so the `prerender:routes` hook in `nuxt.config.ts` adds every published post under `posts/` from Storyblok to the route list.
- URLs with query strings are not prerendered.

So **published content changes only go live after a rebuild**. Set up a Storyblok publish webhook that triggers a Netlify build hook so that publishing triggers a rebuild.

Netlify deploys the site. The build settings are managed in the Netlify UI. `netlify.toml` only turns off pretty URLs. Legacy WordPress URLs are 301-redirected through `public/_redirects`.

### Branches

- `develop` is the working branch. Open feature branches off it, e.g. `feature/mux-gate`.
- `main` is production. Merge `develop` into `main` through a pull request to release.

## Scripts reference

| Script | What it does |
|--------|--------------|
| `dev` | Start the Nuxt dev server on `0.0.0.0:3000` |
| `dev:ssl` | HTTPS proxy from `:3010` to `:3000` (for the Storyblok Visual Editor) |
| `build` / `generate` / `preview` | Production build, static generation and local preview |
| `lint` / `lint:fix` | Run ESLint, or run it and auto-fix |
| `sb:login` / `sb:logout` / `sb:help` | Storyblok CLI authentication and help |
| `sb:schema-*` | Schema init, validate, diff, push and rollback (see above) |
| `sb:migrations-*` | Generate, dry-run, run and roll back content migrations |
| `create:icons` | Generate the favicon set from `favicon.svg` |
| `agent:readability` / `agent:isAgentic` | Audit how readable raw.london is for AI agents |
| `nuke` | Delete `.output`, `dist`, `.nuxt`, `node_modules` and `package-lock.json`. Run `npm install` afterwards. |

## Code style

- ESLint handles both linting and formatting. Prettier is turned off, and `.vscode/settings.json` sets up ESLint fixes on save. Run `npm run lint:fix` before committing.
- Components, composables and utils are auto-imported by Nuxt, so you do not need to import them.
- Components are named by folder and file, e.g. `components/ui/Button.vue` becomes `<UiButton>`.
- The `.storyblok/` folder is excluded from linting.

## Commit conventions

This project uses [Commitlint](https://commitlint.js.org/) with the [Conventional Commits](https://www.conventionalcommits.org/) specification. A Husky `commit-msg` hook rejects messages that don't follow it.

### Format

```
<type>(<scope>): <subject>
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code style (formatting, semicolons, etc.) |
| `refactor` | Code refactoring (no feature/fix) |
| `perf` | Performance improvement |
| `test` | Adding/updating tests |
| `build` | Build system or dependencies |
| `ci` | CI/CD configuration |
| `chore` | Maintenance tasks |

### Examples

```bash
git commit -m "feat: add carousel component"
git commit -m "feat(blog): add post filtering by author"
git commit -m "fix: resolve image dimension extraction"
git commit -m "docs: update README with setup instructions"
git commit -m "refactor: simplify useStory composable"
git commit -m "build: upgrade nuxt to v4.6.3"
git commit -m "chore(schema): add cta field to block_bcorp"
git commit -m "feat!: change API response format"   # breaking change
```

### Rules

- Write the subject in **lowercase**, with no capital first letter
- **No period** at the end
- Use the **imperative mood** ("add", not "added" or "adds")
- The scope is optional but makes the commit clearer

## Further reading

- [Nuxt documentation](https://nuxt.com/docs)
- [Storyblok Nuxt SDK](https://github.com/storyblok/monoblok/tree/main/packages/nuxt)
- [Storyblok CLI](https://www.storyblok.com/docs/libraries/storyblok-cli)
- [Nuxt SEO](https://nuxtseo.com)
