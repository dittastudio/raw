<script lang="ts" setup>
import type { BlockHero } from '@@/.storyblok/types/289672313529140/storyblok-components'

interface Props {
  block: BlockHero
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    class="hero relative overflow-hidden w-full min-h-screen flex flex-col items-center justify-center"
    :class="block.colour"
  >
    <div class="absolute inset-0">
      <EffectMorphGradient />
    </div>

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
  </div>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.hero {
  &.is-light {
    color: var(--color-white);

    :deep(.is-outlined) {
      @apply text-outline-white;
    }
  }

  &.is-dark {
    color: var(--color-offblack);

    :deep(.is-outlined) {
      @apply text-outline-offblack;
    }
  }

  &__headline {
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

  &__text {
    :deep(p) {
      @apply type-h4;

      text-wrap: balance;
      max-width: 30em;
    }
  }
}
</style>
