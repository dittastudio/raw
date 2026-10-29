import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { pageBlocksFolder } from '../../folders';

export const blockHeroBlock = defineBlock({
  name: 'block_hero',
  display_name: 'Hero',
  is_root: false,
  is_nestable: true,
  folder: pageBlocksFolder,
  color: 'var(--sb-color-accent-background-green-cyan)',
  description: 'Displays a large hero, typically used at the top of pages.',
  icon: 'gallery-vertical',
  preview_field: 'headline',
  tags: [
    'Page',
    'Project',
    'Event',
  ],
  fields: [
    defineField('logo', {
      asset_folder_id: 149570834252135,
      description: 'SVG upload recommended.',
      filetypes: [
        'images',
      ],
      type: 'asset',
    }),
    defineField('max_width', {
      decimals: 0,
      description: 'Adjust the logo max-width in pixels to get fine-tuned sizing. Leave blank to use the image\'s natural size.',
      steps: 1,
      type: 'number',
    }),
    defineField('headline', {
      customize_toolbar: true,
      required: false,
      style_options: [
        {
          _uid: '06269a84-e5ec-4bf5-9fb7-d35d7eb20152',
          name: 'Outlined',
          value: 'is-outlined',
        },
      ],
      toolbar: [
        'h1',
        'unset',
      ],
      type: 'richtext',
    }),
    defineField('text', {
      customize_toolbar: true,
      toolbar: [
        'paragraph',
        'unset',
      ],
      type: 'richtext',
    }),
    defineField('media', {
      allow: [
        'image',
        'mux_video_autoplay',
      ],
      maximum: 1,
      type: 'bloks',
    }),
    defineField('theme', {
      datasource: 'theme',
      default_value: 'light',
      display_name: 'Theme',
      exclude_empty_option: false,
      options: [
        {
          _uid: '44cb9d20-f06e-46ca-8c3e-a8b57c996435',
          name: 'White Text',
          value: 'dark',
        },
        {
          _uid: 'c76296ed-4d09-4705-9b98-23c1ddcea87e',
          name: 'Black Text',
          value: 'light',
        },
      ],
      required: false,
      type: 'option',
      use_uuid: true,
    }),
  ],
});
