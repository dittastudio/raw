import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { elementsFolder } from '../../folders';

export const logoBlock = defineBlock({
  name: 'logo',
  is_root: false,
  is_nestable: true,
  folder: elementsFolder,
  description: 'Creates a link to anywhere',
  fields: [
    defineField('image', {
      filetypes: [
        'images',
      ],
      required: true,
      type: 'asset',
    }),
    defineField('title', {
      display_name: '',
      required: false,
      type: 'text',
    }),
    defineField('link', {
      allow: [
        'page',
      ],
      allow_target_blank: true,
      email_link_type: true,
      required: false,
      restrict_content_types: true,
      type: 'multilink',
    }),
  ],
});
