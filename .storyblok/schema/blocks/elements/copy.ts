import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { elementsFolder } from '../../folders';

export const copyBlock = defineBlock({
  name: 'copy',
  display_name: 'Copy',
  is_root: false,
  is_nestable: true,
  folder: elementsFolder,
  fields: [
    defineField('copy', {
      allow_target_blank: true,
      customize_toolbar: true,
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
