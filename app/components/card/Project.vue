<script lang="ts" setup>
import type { StoryblokAsset } from '#storyblok-types'

interface Props {
  slug?: string
  tagline?: string
  headline?: string
  logo?: StoryblokAsset
}

const { slug, tagline, headline, logo } = defineProps<Props>()
</script>

<template>
  <article class="size-full">
    <NuxtLink
      class="flex flex-col gap-6 size-full border-b border-current pb-6"
      :to="`/${slug}`"
    >
      <slot name="media" />

      <div class="size-full flex items-end justify-between gap-(--app-inner-gutter)">
        <div class="size-full flex flex-col gap-6 justify-between">
          <p
            v-if="tagline"
            class="text-balance"
          >
            {{ tagline }}
          </p>

          <h3
            v-if="headline"
            class="type-h4 text-balance max-w-[64ch]"
          >
            {{ headline }}
          </h3>
        </div>

        <template v-if="logo?.filename && storyblokAssetType(logo.filename) === 'image'">
          <img
            v-if="fileExtension(logo.filename) === 'svg'"
            class="block w-31 h-auto mb-1 mix-blend-difference"
            :src="logo.filename"
            :alt="logo.alt || headline || tagline || ''"
            loading="lazy"
          >

          <NuxtImg
            v-else
            class="block w-31 h-auto mb-1 mix-blend-difference"
            :src="logo.filename"
            :alt="logo.alt || headline || tagline || ''"
            densities="x1 x2"
            height="40"
            loading="lazy"
          />
        </template>
      </div>
    </NuxtLink>
  </article>
</template>
