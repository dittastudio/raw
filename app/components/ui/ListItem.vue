<script lang="ts" setup>
import type { ListItem } from '@@/.storyblok/types/289672313529140/storyblok-components'

interface Props {
  type?: 'default' | 'mask'
  index: number
  item: ListItem
  isOpen: boolean
}

const { index, item, isOpen, type = 'default' } = defineProps<Props>()

const isScreenMd = useAtMedia(getMediaQuery('md'))
</script>

<template>
  <div
    class="
      grid
      grid-cols-(--app-grid)
      gap-x-(--app-inner-gutter)
      items-center
      py-4
    "
    :class="
      {
        'max-md:transition-opacity max-md:duration-200 max-md:ease-out': type === 'mask',
        'max-md:opacity-0': !isOpen && type === 'mask',
        'max-md:opacity-100': isOpen && type === 'mask',
      }
    "
  >
    <span
      class="col-span-1 sm:col-span-2 md:col-span-3 type-h2"
      :class="{
        'is-outlined': type === 'default',
      }"
    >
      {{ (index + 1).toString().padStart(2, '0') }}
    </span>

    <h3
      class="
        flex
        items-center
        justify-between
        gap-x-(--app-inner-gutter)
        col-span-3
        sm:col-span-6
        md:col-span-5
        type-h2
      "
    >
      <span
        :class="{
          'is-outlined': type === 'default',
        }"
        class="type-h2"
      >
        {{ item.title }}
      </span>

      <UiPlusMinus
        v-if="item.copy"
        class="md:hidden shrink-0"
        :is-open="isOpen"
      />
    </h3>

    <div
      v-if="item.copy"
      class="
        col-start-2
        col-span-3
        sm:col-start-3
        sm:col-span-6
        md:col-span-4
        type-p
      "
      :class="{
        'opacity-0': type === 'default',
      }"
    >
      <UiExpandable
        :is-open="isOpen"
        :is-disabled="isScreenMd"
      >
        <p class="type-p max-md:pt-4">
          {{ item.copy }}
        </p>
      </UiExpandable>
    </div>
  </div>
</template>
