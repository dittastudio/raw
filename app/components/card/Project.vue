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
      class="flex flex-col gap-6 size-full border-b border-(--app-text-color) pb-6"
      :to="`/${slug}`"
    >
      <slot name="image" />

      <div class="flex items-end justify-between gap-(--app-inner-gutter)">
        <div class="flex flex-col gap-6">
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

        <NuxtImg
          v-if="logo?.filename"
          class="block w-31 h-auto mb-1 mix-blend-difference"
          :src="logo.filename"
          :alt="logo.alt || headline || tagline || ''"
          densities="x1 x2"
          height="40"
          loading="lazy"
        />
      </div>
    </NuxtLink>
  </article>
</template>
