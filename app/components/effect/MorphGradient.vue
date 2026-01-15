<script setup lang="ts">
const SMOOTHING_FACTOR = 20

const currentX = ref(0)
const currentY = ref(0)

const targetX = ref(0)
const targetY = ref(0)

const interactiveElement = ref<HTMLDivElement>()
const containerElement = ref<HTMLDivElement>()

let animationFrameId: number

function animate() {
  currentX.value += (targetX.value - currentX.value) / SMOOTHING_FACTOR
  currentY.value += (targetY.value - currentY.value) / SMOOTHING_FACTOR

  if (interactiveElement.value) {
    const x = Math.round(currentX.value)
    const y = Math.round(currentY.value)
    interactiveElement.value.style.transform = `translate(${x}px, ${y}px)`
  }

  animationFrameId = requestAnimationFrame(animate)
}

function handleMouseMove(event: MouseEvent) {
  if (!containerElement.value) {
    targetX.value = event.clientX
    targetY.value = event.clientY
    return
  }

  const bounds = containerElement.value.getBoundingClientRect()
  targetX.value = event.clientX - bounds.left
  targetY.value = event.clientY - bounds.top
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  animate()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  cancelAnimationFrame(animationFrameId)
})
</script>

<template>
  <div class="morph-gradient">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="morph-gradient__svg"
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
      ref="containerElement"
      class="morph-gradient__container"
    >
      <div class="g1" />

      <div class="g2" />

      <div
        ref="interactiveElement"
        class="interactive"
      />
    </div>
  </div>
</template>

<style scoped>
.morph-gradient {
  --color1: 198, 234, 160;
  --color2: 255, 195, 220;
  --color-interactive: 132, 208, 239;
  --circle-size: 50%;
  --blending: none;

  width: 100%;
  height: 100%;
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
  width: 100%;
  height: 100%;
}

.g1 {
  position: absolute;
  background: radial-gradient(circle at center, rgba(var(--color1), 0.8) 0, rgba(var(--color1), 0) 50%) no-repeat;
  /* background: red; */
  mix-blend-mode: var(--blending);

  width: var(--circle-size);
  /* height: var(--circle-size); */
  aspect-ratio: 1/1;
  top: calc(50% - var(--circle-size) / 2);
  left: calc(50% - var(--circle-size) / 2);
  border-radius: 50%;

  transform-origin: center center;
  animation: moveVertical 30s ease infinite;

  opacity: 1;
}

.g2 {
  position: absolute;
  background: radial-gradient(circle at center, rgba(var(--color2), 0.8) 0, rgba(var(--color2), 0) 50%) no-repeat;
  /* background: blue; */
  mix-blend-mode: var(--blending);

  width: var(--circle-size);
  /* height: var(--circle-size); */
  aspect-ratio: 1/1;
  top: calc(50% - var(--circle-size) / 2);
  left: calc(50% - var(--circle-size) / 2);
  border-radius: 50%;

  /* transform-origin: calc(50% - 100px); */
  animation: moveHorizontal 20s reverse infinite;

  opacity: 1;
  z-index: -1;
}

.interactive {
  --size: 50%;

  position: absolute;
  background: radial-gradient(circle at center, rgba(var(--color-interactive), 0.8) 0, rgba(var(--color-interactive), 0) 50%) no-repeat;
  /* background: green; */
  mix-blend-mode: var(--blending);
  /* z-index: -2; */

  width: var(--size);
  /* height: var(--size); */
  top: 0;
  left: 0;
  aspect-ratio: 1/1;
  translate: -50% -50%;
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
