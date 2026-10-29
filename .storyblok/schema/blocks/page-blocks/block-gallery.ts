import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { pageBlocksFolder } from '../../folders';

export const blockGalleryBlock = defineBlock({
  name: 'block_gallery',
  display_name: 'Gallery',
  is_root: false,
  is_nestable: true,
  folder: pageBlocksFolder,
  color: 'var(--sb-color-accent-background-green-cyan)',
  icon: 'image',
  tags: [
    'Page',
    'Project',
    'Event',
  ],
  fields: [
    defineField('title', {
      type: 'text',
    }),
    defineField('items', {
      filetypes: [
        'images',
      ],
      type: 'multiasset',
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
