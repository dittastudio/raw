import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { pageBlocksFolder } from '../../folders';

export const blockContactBlock = defineBlock({
  name: 'block_contact',
  display_name: 'Contact',
  is_root: false,
  is_nestable: true,
  folder: pageBlocksFolder,
  color: 'var(--sb-color-accent-background-green-cyan)',
  icon: 'sticker',
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
          _uid: '219b8a5e-51d5-40c6-acb4-f2290235de13',
          name: 'Outlined',
          value: 'is-outlined',
        },
      ],
      toolbar: [
        'unset',
        'h3',
      ],
      type: 'richtext',
    }),
    defineField('info', {
      allow: [
        'info_item',
      ],
      type: 'bloks',
    }),
    defineField('theme', {
      datasource: 'theme',
      default_value: 'light',
      exclude_empty_option: true,
      source: 'internal',
      type: 'option',
      use_uuid: true,
    }),
  ],
});
