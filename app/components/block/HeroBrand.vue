<script lang="ts" setup>
import type { BlockHeroBrand } from '#storyblok-components'
import IconLogo from '@/assets/icons/logo.svg?component'

interface Props {
  block: BlockHeroBrand
}

const { block } = defineProps<Props>()

const activeSlide = ref<1 | 2 | null>(null)
const slideIntervalMs = 4000
let slideIntervalId: ReturnType<typeof setInterval> | null = null
let slideTimeoutId: ReturnType<typeof setTimeout> | null = null

const startSlideRotation = () => {
  slideTimeoutId = setTimeout(() => {
    activeSlide.value = 2
    slideIntervalId = setInterval(() => {
      activeSlide.value = activeSlide.value === 1 ? 2 : 1
    }, slideIntervalMs)
  }, slideIntervalMs)
}

const stopSlideRotation = () => {
  if (slideTimeoutId) {
    clearTimeout(slideTimeoutId)
    slideTimeoutId = null
  }

  if (slideIntervalId) {
    clearInterval(slideIntervalId)
    slideIntervalId = null
  }
}

onMounted(startSlideRotation)
onBeforeUnmount(stopSlideRotation)

const slideClass = computed(() => {
  if (activeSlide.value === null) {
    return ''
  }

  return activeSlide.value === 1 ? 'is-slide-1' : 'is-slide-2'
})
</script>

<template>
  <div
    v-editable="block"
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
      text-offblack
    "
    :class="slideClass"
  >
    <!-- <div class="absolute inset-0"> -->
    <EffectMorphGradient
      ball-colour1="pink"
      ball-colour2="pink"
      ball-cursor-colour="pink"
    >
      <!-- </div> -->

      <div
        class="
        @container/hero
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
          v-if="storyblokRichTextContent(block.headline) || storyblokRichTextContent(block.headline_2)"
          class="hero__headline relative"
        >
          <div class="hero__headline-1 opacity-100">
            <StoryblokText :html="block.headline" />
          </div>

          <div class="hero__headline-2 absolute inset-0 opacity-0">
            <StoryblokText :html="block.headline_2" />
          </div>
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
    </EffectMorphGradient>
  </div>

  <div
    v-if="block.logo_ticker"
    class="py-10 bg-offwhite"
  >
    <UiTicker
      duration="30s"
      direction="right"
    >
      <template
        v-for="logo in block.logo_ticker"
        :key="logo.id"
      >
        <template v-if="logo.filename && storyblokAssetType(logo.filename) === 'image'">
          <img
            v-if="fileExtension(logo.filename) === 'svg'"
            class="block w-auto h-16"
            :src="logo.filename || ''"
            :alt="logo.alt || ''"
            loading="lazy"
          >

          <NuxtImg
            v-else
            class="block w-auto h-16"
            :src="logo.filename || ''"
            :alt="logo.alt || ''"
            densities="x1 x2"
            height="40"
            loading="lazy"
          />
        </template>
      </template>
    </UiTicker>
  </div>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.hero__headline {
  :deep(h1),
  :deep(h2) {
    @apply type-h1;

    font-size: min(50px, 5cqi);
  }
}

.hero__text {
  :deep(p) {
    @apply type-h4;

    text-wrap: balance;
  }
}

/* Animations */
.hero {
  position: relative;
  background-color: var(--color-offwhite);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: var(--color-green);
    opacity: 0;
    transition: opacity 1s var(--ease-out);
    pointer-events: none;
  }

  &.is-slide-2::before {
    opacity: 1;
  }
}

.hero__headline-1 {
  .hero.is-slide-1 & {
    animation: fade-in 1s var(--ease-out) 0.25s both;
  }

  .hero.is-slide-2 & {
    animation: fade-out 0.25s var(--ease-out) both;
  }
}

.hero__headline-2 {
  .hero.is-slide-1 & {
    animation: fade-out 0.25s var(--ease-out) both;
  }

  .hero.is-slide-2 & {
    animation: fade-in 1s var(--ease-out) 0.25s both;
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes fade-out {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>
