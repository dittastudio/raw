import type { ISbStoryData } from '@storyblok/js'
import type { Post } from '../.storyblok/types/289672313529140/storyblok-components'
import type { StoryblokAsset } from '../.storyblok/types/storyblok.d.ts'
import { Buffer } from 'node:buffer'
import FormData from 'form-data'
import pkg from 'storyblok-markdown-richtext'
import TurndownService from 'turndown'

const SPACE = 289672313529140
const ASSET_FOLDER = 134034324236001

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
    return await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE}/stories/`, {
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

async function filePrepare(signed_request: SignedRequest, file: Buffer): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const form = new FormData()

    for (const key in signed_request.fields) {
      form.append(key, signed_request.fields[key])
    }

    form.append('file', file)

    form.submit(signed_request.post_url, (err, res) => {
      if (err || res.statusCode !== 204) {
        return reject(err || new Error('Upload failed'))
      }

      res.resume()
      resolve()
    })
  })
}

async function uploadFileToStoryblok(fileUrl: string): Promise<StoryblokAsset | undefined> {
  if (!fileUrl) {
    return
  }

  const splitFile = fileUrl?.split('/')
  const originalFileName = splitFile[splitFile.length - 1]
  const extension = originalFileName.split('.').pop() || ''
  const fileName = `${crypto.randomUUID()}.${extension}`

  try {
    const fetchSrcImage = await fetch(fileUrl)

    if (!fetchSrcImage.ok) {
      console.error(`❌ Failed to fetch image: ${fileUrl} (${fetchSrcImage.status})`)
      return
    }

    const imgBuffer = Buffer.from(await fetchSrcImage.arrayBuffer())
    const probeModule = await import('probe-image-size')
    const probe = probeModule.default ?? probeModule
    const dimensions = probe.sync(imgBuffer)

    if (!dimensions) {
      console.error(`❌ Failed to detect image dimensions: ${fileUrl}`)
      return
    }

    const { width, height } = dimensions

    // Step 1: Get signed upload request
    const signedResponse = await fetch(
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
          validate_upload: 1,
          asset_folder_id: ASSET_FOLDER,
        }),
      },
    )

    if (!signedResponse.ok) {
      console.error(`❌ Storyblok signed request failed: ${signedResponse.status}`)
      return
    }

    const signedData = await signedResponse.json()

    // Step 2: Upload file to S3
    await filePrepare(signedData, imgBuffer)

    // Step 3: Register the uploaded asset with Storyblok
    const assetFinalization = await fetch(
      `https://mapi.storyblok.com/v1/spaces/${SPACE}/assets/${signedData.id}/finish_upload`,
      {
        method: 'GET',
        headers: {
          'Authorization': process.env.NUXT_STORYBLOK_MANAGEMENT_TOKEN || '',
        }
      },
    )

    if (!assetFinalization.ok) {
      console.error(`❌ Failed to register asset: ${assetFinalization.status}`)
      return
    }

    const filename = `https://a.storyblok.com/${signedData.fields.key}`

    const asset = {
      alt: '',
      copyright: '',
      fieldtype: 'asset',
      id: signedData.id,
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
    console.error(`❌ Error uploading file to Storyblok: ${fileUrl}`, error)
    return undefined
  }
}

const wait = (ms: number = 0) => new Promise(resolve => setTimeout(resolve, ms))

