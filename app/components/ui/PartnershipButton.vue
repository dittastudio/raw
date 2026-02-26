<script lang="ts" setup>
import type { Themes } from '@@/types/app'
import { useIntersectionObserver } from '@vueuse/core'
import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

gsap.registerPlugin(DrawSVGPlugin)

interface Props {
  theme?: Themes
}

const { theme } = defineProps<Props>()

const themeTextClasses = computed(() => theme === 'dark' ? 'text-offblack' : 'text-offwhite')
const themeBgClasses = computed(() => theme === 'dark' ? 'bg-offwhite' : 'bg-offblack')

const logoElement = useTemplateRef('logoElement')
const lineElement = useTemplateRef('lineElement')
const maskId = useId()

let drawAnimation: gsap.core.Tween | undefined

onMounted(() => {
  if (!logoElement.value || !lineElement.value) {
    return
  }

  drawAnimation = gsap.from(lineElement.value, {
    drawSVG: '0%',
    duration: 2,
    ease: 'power2.inOut',
    paused: true,
  })
})

useIntersectionObserver(
  logoElement,
  (entries: IntersectionObserverEntry[]) => {
    const entry = entries[0]
    if (!drawAnimation || !entry) {
      return
    }

    entry.isIntersecting ? drawAnimation.play() : drawAnimation.reverse()
  },
  { threshold: 0, rootMargin: '0px 0px -10% 0px' },
)

const containerElement = useTemplateRef('containerElement')

const { position, onMouseEnter, onMouseMove } = useSmoothMouse(containerElement, {
  damping: 0.2,
  range: 1,
})

watchEffect(() => {
  if (!containerElement.value) {
    return
  }

  containerElement.value.style.setProperty('--x', String(position.value.x))
  containerElement.value.style.setProperty('--y', String(position.value.y))
})
</script>

