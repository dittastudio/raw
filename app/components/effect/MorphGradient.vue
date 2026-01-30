<script setup lang="ts">
import type { Themes } from '@@/types/app'

interface Props {
  ballColour1?: Themes
  ballColour2?: Themes
  ballCursorColour?: Themes
}

const {
  ballColour1 = 'green',
  ballColour2 = 'pink',
  ballCursorColour = 'blue',
} = defineProps<Props>()

const ballColour1Var = computed(() => `var(--color-${ballColour1})`)
const ballColour2Var = computed(() => `var(--color-${ballColour2})`)
const ballCursorColourVar = computed(() => `var(--color-${ballCursorColour})`)

const containerElement = ref<HTMLDivElement>()

const { position, onMouseMove, onMouseLeave } = useSmoothMouse(containerElement)

watchEffect(() => {
  if (!containerElement.value) {
    return
  }

  containerElement.value.style.setProperty('--x', String(position.value.x))
  containerElement.value.style.setProperty('--y', String(position.value.y))
})
</script>

<template>
  <div
    ref="containerElement"
    class="morph-gradient relative size-full isolate"
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
            stdDeviation="40"
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

    <div
      class="morph-gradient__container transform-gpu backface-hidden pointer-events-none"
    >
      <div class="g1" />

      <div class="g2" />

      <div class="interactive" />
    </div>

    <slot />
  </div>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.morph-gradient {
  --color1: v-bind(ballColour1Var);
  --color2: v-bind(ballColour2Var);
  --color-interactive: v-bind(ballCursorColourVar);
  --circle-size: 50%;
  --blending: none;
  /* --x: 0;
  --y: 0; */
}

.morph-gradient__svg {
  position: fixed;
  top:0;
  left:0;
  width: 0;
  height: 0;
}

.morph-gradient__container {
  filter: url(#goo) blur(6px);
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.g1 {
  position: absolute;
  background: radial-gradient(circle at center, --alpha(var(--color1) / 0.8) 0, --alpha(var(--color1) / 0) 50%) no-repeat;

  width: var(--circle-size);
  aspect-ratio: 1;
  top: calc(50% - var(--circle-size) / 2);
  left: calc(50% - var(--circle-size) / 2);
  border-radius: 50%;

  transform-origin: center center;
  animation: moveVertical 30s ease infinite;

  opacity: 1;
}

.g2 {
  position: absolute;
  background: radial-gradient(circle at center, --alpha(var(--color2) / 0.8) 0, --alpha(var(--color2) / 0) 50%) no-repeat;

  width: var(--circle-size);
  aspect-ratio: 1;
  top: calc(50% - var(--circle-size) / 2);
  left: calc(50% - var(--circle-size) / 2);
  border-radius: 50%;

  animation: moveHorizontal 20s reverse infinite;

  opacity: 1;
  z-index: -1;
}

.interactive {
  --size: 50%;

  position: absolute;
  background: radial-gradient(circle at center, --alpha(var(--color-interactive) / 0.8) 0, --alpha(var(--color-interactive) / 0) 50%) no-repeat;

  width: var(--size);
  aspect-ratio: 1;
  top: 50%;
  left: 50%;
  translate: calc(var(--x) * 1px - 50%) calc(var(--y) * 1px - 50%) 0;
  border-radius: 50%;

  opacity: 1;
}

@keyframes moveInCircle {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes moveVertical {
  0% {
    transform: translateY(-50%);
  }
  50% {
    transform: translateY(50%);
  }
  100% {
    transform: translateY(-50%);
  }
}

@keyframes moveHorizontal {
  0% {
    transform: translateX(-50%) translateY(-10%);
  }
  50% {
    transform: translateX(50%) translateY(10%);
  }
  100% {
    transform: translateX(-50%) translateY(-10%);
  }
}
</style>
