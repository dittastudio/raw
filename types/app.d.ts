import type { Page } from '@@/.storyblok/types/289672313529140/storyblok-components'

type BlockTypes = NonNullable<Page['blocks']>[number]

type Themes = 'dark' | 'light' | 'blue' | 'green' | 'pink' | 'purple'

export { BlockTypes, Themes }
