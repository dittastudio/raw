<script lang="ts" setup>
import type { ListItem } from '#storyblok-components'
import type { Themes } from '@@/types/app'

interface Props {
  accent: Themes
  items: ListItem[]
}

const { accent, items } = defineProps<Props>()

const isScreenMd = useAtMedia(getMediaQuery('md'))

const listEl = ref<HTMLElement | null>(null)
const clipTop = ref<number | null>(null)
const clipRight = ref<number | null>(null)
const clipBottom = ref<number | null>(null)
const clipLeft = ref<number | null>(null)
const maskActive = ref(false)
const maskTransitionEnabled = ref(false)
const openIndex = ref<number | null>(null)

const maskStyle = computed(() => ({
  '--mask-opacity': maskActive.value ? '1' : '0',
  '--clip-top': `${clipTop.value ?? 0}px`,
  '--clip-right': `${clipRight.value ?? 0}px`,
  '--clip-bottom': `${clipBottom.value ?? 0}px`,
  '--clip-left': `${clipLeft.value ?? 0}px`,
}))

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

  const updateClip = () => {
    clipTop.value = Math.max(0, itemRect.top - listRect.top)
    clipRight.value = Math.max(0, listRect.right - itemRect.right)
    clipBottom.value = Math.max(0, listRect.bottom - itemRect.bottom)
    clipLeft.value = Math.max(0, itemRect.left - listRect.left)
  }

  if (maskActive.value) {
    updateClip()
    return
  }

  requestAnimationFrame(() => {
    updateClip()
    maskActive.value = true

    requestAnimationFrame(() => {
      maskTransitionEnabled.value = true
    })
  })
}

const handleListExit = () => {
  if (!isScreenMd.value || !listEl.value) {
    clipTop.value = null
    clipRight.value = null
    clipBottom.value = null
    clipLeft.value = null
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
  <div class="md:wrapper-max">
    <div class="relative overflow-hidden border-t border-b border-current">
      <ul
        ref="listEl"
        class="
          ui-grid__list
          ui-grid__list--default
          flex
          flex-col
          gap-px
          md:flex-row
          md:flex-wrap
          bg-current
        "
        @mouseleave="handleListExit"
      >
        <li
          v-for="(item, index) in items"
          :key="item._uid"
          class="
            ui-grid__item
            select-none
            cursor-default
          "
          @click="!isScreenMd && toggleItem(index)"
          @mouseenter="setMaskClip"
        >
          <UiGridItem
            type="default"
            :item="item"
            :is-open="openIndex === index"
          />
        </li>
      </ul>

      <ul
        class="
          ui-grid__list
          ui-grid__list--mask
          flex
          flex-col
          gap-px
          absolute
          inset-0
          z-1
          pointer-events-none
          md:flex-row
          md:flex-wrap
        "
        :class="{ 'is-transitioning': maskTransitionEnabled }"
        :style="maskStyle"
        aria-hidden="true"
      >
        <li
          v-for="(item, index) in items"
          :key="item._uid"
          class="
            ui-grid__item
            select-none
            cursor-default
            transition-[color,background-color]
            duration-200
            ease-out
          "
          :class="[
            item.copy && openIndex === index ? accentIsOpenClasses : '',
            accentMaskClasses,
          ]"
          @click="item.copy && !isScreenMd && toggleItem(index)"
        >
          <UiGridItem
            type="mask"
            :item="item"
            :is-open="openIndex === index"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.ui-grid__list--mask {
  @variant md {
    opacity: var(--mask-opacity, 0);
    clip-path: inset(
      var(--clip-top, 0)
      var(--clip-right, 100%)
      var(--clip-bottom, 100%)
      var(--clip-left, 0)
    );
    transition: opacity 0.2s var(--ease-in-out);

    &.is-transitioning {
      transition:
        clip-path 0.2s var(--ease-in-out),
        opacity 0.2s var(--ease-in-out);
    }
  }
}

.ui-grid__item {
  @variant md {
    flex-grow: 1;
    flex-basis: calc(50% - 1px);
    aspect-ratio: 3 / 2;
  }

  @variant lg {
    flex-basis: calc(25% - 1px);
  }

  &:first-child:nth-last-child(4n+1),
  &:first-child:nth-last-child(4n+1) ~ &,
  &:first-child:nth-last-child(3n),
  &:first-child:nth-last-child(3n) ~ & {
    @variant md {
      flex-basis: calc(50% - 1px);
    }

    @variant lg {
      flex-basis: calc(33.34% - 1px);
    }
  }
}
</style>
