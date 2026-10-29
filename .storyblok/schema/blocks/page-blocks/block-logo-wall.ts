import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { pageBlocksFolder } from '../../folders';

export const blockLogoWallBlock = defineBlock({
  name: 'block_logo_wall',
  display_name: 'Logo Wall',
  is_root: false,
  is_nestable: true,
  folder: pageBlocksFolder,
  color: 'var(--sb-color-accent-background-green-cyan)',
  icon: 'sticker',
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
          _uid: '219b8a5e-51d5-40c6-acb4-f2290235de13',
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
    defineField('items', {
      allow: [
        'logo',
      ],
      minimum: 1,
      required: true,
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
