<script lang="ts" setup>
import type { BlockProjectCarousel, Project } from '#storyblok-components'
import type { Themes } from '@@/types/app'
import type { ISbStoryData } from '@storyblok/js'
import type { Carousel } from '@/components/ui/CarouselFade.vue'
import IconArrow from '@/assets/icons/arrow-left.svg'

interface Props {
  block: BlockProjectCarousel
}

const { block } = defineProps<Props>()

const theme = computed(() => (block.theme as Themes) ?? 'light')

const carouselRef = useTemplateRef<Carousel>('carouselFade')

const isSmBreakpoint = '600px'
</script>

<template>
  <div
    v-editable="block"
    class="flex flex-col gap-y-30 overflow-hidden"
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
      ref="carouselFade"
      :items="(block.projects as ISbStoryData<Project>[])"
      :options="{ loop: true }"
      :autoplay-interval="Number(block.autoplay_delay) * 1000 || 5000"
      autoplay
    >
      <template #item="{ item }">
        <NuxtLink
          v-if="item.full_slug"
          :to="`/${item.full_slug}`"
          class="block relative size-full isolate aspect-10/16 sm:aspect-video md:min-h-160 max-h-[calc(100svh-var(--app-header-height))]"
        >
          <template v-if="item.content.preview_media?.[0]">
            <picture v-if="isImageComponent(item.content.preview_media[0]) && item.content.preview_media[0].image?.filename && storyblokAssetType(item.content.preview_media[0].image.filename) === 'image'">
              <MediaSource
                :media="`(min-width: ${isSmBreakpoint})`"
                :width="16"
                :height="9"
                :src="item.content.preview_media[0].image.filename"
                sizes="sm:100vw md:100vw lg:100vw"
              />

              <NuxtImg
                class="size-full object-cover"
                sizes="2xs:100vw xs:100vw sm:100vw"
                :width="10"
                :height="16"
                :src="item.content.preview_media[0].image.filename"
                :alt="item.content.preview_media[0].image.alt"
                loading="lazy"
              />
            </picture>

            <UiMuxVideo
              v-else-if="isMuxVideoAutoplayComponent(item.content.preview_media[0]) && item.content.preview_media[0].video?.playbackId"
              :playback-id="item.content.preview_media[0].video.playbackId"
              :is-cover="true"
              :poster="item.content.preview_media[0].poster?.filename ? storyblokImage(item.content.preview_media[0].poster.filename, {
                width: 1600,
                height: 900,
                format: 'webp',
                quality: 80,
              }) : null"
              playsinline
              autoplay
              muted
              loop
            />
          </template>

          <div
            class="
              carousel__copy
              absolute
              inset-0
              pt-(--app-outer-gutter)
              pb-[calc(var(--app-outer-gutter)*3)]
              xl:pb-40
              flex
              flex-col
              justify-end
              z-1
            "
          >
            <div class="wrapper-max text-offwhite text-balance size-full flex flex-col items-start justify-between">
              <NuxtImg
                v-if="item.content.preview_logo?.filename && storyblokAssetType(item.content.preview_logo.filename) === 'image'"
                class="block w-auto h-17 md:h-23"
                :src="item.content.preview_logo.filename"
                :alt="item.content.preview_logo.alt || block.title || item.content?.preview_text || ''"
                :width="Math.round(storyblokImageDimensions(item.content.preview_logo.filename).height / storyblokImageDimensions(item.content.preview_logo.filename).width * 92)"
                :height="92"
                densities="x1 x2"
                :modifiers="{ smart: false }"
                loading="lazy"
              />

              <div class="flex flex-col gap-y-6 md:gap-y-10">
                <h3 class="type-p max-w-[32ch]">
                  {{ item.content.preview_text }}
                </h3>

                <p class="type-h4 max-w-[24ch]">
                  {{ item.content.preview_headline }}
                </p>
              </div>
            </div>
          </div>
        </NuxtLink>
      </template>

      <template
        v-if="block.projects && block.projects.length > 1"
        #other
      >
        <div class="max-md:hidden absolute inset-0 pointer-events-none flex items-center justify-between wrapper-max">
          <button
            type="button"
            class="group pointer-events-auto p-6 -m-6 opacity-70 hover:opacity-100 transition-opacity duration-200 ease-out transform-gpu"
            aria-label="Previous Project"
            @click="carouselRef?.previous()"
          >
            <IconArrow class="size-8 fill-current group-hover:scale-105 transition-[scale] duration-200 ease-out" />
          </button>

          <button
            type="button"
            class="group pointer-events-auto p-6 -m-6 opacity-70 hover:opacity-100 transition-opacity duration-200 ease-out transform-gpu"
            aria-label="Next Project"
            @click="carouselRef?.next()"
          >
            <IconArrow class="size-8 fill-current rotate-180 group-hover:scale-105 transition-[scale] duration-200 ease-out" />
          </button>
        </div>

        <div class="absolute bottom-0 left-0 right-0 z-1 wrapper-max pb-[calc(var(--app-outer-gutter)*1.25)] xl:pb-20 pointer-events-none">
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
}
</style>
