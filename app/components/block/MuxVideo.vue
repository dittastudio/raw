<script lang="ts" setup>
import type { BlockMuxVideo } from '@@/.storyblok/types/289672313529140/storyblok-components'
import type { Themes } from '@@/types/app'

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
  <UiTheme
    v-if="block.video && block.video.playbackId"
    v-editable="block"
    :theme="(block.theme as Themes)"
    class="wrapper-max grid gap-x-(--app-inner-gutter) grid-cols-(--app-grid)"
  >
    <div class="col-span-full lg:col-span-10 lg:col-start-2">
      <UiMuxVideo
        v-bind="attrs"
        :playback-id="block.video.playbackId"
      />
    </div>
  </UiTheme>
</template>
