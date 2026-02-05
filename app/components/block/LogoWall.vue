<script lang="ts" setup>
import type { BlockLogoWall } from '@@/.storyblok/types/289672313529140/storyblok-components'

interface Props {
  block: BlockLogoWall
}

const { block } = defineProps<Props>()

const shouldRenderUiContent = computed(() => {
  const title = block.title?.trim() ?? ''
  const headline = storyblokRichTextContent(block.headline)

  return (title && headline) || (!title && headline)
})
</script>

<template>
  <div
    v-editable="block"
    :class="{
      'flex flex-col gap-19 md:gap-38': shouldRenderUiContent,
    }"
  >
    <UiContent
      v-if="shouldRenderUiContent"
      :title="block.title"
      :headline="block.headline"
    />

    <div
      :class="[
        'wrapper-max grid grid-cols-(--app-grid) gap-x-(--app-inner-gutter)',
        {
          'gap-y-10': !shouldRenderUiContent,
        },
      ]"
    >
      <div
        v-if="block.title && !shouldRenderUiContent"
        class="col-span-full md:col-start-1 md:col-span-3"
      >
        <h2 class="type-h5">
          {{ block.title }}
        </h2>
      </div>

      <ul class="col-span-full md:col-start-4 md:col-span-9 flex flex-wrap gap-10 md:gap-x-30 md:gap-y-15">
        <li
          v-for="logo in block.logos"
          :key="logo.id"
        >
          <NuxtImg
            v-if="logo.filename"
            class="invert-appearance block w-auto h-10 md:h-15 object-contain"
            :src="logo.filename"
            :alt="logo.alt"
            :height="60"
            densities="x1 x2"
            loading="lazy"
          />
        </li>
      </ul>
    </div>
  </div>
</template>
