<script lang="ts" setup>
// interface Props {
// }

// const { } = defineProps<Props>()
const activeItem = ref(-1)

const mouseEnterItem = (index: number) => {
  activeItem.value = index
}

const mouseLeaveItem = () => {
  activeItem.value = -1
}

const items = [
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
]

const container = useTemplateRef<HTMLDivElement>('container')
// const hover = useTemplateRef<HTMLDivElement>('hover')

const hoverHandler = (event: MouseEvent) => {
  if (!container.value) {
    return
  }

  const { top, left, width, height } = container.value.getBoundingClientRect()

  container.value.style.setProperty(
    '--x',
    String(event.clientX - (left + Math.floor(width / 2))),
  )
  container.value.style.setProperty(
    '--y',
    String(event.clientY - (top + Math.floor(height / 2))),
  )
}

const hoverOut = () => {
  if (!container.value) {
    return
  }

  container.value.style.setProperty('--x', '0')
  container.value.style.setProperty('--y', '0')
}
</script>

<template>
  <div
    ref="container"
    class="ui-core-values flex flex-col md:flex-row gap-[calc(var(--app-inner-gutter)*2)] max-w-screen-lg mx-auto"
    @mousemove="hoverHandler"
    @mouseleave="hoverOut"
  >
    <div class="ui-core-values__background absolute inset-0 flex gap-[calc(var(--app-inner-gutter)*2)]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="ui-core-values__svg"
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
        class="ui-core-values__follow"
      />

      <div
        v-for="(item, index) in items"
        :key="item.title"
        class="ui-core-values__orb size-full rounded-full bg-pink"
      />
    </div>

    <div
      v-for="(item, index) in items"
      :key="item.title"
      class="
        ui-core-values__item
        group
        @container
        text-offwhite
        rounded-full
        text-center
        grow
        w-full
        aspect-square
        max-w-[200px]
        md:max-w-[200px]
        lg:max-w-[330px]
        mx-auto
        cursor-default
      "
      @mouseenter="mouseEnterItem(index)"
      @mouseleave="mouseLeaveItem"
    >
      <div
        class="
          absolute
          inset-0
          size-full
          rounded-full
          bg-offblack
          -z-1
          transition-[scale]
          duration-500
          ease-outQaurt
          group-hover:scale-110
        "
      />

      <div
        class="
        ui-core-values__circle
        relative
        z-1
        size-full
        rounded-full
        flex
        flex-col
        items-center
        justify-center
        p-[15%]
      "
      >
        <h3 class="type-h4 text-[min(10cqi,22px)] max-w-[8ch]">
          {{ item.title }}
        </h3>

        <UiExpandable :is-open="activeItem === index">
          <p class="type-p text-[min(6cqi,16px)] pt-[1em] text-pretty">
            {{ item.copy }}
          </p>
        </UiExpandable>
      </div>
    </div>
  </div>

  <div class="ui-core-values__bottom bg-offblack text-offwhite rounded-full p-10 mt-[calc(var(--app-inner-gutter)*4)] max-w-[1000px] mx-auto text-center">
    <h6 class="type-h2">
      Raw truth™
    </h6>

    <p class="type-h4 pt-[1em] text-balance">
      The single-minded solution that rallies everyone
    </p>
  </div>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.ui-core-values__svg {
  position: fixed;
  top:0;
  left:0;
  width: 0;
  height: 0;
}

.ui-core-values__background {
  width: 100%;
  height: 100%;
  filter: url(#goo) blur(3px);
  z-index: -1;
  pointer-events: none;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  transform: translateZ(0);
}

.ui-core-values__follow {
  --color-interactive: var(--color-green);
  --t: 1.1;

  position: absolute;
  background: radial-gradient(circle at center, --alpha(var(--color-interactive) / 0.8) 0, --alpha(var(--color-interactive) / 0) 50%) no-repeat;
  width: 50%;
  height: 50%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  aspect-ratio: 1;
  translate: calc(var(--x) / var(--t) * 1px) calc(var(--y) / var(--t) * 1px) 0;
  transition:
    translate 0s var(--ease-out) 0.5s,
    opacity 0.5s var(--ease-out);
  border-radius: 50%;
  opacity: 0;

  .ui-core-values:hover & {
    opacity: 1;
    translate: calc(var(--x) / var(--t) * 1px) calc(var(--y) / var(--t) * 1px) 0;
    transition:
      translate 0.2s var(--ease-out),
      opacity 0.2s var(--ease-out);
  }
}

.ui-core-values {
  --x: 0;
  --y: 0;

  @variant md {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: calc(100% + calc(var(--app-inner-gutter)*2));
      left: 0;
      right: 0;
      margin-inline: auto;
      background-color: var(--color-offblack);
      height: 2px;
      width: calc(75% + calc(var(--app-outer-gutter) + 2px));
    }
  }
}

.ui-core-values__item {
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-inline: auto;
    width: 2px;
    height: calc(var(--app-inner-gutter)*2);
    background-color: var(--color-offblack);
  }
}

.ui-core-values__circle {
  clip-path: circle(50% at 50% 50%);
}

.ui-core-values__bottom {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 0;
    right: 0;
    margin-inline: auto;
    background-color: var(--color-offblack);
    width: 2px;
    height: calc(var(--app-inner-gutter)*2);
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

.ui-core-values__orb {
  transform: translateZ(0);
  animation: breathe 5s var(--ease-inOutSine) infinite;
}
</style>
