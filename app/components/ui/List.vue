<script lang="ts" setup>
import type { ListItem } from '@@/.storyblok/types/289672313529140/storyblok-components'
import type { Themes } from '@@/types/app'

interface Props {
  theme: Themes
  items: ListItem[]
}

const {
  theme: _theme,
  items,
} = defineProps<Props>()

// const themeHoverClasses = computed(() => {
//   console.log(theme)

//   switch (theme) {
//     case 'blue':
//       return 'md:hover:bg-blue'
//     case 'green':
//       return 'md:hover:bg-green'
//     case 'pink':
//       return 'md:hover:bg-pink'
//     case 'purple':
//       return 'md:hover:bg-purple'
//     default:
//       return ''
//   }
// })

const isScreenMd = useAtMedia(getMediaQuery('md'))

const listEl = ref<HTMLElement | null>(null)
const clipTop = ref<number | null>(null)
const clipBottom = ref<number | null>(null)

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
}

const clearMaskClip = () => {
  clipTop.value = null
  clipBottom.value = null
}

// Desktop
// const activeIndex = ref<number | null>(null)
// const hoverDirections = ref<Array<'up' | 'down'>>([])

// const setHoverDirection = (index: number) => {
//   const lastIndex = activeIndex.value
//   const direction = lastIndex === null || lastIndex === index || index > lastIndex
//     ? 'down'
//     : 'up'

//   hoverDirections.value[index] = direction

//   if (lastIndex !== null && lastIndex !== index) {
//     hoverDirections.value[lastIndex] = direction
//   }

//   activeIndex.value = index
// }

// const clearHover = () => {
//   activeIndex.value = null
// }

// watch(
//   () => items.length,
//   (length) => {
//     hoverDirections.value = Array.from({ length }, () => 'down')
//   },
//   { immediate: true },
// )
</script>

<template>
  <div class="relative">
    <ul ref="listEl">
      <li
        v-for="(item, index) in items"
        :key="item._uid"
        class="ui-list__item"
        @click="!isScreenMd && toggleItem(index)"
        @mouseenter="setMaskClip"
        @mouseleave="clearMaskClip"
      >
        <div class="ui-list__item-inner">
          <UiListItem
            type="default"
            :index="index"
            :item="item"
            :is-open="openIndex === index"
          />
        </div>
      </li>
    </ul>

    <ul
      class="ui-list__mask absolute inset-0 bg-blue"
      :style="maskStyle"
      aria-hidden="true"
    >
      <li
        v-for="(item, index) in items"
        :key="item._uid"
        class="ui-list__item"
        @click="!isScreenMd && toggleItem(index)"
      >
        <div class="ui-list__item-inner">
          <UiListItem
            type="mask"
            :index="index"
            :item="item"
            :is-open="openIndex === index"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.ui-list__item {
  --hover-duration: 200ms;

  position: relative;
  transition: background-color var(--hover-duration) var(--ease-out);
  user-select: none;
  cursor: default;
}

.ui-list__item-inner {
  border-top: 1px solid --alpha(currentColor / 100%);
  border-bottom: 1px solid --alpha(currentColor / 100%);
}

.ui-list__mask {
  clip-path: inset(var(--clip-top, 0) 0 var(--clip-bottom, 100%) 0);
  transition: clip-path 200ms var(--ease-in-out);
  pointer-events: none;
}

.ui-list__container {
  display: grid;
  grid-template-columns: var(--app-grid);
  column-gap: var(--app-inner-gutter);
  align-items: center;
  padding-block: --spacing(4);
}

.ui-list__container--mask {

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
