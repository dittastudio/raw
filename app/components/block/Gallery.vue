<script lang="ts" setup>
import type { BlockGallery } from '@@/.storyblok/types/289672313529140/storyblok-components'

interface Props {
  block: BlockGallery
}

const { block } = defineProps<Props>()

const MOBILE_COLUMNS = 2
const DESKTOP_COLUMNS = 3

const getRemainder = (total: number, columns: number) => total % columns

const getMobileSize = (total: number, isLast: boolean) => {
  const mobileRemainder = getRemainder(total, MOBILE_COLUMNS)

  return isLast && mobileRemainder === 1 ? '100vw' : '50vw'
}

const getDesktopSize = (total: number, index: number) => {
  const isLast = index === total - 1
  const isSecondLast = index === total - 2
  const desktopRemainder = getRemainder(total, DESKTOP_COLUMNS)

  if (desktopRemainder === 1) {
    return isLast ? '100vw' : '33vw'
  }

  if (desktopRemainder === 2) {
    return isLast || isSecondLast ? '50vw' : '33vw'
  }

  return '33vw'
}

const getDesktop2xlSize = (total: number) => {
  const desktopRemainder = getRemainder(total, DESKTOP_COLUMNS)

  if (desktopRemainder === 0) {
    return '567px'
  }

  if (desktopRemainder === 2) {
    return '880px'
  }

  return '1740px'
}

const formatSizes = (mobile: string, desktop: string, desktop2xl: string) => `
  2xs:${mobile}
  xs:${mobile}
  sm:${mobile}
  md:${desktop}
  lg:${desktop}
  xl:${desktop}
  2xl:${desktop2xl}
`

const getSizes = (index: number) => {
  const total = block.items?.length ?? 0
  const isLast = index === total - 1
  const mobileSize = getMobileSize(total, isLast)
  const desktopSize = getDesktopSize(total, index)
  const desktop2xlSize = getDesktop2xlSize(total)

  return formatSizes(mobileSize, desktopSize, desktop2xlSize)
}
</script>

<template>
  <div
    v-editable="block"
    data-component="gallery"
    class="wrapper-max flex flex-col gap-16 md:gap-24"
  >
    <h2 class="type-h5 text-balance max-w-[36ch]">
      {{ block.title }}
    </h2>

    <ul
      v-if="block.items?.length"
      v-editable="block"
      class="flex flex-wrap -ml-(--app-inner-gutter) gap-y-(--app-inner-gutter)"
    >
      <li
        v-for="(image, index) in block.items"
        :key="image.id"
        :class="[
          'grow pl-(--app-inner-gutter)',
          block.items?.length === 4 ? 'basis-1/2' : 'basis-1/2 md:basis-1/3',
        ]"
      >
        <NuxtImg
          v-if="image.filename && storyblokAssetType(image.filename) === 'image'"
          class="block size-full object-cover"
          :src="image.filename"
          :alt="image.alt || ''"
          :width="3"
          :height="2"
          :sizes="getSizes(index)"
          format="webp"
          :modifiers="{
            smart: true,
          }"
          loading="lazy"
        />
      </li>
    </ul>
  </div>
</template>
