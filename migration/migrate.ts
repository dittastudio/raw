import { addToStoryblok, uploadFileToStoryblok } from './utils'

const PARENT = 133603998123034
const AUTHOR = '4e09f764-a3fd-4d59-96a3-1ba3d192dabb' // Hard-coded to Charlotte.

const getWpPosts = async (): Promise<any> => {
  const response = await fetch('https://raw.london/wp-json/wp/v2/posts?page=1&per_page=1')
  return await response.json()
}

const mapCategories = (categories: number[]): string[] => {
  const categoryMap: Record<number, string> = {
    1: 'event-launches',
    10: 'events',
    12: 'insights',
    15: 'inspiration',
    6: 'news',
  }

  return categories.map(id => categoryMap[id] || '')
}

const run = async () => {
  const posts = await getWpPosts()

  for (const post of posts) {
    const mainImage = post.yoast_head_json?.og_image?.[0]?.url ? await uploadFileToStoryblok(post.yoast_head_json.og_image[0].url) : null

    const fields = {
      name: post.title.rendered,
      slug: post.slug,
      created_at: post.date,
      modified_at: post.modified,
      seo_title: post.yoast_head_json?.title || '',
      seo_description: post.yoast_head_json?.description || '',
      seo_image: mainImage,
      hero: mainImage,
      category: mapCategories(post.categories),
      author: AUTHOR,
    }

    console.log(fields)

    try {
      const createStoryPost = await addToStoryblok({
        publish: true,
        story: {
          parent_id: PARENT, // Folder id
          is_startpage: false,
          name: fields.name,
          slug: fields.slug,
          created_at: fields.created_at,
          published_at: fields.created_at,
          content: {
            component: 'post',
            seo_title: fields.seo_title,
            seo_description: fields.seo_description,
            seo_image: fields.seo_image ?? undefined, // TS Error because it's required in CMS.
            hero: fields.hero ?? undefined,
            category: fields.category,
            author: fields.author,
            blocks: [],
          },
        },
      })

      if (createStoryPost?.ok) {
        console.log('Successfully created Storyblok story for post:', fields.name)
      }
      else {
        console.log('Failed to create Storyblok story for post:', fields.name)
      }
    }
    catch (error: any) {
      console.error('Error: ', error)
    }
  }
}

run()

// const removeQueryParams = (url: string) => {
//   try {
//     const imageObj = new URL(url)
//     imageObj.search = ''

//     return imageObj.toString()
//   }
//   catch {
//     return url
//   }
// }

// const getVimeoIdFromUrl = (url: string) => {
//   try {
//     const path = new URL(url).pathname
//     const match = path.match(/\d+/)
//     return match ? match[0] : null
//   }
//   catch {
//     return null
//   }
// }

// const defineVimeoBlock = (link: string | undefined | null = ''): Vimeo | undefined => {
//   if (!link) {
//     return undefined
//   }

//   const vimeoId = getVimeoIdFromUrl(link)

//   if (!vimeoId) {
//     return undefined
//   }

//   return {
//     _uid: crypto.randomUUID(),
//     component: 'vimeo',
//     id: vimeoId,
//     autoplay: true,
//     controls: false,
//     loop: true,
//   }
// }
