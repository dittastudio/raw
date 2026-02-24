<script lang="ts" setup>
import type { Person } from '#storyblok-components'
import type { Themes } from '@@/types/app'
import type { ISbStoryData } from '@storyblok/js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  title?: string
  people?: (string | ISbStoryData<Person>)[]
  accent: Themes
}

const { title, people, accent } = defineProps<Props>()
const peoples = computed(() => people?.filter(person => typeof person !== 'string'))
const container = useTemplateRef('container')

onMounted(async () => {
  await nextTick()

  const items = container.value?.querySelectorAll('li')

  if (!items?.length) {
    return
  }

  gsap.fromTo(items, {
    opacity: 0,
    scale: 0.75,
    filter: 'blur(5px)',
    transformOrigin: 'left center',
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
      end: 'bottom 70%',
      scrub: 1,
      markers: false,
    },
  })
})
</script>

<template>
  <div
    ref="container"
    class="@container grid gap-12"
  >
    <h3
      v-if="title"
      class="type-h5"
    >
      {{ title }}
    </h3>

    <ul
      v-if="peoples?.length"
      class="
        flex
        flex-wrap
        -ml-(--app-inner-gutter)
        gap-y-(--app-inner-gutter)
      "
    >
      <li
        v-for="(person, index) in peoples"
        :key="index"
        class="
          pl-(--app-inner-gutter)
          w-1/2
          @2xl:w-1/3
          @4xl:w-1/4
          @6xl:w-1/5
          @7xl:w-1/6
          first:ml-auto
          last:mr-auto
        "
      >
        <CardPerson
          v-if="person"
          :image="person.content.image"
          :name="person.content.name"
          :position="person.content.position"
          :linked-in="person.content.linkedin"
          :accent="accent"
        />
      </li>
    </ul>
  </div>
</template>
