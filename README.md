# RAW

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
npm install
```

## Scripts

### Development

```bash
# Start dev server (auto-generates Storyblok types first)
npm run dev

# Start dev server with SSL proxy
npm run dev:ssl
```

### Production

```bash
# Build for production
npm run build

# Generate static site
npm run generate

# Preview production build
npm run preview
```

### Storyblok

```bash
# Pull components and generate types
npm run sb:generate

# Pull component definitions only
npm run sb:components

# Generate TypeScript types only
npm run sb:types

# Login/logout of Storyblok CLI
npm run sb:login
npm run sb:logout
```

### Linting

```bash
# Check for lint errors
npm run lint

# Fix lint errors
npm run lint:fix
```

### Maintenance

```bash
# Remove build artifacts and dependencies
npm run nuke
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Commit Conventions

This project uses [Commitlint](https://commitlint.js.org/) with the [Conventional Commits](https://www.conventionalcommits.org/) specification.

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
# Features
git commit -m "feat: add carousel component"
git commit -m "feat(blog): add post filtering by author"

# Bug fixes
git commit -m "fix: resolve image dimension extraction"
git commit -m "fix(migration): decode HTML entities in titles"

# Documentation
git commit -m "docs: update README with setup instructions"

# Refactoring
git commit -m "refactor: simplify useStory composable"

# Dependencies/build
git commit -m "build: upgrade nuxt to v4.3.0"

# Chores
git commit -m "chore: regenerate storyblok types"

# Breaking changes
git commit -m "feat!: change API response format"
```

### Rules

- Use **lowercase** for the subject (no capital first letter)
- **No period** at the end
- Use **imperative mood** ("add" not "added" or "adds")
- Scope is optional but helpful for clarity
