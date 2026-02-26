<script lang="ts" setup>
import type { BlockHero } from '#storyblok-components'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface Props {
  block: BlockHero
  name?: string
  headlineAs?: 'h1' | 'h2'
}

const { block, name, headlineAs = 'h1' } = defineProps<Props>()

const heroRef = useTemplateRef('heroRef')
const mediaRef = useTemplateRef('mediaRef')
const mediaReady = ref(false)
const media = computed(() => block.media?.[0])

gsap.registerPlugin(ScrollTrigger)

const mediaLoaded = () => {
  mediaReady.value = true
}

watch(mediaReady, async (ready) => {
  if (!ready || !heroRef.value || !mediaRef.value) {
    return
  }

  await nextTick()

  const amount = 15

  gsap.fromTo(
    mediaRef.value,
    {
      yPercent: amount * -1,
    },
    {
      yPercent: amount,
      ease: 'none',
      scrollTrigger: {
        markers: false,
        trigger: heroRef.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    },
  )
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<template>
  <div
    v-editable="block"
    class="hero relative w-full min-h-svh overflow-hidden grid place-items-center"
  >
    <div
      ref="heroRef"
      :class="{
        'is-dark': block.theme === 'dark',
        'is-light': block.theme === 'light',
      }"
      class="hero__content relative z-1 size-full flex flex-col items-center justify-center"
    >
      <div class="flex flex-col items-center justify-center gap-10 text-center p-(--app-outer-gutter)">
        <div v-if="block.logo?.filename">
          <img
            v-if="fileExtension(block.logo.filename) === 'svg'"
            class="block w-[85cqw] max-w-max h-auto"
            :src="block.logo.filename"
            :alt="block.logo.alt || name || ''"
            loading="lazy"
          >

          <NuxtImg
            v-else
            class="block w-[85cqw] max-w-max h-auto"
            :src="block.logo.filename"
            :alt="block.logo.alt || name || ''"
            :height="100"
            densities="x1 x2"
            loading="lazy"
          />
        </div>

        <EffectTextReveal
          v-if="storyblokRichTextContent(block.headline)"
          class="hero__headline"
          :class="headlineAs === 'h2' ? 'hero__headline--h2' : 'hero__headline--h1'"
          :delay="500"
        >
          <StoryblokText :html="block.headline" />
        </EffectTextReveal>

        <h1
          v-else-if="!storyblokRichTextContent(block.headline) && name"
          class="sr-only"
        >
          {{ name }}
        </h1>

        <EffectTextReveal
          v-if="storyblokRichTextContent(block.text)"
          class="hero__text"
          :delay="storyblokRichTextContent(block.headline) ? 1000 : 500"
        >
          <StoryblokText :html="block.text" />
        </EffectTextReveal>
      </div>
    </div>

    <div
      ref="mediaRef"
      class="absolute z-0 inset-x-0 -bottom-[15%] -top-[15%] will-change-transform overflow-hidden transition-[opacity,scale] duration-1000 ease-inOutQuart"
      :class="{
        'opacity-0 scale-120': !mediaReady,
      }"
    >
      <picture v-if="media && isImageComponent(media) && media.image?.filename && storyblokAssetType(media.image.filename) === 'image'">
        <MediaSource
          media="(orientation: landscape)"
          :width="16"
          :height="9"
          :src="media.image.filename"
          sizes="sm:100vw md:100vw lg:100vw"
        />

        <MediaSource
          media="(orientation: portrait)"
          :width="10"
          :height="16"
          :src="media.image.filename"
          sizes="2xs:100vw xs:100vw sm:100vw"
        />

        <NuxtImg
          srcset=""
          class="size-full object-cover"
          :src="media.image.filename"
          :alt="media.image.alt || name || ''"
          loading="lazy"
          @vue:mounted="mediaLoaded"
        />
      </picture>

      <UiMuxVideo
        v-else-if="media && isMuxVideoAutoplayComponent(media) && media.video?.playbackId"
        :playback-id="media.video.playbackId"
        :is-cover="true"
        :poster="media.poster?.filename ? storyblokImage(media.poster.filename, {
          width: 1600,
          height: 900,
          format: 'webp',
          quality: 80,
        }) : null"
        playsinline
        autoplay
        muted
        loop
        @ready="mediaLoaded"
      />
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.hero__content {
  background-image: radial-gradient(ellipse at 50% 50%, --alpha(var(--tint) / 25%) 0%, --alpha(var(--tint) / 0%) 100%);

  &.is-dark {
    --tint: var(--color-offblack);
  }

  &.is-light {
    --tint: var(--color-offwhite);
  }
}

.hero__headline--h1 {
  :deep(h1),
  :deep(h2) {
    @apply type-h1;
  }
}

.hero__headline--h2 {
  :deep(h1),
  :deep(h2) {
    @apply type-h2;
  }
}

.hero__text {
  :deep(p) {
    @apply type-h4;

    max-width: 30em;
  }
}
</style>
