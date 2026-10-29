import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { typesFolder } from '../../folders';

export const personBlock = defineBlock({
  name: 'person',
  is_root: true,
  is_nestable: false,
  folder: typesFolder,
  preview_field: 'image',
  fields: [
    defineField('image', {
      asset_folder_id: 133290567152459,
      filetypes: [
        'images',
      ],
      required: true,
      type: 'asset',
    }),
    defineField('image_selected', {
      description: 'Optional secondary image to show if the person is selected.',
      display_name: 'Image Selected',
      filetypes: [
        'images',
      ],
      type: 'asset',
    }),
    defineField('name', {
      required: true,
      type: 'text',
    }),
    defineField('biography', {
      type: 'textarea',
    }),
    defineField('position', {
      required: true,
      type: 'text',
    }),
    defineField('email', {
      type: 'text',
    }),
    defineField('linkedin', {
      display_name: 'LinkedIn',
      regex: '',
      type: 'text',
    }),
  ],
});
