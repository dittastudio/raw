import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { postBlocksFolder } from '../../folders';

export const postHtmlBlock = defineBlock({
  name: 'post_html',
  display_name: 'HTML',
  is_root: false,
  is_nestable: true,
  folder: postBlocksFolder,
  color: 'var(--sb-color-accent-background-pink-lace)',
  description: 'Renders custom HTML into the page. Use with extreme caution.',
  tags: [
    'Post',
  ],
  fields: [
    defineField('html', {
      description: '⚠️ Do not paste code in here you don\'t understand. It can be very dangerous. Consult a developer. This field is only here for migration purposes of the old website that used custom HTML blocks for video. Once we have a better solution, this field will be removed.',
      display_name: 'HTML',
      type: 'textarea',
    }),
  ],
});
