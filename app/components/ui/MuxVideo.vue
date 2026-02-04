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
const root = useTemplateRef('root')
const video = ref<HTMLVideoElement | null | undefined>(null)

const setPlayed = () => hasPlayed.value = true

onMounted(() => {
  video.value = root.value?.querySelector('mux-player')

  video.value?.addEventListener('play', setPlayed)
})

onUnmounted(() => {
  video.value?.removeEventListener('play', setPlayed)
})
</script>

<template>
  <div
    v-if="playbackId"
    ref="root"
    :class="[
      'size-full',
      { relative: showPlay },
    ]"
  >
    <button
      v-if="showPlay"
      type="button"
      class="mux-video__button absolute inset-0 z-10 flex items-center justify-center type-h4 text-offwhite bg-transparent"
      @click="video?.play()"
    >
      Play
    </button>

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

<style scoped>
@reference "@/assets/css/app.css";

.mux-video__button {
  --tint: var(--color-offblack);

  background-image: radial-gradient(ellipse at 50% 50%, --alpha(var(--tint) / 25%) 0%, --alpha(var(--tint) / 0%) 33.34%);
}
</style>
