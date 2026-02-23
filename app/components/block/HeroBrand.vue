<script lang="ts" setup>
import type { BlockHeroBrand } from '#storyblok-components'
import IconLogo from '@/assets/icons/logo.svg?component'

interface Props {
  block: BlockHeroBrand
}

const { block } = defineProps<Props>()

const activeSlide = ref<1 | 2>(1)
const mediaRef = useTemplateRef('mediaRef')
const mediaReady = ref(false)
const media = computed(() => block.media?.[0])
const slideIntervalMs = 4000

let slideIntervalId: ReturnType<typeof setInterval> | null = null

const startSlideRotation = () => {
  slideIntervalId = setInterval(() => {
    activeSlide.value = activeSlide.value === 1 ? 2 : 1
  }, slideIntervalMs)
}

const stopSlideRotation = () => {
  if (slideIntervalId) {
    clearInterval(slideIntervalId)
    slideIntervalId = null
  }
}

const mediaLoaded = () => {
  mediaReady.value = true
}

onMounted(startSlideRotation)
onBeforeUnmount(stopSlideRotation)
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
    :class="activeSlide === 2 ? 'is-slide-2' : 'is-slide-1'"
  >
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
        size-full
      "
    >
      <EffectTextReveal
        v-if="storyblokRichTextContent(block.headline) || storyblokRichTextContent(block.headline_2)"
        :delay="1000"
        class="hero__headline relative"
      >
        <div
          v-if="storyblokRichTextContent(block.headline)"
          class="hero__headline-1 opacity-100"
        >
          <StoryblokText :html="block.headline" />
        </div>

        <div
          v-if="storyblokRichTextContent(block.headline_2)"
          class="hero__headline-2 absolute inset-0 opacity-0"
        >
          <StoryblokText :html="block.headline_2" />
        </div>
      </EffectTextReveal>

      <div
        class="w-full max-h-full transition-[opacity,scale] duration-1000 ease-out"
        :class="{
          'opacity-0 scale-90': !mediaReady,
        }"
      >
        <IconLogo class="size-full" />
      </div>

      <EffectTextReveal
        v-if="storyblokRichTextContent(block.text)"
        :delay="1500"
        class="hero__text"
      >
        <StoryblokText :html="block.text" />
      </EffectTextReveal>
    </div>

    <div
      ref="mediaRef"
      class="absolute z-0 inset-0 will-change-transform overflow-hidden transition-[opacity,filter,scale] duration-1000 ease-out"
      :class="{
        'opacity-0 scale-120': !mediaReady,
        'grayscale-100': activeSlide === 1,
      }"
    >
      <NuxtImg
        v-if="media && isImageComponent(media) && media.image?.filename && storyblokAssetType(media.image.filename) === 'image'"
        class="block size-full object-cover"
        :src="media.image.filename"
        :alt="media.image.alt || ''"
        :width="16"
        :height="9"
        sizes="
          100vw
          xs:100vw
          sm:100vw
          md:100vw
          lg:100vw
          xl:100vw
          2xl:100vw
        "
        @vue:mounted="mediaLoaded"
      />

      <UiMuxVideo
        v-else-if="media && isMuxVideoAutoplayComponent(media) && media.video?.playbackId"
        :playback-id="media.video.playbackId"
        :is-cover="true"
        playsinline
        autoplay
        muted
        loop
        @ready="mediaLoaded"
      />
    </div>
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
            class="block w-auto h-11"
            :src="logo.filename"
            :alt="logo.alt || ''"
            loading="lazy"
          >

          <NuxtImg
            v-else
            class="block w-auto h-11"
            :src="logo.filename"
            :alt="logo.alt || ''"
            densities="x1 x2"
            height="44"
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
