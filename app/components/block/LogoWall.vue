<script lang="ts" setup>
import type { BlockLogoWall } from '#storyblok-components'
import type { Themes } from '@@/types/app'

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

      <ul
        class="col-span-full md:col-start-4 md:col-span-9 grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4"
        :class="block.theme && typeof block.theme === 'string' ? getThemeClasses[block.theme as Themes] : undefined"
      >
        <li
          v-for="logo in block.logos"
          :key="logo.id"
          class="w-full aspect-square flex items-center justify-center p-5 outline outline-current bg-inherit"
        >
          <template v-if="logo.filename && storyblokAssetType(logo.filename) === 'image'">
            <img
              v-if="fileExtension(logo.filename) === 'svg'"
              class="invert-appearance block w-auto h-10 md:h-15 object-contain"
              :src="logo.filename || ''"
              :alt="logo.alt || ''"
              loading="lazy"
            >

            <NuxtImg
              v-else
              class="invert-appearance block w-auto h-10 md:h-15 object-contain"
              :src="logo.filename || ''"
              :alt="logo.alt || ''"
              densities="x1 x2"
              height="60"
              loading="lazy"
            />
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>
