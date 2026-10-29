import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { elementsFolder } from '../../folders';

export const listItemBlock = defineBlock({
  name: 'list_item',
  is_root: false,
  is_nestable: true,
  folder: elementsFolder,
  fields: [
    defineField('title', {
      type: 'text',
    }),
    defineField('copy', {
      type: 'textarea',
    }),
    defineField('arrow_icon', {
      type: 'boolean',
    }),
  ],
});
