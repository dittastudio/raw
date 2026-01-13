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
        navigation__list
        pointer-events-none
        flex
        flex-col
        items-center
        justify-center
        lg:flex-row
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
          'lg:font-normal lg:underline underline-offset-2': determineHref(item.link).startsWith(route.path) && route.path !== '/',
          'text-outline-white lg:text-outline-none lg:font-normal': !determineHref(item.link).startsWith(route.path) || route.path === '/',
        }"
      >
        <StoryblokLink
          :item="item.link"
          class="navigation__link block pointer-events-auto p-2 lg:py-7.5 lg:px-6"
        >
          {{ item.title }}
        </StoryblokLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.navigation__list {

}

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

.navigation__link {
  transition: opacity 0.2s var(--ease-out);

  .navigation__list:hover &:not(:hover) {
    opacity: 0.5;
  }
}
</style>
