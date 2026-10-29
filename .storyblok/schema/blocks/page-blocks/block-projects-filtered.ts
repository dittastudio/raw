import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { pageBlocksFolder } from '../../folders';

export const blockProjectsFilteredBlock = defineBlock({
  name: 'block_projects_filtered',
  display_name: 'Projects Filtered',
  is_root: false,
  is_nestable: true,
  folder: pageBlocksFolder,
  color: 'var(--sb-color-accent-background-green-cyan)',
  description: 'Select projects to showcase with filtering.',
  icon: 'layout-panel-left',
  tags: [
    'Page',
  ],
  fields: [
    defineField('projects', {
      allow_advanced_search: true,
      entry_appearance: 'card',
      filter_content_type: [
        'project',
      ],
      is_reference_type: true,
      required: true,
      source: 'internal_stories',
      type: 'options',
    }),
    defineField('theme', {
      datasource: 'theme',
      exclude_empty_option: true,
      source: 'internal',
      type: 'option',
      use_uuid: true,
    }),
  ],
});
