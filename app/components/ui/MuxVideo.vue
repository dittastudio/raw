<script lang="ts" setup>
import '@mux/mux-player'

interface Props {
  playbackId: string
  accentColor?: string
}

const { playbackId, accentColor = '#c6ea9f' } = defineProps<Props>()
</script>

<template>
  <mux-player
    v-if="playbackId"
    :id="playbackId"
    :playback-id="playbackId"
    :accent-color="accentColor"
    metadata-video-title="Test VOD"
    class="block"
    :style="{
      '--controls': Object.hasOwn($attrs, 'controls') ? null : 'none',
    }"
  />
</template>
