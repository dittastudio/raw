<script lang="ts" setup>
import '@mux/mux-player'

interface Props {
  playerId: string
  accentColor?: string
}

const { playerId, accentColor = '#000' } = defineProps<Props>()
</script>

<template>
  <mux-player
    v-if="playerId"
    :id="playerId"
    :playback-id="playerId"
    :accent-color="accentColor"
    metadata-video-title="Test VOD"
    class="block"
    :style="{
      '--controls': Object.hasOwn($attrs, 'controls') ? null : 'none',
    }"
  />
</template>
