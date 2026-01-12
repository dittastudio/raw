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
    <ul
      class="
        flex
        flex-col
        items-center
        justify-center
        lg:flex-row
        lg:gap-12
        font-display
        leading-none
        font-bold
        lg:font-normal
        lg:font-mono
        text-32
        lg:text-20
        tracking-[-0.03em]
        lg:tracking-[0.04em]
        uppercase
      "
    >
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
