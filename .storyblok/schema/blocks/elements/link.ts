import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { elementsFolder } from '../../folders';

export const linkBlock = defineBlock({
  name: 'link',
  is_root: false,
  is_nestable: true,
  folder: elementsFolder,
  description: 'Creates a link to anywhere',
  fields: [
    defineField('title', {
      required: true,
      type: 'text',
    }),
    defineField('link', {
      allow: [
        'page',
      ],
      allow_target_blank: true,
      email_link_type: true,
      required: true,
      restrict_content_types: true,
      type: 'multilink',
    }),
  ],
});
