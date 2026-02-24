# RAW - Copilot Instructions

## Architecture Overview

**Nuxt 4 + Storyblok CMS** project with TypeScript, Tailwind CSS 4, Vue 3 composition API, and WordPress migration tooling.

### Content Architecture

1. **Storyblok-First**: All content types (Page, Post, Project, Person) defined in Storyblok CMS
   - Auto-generated types in `.storyblok/types/289672313529140/storyblok-components.d.ts` - **never edit manually**
   - Run `npm run sb:generate` after any CMS schema changes to regenerate types
   - Space ID: 289672313529140

2. **Component Organization**:
   - `components/template/`: Page templates (TemplatePage, TemplatePost, TemplateProject)
   - `components/block/`: Storyblok content blocks (BlockHero, PostHeading, PostText)
     - Naming: `block_hero` (CMS) → `BlockHero.vue` (code)
   - `components/app/`: Site UI (Header, Footer, Navigation)
   - `components/ui/`: Reusable UI (Button, Carousel, Expandable)
   - `components/storyblok/`: Storyblok helpers (Link, Text for richtext)
   - `components/card/`: Content cards (Author, Event, Person, Post, Project)
   - `components/effect/`: Animation wrappers (MorphGradient, TextReveal using GSAP)

3. **Storyblok Integration**:
   ```typescript
   // Use custom useStory() composable, not direct Storyblok API
   const story = await useStory<Post>(
     route.path,
     { resolve_relations: ['post.author'] },  // API config
     { resolveRelations: ['post.author'] }    // Bridge config (must match)
   )
   
   // Access: story.value.content.seo_title (content fields)
   // vs: story.value.name, story.value.slug (story metadata)
   ```

4. **Storyblok API Queries** (for direct API calls like filtering/sorting):
   ```typescript
   const storyblokApi = useStoryblokApi()
   const { data } = await storyblokApi.get('cdn/stories', {
     content_type: 'post',
     sort_by: 'content.event_datetime:asc',  // Sort by content field: content.<field>:<asc|desc>
     filter_query: {
       category: { in: 'events' },
       event_datetime: { gt_date: `${today} 00:01` },  // Storyblok date filter format
     },
   })
   ```

## Development Workflow

### Commit Conventions
Uses Commitlint with Conventional Commits:
```bash
git commit -m "feat(blog): add post filtering"
git commit -m "fix: resolve image dimension extraction"
git commit -m "chore: regenerate storyblok types"
```
Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`

### Storyblok Type Generation Flow
1. Schema changes made in Storyblok CMS
2. Run `npm run sb:components` to pull component definitions to `.storyblok/components/`
3. Run `npm run sb:types` to generate TypeScript types
4. Import types: `import type { Post } from '#storyblok-components'`

## Project Conventions

### Path Aliases
- `@@/` → Workspace root (for `.storyblok` access)
- `@/` → `app/` directory

### Styling

1. **Tailwind Extensions** ([app/utils/twMerge.ts](app/utils/twMerge.ts)):
2. **CSS Custom Properties**: `gap-x-(--app-inner-gutter)`, `p-(--app-outer-gutter)`
3. **Utility Classes**: `wrapper`, `type-display-28`, etc. in [app/assets/css/utils.css](app/assets/css/utils.css)
4. **Nested CSS**: Uses `postcss-nested` plugin (configured in [nuxt.config.ts](nuxt.config.ts))

### Type Patterns

1. **Template Component Props**:
   ```vue
   <script setup lang="ts">
   import type { Post } from '#storyblok-components'
   import type { ISbStoryData } from '@storyblok/js'
   
   interface Props {
     story: ISbStoryData<Post>
   }
   const { story } = defineProps<Props>()
   </script>
   ```

2. **Block Component Props**:
   ```vue
   <script setup lang="ts">
   import type { BlockHero } from '#storyblok-components'
   
   interface Props {
     block: BlockHero
   }
   const { block } = defineProps<Props>()
   </script>
   
   <template>
     <div v-editable="block">
       <!-- v-editable required for Storyblok visual editor -->
     </div>
   </template>
   ```

3. **Type Guards** ([app/utils/storyblok.ts](app/utils/storyblok.ts)):
   ```typescript
   if (isPost(story)) { /* story is ISbStoryData<Post> */ }
   if (isPage(story)) { /* story is ISbStoryData<Page> */ }
   ```

### Storyblok Helpers ([app/utils/storyblok.ts](app/utils/storyblok.ts))

```typescript
storyblokAssetType(filename)           // Returns 'image' | 'video' | 'other'
storyblokImageDimensions(filename)     // Extract {width, height} from Storyblok URL
storyblokImage(filename, modifiers)    // Generate transformed image URL
storyblokRichTextContent(richtext)     // Check if richtext has content
storyblokSlug(path)                    // '/' → '/home', strip trailing slashes
determineHref(link)                    // Handle email/story/url link types
```

### Date Helpers ([app/utils/helpers.ts](app/utils/helpers.ts))

```typescript
formatDateEditorial(dateString)        // "1st January 2026"
formatDateDMY(dateString)              // "01.01.2026"
```

### Server API Routes (`server/api/`)

| Endpoint | Method | Purpose |
|----------|--------|--------|
| `/api/mux-assets` | GET | Fetch Mux video assets (filtered to ready/public) |
| `/api/oembed` | POST | oEmbed proxy for YouTube, Vimeo, Dailymotion embeds |
| `/api/sitemap` | GET | Dynamic sitemap from Storyblok stories |

### ESLint Rules ([eslint.config.mjs](eslint.config.mjs))

Custom overrides on @antfu/eslint-config:
- `vue/multi-word-component-names: off` (Storyblok components are single words)
- `vue/padding-line-between-tags: always` (enforced blank lines)
- `vue/max-attributes-per-line: 1` (max 1 per line, always)
- `curly: ['error', 'all']` (always use curly braces, even single-line)
- `no-console: off` (allowed)

## Critical Gotchas

1. **Storyblok Relations**: Must declare in **both** `api` and `bridge` options:
   ```typescript
   const relations = ['post.author']
   useStory(path, 
     { resolve_relations: relations },  // API
     { resolveRelations: relations }    // Bridge
   )
   ```

2. **Image Dimensions**: Storyblok encodes dimensions in URL path segment 5:
   ```
   https://a.storyblok.com/f/289672313529140/1200x630/abc123/image.jpg
                                            ^^^^^^^^
   ```
   Use `storyblokImageDimensions()` to extract programmatically.

3. **Story vs Content**: `story.name` = metadata, `story.content.seo_title` = content fields

4. **Slug Handling**: Root path `/` must map to `/home` in Storyblok (handled by `storyblokSlug()`)

## Key Dependencies

- **@storyblok/nuxt**: CMS integration with visual editor bridge
- **@nuxt/image**: Image optimization with Storyblok provider
- **@regle/nuxt**: Form validation (replaces VeeValidate + Zod in latest setup)
- **lenis**: Smooth scroll (Nuxt module)
- **GSAP**: Animations in `components/effect/`
- **keen-slider**: Carousel component
- **storyblok-markdown-richtext**: HTML → Storyblok richtext conversion
