import type { Block } from '#storyblok-schema'

type BlockTypes = NonNullable<Block<'page'>['blocks']>[number]

type Themes = 'dark' | 'light' | 'blue' | 'green' | 'pink' | 'purple'

export { BlockTypes, Themes }
