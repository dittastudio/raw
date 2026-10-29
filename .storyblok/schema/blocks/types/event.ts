import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { typesFolder } from '../../folders';

export const eventBlock = defineBlock({
  name: 'event',
  display_name: 'Event',
  is_root: true,
  is_nestable: false,
  folder: typesFolder,
  fields: [
    defineField('event_datetime', {
      display_name: 'Event Date/Time',
      required: true,
      type: 'datetime',
    }),
    defineField('preview_image', {
      filetypes: [
        'images',
      ],
      required: true,
      type: 'asset',
    }),
    defineField('preview_text', {
      type: 'textarea',
    }),
    defineField('jaa_partnership', {
      description: 'Check to display the JAA Partnership.',
      display_name: 'JAA Partnership',
      inline_label: true,
      type: 'boolean',
    }),
    defineField('blocks', {
      allow: [
        {
          tag: 'Event',
        },
      ],
      type: 'bloks',
    }),
    defineField('tab-3b61b796-8ea0-4311-8609-140de487b153', {
      display_name: 'Content',
      keys: [
        'blocks',
      ],
      name: 'tab-3b61b796-8ea0-4311-8609-140de487b153',
      type: 'tab',
    }),
    defineField('tab-a012b6af-5d9a-4985-832a-84f119d934c0', {
      display_name: 'SEO',
      keys: [
        'seo_title',
        'seo_description',
        'seo_image',
      ],
      name: 'tab-a012b6af-5d9a-4985-832a-84f119d934c0',
      type: 'tab',
    }),
    defineField('seo_title', {
      display_name: 'Title',
      required: true,
      type: 'text',
    }),
    defineField('seo_description', {
      display_name: 'Description',
      required: true,
      type: 'text',
    }),
    defineField('seo_image', {
      display_name: 'Image',
      filetypes: [
        'images',
      ],
      required: true,
      type: 'asset',
    }),
  ],
});
