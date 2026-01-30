<script lang="ts" setup>
import '@mux/mux-player'

interface Props {
  playbackId: string
  primaryColor?: string
  accentColor?: string
  isCover?: boolean
}

const { playbackId, primaryColor = '#fff', accentColor = '#c6ea9f', isCover = false } = defineProps<Props>()

const hasPlayed = ref(false)
const attrs = useAttrs()
const showPlay = computed(() => !hasPlayed.value && Object.hasOwn(attrs, 'controls'))

onMounted(() => {
  const video = document.querySelector('mux-player')

  video?.addEventListener('play', () => hasPlayed.value = true)
})
</script>

<template>
  <div
    v-if="playbackId"
    :class="[
      'size-full',
      { relative: showPlay },
    ]"
  >
    <div
      v-if="showPlay"
      class="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
    >
      <p class="type-h4 text-offwhite">
        Play
      </p>
    </div>

    <mux-player
      v-bind="attrs"
      :id="playbackId"
      :playback-id="playbackId"
      :primary-color="primaryColor"
      :accent-color="accentColor"
      :class="[
        'block aspect-video',
        { 'size-full': isCover },
      ]"
      :style="{
        '--controls': Object.hasOwn($attrs, 'controls') ? null : 'none',
        '--media-object-fit': isCover ? 'cover' : null,
        '--media-object-position': isCover ? 'center' : null,
        '--seek-backward-button': 'none',
        '--seek-forward-button': 'none',
        '--playback-rate-button': 'none',
        '--rendition-menu-button': 'none',
        '--center-controls': 'none',
        '--volume-range': 'none',
      }"
    />
  </div>
</template>
