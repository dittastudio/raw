# RAW - Copilot Instructions

## Architecture Overview

This is a **Nuxt 4 + Storyblok CMS** project using TypeScript, Tailwind CSS 4, and Vue 3 composition API. Content is managed in Storyblok with a strict type-safe schema generated from the CMS.

### Key Architectural Patterns

1. **Storyblok-First Content**: All content types (Page, Post, Project, Person) are defined in Storyblok. The `.storyblok/types/` directory contains auto-generated TypeScript definitions—never modify these manually.

2. **Component Organization**:
   - `components/template/`: Top-level page templates (Page.vue, Post.vue, Project.vue)
   - `components/block/`: Content blocks that map to Storyblok components (Hero, PostHeading, PostText)
   - `components/app/`: Site-wide UI components (Header, Footer, Navigation)
   - Component naming follows Storyblok's convention: `block_hero` in CMS → `BlockHero.vue` in codebase

3. **Storyblok Integration Pattern**:
   - Use `useStory()` composable (not direct Storyblok calls) in page templates
   - Always specify relations in `[...slug].vue`: `const relations = ['post.author']`
   - Story content is accessed via `story.content` (e.g., `story.content.seo_title`)
   - Relations are resolved as full story objects (e.g., `story.content.author.name`)

## Development Workflow

### Essential Commands

```bash
# Start development (auto-generates Storyblok types first)
npm run dev

# Sync Storyblok schema
npm run sb:components  # Pull component definitions
npm run sb:types       # Generate TypeScript types
npm run sb:generate    # Do both

# Linting
npm run lint:fix       # Uses @antfu/eslint-config with custom rules
```

### Storyblok Type Generation

**Critical**: Run `npm run sb:generate` after any CMS schema changes. The types are generated into `.storyblok/types/289672313529140/storyblok-components.d.ts` and must match the CMS exactly.

### Migration Scripts

WordPress to Storyblok migration lives in `/migration/`:
- Two-step process: migrate authors (`person`) first, then posts with references
- Block mapping transforms Gutenberg blocks to Storyblok nested components
- Content structure: `content.rendered` → `content.blocks` (array of post_text, post_heading, etc.)

## Project-Specific Conventions

### Styling & Tailwind

1. **Custom Tailwind Utilities**: See `twMerge.ts` for extended class groups:
   ```typescript
   // Custom font sizes: text-14, text-16, text-20, text-26, text-28, etc.
   // Fluid typography: text-fluid-h1, text-fluid-h2, text-fluid-p
   // Custom colors: text-offblack, text-blue, text-green, text-pink, text-purple
   ```

2. **Utility Classes**: Defined in `assets/css/utils.css` (wrapper, type-display-28, etc.)

3. **CSS Custom Properties**: Use CSS variables for grid gaps: `gap-x-(--app-inner-gutter)`

### Component Patterns

1. **Template Components**: Must accept `story` prop typed to ISbStoryData:
   ```vue
   interface Props {
     story: ISbStoryData<Post>
   }
   const { story } = defineProps<Props>()
   ```

2. **Storyblok Image Handling**: Always use helper functions from `utils/storyblok.ts`:
   - `storyblokAssetType()` - Determine if asset is image/video
   - `storyblokImageDimensions()` - Extract image dimensions from URL
   - `storyblokImage()` - Generate transformed image URL

3. **SEO Pattern**: Every content type has `seo_title`, `seo_description`, `seo_image` fields. Apply in `[...slug].vue` using `useSeoMeta()`.

### Type Safety

1. **Import Types from Generated Files**:
   ```typescript
   import type { Post, Person } from '@@/.storyblok/types/289672313529140/storyblok-components'
   ```

2. **Path Aliases**:
   - `@@/` → Root workspace (for .storyblok access)
   - `~/` → app directory

3. **Type Guards**: Use custom type guards for content types:
   ```typescript
   if (isPost(story)) { /* story is now ISbStoryData<Post> */ }
   ```

### ESLint Configuration

Uses @antfu/eslint-config with custom overrides:
- Vue: No multi-word component name requirement (Storyblok components are single words)
- Vue: Enforced blank lines between template tags
- Vue: Max 1 attribute per line (enforced for readability)
- Curly braces: Multi-line only (`curly: 'multi'`)

## Integration Points

### Environment Variables

Required in `.env`:
```bash
NUXT_STORYBLOK_TOKEN=           # Public access token
NUXT_STORYBLOK_MANAGEMENT_TOKEN= # Management API (for migrations)
NUXT_STORYBLOK_SPACE_ID=        # Space ID (289825226535458)
NUXT_STORYBLOK_VERSION=         # 'draft' or 'published'
NUXT_PRERENDER=                 # 'true' for SSG
```

### External Dependencies

- **GSAP**: Animation library (used in effects)
- **Lenis**: Smooth scroll (Nuxt module enabled)
- **VeeValidate + Zod**: Form validation (newsletter signup)
- **@vueuse/core**: Composition utilities

### API Routes

- `/api/sitemap.ts`: Dynamic sitemap generation from Storyblok stories

## Common Gotchas

1. **Storyblok Relations**: Must declare in both `api` and `bridge` options when calling `useStory()`
2. **Image Dimensions**: Storyblok encodes dimensions in filename—use `storyblokImageDimensions()` helper
3. **Content vs. Story**: Story metadata (name, slug, created_at) is at `story.name`, content fields are at `story.content.fieldName`
4. **Migration Field Mapping**: Left side = WordPress API structure, right side = Storyblok story structure (include `content.` prefix for component fields)
5. **PostCSS**: Nested CSS requires `postcss-nested` plugin (already configured)

## File References

- Content types: [.storyblok/types/289672313529140/storyblok-components.d.ts](.storyblok/types/289672313529140/storyblok-components.d.ts)
- Storyblok utils: [app/utils/storyblok.ts](app/utils/storyblok.ts)
- Main page handler: [app/pages/[...slug].vue](app/pages/[...slug].vue)
- useStory composable: [app/composables/useStory.ts](app/composables/useStory.ts)
- Migration entry: [migration/MIGRATE.JS](migration/MIGRATE.JS)