const wpExcludedPosts = [
  { id: 3059, slug: 'weekly-dose-video-inspiration-2-march-2018' },
  { id: 3036, slug: 'weekly-dose-video-inspiration-23-feb-2018' },
  { id: 2982, slug: 'your-weekly-dose-of-video-inspiration-12-feb-2018' },
  { id: 2953, slug: 'your-weekly-dose-of-video-inspiration-9-feb-2018' },
  { id: 2775, slug: 'your-weekly-dose-of-video-inspiration-12-jan-2018' },
  { id: 7008, slug: 'your-weekly-dose-of-video-inspiration-15-dec-2017' },
  { id: 2560, slug: 'your-weekly-dose-of-christmas-video-inspiration-5-december-2017' },
  { id: 2530, slug: 'your-weekly-dose-of-video-inspiration-24-november-2017' },
  { id: 2521, slug: 'your-weekly-dose-of-video-inspiration-17-november-2017' },
  { id: 2504, slug: 'your-weekly-dose-of-video-inspiration-10-nov-2017' },
  { id: 6994, slug: 'your-weekly-dose-of-video-inspiration-3-nov-2017' },
  { id: 6989, slug: 'your-weekly-dose-of-video-inspiration-27-oct-2017' },
  { id: 6986, slug: 'your-weekly-dose-of-video-inspiration-20-oct-2017' },
  { id: 6980, slug: 'raws-best-video-picks-of-the-week-6-october-2017' },
  { id: 1839, slug: 'raws-hot-video-picks-of-the-week-27-september-2017' },
  { id: 6950, slug: 'raws-hot-video-picks-of-the-week-39' },
  { id: 833, slug: 'raws-hot-video-picks-of-the-week-2' },
  { id: 6934, slug: 'raws-hot-video-picks-of-the-week' },
  { id: 1054, slug: 'raws-hot-video-picks-of-the-week-3' },
  { id: 1058, slug: 'raws-hot-video-picks-of-the-week-4' },
  { id: 1063, slug: 'raws-hot-video-picks-of-the-week-5' },
  { id: 1066, slug: 'raws-hot-video-picks-of-the-week-6' },
  { id: 1069, slug: 'raws-hot-video-picks-of-the-week-7' },
  { id: 6925, slug: 'raws-hot-video-picks-of-the-week-8' },
  { id: 6885, slug: 'raws-hot-video-picks-of-the-week-9' },
  { id: 1078, slug: 'raws-hot-video-picks-of-the-week-10' },
  { id: 1081, slug: 'raws-hot-video-picks-of-the-week-11' },
  { id: 1088, slug: 'raws-hot-video-picks-of-the-week-16' },
  { id: 1091, slug: 'raws-hot-video-picks-of-the-week-15' },
  { id: 1094, slug: 'raws-hot-video-picks-of-the-week-14' },
  { id: 1097, slug: 'raws-hot-video-picks-of-the-week-13' },
  { id: 921, slug: 'halloween-special-raws-hot-video-picks-of-the-week' },
  { id: 1100, slug: 'raws-hot-video-picks-of-the-week-17' },
  { id: 1103, slug: 'raws-hot-video-picks-of-the-week-12' },
  { id: 1106, slug: 'raws-hot-video-picks-of-the-week-18' },
  { id: 1109, slug: 'raws-hot-video-picks-of-the-week-19' },
  { id: 1112, slug: 'raws-hot-video-picks-of-the-week-20' },
  { id: 1119, slug: 'raws-hot-video-picks-of-the-week-22' },
  { id: 1121, slug: 'raws-hot-video-picks-of-the-week-21' },
  { id: 1128, slug: 'raws-hot-video-picks-of-the-week-23' },
  { id: 1131, slug: 'animation-special-raws-hot-video-picks-of-the-week' },
  { id: 1134, slug: 'raws-hot-video-picks-of-the-week-24' },
  { id: 1137, slug: 'raws-hot-video-picks-of-the-week-25' },
  { id: 1140, slug: 'raws-hot-video-picks-of-the-week-26' },
  { id: 1143, slug: 'raws-hot-video-picks-of-the-week-27' },
  { id: 1147, slug: 'raws-hot-video-picks-of-the-week-28' },
  { id: 1152, slug: 'raws-hot-video-picks-of-the-week-29' },
  { id: 1155, slug: 'raws-hot-video-picks-of-the-week-30' },
  { id: 1160, slug: 'raws-hot-video-picks-of-the-week-31' },
  { id: 1163, slug: 'raws-hot-video-picks-of-the-week-32' },
  { id: 1166, slug: 'raws-hot-video-picks-of-the-week-33' },
  { id: 1169, slug: 'raws-hot-video-picks-of-the-week-34' },
  { id: 1174, slug: 'raws-hot-video-picks-of-the-week-35' },
  { id: 1178, slug: 'raws-hot-video-picks-of-the-week-36' },
  { id: 6850, slug: 'raws-hot-video-picks-of-the-week-37' },
  { id: 1185, slug: 'raws-hot-video-picks-of-the-week-38' },
]

const wpFields = [
  'id',
  'date',
  'modified',
  'slug',
  'status',
  'title.rendered',
  'yoast_head_json.title',
  'yoast_head_json.description',
  'yoast_head_json.og_title',
  'yoast_head_json.og_description',
  'yoast_head_json.og_image',
  'categories',
  'has_blocks',
  'block_data',
]

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

const decodeHtmlEntities = (text: string): string => {
  const entities: Record<string, string> = {
    '&#8217;': `'`,
    '&#8216;': `'`,
    '&#8220;': '"',
    '&#8221;': '"',
    '&#8211;': '-',
    '&#8212;': '—',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
    '&nbsp;': ' ',
  }

  return text.replace(/&#?\w+;/g, match => entities[match] || match)
}

export {
  addToStoryblok,
  convertHtmlToJson,
  decodeHtmlEntities,
  mapCategories,
  uploadFileToStoryblok,
  wait,
  wpExcludedPosts,
  wpFields,
}
