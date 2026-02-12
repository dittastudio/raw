<script lang="ts" setup>
import type { StoryblokAsset } from '#storyblok-types'

interface Props {
  slug?: string
  tagline?: string
  headline?: string
  logo?: StoryblokAsset
}

const { slug, tagline, headline, logo } = defineProps<Props>()

const svg = await useSvg(logo?.filename)
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

        <div
          v-if="svg"
          class="w-31 h-auto mb-1 [&_svg]:size-full"
          v-html="svg"
        />
      </div>
    </NuxtLink>
  </article>
</template>
