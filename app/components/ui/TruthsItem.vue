<script lang="ts" setup>
interface Item {
  title: string
  copy: string
}

interface Props {
  isMasked?: boolean
  headline?: string
  copy?: string
  items?: Item[]
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
      md:gap-y-[calc(var(--app-inner-gutter)*4)]
      text-offwhite
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
          group/truths-item
          group/expandable
          relative
          @container
          rounded-full
          text-center
          grow
          size-full
          max-w-62.5
          md:max-w-80
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
            transition-[scale]
            duration-500
            ease-in-out
            -z-1
            group-hover/truths-item:scale-110
          "
          :class="{
            'bg-offblack': !isMasked,
            'bg-pink': isMasked,
          }"
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
            p-[12.5%]
          "
          :class="{
            'opacity-0': isMasked,
          }"
        >
          <h3 class="type-h4 text-[min(10cqi,22px)] max-w-[8ch]">
            {{ item.title }}
          </h3>

          <UiExpandable open-on-hover="group/expandable">
            <p class="type-p text-[min(6cqi,13px)] pt-[1em] text-pretty">
              {{ item.copy }}
            </p>
          </UiExpandable>
        </div>
      </div>
    </template>

    <div
      v-if="headline || copy"
      class="
        ui-truths-item__bottom
        @container
        col-span-full
        md:col-span-4
        rounded-full
        px-[12%]
        py-[6%]
        text-center
      "
      :class="{
        'bg-offblack': !isMasked,
        'bg-pink': isMasked,
      }"
    >
      <div
        class="flex flex-col items-center justify-center gap-4"
        :class="{
          'opacity-0': isMasked,
        }"
      >
        <h4
          v-if="headline"
          class="type-h2 text-[min(7cqi,50px)]"
        >
          {{ headline }}
        </h4>

        <p
          v-if="copy"
          class="type-h4 text-[min(3.5cqi,22px)] text-balance"
        >
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
}

.ui-truths-item__item {
  .ui-truths-item.is-masked & {
    animation: breathe var(--breathe-duration) var(--ease-inOutSine) infinite forwards;
    animation-delay: calc(var(--index) * 0.5s);
  }

  .ui-truths-item:not(.is-masked) & {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin-inline: auto;
      width: 2px;
      height: calc(var(--app-inner-gutter) * 2);
      background-color: var(--app-text-color);
      pointer-events: none;
    }
  }
}

.ui-truths-item__bottom {
  .ui-truths-item.is-masked & {
    animation: breathe var(--breathe-duration) var(--ease-inOutSine) infinite forwards;
    animation-delay: calc(5 * 0.5s);
  }

  .ui-truths-item:not(.is-masked) & {
    @variant md {
      position: relative;

      &::before {
        content: '';
        position: absolute;
        bottom: calc(100% + (var(--app-inner-gutter) * 2));
        left: 0;
        right: 0;
        margin-inline: auto;
        width: calc(75% - (var(--app-inner-gutter) * -1.5));
        height: 2px;
        background-color: var(--app-text-color);
        pointer-events: none;
      }

      &::after {
        content: '';
        position: absolute;
        bottom: 100%;
        left: 0;
        right: 0;
        margin-inline: auto;
        width: 2px;
        height: calc(var(--app-inner-gutter) * 2);
        background-color: var(--app-text-color);
        pointer-events: none;
      }
    }
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
