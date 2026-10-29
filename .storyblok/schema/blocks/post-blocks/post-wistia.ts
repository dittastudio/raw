import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { postBlocksFolder } from '../../folders';

export const postWistiaBlock = defineBlock({
  name: 'post_wistia',
  display_name: 'Wistia Video',
  is_root: false,
  is_nestable: true,
  folder: postBlocksFolder,
  color: 'var(--sb-color-accent-background-pink-lace)',
  description: 'Provide a Wistia video ID to embed into the page.',
  tags: [
    'Post',
  ],
  fields: [
    defineField('id', {
      description: 'Provide the Wistia video ID only.',
      required: true,
      type: 'text',
    }),
  ],
});
