<script lang="ts" setup>
interface Props {
  colour?: 'dark' | 'light'
  mode?: 'solid' | 'outline'
}

const { colour = 'dark', mode = 'solid' } = defineProps<Props>()
</script>

<template>
  <span
    class="inline-block rounded-full select-none px-4.5 pt-1.5 pb-2 type-p transition-colors duration-200 ease-in-out"
    :class="{
      'text-offblack outline outline-offblack -outline-offset-1 hover:bg-offblack hover:text-white': colour === 'dark' && mode === 'outline',
      'text-white outline outline-white -outline-offset-1 hover:bg-white hover:text-offblack': colour === 'light' && mode === 'outline',
      'bg-offblack text-white hover:bg-white hover:text-offblack': colour === 'dark' && mode === 'solid',
      'bg-white text-offblack hover:bg-offblack hover:text-white': colour === 'light' && mode === 'solid',
    }"
  >
    <slot />
  </span>
</template>
