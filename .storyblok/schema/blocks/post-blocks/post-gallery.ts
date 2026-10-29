import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { postBlocksFolder } from '../../folders';

export const postGalleryBlock = defineBlock({
  name: 'post_gallery',
  display_name: 'Gallery',
  is_root: false,
  is_nestable: true,
  folder: postBlocksFolder,
  color: 'var(--sb-color-accent-background-pink-lace)',
  description: 'Displays a gallery of images in a grid.',
  tags: [
    'Post',
  ],
  fields: [
    defineField('items', {
      filetypes: [
        'images',
      ],
      type: 'multiasset',
    }),
  ],
});
