import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { pageBlocksFolder } from '../../folders';

export const blockTruthsBlock = defineBlock({
  name: 'block_truths',
  display_name: 'Raw Truths',
  is_root: false,
  is_nestable: true,
  folder: pageBlocksFolder,
  color: 'var(--sb-color-accent-background-green-cyan)',
  icon: 'layout-list',
  tags: [
    'Page',
    'Project',
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
        'bold',
        'link',
        'olist',
        'list',
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
      maximum: 4,
      minimum: 4,
      type: 'bloks',
    }),
    defineField('bottom_headline', {
      type: 'text',
    }),
    defineField('bottom_copy', {
      type: 'text',
    }),
    defineField('theme', {
      datasource: 'theme',
      default_value: 'dark',
      exclude_empty_option: true,
      source: 'internal',
      type: 'option',
      use_uuid: true,
    }),
  ],
});
