import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { elementsFolder } from '../../folders';

export const titleCopyBlock = defineBlock({
  name: 'title_copy',
  display_name: 'Title & Copy',
  is_root: false,
  is_nestable: true,
  folder: elementsFolder,
  fields: [
    defineField('title', {
      customize_toolbar: true,
      required: true,
      style_options: [
        {
          _uid: '9a901605-db42-4180-bc82-925a40ef0ec5',
          name: 'Outlined',
          value: 'is-outlined',
        },
      ],
      toolbar: [
        'unset',
        'h3',
      ],
      type: 'richtext',
    }),
    defineField('copy', {
      allow_target_blank: true,
      customize_toolbar: true,
      required: true,
      toolbar: [
        'unset',
        'paragraph',
        'link',
        'italic',
        'bold',
      ],
      type: 'richtext',
    }),
  ],
});
