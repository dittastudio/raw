import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { typesFolder } from '../../folders';

export const settingsBlock = defineBlock({
  name: 'settings',
  is_root: true,
  is_nestable: false,
  folder: typesFolder,
  description: 'Settings for the global content of the website',
  fields: [
    defineField('navigation', {
      allow: [
        'link',
      ],
      type: 'bloks',
    }),
    defineField('statement', {
      customize_toolbar: true,
      style_options: [
        {
          _uid: 'e1875580-fd6e-4728-a22e-e0c371d34155',
          name: 'Outlined',
          value: 'is-outlined',
        },
      ],
      toolbar: [
        'h5',
        'unset',
      ],
      type: 'richtext',
    }),
    defineField('statement_media', {
      allow: [
        'image',
        'mux_video_autoplay',
      ],
      maximum: 1,
      type: 'bloks',
    }),
    defineField('cta_title', {
      display_name: 'CTA Title',
      type: 'text',
    }),
    defineField('cta_link', {
      allow_target_blank: true,
      display_name: 'CTA Link',
      email_link_type: true,
      type: 'multilink',
    }),
    defineField('newsletter_text', {
      type: 'text',
    }),
    defineField('newsletter_subtext', {
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
    defineField('links', {
      allow: [
        'link',
      ],
      type: 'bloks',
    }),
    defineField('company_email', {
      type: 'text',
    }),
    defineField('company_telephone', {
      type: 'text',
    }),
    defineField('company_address', {
      type: 'textarea',
    }),
    defineField('logos', {
      allow: [
        'logo',
      ],
      type: 'bloks',
    }),
    defineField('data_capture_headline', {
      description: 'Headline that is shown on video\'s with data capture enabled.',
      required: true,
      type: 'text',
    }),
    defineField('data_capture_text', {
      allow_target_blank: true,
      customize_toolbar: true,
      description: 'Text that is shown on video\'s with data capture enabled.',
      required: true,
      toolbar: [
        'bold',
        'unset',
        'italic',
        'link',
        'paragraph',
      ],
      type: 'richtext',
    }),
  ],
});