<template>
  <NuxtLink
    to="https://jaa-media.co.uk/"
    target="_blank"
    class="partner-button block @container relative isolate type-p max-w-84 hover:opacity-90x hover:scale-102x transition-[opacity,scale] duration-300 ease-out"
    :class="themeTextClasses"
  >
    <div
      ref="containerElement"
      class="relative"
      @mouseenter="onMouseEnter"
      @mousemove="onMouseMove"
    >
      <div class="partner-button__cursor">
        <div class="partner-button__cursor-inner" />
      </div>

      <div
        class="
        mask-image
        @container
        size-full
        flex
        items-center
        justify-between
        text-[4.5cqi]
        aspect-295/35
        px-[7.5%]
        pb-[0.5cqi]
      "
        :class="themeBgClasses"
      >
        In partnership with <span class="sr-only">JAA Media</span>
      </div>

      <svg
        ref="logoElement"
        class="
        absolute
        top-[3.5cqi]
        right-[4cqi]
        w-[22cqi]
        h-auto
        aspect-65/34
      "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 198.2 104"
      >
        <g :mask="`url('#${maskId}')`">
          <path
            d="M137.8 33.358l-2.6-1-1.7-3.3c-2.6.5-5.1 1.1-7.7 1.5-2.3.3-4.5.5-6.8.5-3.4.2-6.7-1.3-8.7-4-.4-.6-.8-1.2-1.4-2-2.1 2.4-3.8 4.3-5.5 6.2-1.7 1.8-3.7 3.3-5.9 4.4-2.7 0-2.9-2-3.4-3.9l-21.1 6.8c-.2 1.1-.4 2.1-.5 3.1-.9 7-1.6 14-2.7 21-1.1 6.9-2.6 13.7-4.5 20.3-1.3 4.5-3.6 8.7-6.6 12.2-1.8 2.2-4.2 3.4-6.5 4.7-3.5 2-7.4 3.3-11.4 3.9-5.3.8-10.7-.5-15.1-3.5-8.1-5.2-14.7-12.3-19.4-20.5-1.7-3-3.3-6-4.8-9-2.4-4.3-1.9-9.6 1.2-13.4 3.5-4.8 8.4-7.6 13.7-10 5.3-2.3 10.8-3.7 16.5-4.3 11.8-1.5 23.6-3.6 35.2-6.3.4-.1.8-.3 1.2-.5 1.9-6.2 1.7-12.9 3-19.2 1.1-.7 2.2-.6 2.8.1.7 1.1 1.2 2.2 1.7 3.4-1.9 4.4-2.9 9.1-3.2 13.9 1.1.4 2.3.3 3.4-.2 5.7-1.7 11.3-3.4 17-5.1 1.5-.4 2.8-1.4 3.6-2.8 1.1-1.5 2.2-3 3.5-4.3 1.2-1.4 2.5-2.7 3.8-4 2.9-.2 3.8.2 5.8 2.4-.1.5-.3 1.1-.5 2 .3.2.9.5 1.2.9 3.5 5.4 8.9 5.2 14.2 4.4 4-.7 7.9-1.7 11.8-2.9 1-.3 1.9-.8 2.8-1.3 1.1-.6 2.2-1.2 3.2-1.7 1.4-.2 2.8.3 3.9 1.3-.4.6-.6 1.3-1.1 1.6-1.3.7-2.6 1.3-3.9 1.9-1.4.5-2.6 1.5-3.3 2.9 1.2.1 2.4-.1 3.5-.7 2.1-.8 4.2-1.7 6.4-2.3 1.7-.4 3.4-.7 5.2-.9 1.8-.2 3.6.3 5 1.3 1.8 1.3 3.7 2.3 5.8 3 2.4.7 4.9.9 7.3.7 1.5-.2 3.1-.3 4.3 1.4l-1 1.7c-6.2-.1-12.1-.5-17.5-3.9-1.9-1.2-4.2-1.5-6.3-.8-2.1.6-4.1 1.4-6.2 2.1-2.9.6-5.3 1.4-7.7 2.2zm-31.7-11.2c-.9.8-1.6 1.8-1.9 3 1.1-.9 2.1-1.6 1.9-3 .6.1 1.2.2 1.4-.9l-1.4.9zm-37.4 17.5c-1.9.2-3.9.5-5.8.9-5.6 1.7-11.3 2.5-17.1 3.4-6.2 1-12.5 2-18.7 3.1-4.6.9-9 2.5-13.1 4.8-3.7 1.9-6.8 4.9-8.9 8.5-1.8 2.9-2 6.5-.7 9.6 1 2.4 2.1 4.8 3.3 7 3.9 7.3 9.1 13.7 15.4 19 2.9 2.4 6.3 4.1 9.9 5 1.8.3 3.7.4 5.5.1 1.6-.2 3.1-.6 4.7-1.1 3.3-1.7 5.9-3.2 8.7-4.4 4.3-1.7 6.8-5.2 8.6-9 2.3-4.9 3.8-10.2 4.4-15.5.8-5.9 1.6-11.7 2.4-17.6.5-4.1.9-8.2 1.3-12.4.2-.3.1-.9.1-1.4z"
            fill="currentColor"
          />

          <path
            class="st0"
            d="M196.8 31.858c-2.3-.3-3.6-1.1-4.5-2.8 2.4-1.6 3.4-1.5 6 .7l-1.5 2.1z"
            fill="currentColor"
          />

          <path
            d="M77.2 3.5c-1.5 1.6-2.7 1-3.8.2-1.2-.8-1.6-2-1.2-3.7 2.3.4 4.5.5 5 3.5z"
            fill="currentColor"
          /></g>

        <defs>
          <mask :id="maskId">
            <path
              ref="lineElement"
              fill="none"
              stroke="#FFF"
              stroke-width="7"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-miterlimit="10"
              d="M74.6 12.5L68.8 56s-2.6 33.7-14.5 40.6-16.7 10.3-33.7-.9-17.2-27.4-17.9-34 11.2-13.5 21-15.2c9.8-1.7 52.2-9.8 57.9-12 5.7-2.2 15.7-1.8 21.1-12 2.1-2.3 3.7-3 5.8-2.5 0 0-8.3.3-11.1 12.6 3.3-1.6 7.5-5.4 8.5-6.8s3.8-3.8 6 .6 21.7 3.8 32-3.2c-.1 0-8 2.4-7.1 7.8 0-.1 8.4-.6 12.2-3.1 3.8-2.4 10.5.5 13.2 2 2.7 1.4 19.4 2 19.4 2s8.9-15.6-6.9-17.4S74.6 2.2 74.6 2.2s-19.4-4.4-4.3-8.5 133.3-10.5 124.9 36.1"
            /></mask>
        </defs>
      </svg>
    </div>
  </NuxtLink>
</template>

<style>
@reference "@/assets/css/app.css";

.mask-image {
  mask: url(/imgs/button-mask.svg) no-repeat center / contain;
}

.partner-button__cursor {
  pointer-events: none;

  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  transform-style: preserve-3d;
  translate: calc(-50% + var(--x) * 1px) calc(-50% + var(--y) * 1px) 0;
  backface-visibility: hidden;

  width: 32px;
  height: 32px;
  border-radius: 50%;
  opacity: 0;

  transition: opacity 0.5s var(--ease-out);

  .partner-button:hover & {
    opacity: 1;
    transition: opacity 0.3s var(--ease-out);
  }
}

.partner-button__cursor-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: var(--color-purple);
  filter: blur(5px);

  animation:
    animate-breathe 3s var(--ease-inOutSine) infinite forwards,
    animate-morph-circle 5s var(--ease-in-out) infinite forwards,
    animate-rotate 10s var(--ease-in-out) infinite forwards alternate;
}
</style>
