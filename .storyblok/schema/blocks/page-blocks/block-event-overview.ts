import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { pageBlocksFolder } from '../../folders';

export const blockEventOverviewBlock = defineBlock({
  name: 'block_event_overview',
  display_name: 'Event Overview',
  is_root: false,
  is_nestable: true,
  folder: pageBlocksFolder,
  color: 'var(--sb-color-accent-background-green-cyan)',
  description: 'Displays the overview for your event with date.',
  icon: 'wallet',
  tags: [
    'Event',
  ],
  fields: [
    defineField('copy', {
      allow_target_blank: true,
      customize_toolbar: true,
      required: true,
      toolbar: [
        'unset',
        'paragraph',
        'bold',
        'link',
        'olist',
        'list',
        'h2',
        'h1',
        'h3',
        'h4',
        'h5',
        'h6',
      ],
      type: 'richtext',
    }),
    defineField('cta_title', {
      type: 'text',
    }),
    defineField('cta', {
      allow_target_blank: true,
      email_link_type: true,
      type: 'multilink',
    }),
    defineField('theme', {
      datasource: 'theme',
      default_value: 'dark',
      exclude_empty_option: true,
      source: 'internal',
      type: 'option',
      use_uuid: true,
    }),
  ],
});
