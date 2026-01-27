<script lang="ts" setup>
import type { BlockHero } from '@@/.storyblok/types/289672313529140/storyblok-components'

interface Props {
  block: BlockHero
}

const { block } = defineProps<Props>()
const media = computed(() => block.media?.[0] || null)
</script>

<template>
  <UiTheme
    v-editable="block"
    theme="light"
    class="hero relative w-full min-h-screen flex flex-col items-center justify-center"
  >
    <div class="z-1 flex flex-col items-center justify-center gap-10 text-center p-(--app-outer-gutter)">
      <div
        v-if="storyblokRichTextContent(block.headline)"
        class="hero__headline"
      >
        <StoryblokText :html="block.headline" />
      </div>

      <div
        v-if="storyblokRichTextContent(block.text)"
        class="hero__text"
      >
        <StoryblokText :html="block.text" />
      </div>
    </div>

    <NuxtImg
      v-if="media && isImageComponent(media) && media.image?.filename && storyblokAssetType(media.image.filename) === 'image'"
      class="absolute inset-0 block size-full object-cover"
      :src="media.image.filename"
      :alt="media.image.alt || ''"
      :width="1000"
      :height="Math.round(storyblokImageDimensions(media.image.filename).height / storyblokImageDimensions(media.image.filename).width * 1000)"
      quality="85"
      :modifiers="{
        smart: true,
      }"
    />
  </UiTheme>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.hero__headline {
  :deep(h1) {
    @apply type-h1;
  }

  :deep(h2) {
    @apply type-h2;
  }

  :deep(h3) {
    @apply type-h3;
  }
}

.hero__text {
  :deep(p) {
    @apply type-h4;

    text-wrap: balance;
    max-width: 30em;
  }
}
</style>
