<script lang="ts" setup>
import type { BlockHero } from '@@/.storyblok/types/289672313529140/storyblok-components'
import type { Themes } from '@@/types/app'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface Props {
  block: BlockHero
}

const { block } = defineProps<Props>()
const media = computed(() => block.media?.[0] || null)

const heroRef = useTemplateRef('heroRef')
const mediaRef = useTemplateRef('mediaRef')

onMounted(async () => {
  if (!heroRef.value || !mediaRef.value) {
    return
  }

  await nextTick()

  gsap.registerPlugin(ScrollTrigger)

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
  <UiTheme
    v-editable="block"
    :theme="(block.theme as Themes)"
    class="hero relative w-full min-h-screen overflow-hidden grid place-items-center"
  >
    <div
      ref="heroRef"
      class="relative z-1 size-full flex flex-col items-center justify-center"
    >
      <div class="flex flex-col items-center justify-center gap-10 text-center p-(--app-outer-gutter)">
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

    <div
      ref="mediaRef"
      class="absolute z-0 inset-x-0 -bottom-[15%] -top-[15%] will-change-transform overflow-hidden"
    >
      <NuxtImg
        v-if="media && isImageComponent(media) && media.image?.filename && storyblokAssetType(media.image.filename) === 'image'"
        class="block size-full object-cover"
        :src="media.image.filename"
        :alt="media.image.alt || ''"
        :width="1000"
        :height="Math.round(storyblokImageDimensions(media.image.filename).height / storyblokImageDimensions(media.image.filename).width * 1000)"
        quality="85"
        :modifiers="{
          smart: true,
        }"
      />

      <UiMuxVideo
        v-else-if="media && isMuxVideoComponent(media) && media.video?.playbackId"
        :playback-id="media.video.playbackId"
        :is-cover="true"
        playsinline
        autoplay
        muted
        loop
      />
    </div>
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
