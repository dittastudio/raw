<script lang="ts" setup>
import type { ListItem } from '@@/.storyblok/types/289672313529140/storyblok-components'
import type { Themes } from '@@/types/app'

interface Props {
  accent: Themes
  items: ListItem[]
}

const {
  accent,
  items,
} = defineProps<Props>()

const isScreenMd = useAtMedia(getMediaQuery('md'))

const listEl = ref<HTMLElement | null>(null)
const clipTop = ref<number | null>(null)
const clipBottom = ref<number | null>(null)
const maskActive = ref(false)
const maskTransitionEnabled = ref(false)

const maskStyle = computed(() => {
  const baseStyle = {
    '--mask-opacity': maskActive.value ? '1' : '0',
  }

  if (clipTop.value === null || clipBottom.value === null) {
    return baseStyle
  }

  return {
    ...baseStyle,
    '--clip-top': `${clipTop.value}px`,
    '--clip-bottom': `${clipBottom.value}px`,
  }
})

// Mobile
const openIndex = ref<number | null>(null)

const toggleItem = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}

const setMaskClip = (event: MouseEvent) => {
  if (!isScreenMd.value || !listEl.value) {
    return
  }

  const itemEl = event.currentTarget as HTMLElement | null

  if (!itemEl) {
    return
  }

  const listRect = listEl.value.getBoundingClientRect()
  const itemRect = itemEl.getBoundingClientRect()

  clipTop.value = Math.max(0, itemRect.top - listRect.top)
  clipBottom.value = Math.max(0, listRect.bottom - itemRect.bottom)

  if (!maskActive.value) {
    maskActive.value = true
    maskTransitionEnabled.value = false

    if (typeof window === 'undefined') {
      maskTransitionEnabled.value = true
    }
    else {
      requestAnimationFrame(() => {
        maskTransitionEnabled.value = true
      })
    }
  }
  else if (!maskTransitionEnabled.value) {
    maskTransitionEnabled.value = true
  }
}

const clearMaskClip = () => {
  clipTop.value = null
  clipBottom.value = null
  maskActive.value = false
  maskTransitionEnabled.value = false
}

const handleListExit = () => {
  if (!isScreenMd.value || !listEl.value) {
    clearMaskClip()
    return
  }
  maskActive.value = false
  maskTransitionEnabled.value = false
}

const accentIsOpenClasses = computed(() => {
  switch (accent) {
    case 'light':
      return 'max-md:bg-offwhite max-md:text-offblack'
    case 'dark':
      return 'max-md:bg-offblack max-md:text-offwhite'
    case 'blue':
      return 'max-md:bg-blue max-md:text-offblack'
    case 'green':
      return 'max-md:bg-green max-md:text-offblack'
    case 'pink':
      return 'max-md:bg-pink max-md:text-offblack'
    case 'purple':
      return 'max-md:bg-purple max-md:text-offblack'
    default:
      return ''
  }
})

const accentMaskClasses = computed(() => {
  switch (accent) {
    case 'light':
      return 'md:bg-offwhite md:text-offblack'
    case 'dark':
      return 'md:bg-offblack md:text-offwhite'
    case 'blue':
      return 'md:bg-blue md:text-offblack'
    case 'green':
      return 'md:bg-green md:text-offblack'
    case 'pink':
      return 'md:bg-pink md:text-offblack'
    case 'purple':
      return 'md:bg-purple md:text-offblack'
    default:
      return ''
  }
})
</script>

<template>
  <div class="relative">
    <ul
      ref="listEl"
      class="ui-list__list ui-list__list--default flex flex-col gap-px"
      @mouseleave="handleListExit"
    >
      <li
        v-for="(item, index) in items"
        :key="item._uid"
        class="
          ui-list__item
          wrapper-max
          relative
          select-none
          cursor-default
          transition-[color,background-color]
          duration-200
          ease-out
        "
        @click="item.copy && !isScreenMd && toggleItem(index)"
        @mouseenter="setMaskClip($event)"
      >
        <UiListItem
          type="default"
          :index="index"
          :item="item"
          :is-open="openIndex === index"
        />
      </li>
    </ul>

    <ul
      class="
        ui-list__list
        ui-list__list--mask
        flex
        flex-col
        gap-px
        absolute
        inset-0
        z-1
        pointer-events-none
      "
      :class="[
        accentMaskClasses,
        maskTransitionEnabled ? 'is-transitioning' : '',
      ]"
      :style="maskStyle"
      aria-hidden="true"
    >
      <li
        v-for="(item, index) in items"
        :key="item._uid"
        class="
          ui-list__item
          wrapper-max
          relative
          select-none
          cursor-default
          transition-[color,background-color]
          duration-200
          ease-out
        "
        :class="openIndex === index ? accentIsOpenClasses : ''"
        @click="!isScreenMd && toggleItem(index)"
      >
        <UiListItem
          type="mask"
          :index="index"
          :item="item"
          :is-open="openIndex === index"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.ui-list__list--mask {
  @variant md {
    opacity: var(--mask-opacity, 0);
    clip-path: inset(var(--clip-top, 0) 0 var(--clip-bottom, 100%) 0);
    transition: opacity 0.2s var(--ease-in-out);

    &.is-transitioning {
      transition:
        clip-path 0.2s var(--ease-in-out),
        opacity 0.2s var(--ease-in-out);
    }
  }
}

.ui-list__item {
  .ui-list__list--default &::before,
  .ui-list__list--default &:last-child::after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 1px;
    z-index: 1;
    pointer-events: none;
    border-top: 1px solid currentColor;
  }

  .ui-list__list--default &::before {
    bottom: 100%;
  }

  .ui-list__list--default &:last-child::after {
    top: 100%;
  }
}
</style>
