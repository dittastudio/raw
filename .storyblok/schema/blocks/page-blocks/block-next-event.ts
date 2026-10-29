import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { pageBlocksFolder } from '../../folders';

export const blockNextEventBlock = defineBlock({
  name: 'block_next_event',
  display_name: 'Next Event',
  is_root: false,
  is_nestable: true,
  folder: pageBlocksFolder,
  color: 'var(--sb-color-accent-background-green-cyan)',
  description: 'Displays the next available event automatically.',
  icon: 'share-2',
  tags: [
    'Page',
  ],
  fields: [
    defineField('theme', {
      datasource: 'theme',
      exclude_empty_option: true,
      source: 'internal',
      type: 'option',
      use_uuid: true,
    }),
  ],
});
