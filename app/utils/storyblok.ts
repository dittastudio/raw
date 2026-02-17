import type { Event, Image, MuxVideoAutoplay, MuxVideoPlayer, Page, Post, Project } from '#storyblok-components'
import type { StoryblokMultilink, StoryblokRichtext } from '#storyblok-types'
import type { ImageModifiers } from '@nuxt/image'
import type { ISbStoryData } from '@storyblok/js'
import type { LocationQuery } from 'vue-router'

interface Entry {
  id: number
  value: string
  name: string
}

const getCategoryEntry = (value?: string | string[] | number, entries?: Entry[]): Entry | undefined => {
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
  richtext: StoryblokRichtext | undefined,
): boolean => Boolean(richtext?.content?.[0]?.content?.length)

const storyblokSlug = (path: string): string =>
  ['', '/'].includes(path) ? '/home' : path.replace(/\/+$/, '')

interface TypedMuxVideo extends MuxVideoAutoplay {
  video: {
    playbackId?: string
  }
}

const isImageComponent = (media: Image | MuxVideoAutoplay | MuxVideoPlayer): media is Image => media.component === 'image'
const isMuxVideoAutoplayComponent = (media: Image | MuxVideoAutoplay | MuxVideoPlayer): media is TypedMuxVideo => media.component === 'mux_video_autoplay'
const isMuxVideoPlayerComponent = (media: Image | MuxVideoAutoplay | MuxVideoPlayer): media is TypedMuxVideo => media.component === 'mux_video_player'

type ContentTypes = Page | Post | Project | Event

const isEvent = (
  story: ISbStoryData<ContentTypes> | null | undefined,
): story is ISbStoryData<Event> => Boolean(story?.content?.component === 'event')

const isPage = (
  story: ISbStoryData<ContentTypes> | null | undefined,
): story is ISbStoryData<Page> => Boolean(story?.content?.component === 'page')

const isPost = (
  story: ISbStoryData<ContentTypes> | null | undefined,
): story is ISbStoryData<Post> => Boolean(story?.content?.component === 'post')

const isProject = (
  story: ISbStoryData<ContentTypes> | null | undefined,
): story is ISbStoryData<Project> => Boolean(story?.content?.component === 'project')

type PageBlocks = NonNullable<Page['blocks']>
type PageBlock = PageBlocks[number]
type PageBlockWithMedia = Extract<PageBlock, { media?: unknown }>

const isBlockWithMedia = (block: PageBlock): block is PageBlockWithMedia => 'media' in block && Array.isArray(block.media) && block.media.length > 0

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

const determineHref = (item: StoryblokMultilink) => {
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
  storyblokRichTextContent,
  storyblokSlug,
}
