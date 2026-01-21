<script lang="ts" setup>
import type { Themes } from '@@/types/app'

interface Props {
  type?: 'solid' | 'outline'
  themeOverride?: Themes
}

const { type = 'solid', themeOverride } = defineProps<Props>()

const hover = useTemplateRef<HTMLSpanElement>('hover')

const hoverHandler = (event: MouseEvent) => {
  if (!hover.value) {
    return
  }

  const { top, left, width, height } = hover.value.getBoundingClientRect()

  hover.value.style.setProperty(
    '--x',
    String(event.clientX - (left + Math.floor(width / 2))),
  )
  hover.value.style.setProperty(
    '--y',
    String(event.clientY - (top + Math.floor(height / 2))),
  )
}

const hoverOut = () => {
  if (!hover.value) {
    return
  }

  hover.value.style.setProperty('--x', '0')
  hover.value.style.setProperty('--y', '0')
}

// const animateMe = (event: MouseEvent) => {
//   const el = hover.value
//   if (!el) {
//     return
//   }
//   const { offsetX: x, offsetY: y } = event
//   const { offsetWidth: width, offsetHeight: height } = el
//   const move = 3
//   const xMove = (x / width) * (move * 2) - move
//   const yMove = (y / height) * (move * 2) - move

//   el.style.setProperty('--x', `${xMove}px`)
//   el.style.setProperty('--y', `${yMove}px`)
// }

const solidThemeClasses = computed(() => {
  switch (themeOverride) {
    case 'light':
      return 'bg-offwhite text-offblack'
    case 'dark':
      return 'bg-offblack text-offwhite'
    case 'blue':
      return 'bg-blue text-offblack'
    case 'green':
      return 'bg-green text-offblack'
    case 'pink':
      return 'bg-pink text-offblack'
    case 'purple':
      return 'bg-purple text-offblack'
    default:
      return 'bg-(--app-button-background-color) text-(--app-button-text-color)'
  }
})

const outlineThemeClasses = computed(() => {
  switch (themeOverride) {
    case 'light':
      return 'bg-offwhite text-offblack outline outline-offblack -outline-offset-1'
    case 'dark':
      return 'bg-offblack text-offwhite outline outline-offwhite -outline-offset-1'
    case 'blue':
      return 'bg-blue text-offblack outline outline-offblack -outline-offset-1'
    case 'green':
      return 'bg-green text-offblack outline outline-offblack -outline-offset-1'
    case 'pink':
      return 'bg-pink text-offblack outline outline-offblack -outline-offset-1'
    case 'purple':
      return 'bg-purple text-offblack outline outline-offblack -outline-offset-1'
    default:
      return 'bg-(--app-background-color) outline outline-(--app-text-color) -outline-offset-1'
  }
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
      rounded-full
      select-none
      type-p
    "
    @mousemove="hoverHandler"
    @mouseleave="hoverOut"
  >
    <div class="ui-button__container absolute -inset-1 flex items-center justify-center overflow-hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="fixed top-0 left-0 w-0 h-0"
      >
        <defs>
          <filter id="goo2">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="30"
              result="blur"
            />

            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo2"
            />

            <feComposite
              in="SourceGraphic"
              in2="goo2"
              operator="atop"
            />
          </filter>
        </defs>
      </svg>

      <span class="ui-button__blob ui-button__blob--1">
        <span class="ui-button__blob__inner block size-full rounded-[inherit] bg-green" />
      </span>

      <span class="ui-button__blob ui-button__blob--2">
        <span class="ui-button__blob__inner block size-full rounded-[inherit] bg-pink" />
      </span>
    </div>

    <span
      class="
        block
        pointer-events-none
        relative
        z-1
        px-5
        pt-2
        pb-2.25
        rounded-full
        transition-colors
        duration-200
        ease-out
        overflow-hidden
      "
      :class="{
        [solidThemeClasses]: type === 'solid',
        [outlineThemeClasses]: type === 'outline',
      }"
    >
      <span class="ui-button__shadow" />

      <slot />
    </span>
  </span>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.ui-button {
  --x: 0;
  --y: 0;
  --t: 1;
}

.ui-button__container {
  filter: url(#goo2) blur(6px);
  width: 100%;
  height: 100%;
}

.ui-button__shadow {
  --t: 1;

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
  background-color: currentColor;
  filter: blur(20px);
  border-radius: 50%;

  transition:
    opacity 0.4s var(--ease-out),
    translate 0s 0.4s;

  .ui-button:hover & {
    translate: calc(var(--x) / var(--t) * 1px) calc(var(--y) / var(--t) * 1px) 0;
    opacity: 0.3;
    transition:
      opacity 0.2s var(--ease-out),
      translate 0.2s var(--ease-out);
  }
}

.ui-button__blob {
  pointer-events: none;
  --t: 1;
  /* will-change: translate; */
  position: absolute;
  /* inset: 0; */
  width: 50%;
  /* height: 100%; */
  aspect-ratio: 1 / 1;
  z-index: 1;
  display: block;
  border-radius: 50%;
  /* filter: blur(20px); */
  opacity: 0;
  transition:
    opacity 0.4s var(--ease-out),
    translate 0s 0.4s;

  .ui-button:hover & {
    opacity: 1;
    translate: calc((var(--x) * var(--direction)) / var(--t) * 1px) calc((var(--y) * var(--direction)) / var(--t) * 1px) 0;
    transition:
      opacity 0.2s var(--ease-out),
      translate 0.2s var(--ease-out);
  }

  &--1 {
    --direction: 1;
  }

  &--2 {
    --direction: -1;
  }
}

.ui-button__blob__inner {
  /* animation: pulsing 3s linear infinite; */
}

@keyframes pulsing {
  0%,
  100% {
    transform: scale(1);
  }

  25% {
    transform: scale(1.015);
  }

  50% {
    transform: scale(1.02);
  }

  75% {
    transform: scale(1.01);
  }
}

@keyframes enter {
  from {
    translate: 0 0 0;
    opacity: 0;
  }

  to {
    translate: calc(var(--x) * var(--direction)) calc(var(--y) * var(--direction)) 0;
    opacity: 1;
  }
}

@keyframes exit {
  from {
    translate: calc(var(--x) * var(--direction)) calc(var(--y) * var(--direction)) 0;
    opacity: 1;
  }

  to {
    translate: 0 0 0;
    opacity: 0;
  }
}
</style>
