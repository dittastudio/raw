import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { postBlocksFolder } from '../../folders';

export const postImageBlock = defineBlock({
  name: 'post_image',
  display_name: 'Image',
  is_root: false,
  is_nestable: true,
  folder: postBlocksFolder,
  color: 'var(--sb-color-accent-background-pink-lace)',
  description: 'Displays a full-width image.',
  preview_field: 'image',
  tags: [
    'Post',
  ],
  fields: [
    defineField('image', {
      filetypes: [
        'images',
      ],
      type: 'asset',
    }),
  ],
});
