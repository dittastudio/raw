import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { pageBlocksFolder } from '../../folders';

export const blockTestimonialsBlock = defineBlock({
  name: 'block_testimonials',
  display_name: 'Testimonials',
  is_root: false,
  is_nestable: true,
  folder: pageBlocksFolder,
  color: 'var(--sb-color-accent-background-green-cyan)',
  icon: 'align-center',
  tags: [
    'Page',
    'Project',
    'Event',
  ],
  fields: [
    defineField('autoplay_delay', {
      decimals: 1,
      default_value: '3',
      max_value: 10,
      min_value: 1,
      steps: 0.5,
      type: 'number',
    }),
    defineField('items', {
      allow: [
        'testimonial',
      ],
      display_name: 'Items',
      minimum: 1,
      type: 'bloks',
    }),
    defineField('media', {
      allow: [
        'image',
        'mux_video_autoplay',
      ],
      type: 'bloks',
    }),
    defineField('theme', {
      datasource: 'theme',
      default_value: 'light',
      exclude_empty_option: true,
      source: 'internal',
      type: 'option',
      use_uuid: true,
    }),
  ],
});
