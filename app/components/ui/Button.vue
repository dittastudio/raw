<script lang="ts" setup>
import type { Themes } from '@@/types/app'

interface Props {
  type?: 'solid' | 'outline'
  themeOverride?: Themes
}

const { type = 'solid', themeOverride } = defineProps<Props>()

const hover = useTemplateRef<HTMLSpanElement>('hover')

const animateMe = (event: MouseEvent) => {
  const el = hover.value
  if (!el) {
    return
  }
  const { offsetX: x, offsetY: y } = event
  const { offsetWidth: width, offsetHeight: height } = el
  const move = 3
  const xMove = (x / width) * (move * 2) - move
  const yMove = (y / height) * (move * 2) - move

  el.style.setProperty('--x', `${xMove}px`)
  el.style.setProperty('--y', `${yMove}px`)
}

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
      inline-block
      rounded-full
      select-none
      type-p
    "
    @mousemove="animateMe"
  >

    <span class="ui-button__blob ui-button__blob--1">
      <span class="ui-button__blob__inner block size-full rounded-[inherit] bg-green" />
    </span>

    <span class="ui-button__blob ui-button__blob--2">
      <span class="ui-button__blob__inner block size-full rounded-[inherit] bg-pink" />
    </span>

    <span
      class="
        block
        relative
        z-1
        px-5
        pt-2
        pb-2.25
        rounded-full
        underline
        underline-offset-2
        decoration-[0.075em]
        decoration-transparent
        [a:hover_&]:decoration-current
        [button:hover_&]:decoration-current
        transition-colors
        duration-200
        ease-out
      "
      :class="{
        [solidThemeClasses]: type === 'solid',
        [outlineThemeClasses]: type === 'outline',
      }"
    >
      <slot />
    </span>
  </span>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.ui-button {
  position: relative;
  isolation: isolate;
}

.ui-button__blob {
  pointer-events: none;
  will-change: translate;
  position: absolute;
  inset: 0;
  z-index: -1;
  display: block;
  border-radius: inherit;
  filter: blur(1px);
  animation: exit 0.3s var(--ease-out) forwards;

  a:hover &,
  button:hover & {
    animation: enter 0.3s var(--ease-out) forwards;
  }

  &--1 {
    --direction: 1;
  }

  &--2 {
    --direction: -1;
  }
}

.ui-button__blob__inner {
  animation: pulsing 3s linear infinite;
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
