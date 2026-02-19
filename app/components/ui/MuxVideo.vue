<script lang="ts" setup>
import '@mux/mux-player'

interface Events {
  (event: 'play'): void
  (event: 'loadeddata'): void
}

const emit = defineEmits<Events>()

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

const setPlayed = () => {
  hasPlayed.value = true
  emit('play')
}

const setLoadedData = () => {
  emit('loadeddata')
}

onMounted(() => {
  video.value = root.value?.querySelector('mux-player')

  video.value?.addEventListener('play', setPlayed)
  video.value?.addEventListener('loadeddata', setLoadedData)
})

onUnmounted(() => {
  video.value?.removeEventListener('play', setPlayed)
  video.value?.removeEventListener('loadeddata', setLoadedData)
})

const mainMouse = useSmoothMouse(root, { range: 0.05 })

const onMouseMove = (event: MouseEvent) => {
  if (showPlay.value) {
    mainMouse.onMouseMove(event)
  }
}

const onMouseLeave = () => {
  if (showPlay.value) {
    mainMouse.onMouseLeave()
  }
}

watchEffect(() => {
  if (!root.value || !showPlay.value) {
    return
  }

  root.value.style.setProperty('--x', String(mainMouse.position.value.x))
  root.value.style.setProperty('--y', String(mainMouse.position.value.y))
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
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <button
      v-if="showPlay"
      type="button"
      class="mux-video__button absolute inset-0 z-10 flex items-center justify-center type-h4 text-offwhite bg-transparent"
      @click="video?.play()"
    >
      <div class="mux-video__button-inner">
        Play
      </div>
    </button>

    <mux-player
      v-bind="attrs"
      :id="playbackId"
      :playback-id="playbackId"
      :primary-color="primaryColor"
      :accent-color="accentColor"
      :class="[
        'block',
        {
          'aspect-video': !isCover,
          'size-full': isCover,
        },
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
  opacity: 0.8;
  transition: opacity 0.5s var(--ease-out);

  &::before {
    --tint: var(--color-black);

    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background-image: radial-gradient(ellipse at 50% 50%, --alpha(var(--tint) / 33%) 0%, --alpha(var(--tint) / 0%) 100%);
  }

  &:hover {
    opacity: 1;
  }
}

.mux-video__button-inner {
  transition: transform 0.5s var(--ease-out);
  transform: 0 0 0;
  backface-visibility: hidden;

  .mux-video__button:hover & {
    transform: translate(calc(var(--x) * 1px), calc(var(--y) * 1px));
    transition: transform 0.2s var(--ease-out);
  }
}
</style>
