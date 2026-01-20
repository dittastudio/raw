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
const lastHoverIndex = ref<number | null>(null)

const maskStyle = computed(() => {
  if (clipTop.value === null || clipBottom.value === null) {
    return {}
  }

  return {
    '--clip-top': `${clipTop.value}px`,
    '--clip-bottom': `${clipBottom.value}px`,
  }
})

// Mobile
const openIndex = ref<number | null>(null)

const toggleItem = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}

const setMaskClip = (event: MouseEvent, index: number) => {
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

  lastHoverIndex.value = index
}

const clearMaskClip = () => {
  clipTop.value = null
  clipBottom.value = null
  lastHoverIndex.value = null
}

const handleListExit = () => {
  if (!isScreenMd.value || !listEl.value) {
    clearMaskClip()
    return
  }

  const listHeight = listEl.value.getBoundingClientRect().height

  if (lastHoverIndex.value === 0) {
    clipTop.value = 0
    clipBottom.value = Math.max(0, listHeight)
    return
  }

  if (lastHoverIndex.value === items.length - 1) {
    clipTop.value = Math.max(0, listHeight)
    clipBottom.value = 0
    return
  }

  clearMaskClip()
}

const accentIsOpenClasses = computed(() => {
  switch (accent) {
    case 'light':
      return 'max-md:bg-white max-md:text-offblack'
    case 'dark':
      return 'max-md:bg-offblack max-md:text-white'
    case 'blue':
      return 'max-md:bg-blue max-md:text-white'
    case 'green':
      return 'max-md:bg-green max-md:text-white'
    case 'pink':
      return 'max-md:bg-pink max-md:text-white'
    case 'purple':
      return 'max-md:bg-purple max-md:text-white'
    default:
      return ''
  }
})

const accentMaskClasses = computed(() => {
  switch (accent) {
    case 'light':
      return 'md:bg-white md:text-offblack'
    case 'dark':
      return 'md:bg-offblack md:text-white'
    case 'blue':
      return 'md:bg-blue md:text-white'
    case 'green':
      return 'md:bg-green md:text-white'
    case 'pink':
      return 'md:bg-pink md:text-white'
    case 'purple':
      return 'md:bg-purple md:text-white'
    default:
      return ''
  }
})
</script>

<template>
  <div class="relative">
    <ul
      ref="listEl"
      class="ui-list__list ui-list__list--default"
      @mouseleave="handleListExit"
    >
      <li
        v-for="(item, index) in items"
        :key="item._uid"
        class="ui-list__item wrapper-max"
        @click="!isScreenMd && toggleItem(index)"
        @mouseenter="setMaskClip($event, index)"
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
      class="ui-list__list ui-list__list--mask"
      :class="accentMaskClasses"
      :style="maskStyle"
      aria-hidden="true"
    >
      <li
        v-for="(item, index) in items"
        :key="item._uid"
        class="ui-list__item wrapper-max"
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

.ui-list__list {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.ui-list__list--mask {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;

  @variant md {
    clip-path: inset(var(--clip-top, 0) 0 var(--clip-bottom, 100%) 0);
    transition: clip-path 200ms var(--ease-in-out);
  }
}

.ui-list__item {
  position: relative;
  transition: background-color 0.2s var(--ease-out);
  user-select: none;
  cursor: default;

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
    opacity: 0.5;
  }

  .ui-list__list--default &::before {
    bottom: 100%;
  }

  .ui-list__list--default &:last-child::after {
    top: 100%;
  }
}

.ui-list__container {
  display: grid;
  grid-template-columns: var(--app-grid);
  column-gap: var(--app-inner-gutter);
  align-items: center;
  padding-block: --spacing(4);
}

.ui-list__number {
  grid-column: span 1;

  @variant sm {
    grid-column: span 2;
  }

  @variant md {
    grid-column: span 3;
  }
}

.ui-list__title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-column: span 3;

  @variant sm {
    grid-column: span 6;
  }

  @variant md {
    grid-column: span 5;
  }
}

.ui-list__copy {
  grid-column: 2 / span 3;

  @variant sm {
    grid-column: 3 / span 6;
  }

  @variant md {
    grid-column: span 4;
  }

  .ui-list__container--default & {
    opacity: 0;
  }
}
</style>
