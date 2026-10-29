import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { elementsFolder } from '../../folders';

export const slideBlock = defineBlock({
  name: 'slide',
  display_name: 'Slide',
  is_root: false,
  is_nestable: true,
  folder: elementsFolder,
  description: 'Slide',
  fields: [
    defineField('project', {
      allow_advanced_search: true,
      entry_appearance: 'card',
      filter_content_type: [
        'project',
      ],
      is_reference_type: true,
      max_options: '1',
      min_options: '1',
      source: 'internal_stories',
      type: 'options',
    }),
    defineField('logo', {
      type: 'asset',
    }),
    defineField('media', {
      allow: [
        'image',
        'mux_video_autoplay',
      ],
      maximum: 1,
      type: 'bloks',
    }),
    defineField('copy', {
      customize_toolbar: true,
      style_options: [
        {
          _uid: 'fb715ca3-c9a0-4fcd-8470-022c9bf238a6',
          name: 'Outlined',
          value: 'is-outlined',
        },
      ],
      toolbar: [
        'h3',
        'paragraph',
        'unset',
      ],
      type: 'richtext',
    }),
  ],
});
