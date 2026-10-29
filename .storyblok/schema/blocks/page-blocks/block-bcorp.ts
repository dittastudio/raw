import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { pageBlocksFolder } from '../../folders';

export const blockBcorpBlock = defineBlock({
  name: 'block_bcorp',
  display_name: 'B Corp Graph',
  is_root: false,
  is_nestable: true,
  folder: pageBlocksFolder,
  color: 'var(--sb-color-accent-background-green-cyan)',
  icon: 'wallet',
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
    defineField('theme', {
      datasource: 'theme',
      default_value: 'dark',
      exclude_empty_option: true,
      source: 'internal',
      type: 'option',
      use_uuid: true,
    }),
    defineField('overall_score', {
      decimals: 1,
      max_value: 250,
      min_value: 0,
      steps: 0.1,
      type: 'number',
    }),
    defineField('qualify_score', {
      decimals: 1,
      max_value: 250,
      min_value: 0,
      steps: 0.1,
      type: 'number',
    }),
    defineField('median_score', {
      decimals: 1,
      max_value: 250,
      min_value: 0,
      steps: 0.1,
      type: 'number',
    }),
    defineField('max_score', {
      default_value: '150',
      max_value: 250,
      min_value: 0,
      steps: 1,
      type: 'number',
    }),
  ],
});
