import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { postBlocksFolder } from '../../folders';

export const postEmbedBlock = defineBlock({
  name: 'post_embed',
  display_name: 'Embed',
  is_root: false,
  is_nestable: true,
  folder: postBlocksFolder,
  color: 'var(--sb-color-accent-background-pink-lace)',
  description: 'Embed content from YouTube or others.',
  fields: [
    defineField('url', {
      description: 'Not all platforms are supported.',
      display_name: 'URL',
      type: 'text',
    }),
  ],
});
