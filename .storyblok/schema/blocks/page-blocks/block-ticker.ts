import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { pageBlocksFolder } from '../../folders';

export const blockTickerBlock = defineBlock({
  name: 'block_ticker',
  display_name: 'Logo Ticker',
  is_root: false,
  is_nestable: true,
  folder: pageBlocksFolder,
  color: 'var(--sb-color-accent-background-green-cyan)',
  description: 'Displays a logo ticker with optional background media & title',
  icon: 'sticker',
  tags: [
    'Page',
    'Project',
    'Event',
  ],
  fields: [
    defineField('media', {
      allow: [
        'image',
        'mux_video_autoplay',
      ],
      maximum: 1,
      type: 'bloks',
    }),
    defineField('text', {
      type: 'text',
    }),
    defineField('logos', {
      description: 'For best results use SVG images.',
      filetypes: [
        'images',
      ],
      required: true,
      type: 'multiasset',
    }),
    defineField('logo_strength', {
      description: 'How much logos can differ in size.\nLower = more uniform\nHigher = more variation',
      field_type: 'storyblok-slider',
      options: [
        {
          _uid: '26a74fda-efb4-437f-a1ca-e92d830efd10',
          name: 'marks',
          value: '[0,25,50,75,100]',
        },
        {
          _uid: 'fc6be388-6e5a-4c1e-8cc7-a5b3312ad3bc',
          name: 'defaultValue',
          value: '60',
        },
        {
          _uid: '1fde76b0-df90-4460-bc86-41abeeebdda6',
          name: 'minValue',
          value: '0',
        },
        {
          _uid: '30a73fa2-a86b-4372-b2a8-ff79b2c3601f',
          name: 'maxValue',
          value: '100',
        },
        {
          _uid: 'f9a4d54c-76c2-48de-9abb-c37b025c5a53',
          name: 'stepSize',
          value: '5',
        },
        {
          _uid: '9cf54542-77de-4f77-a00f-384c26ae9b4a',
          name: 'minimumSignificantDigits',
          value: '',
        },
        {
          _uid: 'eddc758c-06f0-4217-a66d-26b9ac873def',
          name: 'maximumSignificantDigits',
          value: '',
        },
        {
          _uid: '1e300b5e-4eef-4d13-bae6-26615388acdc',
          name: 'style',
          value: 'unit',
        },
        {
          _uid: '8459f493-71ca-4e82-8d81-7f3e2eb71f1e',
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
          _uid: '4de387dd-e694-4407-9ec9-e2d8360a18e0',
          name: 'marks',
          value: '',
        },
        {
          _uid: '488edf69-8858-4f4b-8f14-474a82be186d',
          name: 'defaultValue',
          value: '3.5',
        },
        {
          _uid: 'c7a391a8-c1ab-49b9-930e-8f0a24c973fc',
          name: 'minValue',
          value: '1',
        },
        {
          _uid: 'ac1dfc91-a2e9-4047-a30a-00fde005f8a1',
          name: 'maxValue',
          value: '6',
        },
        {
          _uid: 'bfb2b28a-11d0-40d0-a43c-bde39498b90f',
          name: 'stepSize',
          value: '0.5',
        },
        {
          _uid: '5dd19743-64e9-44f5-8492-b75a6cb5bf38',
          name: 'minimumSignificantDigits',
          value: '',
        },
        {
          _uid: '7486390c-3263-433c-86cb-58f4a3a92074',
          name: 'maximumSignificantDigits',
          value: '',
        },
        {
          _uid: 'bfb38d3d-b1e9-4a18-95ed-072cc8e525d0',
          name: 'style',
          value: 'decimal',
        },
        {
          _uid: 'b67f0a71-7666-4eb1-9df9-b1de5fb151d4',
          name: 'unit',
          value: '',
        },
      ],
      type: 'custom',
    }),
    defineField('theme', {
      datasource: 'theme',
      default_value: 'light',
      display_name: 'Theme',
      exclude_empty_option: false,
      required: false,
      source: 'internal',
      type: 'option',
      use_uuid: true,
    }),
  ],
});
