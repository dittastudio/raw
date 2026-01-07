<script lang="ts" setup>
interface Props {
  colour?: 'dark' | 'light'
  mode?: 'solid' | 'outline'
}

const { colour = 'dark', mode = 'solid' } = defineProps<Props>()
</script>

<template>
  <span
    class="inline-block rounded-full select-none px-4 pt-2 pb-2.5 font-mono text-16"
    :class="{
      'text-black outline outline-black': colour === 'dark' && mode === 'outline',
      'text-white outline outline-white': colour === 'light' && mode === 'outline',
      'bg-black text-white': colour === 'dark' && mode === 'solid',
      'bg-white text-black': colour === 'light' && mode === 'solid',
    }"
  >
    <slot />
  </span>
</template>
