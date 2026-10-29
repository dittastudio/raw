import type { Block, StoryOf } from '#storyblok-schema'
import type { MultilinkFieldValue, RichTextFieldValue } from '@storyblok/schema'
import type { ImageModifiers } from '@nuxt/image'
import type { LocationQuery } from 'vue-router'

interface Entry {
  id: number
  value: string
  name: string
}

const getCategoryEntry = (value?: string | string[] | number | null, entries?: Entry[]): Entry | undefined => {
  if (Array.isArray(entries) && value) {
    const category = Array.isArray(value) ? value[0] : value
    const entry = entries.find((entry: Entry) => entry.value === category)
    return entry as Entry ?? undefined
  }

  return undefined
}

const storyblokEditor = (search: LocationQuery) => '_storyblok' in search

const imageExtensions = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'webp',
  'bmp',
  'svg',
  'avif',
]
const videoExtensions = ['mp4', 'webm', 'ogg']

const storyblokAssetType = (filename: string): 'image' | 'video' | 'other' => {
  if (typeof filename !== 'string' || !filename?.trim().length) {
    return 'other'
  }

  const ext = filename.split('.').pop() || ''

  if (imageExtensions.includes(ext)) {
    return 'image'
  }
  else if (videoExtensions.includes(ext)) {
    return 'video'
  }

  return 'other'
}

const storyblokRichTextContent = (
  richtext: RichTextFieldValue | null | undefined,
): boolean => {
  const node = richtext?.content?.[0]
  return Boolean(node && 'content' in node && node.content?.length)
}

const storyblokSlug = (path: string): string =>
  ['', '/'].includes(path) ? '/home' : path.replace(/\/+$/, '')

const storyblokRangeNumber = (field: unknown): number | undefined => {
  const value = (field as { value?: string })?.value
  return value !== undefined && value !== '' ? Number(value) : undefined
}

type Media = Block<'image'> | Block<'mux_video_autoplay'> | Block<'mux_video_player'>

const isImageComponent = (media: Media): media is Block<'image'> => media.component === 'image'
const isMuxVideoAutoplayComponent = (media: Media): media is Block<'mux_video_autoplay'> => media.component === 'mux_video_autoplay'
const isMuxVideoPlayerComponent = (media: Media): media is Block<'mux_video_player'> => media.component === 'mux_video_player'

type ContentTypes = StoryOf<'page' | 'post' | 'project' | 'event'>

const isEvent = (
  story: ContentTypes | null | undefined,
): story is StoryOf<'event'> => Boolean(story?.content?.component === 'event')

const isPage = (
  story: ContentTypes | null | undefined,
): story is StoryOf<'page'> => Boolean(story?.content?.component === 'page')

const isPost = (
  story: ContentTypes | null | undefined,
): story is StoryOf<'post'> => Boolean(story?.content?.component === 'post')

const isProject = (
  story: ContentTypes | null | undefined,
): story is StoryOf<'project'> => Boolean(story?.content?.component === 'project')

type ContentTypeBlocks = NonNullable<Block<'page' | 'event' | 'project'>['blocks']>
type ContentTypeBlock = ContentTypeBlocks[number]
type ContentTypeBlockWithMedia = Extract<ContentTypeBlock, { media?: unknown }>

const isBlockWithMedia = (block: ContentTypeBlock): block is ContentTypeBlockWithMedia => 'media' in block && Array.isArray(block.media) && block.media.length > 0

const blockHelpers = <T extends { content: { blocks?: ContentTypeBlocks | null } }>(story: T) => {
  const blocks = story.content.blocks

  const checkBackgroundMatchesPrevBackground = (index: number) => {
    if (index === 0) {
      return false
    }

    const currentBlock = blocks?.[index]
    const prevBlock = blocks?.[index - 1]

    return currentBlock && prevBlock && 'theme' in currentBlock && 'theme' in prevBlock
      ? currentBlock.theme === prevBlock.theme
      : false
  }

  const checkBlockHasFullWidthBgMedia = (index: number) => {
    const block = blocks?.[index]

    if (!block) {
      return false
    }

    return isBlockWithMedia(block) && ['block_testimonials', 'block_ticker', 'block_hover_list'].includes(block.component) && block.media?.[0]
  }

  const checkMediaIsFull = (index: number) => {
    const block = blocks?.[index]

    if (!block) {
      return false
    }

    return isBlockWithMedia(block) && 'placement' in block && block.placement === 'full'
  }

  return {
    checkBackgroundMatchesPrevBackground,
    checkBlockHasFullWidthBgMedia,
    checkMediaIsFull,
  }
}

const storyblokImage = (
  filename: string | null | undefined,
  modifiers?: Partial<ImageModifiers> | undefined,
): string => {
  const image = useImage()

  const path = image(filename ?? '', {
    width: 0,
    height: 0,
    smart: false,
    quality: 80,
    blur: 0,
    format: 'webp',
    ...modifiers,
  })

  return path
}

const storyblokImageDimensions = (
  filename: string | null | undefined,
): { width: number, height: number } => {
  if (!filename?.length) {
    return {
      width: 0,
      height: 0,
    }
  }

  const parts = filename.split('/')

  if (!parts[5]?.includes('x')) {
    return {
      width: 0,
      height: 0,
    }
  }

  const [width, height] = parts[5].split('x')

  return { width: Number(width), height: Number(height) }
}

const determineHref = (item: MultilinkFieldValue) => {
  switch (item.linktype) {
    case 'story': {
      const path = `/${item.cached_url}`.replace('/home', '/').trim()
      return path === '/' ? path : path.replace(/\/$/, '')
    }
    case 'email': {
      return `mailto:${item.email}`
    }
    default: {
      return item.cached_url
    }
  }
}

export {
  blockHelpers,
  determineHref,
  getCategoryEntry,
  isBlockWithMedia,
  isEvent,
  isImageComponent,
  isMuxVideoAutoplayComponent,
  isMuxVideoPlayerComponent,
  isPage,
  isPost,
  isProject,
  storyblokAssetType,
  storyblokEditor,
  storyblokImage,
  storyblokImageDimensions,
  storyblokRangeNumber,
  storyblokRichTextContent,
  storyblokSlug,
}
