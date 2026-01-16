import type { Post, PostGallery, PostHeading, PostHtml, PostImage, PostQuote, PostText } from '../.storyblok/types/289672313529140/storyblok-components'
import type { StoryblokAsset } from '../.storyblok/types/storyblok.d.ts'
import { addToStoryblok, convertHtmlToJson, mapCategories, uploadFileToStoryblok, wait, wpExcludedPosts, wpFields } from './utils'

// vimeo and youtube embed blocks:
// https://raw.london/wp-admin/post.php?post=5214&action=edit
// twitter embed
// https://raw.london/wp-admin/post.php?post=5143&action=edit

const PARENT = 134064420646816
const AUTHOR = '4e09f764-a3fd-4d59-96a3-1ba3d192dabb' // Hard-coded to Charlotte.
const INTERVAL_WAIT_MS = 500
const VERBOSE_LOGS = false

const processBlocks = async (blockData: Record<number, any>): Promise<Post['blocks']> => {
  const blocks = Object.values(blockData)
  const processed: Post['blocks'] = []

  for (const block of blocks) {
    if (block.blockName === 'core/paragraph') {
      const content = block.rendered?.trim()

      // Sometimes we get empty <p> tags. Ignore them.
      if (!content || content === '<p></p>') {
        continue
      }

      const component: PostText = {
        _uid: crypto.randomUUID(),
        component: 'post_text',
        text: convertHtmlToJson(content),
      }

      processed.push(component)

      if (VERBOSE_LOGS) {
        console.log(`🔥 Block: ${block.blockName}`)
      }
    }
    else if (block.blockName === 'core/heading') {
      const content = block.attrs?.content?.trim()

      if (!content) {
        continue
      }

      const component: PostHeading = {
        _uid: crypto.randomUUID(),
        component: 'post_heading',
        heading: content,
      }

      processed.push(component)

      if (VERBOSE_LOGS) {
        console.log(`🔥 Block: ${block.blockName}`)
      }
    }
    else if (block.blockName === 'core/html') {
      const content = block.rendered?.trim()

      if (!content) {
        continue
      }

      const component: PostHtml = {
        _uid: crypto.randomUUID(),
        component: 'post_html',
        html: content,
      }

      processed.push(component)

      if (VERBOSE_LOGS) {
        console.log(`🔥 Block: ${block.blockName}`)
      }
    }
    else if (block.blockName === 'core/image') {
      const imageUrl = block.attrs?.url

      if (!imageUrl) {
        continue
      }

      const uploadedImage = await uploadFileToStoryblok(imageUrl)

      if (!uploadedImage) {
        continue
      }

      // Wait between image uploads to avoid rate limits
      await wait(INTERVAL_WAIT_MS)

      const component: PostImage = {
        _uid: crypto.randomUUID(),
        component: 'post_image',
        image: uploadedImage,
      }

      processed.push(component)

      if (VERBOSE_LOGS) {
        console.log(`🔥 Block: ${block.blockName}`)
      }
    }
    else if (block.blockName === 'core/quote') {
      const citation = block.attrs?.citation?.trim()
      const innerBlocks = block.innerBlocks || []

      if (!innerBlocks.length) {
        continue
      }

      const items: string[] = []

      for (const innerBlock of innerBlocks) {
        if (innerBlock.blockName === 'core/paragraph') {
          const content = innerBlock.rendered?.trim()

          if (!content || content === '<p></p>') {
            continue
          }

          items.push(content)
        }
      }

      if (!items.length) {
        continue
      }

      const component: PostQuote = {
        _uid: crypto.randomUUID(),
        component: 'post_quote',
        quote: items.length ? convertHtmlToJson(items.join(' ')) : undefined,
        citation: citation || undefined,
      }

      processed.push(component)

      if (VERBOSE_LOGS) {
        console.log(`🔥 Block: ${block.blockName}`)
      }
    }
    else if (block.blockName === 'core/list') {
      const innerBlocks = block.innerBlocks || []

      if (!innerBlocks.length) {
        continue
      }

      const items: string[] = []

      for (const innerBlock of innerBlocks) {
        if (innerBlock.blockName === 'core/list-item') {
          const content = innerBlock.rendered?.trim()

          if (!content || content === '<li></li>' || content === '<p></p>') {
            continue
          }

          items.push(content)
        }
      }

      if (!items.length) {
        continue
      }

      const component: PostText = {
        _uid: crypto.randomUUID(),
        component: 'post_text',
        text: items.length ? convertHtmlToJson(`<ul>${items.join('')}</ul>`) : undefined,
      }

      processed.push(component)

      if (VERBOSE_LOGS) {
        console.log(`🔥 Block: ${block.blockName}`)
      }
    }
    else if (block.blockName === 'core/gallery') {
      const innerBlocks = block.innerBlocks || []

      if (!innerBlocks.length) {
        continue
      }

      const items: StoryblokAsset[] = []

      for (const innerBlock of innerBlocks) {
        if (innerBlock.blockName === 'core/image') {
          const imageUrl = innerBlock.attrs?.url

          if (!imageUrl) {
            continue
          }

          const uploadedImage = await uploadFileToStoryblok(imageUrl)

          if (!uploadedImage) {
            console.log(`⚠️ Failed to upload gallery image: ${imageUrl}`)
            continue
          }

          items.push(uploadedImage)

          // Wait between image uploads to avoid rate limits
          await wait(INTERVAL_WAIT_MS)
        }
      }

      if (!items.length) {
        continue
      }

      const component: PostGallery = {
        _uid: crypto.randomUUID(),
        component: 'post_gallery',
        items,
      }

      processed.push(component)

      if (VERBOSE_LOGS) {
        console.log(`🔥 Block: ${block.blockName}`)
      }
    }
    else {
      console.log(`⚠️  Encountered unknown block type: ${block.blockName}`)
    }
  }

  return processed
}

