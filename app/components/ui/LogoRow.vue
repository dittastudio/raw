<script lang="ts" setup>
import type { StoryblokMultiasset } from '#storyblok-types'

interface Props {
  items?: StoryblokMultiasset
  cropWidth?: number
  gap?: string
  strength?: number
  baseHeight?: number
}

const {
  items,
  cropWidth = 100,
  gap = 'var(--app-outer-gutter)',
  strength = 60,
  baseHeight = 3.5,
} = defineProps<Props>()
</script>

<template>
  <ul class="logo-row">
    <template
      v-for="item in items"
      :key="item.id"
    >
      <li
        v-if="item?.filename"
        class="logo-row__item"
        :style="{
          '--width': storyblokImageDimensions(item.filename).width,
          '--height': storyblokImageDimensions(item.filename).height,
        }"
      >
        <img
          v-if="fileExtension(item.filename) === 'svg'"
          class="block size-full object-contain"
          :src="item.filename"
          :alt="item.alt || item.title || 'Logo'"
          loading="lazy"
        >

        <NuxtImg
          v-else
          class="block size-full object-contain"
          :src="item.filename"
          :alt="item.alt || item.title || 'Logo'"
          :width="cropWidth"
          densities="x1 x2"
          loading="lazy"
        />
      </li>
    </template>
  </ul>
</template>

<style>
@reference "@/assets/css/app.css";

/* Reference: https://9elements.com/blog/building-the-perfect-logo-strip/ */
@property --captured-length {
  syntax: "<length>";
  initial-value: 0px;
  inherits: false;
}

.logo-row {
  --strength: calc(v-bind(strength) / 100);
  --base-height: calc(v-bind(baseHeight) * 16px);
  --logo-min-size-factor: 0.375;
  --logo-max-size-factor: 1.25;

  @variant md {
    --base-height: calc((v-bind(baseHeight) * 16px) * 1.25);
  }

  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: v-bind(gap);
  container-type: inline-size;
}

.logo-row__item {
  --captured-length: var(--base-height);
  --area: pow(
    tan(atan2(var(--captured-length), 1px)),
    2
  );
  --diff: sqrt(
    var(--area)
    /
    (var(--width) * var(--height))
  );

  --scaled-height: calc(1px * var(--height) * var(--diff));

  height: clamp(
    var(--base-height) * var(--logo-min-size-factor),
    var(--base-height) + (var(--scaled-height) - var(--base-height)) * var(--strength),
    var(--base-height) * var(--logo-max-size-factor)
  );
}
</style>
