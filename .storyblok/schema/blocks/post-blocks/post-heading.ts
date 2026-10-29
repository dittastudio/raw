import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { postBlocksFolder } from '../../folders';

export const postHeadingBlock = defineBlock({
  name: 'post_heading',
  display_name: 'Heading',
  is_root: false,
  is_nestable: true,
  folder: postBlocksFolder,
  color: 'var(--sb-color-accent-background-pink-lace)',
  description: 'Displays a text heading.',
  tags: [
    'Post',
  ],
  fields: [
    defineField('heading', {
      type: 'text',
    }),
  ],
});
