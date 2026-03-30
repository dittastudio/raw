<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core'
import '@mux/mux-player'

interface Events {
  (event: 'play'): void
  (event: 'ready'): void
}

const emit = defineEmits<Events>()

interface Props {
  name?: string
  dataCapture?: boolean
  playbackId: string
  primaryColor?: string
  accentColor?: string
  isCover?: boolean
  disableTracking?: boolean
  lazyLoad?: boolean
}

const {
  name,
  dataCapture = false,
  playbackId,
  primaryColor = '#fff',
  accentColor = '#c6ea9f',
  isCover = false,
  disableTracking = true,
  lazyLoad = true,
} = defineProps<Props>()

const hasPlayed = ref(false)
const attrs = useAttrs()
const hasControls = computed(() => Object.hasOwn(attrs, 'controls'))
const showPlay = computed(() => !hasPlayed.value && hasControls.value)
const root = useTemplateRef('root')
const video = ref<HTMLVideoElement | null | undefined>(null)
const isInView = ref(!lazyLoad)
const appStore = useAppStore()

const { stop } = useIntersectionObserver(
  root,
  ([entry]) => {
    if (entry?.isIntersecting) {
      isInView.value = true
      stop()
    }
  },
  { rootMargin: '300px' },
)

const setPlayed = () => {
  hasPlayed.value = true
  emit('play')
}

const setLoadedData = () => {
  emit('ready')
}

const setupVideo = async () => {
  await nextTick()

  video.value = root.value?.querySelector('mux-player')

  video.value?.addEventListener('play', setPlayed)
  video.value?.addEventListener('loadeddata', setLoadedData)
  video.value?.addEventListener('canplay', setLoadedData)

  if (video.value && video.value.readyState >= 2) {
    setLoadedData()
  }
}

watch(isInView, (value) => {
  if (value) {
    setupVideo()
  }
})

onMounted(() => {
  if (isInView.value) {
    setupVideo()
  }
})

onUnmounted(() => {
  video.value?.removeEventListener('play', setPlayed)
  video.value?.removeEventListener('loadeddata', setLoadedData)
  video.value?.removeEventListener('canplay', setLoadedData)
})

const mainMouse = useSmoothMouse(root, { damping: 1, range: 0.05 })

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

const showDataCapture = ref(false)

const onDataCaptureSuccess = () => {
  appStore.setDataCaptured(true)
  showDataCapture.value = false
  video.value?.play()
}

const tryPlayVideo = async () => {
  if (dataCapture && !appStore.dataCaptured) {
    showDataCapture.value = true
    return
  }

  // TODO: If cookie for data captured is already set:
  // 1. Play the video immediately.
  // 2. Send data off to high-level from the cookie + user info.

  video.value?.play()
}
</script>

<template>
  <div
    v-if="playbackId"
    ref="root"
    :class="[
      'size-full relative isolate',
      {
        'aspect-video': !isCover || !isInView,
      },
    ]"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <div
      v-if="dataCapture && hasControls"
      :class="[
        'absolute inset-0 z-2 size-full transition-opacity duration-250 backdrop-blur-md',
        { 'opacity-0 pointer-events-none': !showDataCapture || appStore.dataCaptured },
      ]"
    >
      <UiDataCapture
        legend="Enter your details to watch the video"
        :metadata="{ name, playbackId, url: $route.fullPath }"
        @success="onDataCaptureSuccess"
      />
    </div>

    <button
      v-if="showPlay"
      type="button"
      class="mux-video__button absolute inset-0 z-1 flex items-center justify-center type-h4 text-offwhite bg-transparent"
      @click="tryPlayVideo()"
    >
      <div class="mux-video__button-inner">
        Play
      </div>
    </button>

    <mux-player
      v-if="isInView"
      v-bind="attrs"
      :id="playbackId"
      :playback-id="playbackId"
      :primary-color="primaryColor"
      :accent-color="accentColor"
      :disable-tracking="disableTracking"
      preload="metadata"
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
  transition: translate 0.5s var(--ease-out);
  translate: 0 0 0;
  backface-visibility: hidden;

  .mux-video__button:hover & {
    translate: calc(var(--x) * 1px) calc(var(--y) * 1px) 0;
    transition: translate 0.2s var(--ease-out);
  }
}

mux-player::part(bottom play button),
mux-player::part(bottom time display) {
  display: inline-flex;
}
</style>
