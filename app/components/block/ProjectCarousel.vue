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
      :autoplay="false"
      :autoplay-interval="4000"
    >
      <template #item="{ item }">
        <NuxtLink
          v-if="item.full_slug"
          :to="`/${item.full_slug}`"
          class="block relative size-full isolate aspect-10/16 sm:aspect-video md:min-h-160 max-h-svh"
        >
          <NuxtImg
            v-if="item.content.preview_image?.filename && storyblokAssetType(item.content.preview_image.filename) === 'image'"
            class="block size-full object-cover"
            :src="item.content.preview_image.filename"
            :alt="item.content.preview_image.alt || ''"
            :width="storyblokImageDimensions(item.content.preview_image.filename).width"
            :height="storyblokImageDimensions(item.content.preview_image.filename).height"
            sizes="
              xs:100vw
              sm:100vw
              md:100vw
              lg:100vw
              xl:100vw
            "
            loading="lazy"
          />

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
                :alt="item.content.preview_logo.alt || ''"
                :width="Math.round(storyblokImageDimensions(item.content.preview_logo.filename).height / storyblokImageDimensions(item.content.preview_logo.filename).width * 92)"
                :height="92"
                densities="x1 x2"
                :modifiers="{ smart: false }"
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
            class="group pointer-events-auto p-6 -m-6 opacity-70 hover:opacity-100 transition-opacity duration-200 ease-out"
            @click="carouselRef?.previous()"
          >
            <IconArrow class="size-8 fill-current group-hover:scale-105 transition-[scale] duration-200 ease-out" />
          </button>

          <button
            type="button"
            class="group pointer-events-auto p-6 -m-6 opacity-70 hover:opacity-100 transition-opacity duration-200 ease-out"
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
