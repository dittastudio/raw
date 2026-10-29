import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { elementsFolder } from '../../folders';

export const infoItemBlock = defineBlock({
  name: 'info_item',
  display_name: 'Info Item',
  is_root: false,
  is_nestable: true,
  folder: elementsFolder,
  fields: [
    defineField('title', {
      type: 'text',
    }),
    defineField('column_one', {
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
    defineField('column_two', {
      allow_target_blank: true,
      customize_toolbar: true,
      toolbar: [
        'bold',
        'unset',
        'italic',
        'link',
        'paragraph',
      ],
      type: 'richtext',
    }),
    defineField('media', {
      allow: [
        'image',
        'mux_video_autoplay',
        'mux_video_player',
      ],
      maximum: 1,
      type: 'bloks',
    }),
  ],
});
