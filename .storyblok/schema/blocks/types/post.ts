import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { typesFolder } from '../../folders';

export const postBlock = defineBlock({
  name: 'post',
  is_root: true,
  is_nestable: false,
  folder: typesFolder,
  fields: [
    defineField('hero', {
      filetypes: [
        'images',
      ],
      type: 'asset',
    }),
    defineField('author', {
      entry_appearance: 'card',
      filter_content_type: [
        'person',
      ],
      folder_slug: 'people/',
      required: false,
      source: 'internal_stories',
      type: 'option',
      use_uuid: true,
    }),
    defineField('preview_image', {
      description: 'Image that is shown when featured around the site.\n',
      filetypes: [
        'images',
      ],
      type: 'asset',
    }),
    defineField('preview_text', {
      description: 'Text that is shown when featured around the site.',
      type: 'text',
    }),
    defineField('category', {
      datasource: 'post-category',
      exclude_empty_option: true,
      required: false,
      source: 'internal',
      type: 'option',
      use_uuid: true,
    }),
    defineField('event_datetime', {
      description: '⚠️ If you\'re creating a new Event, you should create this as an Event content type in the Events folder and not as a Post.\n\nThis is used only for legacy events migrated from the old site.',
      display_name: 'Event Date/Time',
      type: 'datetime',
    }),
    defineField('tab-87c5d3eb-2390-40c7-afd8-e24b263999e5', {
      display_name: 'Content',
      keys: [
        'blocks',
        'hero',
      ],
      type: 'tab',
    }),
    defineField('tab-d1be1461-8b44-4f55-8950-fba96982c4f9', {
      display_name: 'SEO',
      keys: [
        'seo_title',
        'seo_description',
        'seo_image',
      ],
      name: 'tab-d1be1461-8b44-4f55-8950-fba96982c4f9',
      type: 'tab',
    }),
    defineField('seo_title', {
      display_name: 'Title',
      required: false,
      type: 'text',
    }),
    defineField('seo_description', {
      display_name: 'Description',
      required: false,
      type: 'text',
    }),
    defineField('seo_image', {
      display_name: 'Image',
      filetypes: [
        'images',
      ],
      required: false,
      type: 'asset',
    }),
    defineField('blocks', {
      allow: [
        'post_gallery',
        'post_heading',
        'post_html',
        'post_image',
        'post_quote',
        'post_text',
        'post_embed',
        'post_wistia',
        'mux_video_player',
        'mux_video_autoplay',
      ],
      type: 'bloks',
    }),
    defineField('jaa_partnership', {
      description: 'Check to display the JAA Partnership.',
      inline_label: true,
      type: 'boolean',
    }),
  ],
});
