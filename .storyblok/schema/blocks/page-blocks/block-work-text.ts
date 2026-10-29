import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { pageBlocksFolder } from '../../folders';

export const blockWorkTextBlock = defineBlock({
  name: 'block_work_text',
  display_name: 'Work Text',
  is_root: false,
  is_nestable: true,
  folder: pageBlocksFolder,
  color: 'var(--sb-color-accent-background-green-cyan)',
  description: 'Standard text for Work pages',
  icon: 'layout-list',
  tags: [
    'Project',
  ],
  fields: [
    defineField('title', {
      required: false,
      type: 'text',
    }),
    defineField('copy', {
      customize_toolbar: true,
      required: true,
      toolbar: [
        'unset',
        'paragraph',
        'bold',
        'link',
        'olist',
        'list',
      ],
      type: 'richtext',
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
    defineField('stats', {
      allow: [
        'copy',
      ],
      type: 'bloks',
    }),
    defineField('logos', {
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
          _uid: 'b1d431e9-bf1e-4d06-8eaa-3f43e9aec5d9',
          name: 'marks',
          value: '[0,25,50,75,100]',
        },
        {
          _uid: 'b63ea48d-4228-40ea-becf-be6dfb6de9cd',
          name: 'defaultValue',
          value: '60',
        },
        {
          _uid: '1b63eeec-5ce4-4fbe-af61-fa507f86d16a',
          name: 'minValue',
          value: '0',
        },
        {
          _uid: 'b8cc8bab-309d-4ba0-bf6c-a14a968c1993',
          name: 'maxValue',
          value: '100',
        },
        {
          _uid: '91a83890-a57e-4bc1-8ee6-8638e8a93fa3',
          name: 'stepSize',
          value: '5',
        },
        {
          _uid: 'ef8d8b77-626a-4d58-8a93-f8db28a5daf5',
          name: 'minimumSignificantDigits',
          value: '',
        },
        {
          _uid: 'b5bad0ff-c836-4687-8a81-c692c6ae9fa6',
          name: 'maximumSignificantDigits',
          value: '',
        },
        {
          _uid: '9bd7a0c1-305a-4e21-81a5-ddf66d90cc66',
          name: 'style',
          value: 'unit',
        },
        {
          _uid: '87fb323a-6434-4163-a2e3-5f0b2cc8ea61',
          name: 'unit',
          value: 'percent',
        },
      ],
      type: 'custom',
    }),
    defineField('logo_scale', {
      decimals: 1,
      default_value: '3',
      display_name: 'Logo Scale',
      field_type: 'storyblok-slider',
      max_value: 6,
      min_value: 1,
      options: [
        {
          _uid: '9c498ee6-4717-4d23-b9b3-5de859cb742b',
          name: 'marks',
          value: '',
        },
        {
          _uid: '112792e5-fc72-4572-b718-87df00088e6f',
          name: 'defaultValue',
          value: '3.5',
        },
        {
          _uid: 'd98da34b-6d76-486e-985e-64375376bf3e',
          name: 'minValue',
          value: '1',
        },
        {
          _uid: '770b76a8-3e3d-4e72-9f73-f593a8320160',
          name: 'maxValue',
          value: '6',
        },
        {
          _uid: '2997ae40-98ae-4074-bc93-a98619a43344',
          name: 'stepSize',
          value: '0.5',
        },
        {
          _uid: 'd7bf0704-245e-49d8-b5ca-a31c91b066e8',
          name: 'minimumSignificantDigits',
          value: '',
        },
        {
          _uid: '5e6fd3ea-cbb8-41ee-abf3-dd22e4d18ff8',
          name: 'maximumSignificantDigits',
          value: '',
        },
        {
          _uid: '8b1d6a3a-2cbe-439c-85bd-28546c207e23',
          name: 'style',
          value: 'decimal',
        },
        {
          _uid: 'fd762a3e-7a5d-450a-b18c-731e29b73232',
          name: 'unit',
          value: '',
        },
      ],
      steps: 0.5,
      type: 'custom',
    }),
    defineField('theme', {
      datasource: 'theme',
      default_value: 'dark',
      exclude_empty_option: true,
      source: 'internal',
      type: 'option',
      use_uuid: true,
    }),
  ],
});
