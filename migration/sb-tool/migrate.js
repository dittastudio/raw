import { Wp2Storyblok } from './index.js'

// https://raw.london/raw-london-agency-brand-2024/

const migration = new Wp2Storyblok('https://raw.london/wp-json', {
  token: process.env.NUXT_STORYBLOK_MANAGEMENT_TOKEN,
  space_id: 289825226535458,
  blocks_mapping: [
    {
      name: 'core/paragraph',
      new_block_name: 'post_text',
      schema_mapping: {
        'attrs.content': 'content.text',
      },
    },
    {
      name: 'core/heading',
      new_block_name: 'post_heading',
      schema_mapping: {
        'attrs.content': 'content.heading',
      },
    },
    {
      name: 'core/image',
      new_block_name: 'post_image',
      schema_mapping: {
        'attrs.url': 'content.image',
      },
    },
    {
      name: 'core/list',
      new_block_name: 'post_list',
      schema_mapping: {
        'attrs.values': 'content.items',
      },
    },
    {
      name: 'core/quote',
      new_block_name: 'post_quote',
      schema_mapping: {
        'attrs.citation': 'content.citation',
        'attrs.value': 'content.items',
      },
    },
    {
      name: 'core/gallery',
      new_block_name: 'post_gallery',
      schema_mapping: {
        innerBlocks: 'content.items',
      },
    },
    {
      name: 'core/html',
      new_block_name: 'post_html',
      schema_mapping: {
        'attrs.content': 'content.html',
      },
    },
  ],
  content_types: [
    {
      name: 'posts',
      new_content_type: 'post',
      folder: 'latest',
      // taxonomies: [
      //   {
      //     name: 'categories',
      //     field: 'content.category',
      //     type: 'value',
      //   },
      // ],
      schema_mapping: {
        'title.rendered': 'name',
        'slug': 'slug',
        'date': 'created_at',
        '_links.wp:featuredmedia.0': 'content.hero',
        'author': 'content.author', // 950b24ae-ec1f-49ff-82c2-530aeec66283 Ryan's person type story ID
        '_yoast_head_json.title': 'content.seo_title',
        '_yoast_head_json.description': 'content.seo_description',
        '_yoast_head_json.og_image.0.url': 'content.seo_image',
        'blocks': 'content.blocks',
        // 'content': {
        //   field: 'content.body_items',
        //   component: 'rich-text',
        //   component_field: 'content',
        //   categories: 'content.categories',
        // },
      },
    },
  ],
})

migration.migrate()
