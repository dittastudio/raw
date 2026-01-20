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
  const move = 5
  const xMove = (x / width) * (move * 2) - move
  const yMove = (y / height) * (move * 2) - move

  el.style.setProperty('--x', `${xMove}px`)
  el.style.setProperty('--y', `${yMove}px`)
}

const solidThemeClasses = computed(() => {
  switch (themeOverride) {
    case 'light':
      return 'bg-white text-offblack'
    case 'dark':
      return 'bg-offblack text-white'
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
      return 'bg-white text-offblack outline outline-offblack -outline-offset-1'
    case 'dark':
      return 'bg-offblack text-white outline outline-white -outline-offset-1'
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
      px-5
      pt-2
      pb-[9px]
      type-p
      underline
      underline-offset-2
      decoration-[0.075em]
      decoration-transparent
      [a:hover_&]:decoration-current
      transition-colors
      duration-200
      ease-out
    "
    :class="{
      [solidThemeClasses]: type === 'solid',
      [outlineThemeClasses]: type === 'outline',
    }"
    @mousemove="animateMe"
  >
    <span
      class="ui-button__blob ui-button__blob--1"
    />

    <span
      class="ui-button__blob ui-button__blob--2"
    />

    <slot />
  </span>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.ui-button {
  position: relative;
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

  .ui-button:hover & {
    animation: enter 0.3s var(--ease-out) forwards;
  }

  &--1 {
    --direction: 1;

    background-color: var(--color-green);
  }

  &--2 {
    --direction: -1;

    background-color: var(--color-pink);
  }
}

@keyframes enter {
  from {
    translate: 0 0 0;
  }

  to {
    translate: calc(var(--x) * var(--direction)) calc(var(--y) * var(--direction)) 0;
  }
}

@keyframes exit {
  from {
    translate: calc(var(--x) * var(--direction)) calc(var(--y) * var(--direction)) 0;
  }

  to {
    translate: 0 0 0;
  }
}
</style>
