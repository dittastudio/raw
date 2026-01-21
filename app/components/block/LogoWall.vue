<script lang="ts" setup>
import type { BlockLogoWall } from '@@/.storyblok/types/289672313529140/storyblok-components'

interface Props {
  block: BlockLogoWall
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    class="flex flex-col gap-19 md:gap-38"
  >
    <UiContent
      :title="block.title"
      :headline="block.headline"
    />

    <div class="wrapper-max grid grid-cols-(--app-grid) gap-x-(--app-inner-gutter)">
      <ul class="col-span-full md:col-start-4 md:col-span-9 flex flex-wrap gap-10 md:gap-x-30 md:gap-y-15">
        <li
          v-for="logo in block.logos"
          :key="logo.id"
        >
          <NuxtImg
            v-if="logo.filename"
            class="block w-auto h-10 md:h-15 object-contain"
            :src="logo.filename"
            :alt="logo.alt"
            :height="60"
            densities="x1 x2"
            format="webp"
            :modifiers="{
              smart: true,
            }"
            loading="lazy"
          />
        </li>
      </ul>
    </div>
  </div>
</template>
