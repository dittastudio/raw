<script lang="ts" setup>
import type { Link } from '@@/.storyblok/types/289672313529140/storyblok-components'
import IconLogo from '@/assets/icons/logo.svg?component'

interface Props {
  navigation?: Link[]
}

const { navigation } = defineProps<Props>()
</script>

<template>
  <header class="sticky top-0 wrapper py-7.5 w-full flex flex-row items-center justify-between z-50">
    <IconLogo class="text-offblack w-auto h-8 block" />

    <div class="w-full">
      <AppNavigation
        v-if="navigation"
        :items="navigation"
      />
    </div>
  </header>
</template>

<style scoped>
/* @reference "@/assets/css/app.css"; */
</style>
