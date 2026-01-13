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
      // filename,
      // id: data.id,
      // alt: '',
      // name: '',
      // focus: '',
      // title: '',
      // source: '',
      // copyright: '',
      // fieldtype: 'asset',
      // meta_data: {},
      // is_external_url: false,

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

export {
  addToStoryblok,
  convertHtmlToJson,
  uploadFileToStoryblok,
  wait,
}
