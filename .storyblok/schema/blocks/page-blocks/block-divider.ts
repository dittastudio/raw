import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { pageBlocksFolder } from '../../folders';

export const blockDividerBlock = defineBlock({
  name: 'block_divider',
  display_name: 'Divider Line',
  is_root: false,
  is_nestable: true,
  folder: pageBlocksFolder,
  color: 'var(--sb-color-accent-background-green-cyan)',
  icon: 'align-center',
  tags: [
    'Page',
    'Project',
    'Event',
  ],
  fields: [
    defineField('placement', {
      default_value: 'wide',
      options: [
        {
          _uid: '60ffb865-1e26-477b-9cec-24bbb21f3cb6',
          name: 'Inset',
          value: 'inset',
        },
        {
          _uid: '1441a85b-3ae6-4207-a372-2b65304b5659',
          name: 'Wide',
          value: 'wide',
        },
        {
          _uid: '994ccbf6-7242-43ee-84d8-8ae2ae19311f',
          name: 'Full',
          value: 'full',
        },
      ],
      required: true,
      type: 'option',
      use_uuid: true,
    }),
    defineField('spacing_top', {
      // Leftover from when this was a number field; kept as-is so a push doesn't change the editor default.
      default_value: '150' as unknown as boolean,
      type: 'boolean',
    }),
    defineField('spacing_bottom', {
      // Leftover from when this was a number field; kept as-is so a push doesn't change the editor default.
      default_value: '150' as unknown as boolean,
      type: 'boolean',
    }),
    defineField('theme', {
      default_value: 'light',
      options: [
        {
          _uid: 'ba9532a0-951a-4ab6-8250-ed820138b00a',
          name: 'White Line',
          value: 'dark',
        },
        {
          _uid: 'b09ce60f-47c7-4c33-bee1-ce36665f11cc',
          name: 'Black Line',
          value: 'light',
        },
      ],
      type: 'option',
      use_uuid: true,
    }),
  ],
});
