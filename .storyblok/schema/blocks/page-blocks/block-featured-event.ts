import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { pageBlocksFolder } from '../../folders';

export const blockFeaturedEventBlock = defineBlock({
  name: 'block_featured_event',
  display_name: 'Featured Event',
  is_root: false,
  is_nestable: true,
  folder: pageBlocksFolder,
  color: 'var(--sb-color-accent-background-green-cyan)',
  description: 'Displays a standalone event to feature',
  icon: 'message-square',
  tags: [
    'Page',
  ],
  fields: [
    defineField('title', {
      type: 'text',
    }),
    defineField('headline', {
      customize_toolbar: true,
      style_options: [
        {
          _uid: '32b97c2c-2de3-40bd-ad77-6d92f718c63c',
          name: 'Outlined',
          value: 'is-outlined',
        },
      ],
      toolbar: [
        'unset',
        'paragraph',
      ],
      type: 'richtext',
    }),
    defineField('event', {
      allow_advanced_search: true,
      entry_appearance: 'card',
      filter_content_type: [
        'event',
      ],
      required: true,
      source: 'internal_stories',
      type: 'option',
      use_uuid: true,
    }),
    defineField('cta_title', {
      type: 'text',
    }),
    defineField('cta', {
      allow_target_blank: true,
      email_link_type: true,
      type: 'multilink',
    }),
    defineField('theme', {
      datasource: 'theme',
      default_value: 'light',
      source: 'internal',
      type: 'option',
      use_uuid: true,
    }),
  ],
});
