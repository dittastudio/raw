import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { elementsFolder } from '../../folders';

export const imageBlock = defineBlock({
  name: 'image',
  is_root: false,
  is_nestable: true,
  folder: elementsFolder,
  fields: [
    defineField('image', {
      type: 'asset',
    }),
  ],
});
