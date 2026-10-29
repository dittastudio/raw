import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { pageBlocksFolder } from '../../folders';

export const blockProjectCarouselBlock = defineBlock({
  name: 'block_project_carousel',
  display_name: 'Project Carousel',
  is_root: false,
  is_nestable: true,
  folder: pageBlocksFolder,
  color: 'var(--sb-color-accent-background-green-cyan)',
  icon: 'image',
  tags: [
    'Page',
    'Event',
  ],
  fields: [
    defineField('title', {
      type: 'text',
    }),
    defineField('headline', {
      customize_toolbar: true,
      style_options: [
        {
          _uid: 'ba0ddafd-eee7-4985-8c9d-6ba9d3bd3383',
          name: 'Outlined',
          value: 'is-outlined',
        },
      ],
      toolbar: [
        'unset',
        'h3',
      ],
      type: 'richtext',
    }),
    defineField('copy', {
      customize_toolbar: true,
      toolbar: [
        'unset',
        'paragraph',
      ],
      type: 'richtext',
    }),
    defineField('cta_title', {
      type: 'text',
    }),
    defineField('cta', {
      allow_target_blank: true,
      email_link_type: true,
      show_anchor: false,
      type: 'multilink',
    }),
    defineField('autoplay_delay', {
      decimals: 1,
      default_value: '3',
      description: 'Seconds between each slide',
      max_value: 10,
      min_value: 1,
      steps: 0.5,
      type: 'number',
    }),
    defineField('projects', {
      allow_advanced_search: true,
      display_name: 'Projects',
      entry_appearance: 'card',
      filter_content_type: [
        'project',
      ],
      is_reference_type: true,
      max_options: '10',
      min_options: '1',
      required: true,
      source: 'internal_stories',
      type: 'options',
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
