<script lang="ts" setup>
import type { Link } from '@@/.storyblok/types/289672313529140/storyblok-components'
import IconLogo from '@/assets/icons/logo.svg?component'

interface Props {
  navigation?: Link[]
}

const { navigation } = defineProps<Props>()
</script>

<template>
  <header class="header sticky top-0 wrapper py-7.5 w-full flex flex-row items-center justify-between z-10">
    <NuxtLink to="/">
      <IconLogo class="text-offblack w-(--app-header-logo-width) h-8 block" />
    </NuxtLink>

    <div
      data-lenis-prevent
      class="header__navigation w-full"
    >
      <AppNavigation
        v-if="navigation"
        :items="navigation"
      />
    </div>
  </header>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.header {
  height: var(--app-header-height);

  & + * {
    margin-top: calc(var(--app-header-height) * -1);
  }
}

.header__navigation {
  @variant max-lg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100dvh;
    background-color: var(--color-offblack);
    color: var(--color-white);
    display: flex;
    flex-direction: column;
    justify-content: safe center;
    align-items: safe center;
    text-align: center;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding-block: var(--app-header-height);
  }
}
</style>
