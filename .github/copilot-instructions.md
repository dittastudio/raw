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

## Development Workflow

### Commands
```bash
npm run dev              # Auto-runs sb:generate then starts dev server
npm run sb:generate      # Pull components + generate types
npm run lint:fix         # ESLint with @antfu/eslint-config

# Migration (from /migration dir)
npm run migrate          # WordPress to Storyblok migration
```

### Storyblok Type Generation Flow
1. Schema changes made in Storyblok CMS
2. Run `npm run sb:components` to pull component definitions to `.storyblok/components/`
3. Run `npm run sb:types` to generate TypeScript types
4. Import types: `import type { Post } from '@@/.storyblok/types/289672313529140/storyblok-components'`

### Migration Architecture (`/migration/`)

**WordPress → Storyblok migration** with custom block transformation:

1. **Process**: Authors (Person) first → Posts with author references
2. **Block Mapping**: Gutenberg blocks → Storyblok nested components
   - `core/paragraph` → `post_text` (with HTML→richtext conversion)
   - `core/heading` → `post_heading`
   - `core/image` → `post_image` (uploads to Storyblok assets)
   - `core/quote` → `post_quote`
   - `core/gallery` → `post_gallery`
   - `core/list` → `post_text` (wrapped in `<ul>`)
   - `core/embed` → `post_embed`

3. **Key Utilities** ([migration/utils.ts](migration/utils.ts)):
   - `decodeHtmlEntities()`: Fix WordPress HTML entities (`&#8217;` → `'`)
   - `uploadFileToStoryblok()`: 3-step upload (signed request → S3 → finalize)
   - `convertHtmlToJson()`: HTML → Markdown → Storyblok richtext
   - `wait()`: Rate limit protection between API calls

4. **Critical Details**:
   - Hard-coded author UUID, parent folder ID, space ID
   - `INTERVAL_WAIT_MS = 500` to prevent rate limits
   - WordPress fields filtered via `wpFields` array
   - Excluded posts via `wpExcludedPosts` array

## Project Conventions

### Path Aliases
- `@@/` → Workspace root (for `.storyblok` access)
- `~/` → `app/` directory

### Styling

1. **Tailwind Extensions** ([app/utils/twMerge.ts](app/utils/twMerge.ts)):
   ```typescript
   // Custom font sizes
   text-14, text-16, text-20, text-26, text-28, text-32, text-42, text-50, text-84
   text-fluid-h1, text-fluid-h2, text-fluid-h3, text-fluid-h4, text-fluid-h5, text-fluid-p
   
   // Custom colors
   text-offblack, text-blue, text-green, text-pink, text-purple
   ```

2. **CSS Custom Properties**: `gap-x-(--app-inner-gutter)`, `p-(--app-outer-gutter)`
3. **Utility Classes**: `wrapper`, `type-display-28`, etc. in [app/assets/css/utils.css](app/assets/css/utils.css)
4. **Nested CSS**: Uses `postcss-nested` plugin (configured in [nuxt.config.ts](nuxt.config.ts))

### Type Patterns

1. **Template Component Props**:
   ```vue
   <script setup lang="ts">
   import type { Post } from '@@/.storyblok/types/289672313529140/storyblok-components'
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
   import type { BlockHero } from '@@/.storyblok/types/289672313529140/storyblok-components'
   
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

4. **Migration HTML Entities**: WordPress returns `&#8217;` etc. Always use `decodeHtmlEntities()` on titles/text

5. **Slug Handling**: Root path `/` must map to `/home` in Storyblok (handled by `storyblokSlug()`)

## Environment Variables

```bash
NUXT_STORYBLOK_TOKEN=              # Public access (draft/published content)
NUXT_STORYBLOK_MANAGEMENT_TOKEN=   # Management API (for migrations)
NUXT_STORYBLOK_SPACE_ID=           # 289672313529140
NUXT_STORYBLOK_VERSION=            # 'draft' or 'published'
NUXT_PRERENDER=                    # 'true' for SSG
```

## Key Dependencies

- **@storyblok/nuxt**: CMS integration with visual editor bridge
- **@nuxt/image**: Image optimization with Storyblok provider
- **@regle/nuxt**: Form validation (replaces VeeValidate + Zod in latest setup)
- **lenis**: Smooth scroll (Nuxt module)
- **GSAP**: Animations in `components/effect/`
- **keen-slider**: Carousel component
- **storyblok-markdown-richtext**: HTML → Storyblok richtext conversion

## File References

- [app/composables/useStory.ts](app/composables/useStory.ts) - Custom Storyblok story fetcher
- [app/pages/[...slug].vue](app/pages/[...slug].vue) - Catch-all route handler with SEO
- [app/utils/storyblok.ts](app/utils/storyblok.ts) - Storyblok helper functions
- [app/utils/twMerge.ts](app/utils/twMerge.ts) - Tailwind merge config
- [migration/migrate.ts](migration/migrate.ts) - WordPress migration script
- [migration/utils.ts](migration/utils.ts) - Migration utilities
- [.storyblok/types/289672313529140/storyblok-components.d.ts](.storyblok/types/289672313529140/storyblok-components.d.ts) - Auto-generated types
