<script lang="ts" setup>
import type { Link } from '@@/.storyblok/types/289672313529140/storyblok-components'

interface Props {
  items?: Link[]
}

const { items } = defineProps<Props>()
const route = useRoute()
</script>

<template>
  <nav class="bg-offblack text-white lg:bg-transparent lg:text-offblack">
    <ul class="flex items-center justify-center lg:gap-12 flex-col lg:flex-row uppercase font-display text-32 lg:font-mono lg:text-20 font-bold">
      <li
        v-for="item in items"
        :key="item._uid"
        :class="{
          'lg:font-bold': determineHref(item.link).startsWith(route.path) && route.path !== '/',
          'text-outline-white lg:text-outline-none lg:font-normal': !determineHref(item.link).startsWith(route.path) || route.path === '/',
        }"
      >
        <StoryblokLink
          :item="item.link"
          class="block"
        >
          {{ item.title }}
        </StoryblokLink>
      </li>
    </ul>
  </nav>
</template>
