import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { pageBlocksFolder } from '../../folders';

export const blockPostsBlock = defineBlock({
  name: 'block_posts',
  display_name: 'Posts',
  is_root: false,
  is_nestable: true,
  folder: pageBlocksFolder,
  color: 'var(--sb-color-accent-background-green-cyan)',
  description: 'Gets latest posts with filtering.',
  icon: 'gallery-horizontal-end',
  tags: [
    'Page',
  ],
  fields: [
    defineField('theme', {
      datasource: 'theme',
      exclude_empty_option: true,
      required: false,
      source: 'internal',
      type: 'option',
      use_uuid: true,
    }),
  ],
});
