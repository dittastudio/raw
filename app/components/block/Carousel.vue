<script lang="ts" setup>
import type { BlockCarousel, Project } from '#storyblok-components'
import type { Themes } from '@@/types/app'
import type { ISbStoryData } from '@storyblok/js'

interface Props {
  block: BlockCarousel
}

const { block } = defineProps<Props>()

const theme = computed(() => (block.theme as Themes) ?? 'light')

function getProjectSlug(project?: (ISbStoryData<Project> | string)[]) {
  const ref = project?.[0]
  return ref && typeof ref !== 'string' ? `/${ref.full_slug}` : undefined
}
</script>

<template>
  <div
    v-editable="block"
    class="flex flex-col gap-y-30"
  >
    <UiContent
      :title="block.title"
      :headline="block.headline"
      :copy="block.copy"
      :cta="block.cta"
      :cta-title="block.cta_title"
      :cta-type="block.theme === 'dark' ? 'outline' : 'solid'"
      :cta-theme="theme"
    />

    <UiCarouselFade
      :items="block.slides"
      :options="{ loop: true }"
      :autoplay="false"
      :autoplay-interval="4000"
    >
      <template #item="{ item }">
        <div class="relative size-full isolate aspect-10/16 sm:aspect-video max-h-svh">
          <NuxtImg
            v-if="item.media?.[0] && isImageComponent(item.media?.[0]) && item.media?.[0]?.image?.filename && storyblokAssetType(item.media?.[0]?.image?.filename) === 'image'"
            class="block size-full object-cover"
            :src="item.media?.[0]?.image?.filename"
            :alt="item.media?.[0]?.image?.alt || ''"
            :width="storyblokImageDimensions(item.media?.[0]?.image?.filename).width"
            :height="storyblokImageDimensions(item.media?.[0]?.image?.filename).height"
            sizes="
              xs:100vw
              sm:100vw
              md:100vw
              lg:100vw
              xl:100vw
            "
            loading="lazy"
          />

          <UiMuxVideo
            v-else-if="item.media?.[0] && isMuxVideoAutoplayComponent(item.media?.[0]) && item.media?.[0]?.video?.playbackId"
            class="block size-full object-cover"
            :is-cover="true"
            :playback-id="item.media?.[0]?.video?.playbackId"
            playsinline
            autoplay
            muted
            loop
          />

          <div
            v-if="storyblokRichTextContent(item.copy)"
            class="
              carousel__copy
              prose-p
              absolute
              inset-0
              pb-[calc(var(--app-outer-gutter)*3)]
              lg:pb-40
              flex
              flex-col
              justify-end
              z-1
            "
          >
            <div class="wrapper-max text-offwhite">
              <StoryblokText :html="item.copy" />

              <NuxtLink
                v-if="getProjectSlug(item.project)"
                :to="getProjectSlug(item.project)"
              >
                View Project
              </NuxtLink>
            </div>
          </div>
        </div>
      </template>

      <template #other>
        <div class="absolute bottom-0 left-0 right-0 z-1 wrapper-max pb-[calc(var(--app-outer-gutter)*1.25)] lg:pb-20 pointer-events-none">
          <div class="pointer-events-auto">
            <UiCarouselDots class="text-offwhite" />
          </div>
        </div>
      </template>
    </UiCarouselFade>
  </div>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.carousel__copy {
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      75% 100% at left bottom,
      --alpha(var(--color-black) / 60%) 0%,
      --alpha(var(--color-black) / 0%) 100%
    );
    pointer-events: none;
    z-index: -1;

    @variant 2xl {
      background: radial-gradient(
        50% 75% at calc(50vw - (var(--breakpoint-2xl)/2)) bottom,
        --alpha(var(--color-black) / 60%) 0%,
        --alpha(var(--color-black) / 0%) 100%
      );
    }
  }

  :deep(h3) {
    @apply type-h4;
    text-wrap: balance;
  }
}
</style>
