<script lang="ts" setup>
import type { StoryblokAsset } from '#storyblok-types'
import type { Themes } from '@@/types/app'
import IconLinkedIn from '@/assets/icons/linkedin.svg'

interface Props {
  image?: StoryblokAsset
  name?: string | null
  position?: string | null
  linkedIn?: string | null
  accent: Themes
}

const { image, name, position, linkedIn, accent } = defineProps<Props>()
</script>

<template>
  <div class="group relative items-start overflow-hidden h-full">
    <div class="w-full aspect-3/4 overflow-hidden">
      <NuxtImg
        v-if="image?.filename && storyblokAssetType(image.filename) === 'image'"
        class="block size-full object-cover"
        :src="image.filename"
        :alt="image.alt || name || ''"
        :width="300"
        :height="Math.round(storyblokImageDimensions(image.filename).height / storyblokImageDimensions(image.filename).width * 300)"
        loading="lazy"
      />
    </div>

    <div
      class="
        only-hover:absolute
        only-hover:bottom-0
        only-hover:left-0
        only-hover:right-0
        only-hover:transition-transform
        only-hover:duration-200
        only-hover:ease-out
        only-hover:translate-y-[101%]
        only-touch:h-full
        group-hover:translate-y-0
        transform-gpu
        w-full
        p-4
      "
      :class="getThemeClasses[accent]"
    >
      <div
        class="
          flex
          flex-col
          gap-1
          only-hover:opacity-0
          only-hover:transition-opacity
          only-hover:duration-100
          only-hover:ease-out
          group-hover:opacity-100
          group-hover:delay-50
          group-hover:duration-500
        "
      >
        <div
          class="
          flex
          items-start
          justify-between
          gap-1
        "
        >
          <h5
            v-if="name"
            class="type-p type-mono-14 font-bold"
          >
            {{ name }}
          </h5>

          <p
            v-if="linkedIn"
            class="type-p type-mono-14"
          >
            <NuxtLink
              :to="linkedIn"
              target="_blank"
              rel="noopener noreferrer"
              class="block p-2 -m-2 transition-opacity duration-200 ease-out hover:opacity-60"
            >
              <IconLinkedIn class="block size-4" />

              <span class="sr-only">LinkedIn</span>
            </NuxtLink>
          </p>
        </div>

        <p
          v-if="position"
          class="type-mono-14"
        >
          {{ position }}
        </p>
      </div>
    </div>
  </div>
</template>
