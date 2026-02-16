<script lang="ts" setup>
import type { BlockHoverList } from '#storyblok-components'
import type { Themes } from '@@/types/app'

interface Props {
  block: BlockHoverList
}

const { block } = defineProps<Props>()

const items = computed(() => block.items ?? [])
const accent = computed(() => (block.accent as Themes) ?? 'light')
const media = computed(() => block.media?.[0] || null)
</script>

<template>
  <div
    v-editable="block"
    class="relative isolate flex flex-col gap-y-20"
    :class="{ 'py-[calc(var(--app-vertical-spacing)*2)]': media }"
  >
    <div
      v-if="media"
      class="absolute inset-0 -z-1"
    >
      <NuxtImg
        v-if="media && isImageComponent(media) && media.image?.filename && storyblokAssetType(media.image.filename) === 'image'"
        class="block size-full object-cover"
        :src="media.image.filename"
        :alt="media.image.alt || ''"
        :width="16"
        :height="9"
        loading="lazy"
        sizes="
          100vw
          xs:100vw
          sm:100vw
          md:100vw
          lg:100vw
          xl:100vw
        "
      />
    </div>

    <UiContent
      :title="block.title"
      :headline="block.headline"
      :copy="block.copy"
      :cta="block.cta"
      :cta-title="block.cta_title"
    />

    <UiList
      v-if="items.length"
      :accent="accent"
      :items="items"
    />
  </div>
</template>
