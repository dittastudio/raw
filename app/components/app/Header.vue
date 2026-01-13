<script lang="ts" setup>
import type { Link } from '@@/.storyblok/types/289672313529140/storyblok-components'
import IconLogo from '@/assets/icons/logo.svg?component'

interface Props {
  navigation?: Link[]
}

const { navigation } = defineProps<Props>()

const isOpen = ref(false)
</script>

<template>
  <header
    :class="{ 'is-open': isOpen }"
    class="header sticky top-0 wrapper py-7.5 w-full flex flex-row items-center justify-between z-10"
  >
    <NuxtLink
      class="p-7.5 -m-7.5"
      to="/"
    >
      <IconLogo class="text-offblack w-(--app-header-logo-width) h-(--app-header-logo-height) block" />
    </NuxtLink>

    <button
      class="p-7.5 -m-7.5 z-1 lg:hidden"
      @click="isOpen = !isOpen"
    >
      <AppSwitch
        :is-open="isOpen"
      />
    </button>

    <div
      data-lenis-prevent
      class="header__navigation w-full"
    >
      <!-- :class="{
        'max-lg:opacity-0 max-lg:pointer-events-none': !isOpen,
        'max-lg:opacity-100 max-lg:pointer-events-auto': isOpen,
      }" -->
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
  --disc-size: 16px;
  --disc-offset: 36px;

  @variant md {
    --disc-size: 16px;
    --disc-offset: 46px;
  }

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

    clip-path: circle(var(--disc-size) at calc(100% - var(--disc-offset)) var(--disc-offset));
    transition: clip-path 0.4s cubic-bezier(0.34, 1.06, 0.24, 1);

    .header.is-open & {
      clip-path: circle(150% at calc(100% - var(--disc-offset)) var(--disc-offset));
      transition: clip-path 0.4s var(--ease-in-out);
    }
  }
}
</style>
