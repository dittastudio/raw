<script lang="ts" setup>
import type { Link } from '@@/.storyblok/types/289672313529140/storyblok-components'

interface Props {
  items?: Link[]
}

const { items } = defineProps<Props>()
const route = useRoute()
</script>

<template>
  <nav>
    <ul
      class="
        flex
        flex-col
        items-center
        justify-center
        gap-2
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
          'navigation__item': true,
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

<style scoped>
@reference "@/assets/css/app.css";

.navigation__item {
  --logo-width: 82px;
  --nav-gap:--spacing(12);

  @variant lg {
    &:first-child {
      margin-left: auto;
    }

    &:nth-last-child(2) {
      margin-right: auto;
    }

    &:last-child {
      display: flex;
      justify-content: flex-end;
      width: calc(var(--logo-width) - var(--nav-gap));
    }
  }
}
</style>
