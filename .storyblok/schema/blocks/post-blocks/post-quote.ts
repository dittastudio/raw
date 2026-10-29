import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { postBlocksFolder } from '../../folders';

export const postQuoteBlock = defineBlock({
  name: 'post_quote',
  display_name: 'Quote',
  is_root: false,
  is_nestable: true,
  folder: postBlocksFolder,
  color: 'var(--sb-color-accent-background-pink-lace)',
  description: 'Displays a quote with citation.',
  tags: [
    'Post',
  ],
  fields: [
    defineField('quote', {
      type: 'richtext',
    }),
    defineField('citation', {
      type: 'text',
    }),
  ],
});
