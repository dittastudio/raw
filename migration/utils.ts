import type { ISbStoryData } from '@storyblok/js'
import type { Post } from '../.storyblok/types/289672313529140/storyblok-components'
import type { StoryblokAsset } from '../.storyblok/types/storyblok.d.ts'
import { Buffer } from 'node:buffer'
import FormData from 'form-data'
import pkg from 'storyblok-markdown-richtext'
import TurndownService from 'turndown'

const SPACE = 289825226535458
const ASSET_FOLDER = 133698267522379

const convertHtmlToJson = (html?: string) => {
  const { markdownToRichtext } = pkg
  const turndownService = new TurndownService()

  return markdownToRichtext(turndownService.turndown(html ?? ''))
}

interface Story {
  publish: boolean | number
  story: ISbStoryData<Post>
}

async function addToStoryblok(data: Story) {
  try {
    return await fetch(`https://api.storyblok.com/v1/spaces/${SPACE}/stories/`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.NUXT_STORYBLOK_MANAGEMENT_TOKEN || '',
      },
      body: JSON.stringify(data),
    })
  }
  catch (error) {
    console.log(error)
  }
}

interface SignedRequest {
  post_url: string
  fields: Record<string, string>
}

async function filePrepare(signed_request: SignedRequest, file: Buffer) {
  const form = new FormData()

  for (const key in signed_request.fields) {
    form.append(key, signed_request.fields[key])
  }

  form.append('file', file)
  form.submit(signed_request.post_url, (err) => {
    if (err) {
      throw err
    }
  })
}

async function uploadFileToStoryblok(fileUrl: string) {
  if (!fileUrl) {
    return
  }

  const splitFile = fileUrl?.split('/')
  const fileName = splitFile[splitFile.length - 1]

  const fetchImage = await fetch(fileUrl)
  const imgBuffer = Buffer.from(await fetchImage.arrayBuffer())

  const probeModule = await import('probe-image-size')
  const probe = probeModule.default ?? probeModule
  const { width, height } = probe.sync(imgBuffer)

  try {
    const response = await fetch(
      `https://mapi.storyblok.com/v1/spaces/${SPACE}/assets/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': process.env.NUXT_STORYBLOK_MANAGEMENT_TOKEN || '',
        },
        body: JSON.stringify({
          filename: fileName,
          size: `${width}x${height}`,
          asset_folder_id: ASSET_FOLDER,
        }),
      },
    )

    const data = await response.json()
    const fetchImage = await fetch(fileUrl)
    const imgBuffer = Buffer.from(await fetchImage.arrayBuffer())

    await filePrepare(data, imgBuffer)

    const filename = `https://a.storyblok.com/${data.fields.key}`
    const asset = {
      alt: '',
      copyright: '',
      fieldtype: 'asset',
      id: data.id,
      filename,
      name: '',
      title: '',
      focus: '',
      meta_data: {},
      source: '',
      is_external_url: false,
      is_private: false,
      src: '',
      updated_at: '',
      width,
      height,
      aspect_ratio: 0,
      public_id: '',
      content_type: '',
    } as StoryblokAsset

    return asset
  }
  catch (error) {
    console.log(error)
  }
}

const wait = (ms: number = 0) => new Promise(resolve => setTimeout(resolve, ms))

const excludedSlugs = [
  'raws-hot-video-picks-of-the-week-35',
  'raws-hot-video-picks-of-the-week-36',
  'raws-hot-video-picks-of-the-week-37',
  'raws-hot-video-picks-of-the-week-38',
  'raws-hot-video-picks-of-the-week-25',
  'raws-hot-video-picks-of-the-week-26',
  'raws-hot-video-picks-of-the-week-27',
  'raws-hot-video-picks-of-the-week-28',
  'raws-hot-video-picks-of-the-week-29',
  'raws-hot-video-picks-of-the-week-30',
  'raws-hot-video-picks-of-the-week-31',
  'raws-hot-video-picks-of-the-week-32',
  'raws-hot-video-picks-of-the-week-33',
  'raws-hot-video-picks-of-the-week-34',
  'raws-hot-video-picks-of-the-week-17',
  'raws-hot-video-picks-of-the-week-12',
  'raws-hot-video-picks-of-the-week-18',
  'raws-hot-video-picks-of-the-week-19',
  'raws-hot-video-picks-of-the-week-20',
  'raws-hot-video-picks-of-the-week-22',
  'raws-hot-video-picks-of-the-week-21',
  'raws-hot-video-picks-of-the-week-23',
  'animation-special-raws-hot-video-picks-of-the-week',
  'raws-hot-video-picks-of-the-week-24',
  'raws-hot-video-picks-of-the-week-5',
  'raws-hot-video-picks-of-the-week-6',
  'raws-hot-video-picks-of-the-week-7',
  'raws-hot-video-picks-of-the-week-16',
  'raws-hot-video-picks-of-the-week-8',
  'raws-hot-video-picks-of-the-week-10',
  'raws-hot-video-picks-of-the-week-9',
  'raws-hot-video-picks-of-the-week-11',
  'raws-hot-video-picks-of-the-week-15',
  'raws-hot-video-picks-of-the-week-14',
  'raws-hot-video-picks-of-the-week-13',
  'halloween-special-raws-hot-video-picks-of-the-week',
  'raws-hot-video-picks-of-the-week-39',
  'raws-hot-video-picks-of-the-week-2',
  'raws-hot-video-picks-of-the-week',
  'raws-hot-video-picks-of-the-week-3',
  'raws-hot-video-picks-of-the-week-4',
  'raws-hot-video-picks-of-the-week-27-september-2017',
  'your-weekly-dose-of-video-inspiration-10-nov-2017',
  'your-weekly-dose-of-video-inspiration-3-nov-2017',
  'your-weekly-dose-of-video-inspiration-27-oct-2017',
  'your-weekly-dose-of-video-inspiration-20-oct-2017',
  'raws-best-video-picks-of-the-week-6-october-2017',
  'your-weekly-dose-of-video-inspiration-9-feb-2018',
  'your-weekly-dose-of-video-inspiration-12-jan-2018',
  'your-weekly-dose-of-video-inspiration-15-dec-2017',
  'your-weekly-dose-of-christmas-video-inspiration-5-december-2017',
  'your-weekly-dose-of-video-inspiration-24-november-2017',
  'your-weekly-dose-of-video-inspiration-17-november-2017',
  'weekly-dose-video-inspiration-2-march-2018',
  'weekly-dose-video-inspiration-23-feb-2018',
  'your-weekly-dose-of-video-inspiration-12-feb-2018',
] as const

const mapCategories = (categories: number[]): string[] => {
  // The hard-coded category ids and slugs from WordPress.
  const categoryMap: Record<number, string> = {
    1: 'event-launches',
    10: 'events',
    12: 'insights',
    15: 'inspiration',
    6: 'news',
  }

  return categories.map(id => categoryMap[id] || '')
}

export {
  addToStoryblok,
  convertHtmlToJson,
  excludedSlugs,
  mapCategories,
  uploadFileToStoryblok,
  wait,
}
