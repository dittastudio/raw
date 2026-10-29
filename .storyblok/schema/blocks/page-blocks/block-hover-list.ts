import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { pageBlocksFolder } from '../../folders';

export const blockHoverListBlock = defineBlock({
  name: 'block_hover_list',
  display_name: 'Hover List',
  is_root: false,
  is_nestable: true,
  folder: pageBlocksFolder,
  color: 'var(--sb-color-accent-background-green-cyan)',
  icon: 'between-horizontal-start',
  tags: [
    'Page',
    'Event',
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
        'h3',
        'unset',
      ],
      type: 'richtext',
    }),
    defineField('copy', {
      customize_toolbar: true,
      toolbar: [
        'unset',
        'paragraph',
      ],
      type: 'richtext',
    }),
    defineField('cta_title', {
      type: 'text',
    }),
    defineField('cta', {
      allow_target_blank: true,
      email_link_type: true,
      type: 'multilink',
    }),
    defineField('items', {
      allow: [
        'list_item',
      ],
      type: 'bloks',
    }),
    defineField('media', {
      allow: [
        'image',
        'mux_video_autoplay',
      ],
      maximum: 1,
      type: 'bloks',
    }),
    defineField('theme', {
      datasource: 'theme',
      default_value: 'light',
      source: 'internal',
      type: 'option',
      use_uuid: true,
    }),
    defineField('accent', {
      datasource: 'theme',
      default_value: 'blue',
      source: 'internal',
      type: 'option',
      use_uuid: true,
    }),
  ],
});
