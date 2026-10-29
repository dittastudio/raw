import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { pageBlocksFolder } from '../../folders';

export const blockProjectsSelectedBlock = defineBlock({
  name: 'block_projects_selected',
  display_name: 'Projects Selected',
  is_root: false,
  is_nestable: true,
  folder: pageBlocksFolder,
  color: 'var(--sb-color-accent-background-green-cyan)',
  description: 'Select projects to showcase.',
  icon: 'layout-panel-left',
  tags: [
    'Page',
    'Project',
  ],
  fields: [
    defineField('title', {
      type: 'text',
    }),
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
