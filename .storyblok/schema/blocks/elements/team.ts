import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { elementsFolder } from '../../folders';

export const teamBlock = defineBlock({
  name: 'team',
  is_root: false,
  is_nestable: true,
  folder: elementsFolder,
  fields: [
    defineField('title', {
      type: 'text',
    }),
    defineField('people', {
      entry_appearance: 'card',
      filter_content_type: [
        'person',
      ],
      required: true,
      source: 'internal_stories',
      type: 'options',
    }),
  ],
});
