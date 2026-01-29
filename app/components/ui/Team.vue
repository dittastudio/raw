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
          :accent="accent"
        />
      </li>
    </ul>
  </div>
</template>
