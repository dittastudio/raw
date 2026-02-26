<script lang="ts" setup>
import type { BlockGallery } from '#storyblok-components'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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

const container = useTemplateRef('container')

onMounted(async () => {
  await nextTick()

  const items = container.value?.querySelectorAll('li')

  if (!items?.length) {
    return
  }

  gsap.fromTo(items, {
    opacity: 0,
    scale: 0.85,
    filter: 'blur(5px)',
    transformOrigin: 'center center',
  }, {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    duration: 1.5,
    ease: 'expo.out',
    stagger: {
      amount: 0.9,
    },
    scrollTrigger: {
      trigger: container.value,
      start: 'top 80%',
      end: 'bottom 50%',
      scrub: 1,
      markers: false,
    },
  })
})
</script>

<template>
  <div
    v-editable="block"
    class="wrapper-max flex flex-col gap-16 md:gap-24"
  >
    <h2
      v-if="block.title"
      class="type-h5 text-balance max-w-[36ch]"
    >
      {{ block.title }}
    </h2>

    <ul
      v-if="block.items?.length"
      ref="container"
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
          :alt="image.alt || block.title || ''"
          :width="3"
          :height="2"
          :sizes="getSizes(index)"
          loading="lazy"
        />
      </li>
    </ul>
  </div>
</template>
