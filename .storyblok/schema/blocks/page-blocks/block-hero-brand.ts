import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { pageBlocksFolder } from '../../folders';

export const blockHeroBrandBlock = defineBlock({
  name: 'block_hero_brand',
  display_name: 'Hero Brand',
  is_root: false,
  is_nestable: true,
  folder: pageBlocksFolder,
  color: 'var(--sb-color-accent-background-green-cyan)',
  description: 'Displays a large hero which houses a large central Raw logo.',
  icon: 'gallery-vertical',
  tags: [
    'Page',
  ],
  fields: [
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
        'h2',
        'unset',
        'h1',
      ],
      type: 'richtext',
    }),
    defineField('headline_2', {
      customize_toolbar: true,
      toolbar: [
        'h2',
        'unset',
        'h1',
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
        'mux_video_autoplay',
        'image',
      ],
      maximum: 1,
      type: 'bloks',
    }),
    defineField('logos', {
      asset_folder_id: 134653467982768,
      description: 'Upload black and white SVGs for best results.',
      filetypes: [
        'images',
      ],
      type: 'multiasset',
    }),
    defineField('logo_strength', {
      description: 'How much logos can differ in size.\nLower = more uniform\nHigher = more variation',
      field_type: 'storyblok-slider',
      options: [
        {
          _uid: 'd1b06139-d081-481f-a0d7-ae60530dd367',
          name: 'marks',
          value: '[0,25,50,75,100]',
        },
        {
          _uid: '856db0c9-b9e8-46d9-abc5-3b4104f278a8',
          name: 'defaultValue',
          value: '60',
        },
        {
          _uid: 'ae069086-e436-46ce-a1d1-3af2981702c0',
          name: 'minValue',
          value: '0',
        },
        {
          _uid: '4fd150cf-d4b6-4244-9966-e81231c68758',
          name: 'maxValue',
          value: '100',
        },
        {
          _uid: 'da318328-fd3e-4bd6-8934-7971774c6357',
          name: 'stepSize',
          value: '5',
        },
        {
          _uid: '883ea65d-862c-4a8a-af31-f49812ce80c6',
          name: 'minimumSignificantDigits',
          value: '',
        },
        {
          _uid: 'd3d8954b-f2ef-41f3-8a40-99d8ce49f1a3',
          name: 'maximumSignificantDigits',
          value: '',
        },
        {
          _uid: '5f55d4c9-95ab-4e74-83e7-546db342750d',
          name: 'style',
          value: 'unit',
        },
        {
          _uid: 'a1a2dc4d-280e-4464-8aa7-0a5444bab3ea',
          name: 'unit',
          value: 'percent',
        },
      ],
      type: 'custom',
    }),
    defineField('logo_scale', {
      field_type: 'storyblok-slider',
      options: [
        {
          _uid: '785247b2-b56a-42cf-be0c-efa1a75256b1',
          name: 'marks',
          value: '',
        },
        {
          _uid: 'dbe83b2c-68dc-415d-9417-a39f9408657e',
          name: 'defaultValue',
          value: '3.5',
        },
        {
          _uid: '25da75ad-aa77-429c-a993-a1d24e44b6e3',
          name: 'minValue',
          value: '1',
        },
        {
          _uid: 'ce837826-d985-4ec3-9e86-ecdeff5b10d4',
          name: 'maxValue',
          value: '6',
        },
        {
          _uid: '67609598-e4bb-4013-9efb-fae733270bf0',
          name: 'stepSize',
          value: '0.5',
        },
        {
          _uid: '9a220608-abf4-4f57-b473-5c6ffd29d2a3',
          name: 'minimumSignificantDigits',
          value: '',
        },
        {
          _uid: '7dbf2fb8-df2c-4fee-9298-34db0d360b6b',
          name: 'maximumSignificantDigits',
          value: '',
        },
        {
          _uid: '6cf57087-a799-47fc-a818-c234a8fd820e',
          name: 'style',
          value: 'decimal',
        },
        {
          _uid: '3c9ab323-744a-4d77-b536-83dd7e0fa400',
          name: 'unit',
          value: '',
        },
      ],
      type: 'custom',
    }),
  ],
});
