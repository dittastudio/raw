import { defineFieldPlugin } from '@storyblok/schema';
import { z } from 'zod';

export const storyblokMuxAssetsFieldPlugin = defineFieldPlugin({
  fieldType: 'storyblok-mux-assets',
  value: z.object({
    playbackId: z.string().optional(),
  }),
});
