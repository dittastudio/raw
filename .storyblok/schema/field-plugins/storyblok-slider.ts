import { defineFieldPlugin } from '@storyblok/schema';
import { z } from 'zod';

export const storyblokSliderFieldPlugin = defineFieldPlugin({
  fieldType: 'storyblok-slider',
  value: z.object({
    value: z.string().optional(),
  }),
});
