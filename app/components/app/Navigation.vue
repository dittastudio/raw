<script lang="ts" setup>
import type { Link } from '@@/.storyblok/types/289672313529140/storyblok-components'

interface Props {
  items?: Link[]
}

const { items } = defineProps<Props>()
</script>

<template>
  <nav>
    <ul>
      <li
        v-for="item in items"
        :key="item._uid"
      >
        <StoryblokLink :item="item.link">
          {{ item.title }}
        </StoryblokLink>
      </li>
    </ul>
  </nav>
</template>
