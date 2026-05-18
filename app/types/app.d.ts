import type { Page } from '#storyblok-components'

type BlockTypes = NonNullable<Page['blocks']>[number]

type Themes = 'dark' | 'light' | 'blue' | 'green' | 'pink' | 'purple'

export { BlockTypes, Themes }
