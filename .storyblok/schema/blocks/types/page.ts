import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { typesFolder } from '../../folders';

export const pageBlock = defineBlock({
  name: 'page',
  is_root: true,
  is_nestable: false,
  folder: typesFolder,
  fields: [
    defineField('blocks', {
      allow: [
        {
          tag: 'Page',
        },
      ],
      type: 'bloks',
    }),
    defineField('tab-a012b6af-5d9a-4985-832a-84f119d934c0', {
      display_name: 'SEO',
      keys: [
        'seo_title',
        'seo_description',
        'seo_image',
      ],
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
