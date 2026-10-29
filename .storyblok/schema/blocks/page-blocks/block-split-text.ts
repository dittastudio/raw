import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { pageBlocksFolder } from '../../folders';

export const blockSplitTextBlock = defineBlock({
  name: 'block_split_text',
  display_name: 'Split Text',
  is_root: false,
  is_nestable: true,
  folder: pageBlocksFolder,
  color: 'var(--sb-color-accent-background-green-cyan)',
  icon: 'layout-list',
  tags: [
    'Page',
    'Event',
  ],
  fields: [
    defineField('items', {
      allow: [
        'copy',
      ],
      display_name: 'Items',
      minimum: 1,
      type: 'bloks',
    }),
    defineField('theme', {
      datasource: 'theme',
      default_value: 'light',
      exclude_empty_option: true,
      source: 'internal',
      type: 'option',
      use_uuid: true,
    }),
  ],
});
