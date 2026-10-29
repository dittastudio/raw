import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { pageBlocksFolder } from '../../folders';

export const blockTeamBlock = defineBlock({
  name: 'block_team',
  display_name: 'Team',
  is_root: false,
  is_nestable: true,
  folder: pageBlocksFolder,
  color: 'var(--sb-color-accent-background-green-cyan)',
  description: 'Display teams of selected people.',
  icon: 'wallet',
  tags: [
    'Page',
  ],
  fields: [
    defineField('teams', {
      allow: [
        'team',
      ],
      display_name: 'Team Group',
      minimum: 1,
      required: true,
      type: 'bloks',
    }),
    defineField('theme', {
      datasource: 'theme',
      default_value: 'dark',
      exclude_empty_option: true,
      source: 'internal',
      type: 'option',
      use_uuid: true,
    }),
    defineField('accent', {
      datasource: 'theme',
      default_value: 'blue',
      exclude_empty_option: true,
      source: 'internal',
      type: 'option',
      use_uuid: true,
    }),
  ],
});
