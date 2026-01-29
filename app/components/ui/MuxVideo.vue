<script lang="ts" setup>
import '@mux/mux-player'

interface Props {
  playbackId: string
  accentColor?: string
  isCover?: boolean
}

const { playbackId, accentColor = '#c6ea9f', isCover = false } = defineProps<Props>()
</script>

<template>
  <mux-player
    v-if="playbackId"
    :id="playbackId"
    :playback-id="playbackId"
    :accent-color="accentColor"
    metadata-video-title="Test VOD"
    class="block aspect-video"
    :class="{ 'size-full': isCover }"
    :style="{
      '--controls': Object.hasOwn($attrs, 'controls') ? null : 'none',
      '--media-object-fit': isCover ? 'cover' : null,
      '--media-object-position': isCover ? 'center' : null,
    }"
  />
</template>
