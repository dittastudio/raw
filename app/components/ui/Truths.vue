<script lang="ts" setup>
import type { Themes } from '@@/types/app'

interface Item {
  title: string
  copy: string
}

export interface TTruthsItem {
  headline?: string
  copy?: string
  items: Item[]
}

interface Props {
  item: TTruthsItem
  theme?: Themes
}

const { item, theme = 'light' } = defineProps<Props>()

const container = useTemplateRef('container')

const { position, onMouseMove, onMouseLeave } = useSmoothMouse(container, {
  damping: 0.08,
  range: 0.9,
})

watch(position, ({ x, y }) => {
  if (!container.value) {
    return
  }

  container.value.style.setProperty('--x', String(x))
  container.value.style.setProperty('--y', String(y))
})
</script>

<template>
  <div
    ref="container"
    class="ui-truths relative isolate p-(--app-outer-gutter) -m-(--app-outer-gutter) group/truths"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <div class="max-w-280 mx-auto">
      <div class="relative">
        <UiTruthsItem
          class="z-1"
          :headline="item.headline"
          :copy="item.copy"
          :items="item.items"
          :theme="theme"
        />

        <div
          class="
            ui-truths__background
            absolute
            inset-0
            -z-1
            size-full
            pointer-events-none
            backface-hidden
            preserve-3d
            translate-z-0
          "
          aria-hidden="true"
        >
          <EffectGaussianBlur
            filter-id="truths-goo"
            :std-deviation="40"
          />

          <UiTruthsItem
            class="opacity-0 group-hover/truths:opacity-100 transition-opacity duration-1000 ease-out"
            :is-masked="true"
            :headline="item.headline"
            :copy="item.copy"
            :items="item.items"
            :theme="theme"
          />

          <div class="ui-truths__cursor">
            <div class="ui-truths__cursor-inner" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.ui-truths {
  --x: 0;
  --y: 0;
}

.ui-truths__background {
  filter: url(#truths-goo) blur(3px);
}

.ui-truths__cursor {
  --cursor-size: 50%;

  @variant md {
    --cursor-size: 25%;
  }

  width: var(--cursor-size);
  aspect-ratio: 1/1;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  border-radius: 50%;
  pointer-events: none;
  opacity: 0;
  translate: calc(var(--x) * 1px - 50%) calc(var(--y) * 1px - 50%) 0;
  transition:
    translate 0s var(--ease-out) 1s,
    opacity 1s var(--ease-out);

  .ui-truths:hover & {
    opacity: 1;
    transition:
      translate 0.1s var(--ease-out),
      opacity 1s var(--ease-out);
  }
}

.ui-truths__cursor-inner {
  width: 100%;
  height: 100%;
  background: var(--color-green);
  border-radius: 50%;
  opacity: 0.75;
  animation:
    animate-morph-circle 5s var(--ease-in-out) infinite,
    animate-rotate 10s var(--ease-in-out) infinite alternate;
}
</style>
