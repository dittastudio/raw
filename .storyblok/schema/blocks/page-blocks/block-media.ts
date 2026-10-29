import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { pageBlocksFolder } from '../../folders';

export const blockMediaBlock = defineBlock({
  name: 'block_media',
  display_name: 'Media',
  is_root: false,
  is_nestable: true,
  folder: pageBlocksFolder,
  color: 'var(--sb-color-accent-background-green-cyan)',
  description: 'Displays an image or Mux video.',
  icon: 'image',
  tags: [
    'Page',
    'Project',
    'Event',
  ],
  fields: [
    defineField('title', {
      type: 'text',
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
    defineField('placement', {
      default_value: 'inset',
      exclude_empty_option: true,
      options: [
        {
          _uid: '224a5208-74e2-46b8-86ce-9ba67ee0afde',
          name: 'Inset',
          value: 'inset',
        },
        {
          _uid: '80f77401-0a4b-4268-a90e-88451d064943',
          name: 'Wide',
          value: 'wide',
        },
        {
          _uid: '45aaa96c-cfa9-443e-8ceb-a19498ff65fb',
          name: 'Full',
          value: 'full',
        },
      ],
      required: true,
      type: 'option',
      use_uuid: true,
    }),
    defineField('accent', {
      datasource: 'theme',
      source: 'internal',
      type: 'option',
      use_uuid: true,
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
