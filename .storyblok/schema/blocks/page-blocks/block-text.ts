import {
  defineBlock,
  defineField,
} from '@storyblok/schema';
import type { Field } from '@storyblok/schema';

import { pageBlocksFolder } from '../../folders';

type RichtextToolbar = NonNullable<Extract<Field, { type: 'richtext' }>['toolbar']>;

export const blockTextBlock = defineBlock({
  name: 'block_text',
  display_name: 'Text',
  is_root: false,
  is_nestable: true,
  folder: pageBlocksFolder,
  color: 'var(--sb-color-accent-background-green-cyan)',
  description: 'Generic Text block used for pages like privacy policy etc',
  icon: 'align-left',
  tags: [
    'Page',
    'Event',
  ],
  fields: [
    defineField('copy', {
      allow_target_blank: true,
      customize_toolbar: true,
      rtl: false,
      style_options: [
        {
          _uid: '7f11f21d-f221-45cb-b287-8a1eb9904303',
          name: 'Outlined',
          value: 'is-outlined',
        },
      ],
      // Table tools aren't in the @storyblok/schema toolbar union yet (0.5.0); widen so the field still infers.
      toolbar: [
        'bold',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'unset',
        'hrule',
        'italic',
        'link',
        'olist',
        'paragraph',
        'underline',
        'list',
        'align-left',
        'align-center',
        'align-right',
        'add-table',
        'insert-column-before',
        'insert-column-after',
        'insert-row-above',
        'insert-row-below',
        'toggle-header-column',
        'toggle-header-row',
        'toggle-header-cell',
        'delete-column',
        'delete-row',
        'merge-cells',
        'split-cells',
        'delete-table',
        'cell-color',
      ] as RichtextToolbar,
      type: 'richtext',
    }),
  ],
});
