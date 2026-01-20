<script lang="ts" setup>
import type { Person } from '@@/.storyblok/types/289672313529140/storyblok-components'
import type { ISbStoryData } from '@storyblok/js'

interface Props {
  title?: string
  people?: (string | ISbStoryData<Person>)[]
}

const { title, people } = defineProps<Props>()
const peoples = computed(() => people?.filter(person => typeof person !== 'string'))
</script>

<template>
  <div class="grid gap-12">
    <h3
      v-if="title"
      class="type-h5"
    >
      {{ title }}
    </h3>

    <ul
      v-if="peoples?.length"
      class="grid grid-cols-1 md:grid-cols-6 gap-(--app-inner-gutter) w-full"
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
        />
      </li>
    </ul>
  </div>
</template>
