import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { postBlocksFolder } from '../../folders';

export const postTextBlock = defineBlock({
  name: 'post_text',
  display_name: 'Text',
  is_root: false,
  is_nestable: true,
  folder: postBlocksFolder,
  color: 'var(--sb-color-accent-background-pink-lace)',
  description: 'Displays text content.',
  tags: [
    'Post',
  ],
  fields: [
    defineField('text', {
      allow_target_blank: true,
      customize_toolbar: true,
      toolbar: [
        'bold',
        'list',
        'italic',
        'link',
        'olist',
        'paragraph',
      ],
      type: 'richtext',
    }),
  ],
});
