<script lang="ts" setup>
// interface Props {
// }

// const { } = defineProps<Props>()
const truths = {
  items: [
    {
      title: 'Societal truth',
      copy: 'The universal principles that resonate across cultures, societies and time.',
    },
    {
      title: 'Human truth',
      copy: 'The truths that resonate within each individual, their relationships and their experiences.',
    },
    {
      title: 'Brand truth',
      copy: 'The truths that resonate within the brand, its values and its mission.',
    },
    {
      title: 'Media truth',
      copy: 'The truths that resonate within the media, its audience and its content.',
    },
  ],
  headline: 'Raw truth™',
  copy: 'The single-minded solution that rallies everyone',
}

const container = useTemplateRef<HTMLDivElement>('container')

const { position, onMouseMove, onMouseLeave } = useSmoothMouse(container, {
  damping: 0.08,
  range: 1,
})

watch(position, ({ x, y }) => {
  if (container.value) {
    container.value.style.setProperty('--x', String(x))
    container.value.style.setProperty('--y', String(y))
  }
})
</script>

<template>
  <div
    ref="container"
    class="ui-truths relative p-[calc(var(--app-outer-gutter)*2)]"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <div class="relative">
      <UiTruthsItem
        class="z-1"
        :is-background="false"
        :items="truths.items"
        :headline="truths.headline"
        :copy="truths.copy"
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
          class="absolute size-0 hidden"
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
          :is-background="true"
          :items="truths.items"
          :headline="truths.headline"
          :copy="truths.copy"
        />

        <div
          class="
            ui-truths__cursor
            absolute
            w-[100%]
            max-w-[320px]
            md:w-[20%]
            aspect-square
            m-auto
            inset-0
            bg-green
            rounded-full
          "
        />
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
  translate: calc(var(--x) * 1px) calc(var(--y) * 1px) 0;
  transition:
    translate 0s var(--ease-out) 0.5s,
    opacity 0.5s var(--ease-out);
  border-radius: 50%;
  opacity: 0;

  .ui-truths:hover & {
    opacity: 1;
    translate: calc(var(--x) * 1px) calc(var(--y) * 1px) 0;
    transition:
      translate 0.2s var(--ease-out),
      opacity 0.2s var(--ease-out);
  }
}

@keyframes breathe {
  0%, 100% {
    transform: scale(0.95) translateZ(0);
  }
  50% {
    transform: scale(1.05) translateZ(0);
  }
}

.ui-truths__orb {
  transform: translateZ(0);
  /* animation: breathe 5s var(--ease-inOutSine) infinite; */
}
</style>
