<script lang="ts" setup>
import type { ListItem } from '#storyblok-components'

interface Props {
  type?: 'default' | 'mask'
  item: ListItem
  isOpen: boolean
  hasIcon?: boolean
}

const { item, isOpen, type = 'default', hasIcon = false } = defineProps<Props>()

const isScreenMd = useAtMedia(getMediaQuery('md'))
</script>

<template>
  <div
    class="p-(--app-outer-gutter) md:py-16"
  >
    <h3 class="flex items-center justify-between gap-(--app-inner-gutter) hyphens-auto type-h4">
      <span class="flex items-center gap-(--app-inner-gutter)">
        {{ item.title }}

        <svg
          v-if="hasIcon"
          class="shrink-0 w-[0.9em] h-auto"
          viewBox="0 0 26 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25.0505 12.111L9.51671e-06 12.1084M25.0505 12.111L13.2929 0.353456M25.0505 12.111L13.1617 23.936"
            stroke="#1E2021"
            stroke-miterlimit="10"
          />
        </svg>
      </span>

      <UiPlusMinus
        v-if="item.copy"
        class="md:hidden shrink-0"
        :is-open="isOpen"
      />
    </h3>

    <div
      v-if="item.copy"
      :class="{
        'opacity-0': type === 'default',
      }"
    >
      <UiExpandable
        :is-open="isOpen"
        :is-disabled="isScreenMd"
      >
        <p class="type-p pt-4 md:pt-16">
          {{ item.copy }}
        </p>
      </UiExpandable>
    </div>
  </div>
</template>
