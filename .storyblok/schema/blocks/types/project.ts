import {
  defineBlock,
  defineField,
} from '@storyblok/schema';

import { typesFolder } from '../../folders';

export const projectBlock = defineBlock({
  name: 'project',
  is_root: true,
  is_nestable: false,
  folder: typesFolder,
  fields: [
    defineField('preview_logo', {
      asset_folder_id: 149570834252135,
      description: 'Logo that is shown when featured around the site. SVG upload recommended.',
      filetypes: [
        'images',
      ],
      type: 'asset',
    }),
    defineField('preview_max_width', {
      decimals: 0,
      description: 'Adjust the logo max-width in pixels to get fine-tuned sizing. Leave blank to use the image\'s natural size.',
      steps: 1,
      type: 'number',
    }),
    defineField('preview_media', {
      allow: [
        'image',
        'mux_video_autoplay',
      ],
      description: 'The Image or video that is shown when featured around the site.',
      maximum: 1,
      required: true,
      type: 'bloks',
    }),
    defineField('preview_headline', {
      description: 'Headline that is shown when featured around the site.',
      required: true,
      type: 'text',
    }),
    defineField('preview_text', {
      description: 'Text that is shown when featured around the site.',
      required: true,
      type: 'text',
    }),
    defineField('category', {
      datasource: 'project-category',
      exclude_empty_option: true,
      required: true,
      source: 'internal',
      type: 'option',
      use_uuid: true,
    }),
    defineField('blocks', {
      allow: [
        {
          tag: 'Project',
        },
      ],
      type: 'bloks',
    }),
    defineField('tab-0c7882b0-9f8b-4e24-83f1-096af4e560d1', {
      display_name: 'Content',
      keys: [
        'blocks',
      ],
      name: 'tab-0c7882b0-9f8b-4e24-83f1-096af4e560d1',
      type: 'tab',
    }),
    defineField('seo_title', {
      display_name: 'Title',
      required: true,
      type: 'text',
    }),
    defineField('tab-0df61d3a-3a9f-4508-b1f3-edda3b534d36', {
      display_name: 'SEO',
      keys: [
        'seo_title',
        'seo_description',
        'seo_image',
      ],
      name: 'tab-0df61d3a-3a9f-4508-b1f3-edda3b534d36',
      type: 'tab',
    }),
    defineField('seo_description', {
      display_name: 'Description',
      required: true,
      type: 'text',
    }),
    defineField('seo_image', {
      display_name: 'Image',
      filetypes: [
        'images',
      ],
      required: true,
      type: 'asset',
    }),
  ],
});
