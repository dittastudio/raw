<script lang="ts" setup>
import type { BlockWorkText } from '@@/.storyblok/types/289672313529140/storyblok-components'

interface Props {
  block: BlockWorkText
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    data-component="work-text"
    class="
      wrapper-max
      grid
      grid-cols-1
      md:grid-cols-2
      gap-x-(--app-inner-gutter)
      gap-y-20
    "
  >
    <h2 class="col-span-full md:col-span-1 type-h5 text-balance max-w-[36ch]">
      {{ block.title }}
    </h2>

    <div class="col-span-full md:col-span-1 flex flex-col gap-y-16">
      <UiCarouselFade
        v-if="block.stats"
        :items="block.stats"
        :options="{ loop: true }"
        autoplay
        :autoplay-interval="4000"
      >
        <template #item="{ item, isActive }">
          <div
            v-if="storyblokRichTextContent(item.copy)"
            :class="{ 'is-active': isActive }"
            class="work-text__stats"
          >
            <StoryblokText :html="item.copy" />
          </div>
        </template>

        <template #other>
          <div class="pointer-events-none pt-8">
            <div class="pointer-events-auto">
              <UiCarouselDots />
            </div>
          </div>
        </template>
      </UiCarouselFade>

      <div
        v-if="storyblokRichTextContent(block.copy)"
        class="work-text__copy"
      >
        <StoryblokText :html="block.copy" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.work-text__stats {
  opacity: 0;
  scale: 0.975;
  transform: translateZ(0);
  transform-origin: left center;
  backface-visibility: hidden;
  transition:
    opacity 0.15s var(--ease-in),
    scale 0.15s var(--ease-in);

  &.is-active {
    opacity: 1;
    scale: 1;
    transition:
      opacity 0.3s var(--ease-out) 0.15s,
      scale 0.3s var(--ease-out) 0.15s;
  }

  :deep(p) {
    @apply type-h3;

    text-wrap: balance;

    @variant md {
      max-width: 20ch;
    }
  }
}

.work-text__copy {
  :deep(p) {
    @apply type-p;

    text-wrap: pretty;

    @variant md {
      max-width: 65ch;
    }
  }

  :deep(p + p) {
    padding-top: 1.25em;
  }
}
</style>
