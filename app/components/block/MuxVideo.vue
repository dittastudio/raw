<script lang="ts" setup>
import type { BlockMuxVideo } from '@@/.storyblok/types/289672313529140/storyblok-components'

interface TypedBlock extends BlockMuxVideo {
  video: {
    playbackId?: string
  }
}

interface Props {
  block: TypedBlock
}

const { block } = defineProps<Props>()

const attrs = computed(() => ({
  controls: block.controls,
  autoplay: block.autoplay,
  loop: block.loop,
}))
</script>

<template>
  <div class="wrapper-max">
    <UiMuxVideo
      v-if="block.video && block.video.playbackId"
      v-bind="attrs"
      :playback-id="block.video.playbackId"
    />
  </div>
</template>