// Bloody basic-bitch mock of WP response.
// Update accordingly if needed.
interface WpPost {
  id: number
  date: string
  modified: string
  slug: string
  status: string
  title: {
    rendered: string
  }
  yoast_head_json?: {
    title?: string
    description?: string
    og_title?: string
    og_description?: string
    og_image?: Array<{ url: string }>
  }
  categories: number[]
  has_blocks: boolean
  // Could mock all the blocks if we really wanted? Urgh.
  block_data: Record<number, any>
}

const getWpPosts = async (page: number = 1, perPage: number = 5): Promise<WpPost[]> => {
  const fields = wpFields.join(',')
  const excludeIds = wpExcludedPosts.map(item => item.id).join(',')
  const response = await fetch(`https://raw.london/wp-json/wp/v2/posts?status=publish&page=${page}&per_page=${perPage}&_fields=${fields}&exclude=${excludeIds}`)

  if (!response.ok) {
    console.error(`❌ WordPress API error: ${response.status} ${response.statusText}`)
    return []
  }

  return await response.json()
}

const run = async () => {
  const maxPosts = 2 // Safe maximum number of posts to migrate (make it a low as needed for testing).
  const perPage = 1 // Keep it low because RAW's server can't cope with too much JSON. 💩
  let page = 1
  let morePosts = true
  let totalProcessed = 0

  while (morePosts) {
    console.log(`\n📄 Fetching page ${page}...`)

    const posts = await getWpPosts(page, perPage)

    if (!Array.isArray(posts)) {
      console.error('❌ Invalid response from WordPress API')
      morePosts = false
      break
    }

    const postLength = posts.length

    if (postLength === 0) {
      console.log(`✨ No more posts to migrate.`)
      morePosts = false
      break
    }

    console.log(`🚀 Found ${postLength} posts to migrate on page ${page}.`)

    for (const post of posts) {
      if (totalProcessed >= maxPosts) {
        console.log(`\n🛑 Reached max posts limit (${maxPosts}). Stopping.`)
        morePosts = false
        break
      }

      const postTitle = post.title.rendered?.trim() || ''
      const postSlug = post.slug.trim() || ''

      if (!postSlug) {
        console.log(`🍌 Post does not have a slug: ${postTitle}\n`)
        continue
      }

      console.log(`✏️ Migrating post ${totalProcessed + 1} of ${maxPosts} max: ${postTitle}`)

      try {
        const postImage = post.yoast_head_json?.og_image?.[0]?.url ? await uploadFileToStoryblok(post.yoast_head_json.og_image[0].url) : null

        const fields = {
          name: postTitle,
          slug: postSlug,
          first_published_at: new Date(post.date).toISOString(),
          created_at: new Date(post.date).toISOString(),
          published_at: new Date(post.date).toISOString(),
          updated_at: new Date(post.modified).toISOString(),
          seo_title: post.yoast_head_json?.og_title || post.yoast_head_json?.title || postTitle || '',
          seo_description: post.yoast_head_json?.og_description || post.yoast_head_json?.description || postTitle || '',
          seo_image: postImage,
          hero: postImage,
          category: mapCategories(post.categories),
          author: AUTHOR,
          blocks: post.has_blocks && Object.keys(post.block_data).length ? await processBlocks(post.block_data) : [],
        }

        const payload = {
          publish: 0,
          story: {
            parent_id: PARENT,
            published: false,
            is_startpage: false,
            is_folder: false,
            name: fields.name,
            slug: fields.slug,
            first_published_at: fields.first_published_at,
            created_at: fields.created_at,
            published_at: fields.published_at,
            updated_at: fields.updated_at,
            content: {
              _uid: crypto.randomUUID(),
              component: 'post',
              seo_title: fields.seo_title,
              seo_description: fields.seo_description,
              seo_image: fields.seo_image ?? undefined,
              hero: fields.hero ?? undefined,
              category: fields.category,
              author: fields.author,
              blocks: fields.blocks,
            },
          },
        }

        // @ts-expect-error - Storyblok story creation.
        // We know content matches Post interface but post type shows required (but auto-generated on creation). meh.
        const createStoryPost = await addToStoryblok(payload)
        const data = await createStoryPost?.json()

        if (createStoryPost?.ok) {
          console.log(`✅ Successfully created post: ${fields.name}`)
          totalProcessed++
        }
        else {
          console.log(`⚠️ Problem encountered creating post: ${fields.name}`)
          console.log(createStoryPost)
          console.log(data)
          console.log(payload)
        }
      }
      catch (error: any) {
        console.error(`❌ Error migrating post: ${postTitle}`, error)
      }

      console.log(`⏰ Waiting ${INTERVAL_WAIT_MS}ms before next post to prevent rate limits...\n`)

      await wait(INTERVAL_WAIT_MS)
    }

    // If we got fewer posts than requested, we've reached the end
    if (postLength < perPage) {
      console.log(`✨ Reached the end of posts.`)
      morePosts = false
    }
    else if (totalProcessed < maxPosts) {
      page++
      console.log(`👍🏻 Moving on to page ${page}...\n`)
      await wait(INTERVAL_WAIT_MS)
    }
  }

  console.log('\n🎉 Migration complete!')
}

run()
