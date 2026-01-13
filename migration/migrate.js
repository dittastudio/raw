import { Wp2Storyblok } from './index.js'

const wp2storyblok = new Wp2Storyblok('https://raw.london/wp-json', {
  token: process.env.NUXT_STORYBLOK_MANAGEMENT_TOKEN,
  space_id: 289825226535458,
  blocks_mapping: [
    {
      name: 'core/paragraph',
      new_block_name: 'richtext',
      schema_mapping: {
        'attrs.content': 'content'
      }
    },
    {
      name: 'core/image',
      new_block_name: 'image',
      schema_mapping: {
        'attrs.url': 'image'
      }
    }
  ],
  content_types: [
    {
      name: 'posts',
      new_content_type: 'post',
      folder: 'latest',
      taxonomies: [
        {
          name: 'categories',
          field: 'categories',
          type: 'value'
        }
      ],
      schema_mapping: {
        title: 'name',
        '_links.wp:featuredmedia.0': 'content.preview_image',
        content: {
          field: 'content.body_items',
          component: 'rich-text',
          component_field: 'content',
          categories: 'content.categories'
        }
      }
    }
  ]
})

wp2storyblok.migrate()