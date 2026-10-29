import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { elementsFolder } from '../../folders';

export const muxVideoPlayerBlock = defineBlock({
  name: 'mux_video_player',
  display_name: 'Mux Video Player',
  is_root: false,
  is_nestable: true,
  folder: elementsFolder,
  color: 'var(--sb-color-accent-background-gainsboro)',
  description: 'Creates a Mux video player.',
  fields: [
    defineField('poster', {
      description: 'Image that is shown as the poster for the video before it\'s played.',
      filetypes: [
        'images',
      ],
      type: 'asset',
    }),
    defineField('video', {
      field_type: 'storyblok-mux-assets',
      options: [
        {
          _uid: '9c14a9e0-e321-4742-907a-bd57b7a81f84',
          name: 'assetsApiUrl',
          value: 'https://raw-london.netlify.app/api/mux-assets',
        },
      ],
      required: true,
      type: 'custom',
    }),
    defineField('name', {
      description: 'Name the video (for use in GHL)',
      display_name: 'Name',
      required: true,
      type: 'text',
    }),
    defineField('data_capture', {
      default_value: true,
      description: 'Should this video ask for a user\'s data before it can play?',
      inline_label: true,
      type: 'boolean',
    }),
  ],
});
