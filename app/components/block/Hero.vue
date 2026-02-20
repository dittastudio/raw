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
const svg = await useSvg(block.logo?.filename)

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
        <template v-if="block.logo?.filename">
          <div
            v-if="svg"
            class="hero__logo"
            v-html="svg"
          />

          <div
            v-else
            class="hero__logo"
          >
            <NuxtImg
              :src="block.logo.filename"
              :alt="block.logo.alt || ''"
              :height="100"
              densities="x1 x2"
              loading="lazy"
            />
          </div>
        </template>

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
      class="absolute z-0 inset-x-0 -bottom-[15%] -top-[15%] will-change-transform overflow-hidden transition-[opacity,scale] duration-1000 ease-out"
      :class="{
        'opacity-0 scale-120': !mediaReady,
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

.hero__logo {
  :deep(svg) {
    display: block;
    width: 85cqw;
    max-width: max-content;
    height: auto;
    color: currentColor;
  }

  :deep(img) {
    display: block;
    width: 85cqw;
    max-width: max-content;
    height: auto;
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

    text-wrap: balance;
    max-width: 30em;
  }
}
</style>
