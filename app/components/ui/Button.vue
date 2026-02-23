<script lang="ts" setup>
import type { Themes } from '@@/types/app'

interface Props {
  type?: 'solid' | 'outline'
  theme?: Themes
}

const { type = 'solid', theme = 'light' } = defineProps<Props>()

const hover = useTemplateRef('hover')

const mainMouse = useSmoothMouse(hover, { range: 0.9 })
const blobMouse = useSmoothMouse(hover, { damping: 0.2, range: 1 })

const onMouseMove = (event: MouseEvent) => {
  mainMouse.onMouseMove(event)
  blobMouse.onMouseMove(event)
}

const onMouseLeave = () => {
  mainMouse.onMouseLeave()
  blobMouse.onMouseLeave()
}

watchEffect(() => {
  if (!hover.value) {
    return
  }

  hover.value.style.setProperty('--x', String(mainMouse.position.value.x))
  hover.value.style.setProperty('--y', String(mainMouse.position.value.y))
  hover.value.style.setProperty('--blob-x', String(blobMouse.position.value.x))
  hover.value.style.setProperty('--blob-y', String(blobMouse.position.value.y))
})

const solidThemeClasses = computed(() => {
  switch (theme) {
    case 'dark':
      return 'bg-offwhite text-offblack'
    default:
      return 'bg-offblack text-offwhite'
  }
})

const outlineThemeClasses = computed(() => {
  return 'outline outline-current -outline-offset-1'
})
</script>

<template>
  <span
    ref="hover"
    class="
      ui-button
      relative
      isolate
      inline-block
      align-top
      rounded-full
      select-none
      type-p
      p-1
      -m-1
    "
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="absolute size-0 opacity-0"
    >
      <defs>
        <filter id="goo">
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="10"
            result="blur"
          />

          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            result="goo"
          />

          <feComposite
            in="SourceGraphic"
            in2="goo"
            operator="atop"
          />
        </filter>
      </defs>
    </svg>

    <span class="relative">
      <span class="ui-button__container absolute inset-0 flex items-center justify-center">
        <span class="ui-button__blob ui-button__blob--1">
          <span class="ui-button__blob__inner block size-full rounded-[inherit] bg-green" />
        </span>

        <span class="ui-button__blob ui-button__blob--2">
          <span class="ui-button__blob__inner block size-full rounded-[inherit] bg-pink" />
        </span>
      </span>

      <span
        class="
        ui-button__inner
        block
        pointer-events-none
        relative
        z-1
        px-5
        pt-2
        pb-2.25
        rounded-full
        overflow-hidden
      "
        :class="[
          {
            [getThemeClasses[theme]]: type === 'outline',
            [outlineThemeClasses]: type === 'outline',
            [solidThemeClasses]: type === 'solid',
          },
        ]"
      >
        <span class="ui-button__shadow" />

        <slot />
      </span>
    </span>
  </span>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.ui-button {
  --x: 0;
  --y: 0;
  --blob-x: 0;
  --blob-y: 0;
}

.ui-button__inner {
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-color: --alpha(currentColor / 10%);
    opacity: 0;
    transition: opacity 0.2s var(--ease-out);
  }

  a:active &::after,
  button:not(:disabled):active &::after {
    opacity: 1;
  }
}

.ui-button__shadow {
  pointer-events: none;
  content: '';

  position: absolute;
  z-index: -1;
  inset: 0;
  transform-style: preserve-3d;
  translate: 0 0 0;
  backface-visibility: hidden;

  width: 25%;
  aspect-ratio: 1 / 1;
  margin: auto;

  opacity: 0;
  background-color: var(--color-white);
  filter: blur(20px);
  border-radius: 50%;

  transition:
    opacity 0.4s var(--ease-out),
    translate 0s 0.4s;

  a:hover &,
  button:not(:disabled):hover & {
    translate: calc(var(--x) * 1px) calc(var(--y) * 1px) 0;
    opacity: 0.3;
    transition:
      opacity 0.2s var(--ease-out),
      translate 0.2s var(--ease-out);
  }
}

.ui-button__container {
  filter: url(#goo);
}

.ui-button__blob {
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: block;
  border-radius: 999px;
  filter: blur(1px);
  opacity: 0;
  transition:
    opacity 0.4s var(--ease-out),
    translate 0s 0.4s;

  a:hover &,
  button:not(:disabled):hover &  {
    opacity: 1;
    translate: calc((var(--blob-x) / 12) * var(--direction) * 1px) calc((var(--blob-y) / 3) * var(--direction) * 1px) 0;
    transition:
      opacity 0.2s var(--ease-out),
      translate 0.2s var(--ease-out);
  }
}

.ui-button__blob--1 {
  --direction: 0.75;

  animation: animate-breathe 3s var(--ease-inOutSine) infinite;
}

.ui-button__blob--2 {
  --direction: 1;

  top: 50%;
  left: 50%;
  width: auto;
  aspect-ratio: 1;

  a:hover &,
  button:not(:disabled):hover &  {
    opacity: 1;
    translate: calc(var(--blob-x) * 1px - 50%) calc(var(--blob-y) * 1px - 50%) 0;
    transition:
      opacity 0.2s var(--ease-out),
      translate 0.2s var(--ease-out);

    animation:
      animate-morph-circle 5s var(--ease-in-out) infinite,
      animate-rotate 10s var(--ease-in-out) infinite alternate;
  }
}
</style>
