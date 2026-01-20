<script lang="ts" setup>
import type { Person } from '@@/.storyblok/types/289672313529140/storyblok-components'
import type { Themes } from '@@/types/app'
import type { ISbStoryData } from '@storyblok/js'

interface Props {
  title?: string
  people?: (string | ISbStoryData<Person>)[]
  accent: Themes
}

const { title, people, accent } = defineProps<Props>()
const peoples = computed(() => people?.filter(person => typeof person !== 'string'))
</script>

<template>
  <div class="@container grid gap-12">
    <h3
      v-if="title"
      class="type-h5"
    >
      {{ title }}
    </h3>

    <ul
      v-if="peoples?.length"
      class="grid grid-cols-1 @lg:grid-cols-2 @2xl:grid-cols-3 @4xl:grid-cols-4 @6xl:grid-cols-5 @7xl:grid-cols-6 gap-(--app-outer-gutter) @2xl:gap-(--app-inner-gutter) w-full"
    >
      <li
        v-for="(person, index) in peoples"
        :key="index"
      >
        <CardPerson
          v-if="person"
          :image="person.content.image"
          :name="person.content.name"
          :position="person.content.position"
          :accent="accent"
        />
      </li>
    </ul>
  </div>
</template>
