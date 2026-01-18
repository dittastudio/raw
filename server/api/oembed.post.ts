import { parseHTML } from 'linkedom'

interface Fields {
  url: string
}

interface OEmbedResponse {
  type: 'photo' | 'video' | 'link' | 'rich'
  version: '1.0'
  title?: string
  author_name?: string
  author_url?: string
  provider_name?: string
  provider_url?: string
  cache_age?: number | string
  thumbnail_url?: string
  thumbnail_width?: number
  thumbnail_height?: number
  width?: number
  height?: number
  html?: string
}

interface OEmbedProvider {
  provider: string
  patterns: RegExp[]
  endpoint: string
}

const PROVIDERS: OEmbedProvider[] = [
  {
    provider: 'YouTube',
    patterns: [
      /https?:\/\/(www\.)?youtube\.com\/watch/i,
      /https?:\/\/youtu\.be\//i,
    ],
    endpoint: 'https://www.youtube.com/oembed',
  },
  {
    provider: 'Vimeo',
    patterns: [/https?:\/\/(www\.)?vimeo\.com\//i],
    endpoint: 'https://vimeo.com/api/oembed.json',
  },
  {
    provider: 'Dailymotion',
    patterns: [
      /https?:\/\/(www\.)?dailymotion\.com\/video/i,
      /https?:\/\/dai\.ly\//i,
    ],
    endpoint: 'https://www.dailymotion.com/services/oembed',
  },
  {
    provider: 'Flickr',
    patterns: [
      /https?:\/\/(www\.)?flickr\.com\/photos/i,
      /https?:\/\/flic\.kr\//i,
    ],
    endpoint: 'https://www.flickr.com/services/oembed/',
  },
  {
    provider: 'SoundCloud',
    patterns: [/https?:\/\/(www\.)?soundcloud\.com\//i],
    endpoint: 'https://soundcloud.com/oembed',
  },
  {
    provider: 'Twitter',
    patterns: [/https?:\/\/(www\.)?twitter\.com\/.+\/status/i],
    endpoint: 'https://publish.twitter.com/oembed',
  },
  {
    provider: 'Spotify',
    patterns: [/https?:\/\/open\.spotify\.com\//i],
    endpoint: 'https://open.spotify.com/oembed',
  },
  {
    provider: 'Imgur',
    patterns: [/https?:\/\/(www\.)?imgur\.com\//i],
    endpoint: 'https://api.imgur.com/oembed',
  },
  {
    provider: 'Reddit',
    patterns: [/https?:\/\/(www\.)?reddit\.com\/r\/.+\/comments/i],
    endpoint: 'https://www.reddit.com/oembed',
  },
  {
    provider: 'WordPress.tv',
    patterns: [/https?:\/\/wordpress\.tv\//i],
    endpoint: 'https://wordpress.tv/oembed/',
  },
]

export default defineEventHandler(async (event) => {
  const body = await readBody(event) as Fields | undefined

  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No payload data found',
    })
  }

  const { url } = body

  if (!url) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No URL found in payload',
    })
  }

  let parsedUrl: URL | undefined

  try {
    parsedUrl = new URL(url)
  }
  catch {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid URL',
    })
  }

  const provider = PROVIDERS.find(item => item.patterns.some(regex => regex.test(parsedUrl.href)))

  if (!provider) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Unsupported oEmbed provider',
    })
  }

  const endpoint = new URL(provider.endpoint)
  endpoint.searchParams.set('url', parsedUrl.href)
  endpoint.searchParams.set('format', 'json')

  const response = await fetch(endpoint.toString(), {
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw createError({
      statusCode: 400,
      statusMessage: `oEmbed request failed (${provider.provider}): ${response.status}`,
    })
  }

  const data = await response.json() as OEmbedResponse
  const parsed = parseHTML(data.html)
  const iframe = parsed?.document.querySelector('iframe')

  if (!iframe) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No iframe found in the HTML',
    })
  }

  iframe.setAttribute('loading', 'lazy')
  iframe.removeAttribute('width')
  iframe.removeAttribute('height')

  return {
    ...data,
    html: iframe.toString(),
  }
})
