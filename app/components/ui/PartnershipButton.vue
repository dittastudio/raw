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

const containerElement = ref<HTMLDivElement>()

const { position, onMouseMove, onMouseLeave } = useSmoothMouse(containerElement, {
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
</script>

<template>
  <div>
    <div
      class="partner-button @container w-full max-w-100 flex relative isolate type-p"
      :class="themeTextClasses"
    >
      <EffectGaussianBlur filter-id="partner-button-goo" />

      <div
        ref="containerElement"
        class="partner-button__container relative inline-block transform-gpu"
        @mousemove="onMouseMove"
        @mouseleave="onMouseLeave"
      >
        <NuxtLink
          to="https://jaa-media.co.uk/"
          target="_blank"
          class="partner-button__filter relative flex flex-col items-center @sm:flex-row @sm:items-stretch @sm:justify-stretch"
        >
          <div class="partner-button__cursor shrink-0 aspect-square rounded-full">
            <div class="partner-button__cursor-inner size-full aspect-square bg-offblack rounded-full" />
          </div>

          <div class="bg-offblack rounded-full py-2.5 px-5 whitespace-nowrap">
            In partnership with <span class="sr-only">JAA Media</span>
          </div>

          <div class="partner-button__circle @sm:self-center w-3 @sm:w-[5cqi] h-6 @sm:h-[3cqi] aspect-square bg-offblack rounded-full" />

          <div class="bg-offblack rounded-full py-2.5 w-26 @sm:w-[25cqi] h-9 @sm:h-auto whitespace-nowrap" />
        </NuxtLink>

        <svg
          ref="logoElement"
          class="
            absolute
            pointer-events-none
            z-1
            top-[72%]
            left-[47%]
            translate-x-[-50%]
            @sm:top-[30%]
            @sm:right-[6%]
            @sm:translate-x-0
            @sm:left-auto
            w-20
            h-auto
            aspect-65/34
          "
          xmlns="http://www.w3.org/2000/svg"
          width="198.2"
          height="104"
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

        <!-- <svg
          ref="logoElement"
          class="
            absolute
            pointer-events-none
            z-1
            top-[72%]
            left-[47%]
            translate-x-[-50%]
            @sm:top-[30%]
            @sm:right-[6%]
            @sm:translate-x-0
            @sm:left-auto
            w-20
            h-auto
            aspect-65/34
          "
          viewBox="0 0 65 34"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="logo-line-2"
            d="M23.695 0C24.3677 0.0786991 25.3523 0.405604 25.1811 1.27129C24.2515 1.8343 23.3954 0.980712 23.5972 0C23.6277 0 23.6644 0 23.695 0Z"
          />

          <path
            id="logo-line-1"
            d="M34.1337 5.96297C34.9715 5.56948 36.4331 6.19907 36.0172 7.25243C36.6899 7.96677 37.1669 8.68112 38.1882 8.9717C39.766 9.41968 43.478 8.60847 45.0436 7.98493C45.8936 7.64592 46.6702 6.76207 47.6181 7.16767C48.9329 7.73068 46.4623 8.4995 46.0832 8.71744C45.759 8.90511 45.5144 9.18358 45.3187 9.49233C46.5479 9.50443 47.6242 8.74771 48.8351 8.46924C49.7891 8.2513 50.6697 8.08785 51.5931 8.48134C52.8712 9.03224 53.3116 9.74053 54.9811 9.88582C55.4336 9.92214 57.5495 9.61946 57.6046 10.3338C57.6046 10.3943 57.3966 10.7939 57.3355 10.8302C56.9686 11.0542 54.3083 10.6486 53.7457 10.5154C53.2504 10.3943 52.7245 10.2127 52.2597 10.0069C51.0427 9.47416 50.9816 8.99591 49.4466 9.3652C48.034 9.70421 46.5907 10.4246 45.1659 10.7818C44.909 10.7878 44.4565 10.6547 44.2669 10.4851C43.9856 10.2369 43.9122 9.54076 43.5697 9.48627C43.1967 9.43179 41.4416 9.90398 40.8545 9.97057C39.1606 10.1643 37.4666 10.3035 36.2129 8.94143C36.0845 8.80219 35.7176 8.05758 35.5097 8.20287C35.5036 8.28762 35.473 8.38448 35.4118 8.44502C34.7269 9.15937 34.0114 10.0493 33.2592 10.6789C32.2563 11.5143 31.1677 12.2226 30.8559 10.3762L30.6785 10.2914L23.9577 12.4647C23.762 12.61 23.6581 13.6694 23.6152 14.0024C22.9426 18.7546 22.4289 28.8523 18.1297 31.7279C10.8647 36.589 5.05506 31.2254 1.56929 24.9839C0.126064 22.4111 -0.980823 20.5586 1.33691 17.9918C5.09787 13.8208 12.6871 13.8026 17.9218 12.8159C19.5057 12.5192 21.0835 12.1802 22.6429 11.7685C23.3278 9.74053 23.1444 7.52485 23.707 5.47262C24.343 4.86118 25.0646 6.19301 25.0646 6.65916C25.0646 6.90131 24.6304 7.80332 24.5387 8.1726C24.4164 8.63269 23.8843 10.9997 24.2023 11.2177H24.8139C26.6913 10.4549 29.2292 10.1764 31.021 9.33493C31.7365 8.99592 31.8466 8.48134 32.3174 7.94861C32.9168 7.27059 33.5772 6.64705 34.1459 5.94481L34.1337 5.96297ZM22.49 12.8643C20.7288 13.0519 19.047 13.5907 17.3042 13.9237C12.7849 14.7773 5.61155 14.9105 2.41932 18.5064C0.352324 20.8371 1.20236 22.6411 2.51717 25.0384C4.27229 28.2348 8.14333 33.1142 12.2284 32.8539C13.7328 32.757 16.2034 31.5523 17.5427 30.7895C20.9 28.8886 21.4259 22.3808 21.8663 18.9362C22.1231 16.9203 22.3677 14.8984 22.4778 12.8643H22.49Z"
          />

          <path
            id="logo-line-3"
            d="M63.4994 9.12298C64.007 9.02006 64.6185 9.24405 64.8142 9.7223C64.3861 10.7454 63.3343 10.1824 62.9307 9.44383C62.9368 9.35908 63.3954 9.14114 63.4994 9.12298Z"
          />
        </svg> -->
      </div>
    </div>
  </div>
</template>

<style>
@reference "@/assets/css/app.css";

.partner-button__filter {
  filter: url(#partner-button-goo);
}

.partner-button__cursor {
  pointer-events: none;

  position: absolute;
  top: 50%;
  left: 50%;
  z-index: -1;
  transform-style: preserve-3d;
  translate: 0 0 0;
  backface-visibility: hidden;

  width: 16px;
  height: 16px;
  background-color: var(--color-offblack);
  opacity: 0;

  transition:
    opacity 0.5s var(--ease-out),
    translate 0.3s 0.5s;

  .partner-button__container:hover & {
    width: 32px;
    height: 32px;
    opacity: 1;
    translate: calc(-50% + var(--x) * 1px) calc(-50% + var(--y) * 1px) 0;
    transition:
      opacity 0.3s var(--ease-out),
      translate 0.3s var(--ease-out);
  }
}

.partner-button__cursor-inner {
  animation:
    animate-breathe 3s var(--ease-inOutSine) infinite forwards,
    animate-morph-circle 5s var(--ease-in-out) infinite forwards,
    animate-rotate 10s var(--ease-in-out) infinite forwards alternate;
}
</style>
