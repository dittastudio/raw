import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { pageBlocksFolder } from '../../folders';

export const blockImpactStatementBlock = defineBlock({
  name: 'block_impact_statement',
  display_name: 'Impact Statement',
  is_root: false,
  is_nestable: true,
  folder: pageBlocksFolder,
  color: 'var(--sb-color-accent-background-green-cyan)',
  icon: 'layout-list',
  tags: [
    'Page',
    'Project',
    'Event',
  ],
  fields: [
    defineField('items', {
      allow: [
        'title_copy',
      ],
      display_name: 'Items',
      minimum: 1,
      required: true,
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
