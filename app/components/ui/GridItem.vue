<script lang="ts" setup>
import type { ListItem } from '#storyblok-components'
import IconArrowRightStem from '@/assets/icons/arrow-right-stem.svg'

interface Props {
  type?: 'default' | 'mask'
  item: ListItem
  isOpen: boolean
  hasIcon?: boolean
}

const { item, isOpen, type = 'default', hasIcon = false } = defineProps<Props>()

const isScreenMd = useAtMedia(getMediaQuery('md'))

const titleParts = computed(() => {
  const words = item.title?.split(' ') ?? []
  return {
    leading: words.slice(0, -1).join(' '),
    last: words.at(-1) ?? '',
  }
})
</script>

<template>
  <div
    class="p-(--app-outer-gutter) md:py-16"
  >
    <h3 class="flex items-center justify-between gap-(--app-inner-gutter) hyphens-auto type-h4">
      <span>
        {{ titleParts.leading }} <span class="whitespace-nowrap">{{ titleParts.last }}<IconArrowRightStem
          v-if="hasIcon"
          class="ml-[0.5em] inline w-[0.9em] h-auto align-baseline"
        />
        </span>
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
