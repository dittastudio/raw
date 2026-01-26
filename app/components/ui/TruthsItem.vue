<script lang="ts" setup>
interface Props {
  isMasked?: boolean
  headline?: string
  copy?: string
  items?: {
    title: string
    copy: string
  }[] | undefined
}

const { isMasked = false, items, headline, copy } = defineProps<Props>()
</script>

<template>
  <div
    class="
      ui-truths-item
      relative
      grid
      grid-cols-1
      md:grid-cols-4
      gap-[calc(var(--app-inner-gutter)*2)]
      text-(--app-background-color)
      transition-[color]
      duration-(--app-transition-duration)
      ease-(--app-transition-ease)
    "
    :class="{
      'is-masked': isMasked,
    }"
  >
    <template
      v-for="(item, index) in items"
      :key="item.title"
    >
      <div
        v-if="item.title && item.copy"
        class="
        ui-truths-item__item
        col-span-full
        md:col-span-1
        group
        group/expandable
        relative
        @container
        rounded-full
        text-center
        grow
        size-full
        max-w-[320px]
        mx-auto
        aspect-square
        cursor-default
      "
        :style="{
          '--index': index,
        }"
      >
        <div
          class="
          absolute
          inset-0
          size-full
          rounded-[inherit]
          bg-(--theme-background-color)
          transition-[scale,background-color]
          duration-(--app-transition-duration)
          ease-(--app-transition-ease)
          -z-1
          group-hover:scale-110
        "
        />

        <div
          class="
          relative
          z-1
          size-full
          rounded-[inherit]
          flex
          flex-col
          items-center
          justify-center
          p-[10%]
        "
          :class="{
            'opacity-0': isMasked,
          }"
        >
          <h3 class="type-h4 text-[min(10cqi,22px)] max-w-[8ch]">
            {{ item.title }}
          </h3>

          <UiExpandable open-on-hover>
            <p class="type-p text-[min(6cqi,16px)] pt-[1em] text-pretty">
              {{ item.copy }}
            </p>
          </UiExpandable>
        </div>
      </div>
    </template>

    <div
      v-if="headline && copy"
      class="
        ui-truths-item__headline
        col-span-full
        md:col-span-4
        bg-(--theme-background-color)
        rounded-full
        p-[6%]
        text-center
        transition-[background-color]
        duration-(--app-transition-duration)
        ease-(--app-transition-ease)
      "
    >
      <div
        :class="{
          'opacity-0': isMasked,
        }"
      >
        <h6 class="type-h2">
          {{ headline }}
        </h6>

        <p class="type-h4 pt-[1em] text-balance">
          {{ copy }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.ui-truths-item {
  --breathe-duration: 3s;
  --theme-background-color: var(--app-text-color);

  &.is-masked {
    --theme-background-color: var(--color-pink);
  }
}

.ui-truths-item__item {
  .ui-truths-item.is-masked & {
    animation: breathe var(--breathe-duration) var(--ease-inOutSine) infinite forwards;
    animation-delay: calc(var(--index) * 0.5s);
  }
}

.ui-truths-item__headline {
  .ui-truths-item.is-masked & {
    animation: breathe var(--breathe-duration) var(--ease-inOutSine) infinite forwards;
    animation-delay: calc(5 * 0.5s);
  }
}

@keyframes breathe {
  0% {
    transform: scale(1) translateZ(0);
  }
  50% {
    transform: scale(1.05) translateZ(0);
  }
  100% {
    transform: scale(1) translateZ(0);
  }
}
</style>
