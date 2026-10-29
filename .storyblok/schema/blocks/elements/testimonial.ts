import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { elementsFolder } from '../../folders';

export const testimonialBlock = defineBlock({
  name: 'testimonial',
  display_name: 'Testimonial',
  is_root: false,
  is_nestable: true,
  folder: elementsFolder,
  fields: [
    defineField('quote', {
      display_name: 'Quote',
      type: 'textarea',
    }),
    defineField('name', {
      display_name: 'Name',
      type: 'text',
    }),
    defineField('desc', {
      display_name: 'Description',
      type: 'text',
    }),
  ],
});
