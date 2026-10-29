import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { pageBlocksFolder } from '../../folders';

export const blockImpactDetailsBlock = defineBlock({
  name: 'block_impact_details',
  display_name: 'Impact Details',
  is_root: false,
  is_nestable: true,
  folder: pageBlocksFolder,
  color: 'var(--sb-color-accent-background-green-cyan)',
  description: 'Impactful headline with content for further details.',
  icon: 'layout-list',
  tags: [
    'Page',
    'Project',
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
          _uid: '32b97c2c-2de3-40bd-ad77-6d92f718c63c',
          name: 'Outlined',
          value: 'is-outlined',
        },
      ],
      toolbar: [
        'h3',
        'unset',
      ],
      type: 'richtext',
    }),
    defineField('media', {
      allow: [
        'image',
      ],
      maximum: 1,
      required: false,
      type: 'bloks',
    }),
    defineField('copy', {
      customize_toolbar: true,
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
    defineField('cta_title', {
      type: 'text',
    }),
    defineField('cta', {
      allow_target_blank: true,
      email_link_type: true,
      type: 'multilink',
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
          _uid: '6f7b8e9b-d11a-4fb7-86b3-ee106d97fd04',
          name: 'marks',
          value: '[0,25,50,75,100]',
        },
        {
          _uid: '1f9fd4ba-c0f5-4a9f-aa0b-0d2aa5d36120',
          name: 'defaultValue',
          value: '60',
        },
        {
          _uid: 'ddae7a41-4264-4cda-bcdc-5aada093374e',
          name: 'minValue',
          value: '0',
        },
        {
          _uid: 'b58cc580-cceb-4d85-911e-02eb0c40ec30',
          name: 'maxValue',
          value: '100',
        },
        {
          _uid: '79df0eb2-b8f0-4900-8ced-ca515900315e',
          name: 'stepSize',
          value: '5',
        },
        {
          _uid: '17c8ceba-e0e2-4f9d-b9dd-204cc5ea21fd',
          name: 'minimumSignificantDigits',
          value: '',
        },
        {
          _uid: 'df57b3e8-0ec6-44c2-baf8-cc3234bc61c4',
          name: 'maximumSignificantDigits',
          value: '',
        },
        {
          _uid: 'e0cfa2cd-f16b-49f7-8a5e-425cebe0259c',
          name: 'style',
          value: 'unit',
        },
        {
          _uid: 'fb1deffe-4207-40d3-91a0-1cb80948d42c',
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
          _uid: '6b8dc437-97ad-4f35-9f8d-3eefe7fe34c4',
          name: 'marks',
          value: '',
        },
        {
          _uid: '5fda3313-b3d7-4f36-96fd-244588af0027',
          name: 'defaultValue',
          value: '3.5',
        },
        {
          _uid: 'a69abd38-e524-45a6-801d-3d86036759e5',
          name: 'minValue',
          value: '1',
        },
        {
          _uid: 'ab246362-eb8f-4152-9e48-b4636dc1cbfb',
          name: 'maxValue',
          value: '6',
        },
        {
          _uid: '45810e79-d9d8-4bd3-b448-bda33b8ae876',
          name: 'stepSize',
          value: '0.5',
        },
        {
          _uid: '640ca05f-946f-4e9b-b5ba-d05f35b244c3',
          name: 'minimumSignificantDigits',
          value: '',
        },
        {
          _uid: '4682baac-b6a9-4a38-bce1-9e2a55f7fd02',
          name: 'maximumSignificantDigits',
          value: '',
        },
        {
          _uid: '233597d5-28f1-41a2-b49c-8073734a5da0',
          name: 'style',
          value: 'decimal',
        },
        {
          _uid: 'a4dd757d-e48d-4176-af3d-5f350047efaf',
          name: 'unit',
          value: '',
        },
      ],
      type: 'custom',
    }),
    defineField('jaa_partnership', {
      description: 'Check to display the JAA Partnership.',
      inline_label: true,
      type: 'boolean',
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
