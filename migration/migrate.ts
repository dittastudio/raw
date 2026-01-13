import type { Post, PostGallery, PostHeading, PostHtml, PostImage, PostQuote, PostText } from '../.storyblok/types/289672313529140/storyblok-components'
import type { StoryblokAsset } from '../.storyblok/types/storyblok.d.ts'
import { addToStoryblok, convertHtmlToJson, uploadFileToStoryblok, wait } from './utils'

const PARENT = 133603998123034
const AUTHOR = '4e09f764-a3fd-4d59-96a3-1ba3d192dabb' // Hard-coded to Charlotte.
const INTERVAL_WAIT_MS = 300

const getWpPosts = async (): Promise<any> => {
  const response = await fetch('https://raw.london/wp-json/wp/v2/posts?page=1&per_page=10')
  return await response.json()
}

const mapCategories = (categories: number[]): string[] => {
  // The category ids and slugs from WordPress.
  const categoryMap: Record<number, string> = {
    1: 'event-launches',
    10: 'events',
    12: 'insights',
    15: 'inspiration',
    6: 'news',
  }

  return categories.map(id => categoryMap[id] || '')
}

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

      console.log(`🔥 Migrated: ${block.blockName}`)
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

      console.log(`🔥 Migrated: ${block.blockName}`)
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

      console.log(`🔥 Migrated: ${block.blockName}`)
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

      const component: PostImage = {
        _uid: crypto.randomUUID(),
        component: 'post_image',
        image: uploadedImage,
      }

      processed.push(component)

      console.log(`🔥 Migrated: ${block.blockName}`)
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

      console.log(`🔥 Migrated: ${block.blockName}`)
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

      console.log(`🔥 Migrated: ${block.blockName}`)
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
            continue
          }

          items.push(uploadedImage)
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

      console.log(`🔥 Migrated: ${block.blockName}`)
    }
  }

  return processed
}

const run = async () => {
  const posts = await getWpPosts()

  console.log(`🚀 Found ${posts.length} posts to migrate.`)

  for (const post of posts) {
    console.log(`📝 Migrating post: ${post.title.rendered}`)

    try {
      const mainImage = post.yoast_head_json?.og_image?.[0]?.url ? await uploadFileToStoryblok(post.yoast_head_json.og_image[0].url) : null

      const fields = {
        name: post.title.rendered,
        slug: post.slug,
        created_at: new Date(post.date).toISOString(),
        published_at: new Date(post.date).toISOString(),
        updated_at: new Date(post.modified).toISOString(),
        seo_title: post.yoast_head_json?.og_title || post.yoast_head_json?.title || post.title.rendered || '',
        seo_description: post.yoast_head_json?.og_description || post.yoast_head_json?.description || post.title.rendered || '',
        seo_image: mainImage,
        hero: mainImage,
        category: mapCategories(post.categories),
        author: AUTHOR,
        blocks: post.has_blocks && Object.keys(post.block_data).length ? await processBlocks(post.block_data) : [],
      }

      const createStoryPost = await addToStoryblok({
        publish: true,
        // @ts-expect-error - Storyblok story creation.
        // We know content matches Post interface but post type shows required (but auto-generated on creation).
        story: {
          parent_id: PARENT, // Folder id
          is_startpage: false,
          name: fields.name,
          slug: fields.slug,
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
      })

      if (createStoryPost?.ok) {
        console.log('✅ Successfully created post: ', fields.name)
      }
      else {
        console.log('❌ Problem encountered creating post: ', fields.name)
      }
    }
    catch (error: any) {
      console.error('Error: ', error)
    }

    console.log(`⏰ Waiting ${INTERVAL_WAIT_MS}ms before next post to prevent rate limits...\n`)

    await wait(INTERVAL_WAIT_MS)
  }
}

run()
