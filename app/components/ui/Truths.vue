<script lang="ts" setup>
export interface TTruthsItem {
  headline?: string
  copy?: string
  items: {
    title: string
    copy: string
  }[] | undefined
}

interface Props {
  item: TTruthsItem
}

const { item } = defineProps<Props>()

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
    class="ui-truths relative p-(--app-outer-gutter) -m-(--app-outer-gutter) group/truths"
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
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="absolute size-0 opacity-0"
          >
            <defs>
              <filter id="filter-core-values">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="40"
                  result="blur"
                />

                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                  result="filter-core-values"
                />

                <feComposite
                  in="SourceGraphic"
                  in2="filter-core-values"
                  operator="atop"
                />
              </filter>
            </defs>
          </svg>

          <UiTruthsItem
            class="opacity-0 group-hover/truths:opacity-100 transition-opacity duration-1000 ease-out"
            :is-masked="true"
            :headline="item.headline"
            :copy="item.copy"
            :items="item.items"
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
  filter: url(#filter-core-values) blur(3px);
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
  z-index: 10;
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
    ui-truths-blob 5s var(--ease-in-out) infinite,
    ui-truths-rotate 10s var(--ease-in-out) infinite alternate;
}

@keyframes ui-truths-blob {
  0% {
    border-radius: 25% 75% 35% 65% / 30% 45% 55% 70%;
  }
  33% {
    border-radius: 75% 25% 70% 30% / 60% 30% 70% 40%;
  }
  66% {
    border-radius: 35% 65% 20% 80% / 75% 25% 60% 40%;
  }
  100% {
    border-radius: 25% 75% 35% 65% / 30% 45% 55% 70%;
  }
}

@keyframes ui-truths-rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
