<script lang="ts" setup>
import type { BlockHeroBrand } from '@@/.storyblok/types/289672313529140/storyblok-components'
import IconLogo from '@/assets/icons/logo.svg?component'

interface Props {
  block: BlockHeroBrand
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    class="
      hero
      relative
      overflow-hidden
      w-full
      h-screen
      flex
      flex-col
      items-center
      justify-center
    "
  >
    <div class="absolute inset-0">
      <EffectMorphGradient
        ball-colour1="pink"
        ball-colour2="pink"
        ball-cursor-colour="pink"
      />
    </div>

    <div
      class="
        z-1
        wrapper-max
        pt-60
        pb-50
        flex
        flex-col
        items-center
        justify-center
        gap-10
        text-center
        w-full
        h-full
      "
    >
      <div
        v-if="storyblokRichTextContent(block.headline)"
        class="hero__headline"
      >
        <StoryblokText :html="block.headline" />
      </div>

      <div class="w-full max-h-full">
        <IconLogo class="size-full" />
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
  }
}
</style>
