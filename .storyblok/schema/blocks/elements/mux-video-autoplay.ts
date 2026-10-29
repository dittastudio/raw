import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { elementsFolder } from '../../folders';

export const muxVideoAutoplayBlock = defineBlock({
  name: 'mux_video_autoplay',
  is_root: false,
  is_nestable: true,
  folder: elementsFolder,
  description: 'Creates a Mux video autoplay.',
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
  ],
});
