import { asSitemapUrl, defineSitemapEventHandler } from '#imports'
import StoryblokClient from 'storyblok-js-client'

interface Link {
  id: number
  uuid: string
  slug: string
  path: string | null
  parent_id: number | null
  name: string
  is_folder: boolean
  published: boolean
  is_startpage: boolean
  position: number
  real_path: string
}

export default defineSitemapEventHandler(async () => {
  const config = useRuntimeConfig().public

  const storyblokApi = new StoryblokClient({
    accessToken: config.STORYBLOK_TOKEN,
    region: 'eu',
  })

  try {
    const response = await storyblokApi.getAll('cdn/links', {
      version: 'published',
    })

    const pages = response
      .filter((link: Link) => link.published && !link.is_folder && link.slug !== 'settings')
      .map((link: Link) =>
        asSitemapUrl({
          loc: link.slug === 'home' ? '/' : `/${link.slug}`,
        }),
      )

    return pages
  }
  catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch sitemap data: ${error.message}`,
      fatal: true,
    })
  }
})
