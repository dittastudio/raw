<script lang="ts" setup>
import type { BlockImpactStatement } from '#storyblok-components'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  block: BlockImpactStatement
}

const { block } = defineProps<Props>()

const container = useTemplateRef('container')
const isScreenMd = useAtMedia(getMediaQuery('md'))

let tl: gsap.core.Timeline | null = null

const removeAnimations = () => {
  if (!tl) {
    return
  }

  tl.scrollTrigger?.kill()
  tl.kill()
  tl = null

  const items = container.value?.querySelectorAll('[data-js="item"]')

  items?.forEach((item) => {
    const title = item.querySelector('[data-js="title"]')
    const copy = item.querySelector('[data-js="copy"]')

    gsap.set([title, copy].filter(Boolean), { clearProps: 'all' })
  })
}

const createAnimations = () => {
  const items = container.value?.querySelectorAll('[data-js="item"]')

  if (!items?.length) {
    return
  }

  removeAnimations()

  tl = gsap.timeline({
    scrollTrigger: {
      trigger: container.value,
      start: 'top 90%',
      end: 'bottom 20%',
      scrub: 1,
      markers: false,
    },
  })

  items.forEach((item) => {
    const title = item.querySelector('[data-js="title"]')
    const copy = item.querySelector('[data-js="copy"]')

    if (tl && title) {
      tl.fromTo(title, {
        opacity: 0,
        y: 20,
      }, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'expo.out',
      })
    }

    if (tl && copy) {
      tl.fromTo(copy, {
        opacity: 0,
        x: 20,
      }, {
        opacity: 1,
        x: 0,
        duration: 1.5,
        ease: 'expo.out',
      })
    }

    if (tl && title) {
      tl.to(title, {
        opacity: 0,
      })
    }

    if (tl && copy) {
      tl.to(copy, {
        opacity: 0,
      }, '<')
    }
  })
}

watch(isScreenMd, (value) => {
  if (value) {
    createAnimations()
  }
  else {
    removeAnimations()
  }
}, { immediate: true })

onUnmounted(() => {
  removeAnimations()
})
</script>

<template>
  <div
    ref="container"
    v-editable="block"
    class="flex flex-col gap-36 md:grid md:grid-cols-1 md:grid-rows-1 md:gap-0 md:place-items-start"
  >
    <div
      v-for="item in block.items"
      :key="item._uid"
      data-js="item"
      class="wrapper-max md:col-start-1 md:row-start-1 grid grid-cols-(--app-grid) gap-x-(--app-inner-gutter) gap-y-10 md:gap-y-20"
    >
      <div
        v-if="storyblokRichTextContent(item.title)"
        data-js="title"
        class="md:col-start-2 col-span-full sm:col-start-2 sm:col-span-7 md:col-span-9 [&_h3]:type-h2 [&_h3]:text-wrap[balance] [&_h3]:max-w-[20ch]"
      >
        <StoryblokText :html="item.title" />
      </div>

      <div
        v-if="storyblokRichTextContent(item.copy)"
        data-js="copy"
        class="prose-p"
        :class="{
          'col-start-2 col-span-3 sm:col-start-5 sm:col-span-4 md:col-start-9 md:col-span-4 lg:col-start-9 lg:col-span-3': storyblokRichTextContent(item.copy),
          'col-start-1 col-span-full md:col-start-4': !storyblokRichTextContent(item.copy),
        }"
      >
        <StoryblokText :html="item.copy" />
      </div>
    </div>
  </div>
</template>
