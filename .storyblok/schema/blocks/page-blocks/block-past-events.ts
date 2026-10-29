import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { pageBlocksFolder } from '../../folders';

export const blockPastEventsBlock = defineBlock({
  name: 'block_past_events',
  display_name: 'Past Events',
  is_root: false,
  is_nestable: true,
  folder: pageBlocksFolder,
  color: 'var(--sb-color-accent-background-green-cyan)',
  description: 'Displays some recent past events.',
  icon: 'share-2',
  tags: [
    'Page',
    'Event',
  ],
  fields: [
    defineField('cta_title', {
      type: 'text',
    }),
    defineField('cta', {
      allow_custom_attributes: false,
      allow_target_blank: true,
      email_link_type: true,
      show_anchor: false,
      type: 'multilink',
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
