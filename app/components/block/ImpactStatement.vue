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
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      markers: false,
    },
  })

  for (let i = 0; i < items.length; i++) {
    if (!tl) {
      break
    }

    const item = items[i]

    if (!item) {
      continue
    }

    const title = item.querySelector('[data-js="title"]')
    const copy = item.querySelector('[data-js="copy"]')

    if (title) {
      tl
        .fromTo(title, {
          opacity: 0,
          scale: 0.95,
          filter: 'blur(5px)',
        }, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1,
        })
    }

    if (copy) {
      tl
        .fromTo(copy, {
          opacity: 0,
          scale: 0.95,
          filter: 'blur(5px)',
        }, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1,
        }, '<0.5')
    }

    tl
      .to({}, { duration: 1 })

    if (title) {
      tl
        .to(title, {
          opacity: 0,
          duration: 1,
        })
    }

    if (copy) {
      tl
        .to(copy, {
          opacity: 0,
          duration: 1,
        }, '<')
    }
  }
}

onMounted(() => {
  createAnimations()
})

onUnmounted(() => {
  removeAnimations()
})
</script>

<template>
  <div
    ref="container"
    v-editable="block"
    class="w-full"
    :style="{
      height: block.items?.length ? `${(block.items.length * 100) * 2}vh` : '100vh',
    }"
  >
    <div class="sticky top-0 w-full h-screen grid grid-cols-1 grid-rows-1 gap-0 place-items-center">
      <div
        v-for="item in block.items"
        :key="item._uid"
        data-js="item"
        class="wrapper-max col-start-1 row-start-1 grid grid-cols-(--app-grid) gap-x-(--app-inner-gutter) gap-y-10 md:gap-y-20"
      >
        <div
          v-if="storyblokRichTextContent(item.title)"
          data-js="title"
          class="col-span-full sm:col-start-2 [&_h3]:type-h2"
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
  </div>
</template>
