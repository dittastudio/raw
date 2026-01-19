<script lang="ts" setup>
import type { ListItem } from '@@/.storyblok/types/289672313529140/storyblok-components'
import type { Themes } from '@@/types/app'

interface Props {
  theme: Themes
  items: ListItem[]
}

const {
  theme,
  items,
} = defineProps<Props>()

const themeHoverClasses = computed(() => {
  console.log(theme)

  switch (theme) {
    case 'blue':
      return 'md:hover:bg-blue'
    case 'green':
      return 'md:hover:bg-green'
    case 'pink':
      return 'md:hover:bg-pink'
    case 'purple':
      return 'md:hover:bg-purple'
    default:
      return ''
  }
})

const themeActiveClasses = computed(() => {
  switch (theme) {
    case 'blue':
      return 'max-md:bg-blue'
    case 'green':
      return 'max-md:bg-green'
    case 'pink':
      return 'max-md:bg-pink'
    case 'purple':
      return 'max-md:bg-purple'
    default:
      return ''
  }
})

const themeActiveTextClasses = computed(() => {
  switch (theme) {
    case 'blue':
      return 'max-md:text-offblack'
    case 'green':
      return 'max-md:text-offblack'
    case 'pink':
      return 'max-md:text-offblack'
    case 'purple':
      return 'max-md:text-offblack'
    default:
      return ''
  }
})

const openIndex = ref<number | null>(null)
const activeIndex = ref<number | null>(null)
const hoverDirections = ref<Array<'up' | 'down'>>([])

const toggleItem = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}

const isScreenMd = useAtMedia(getMediaQuery('md'))

const setHoverDirection = (index: number) => {
  const lastIndex = activeIndex.value
  const direction = lastIndex === null || lastIndex === index || index > lastIndex
    ? 'down'
    : 'up'

  hoverDirections.value[index] = direction

  if (lastIndex !== null && lastIndex !== index) {
    hoverDirections.value[lastIndex] = direction
  }

  activeIndex.value = index
}

const clearHover = () => {
  activeIndex.value = null
}

watch(
  () => items.length,
  (length) => {
    hoverDirections.value = Array.from({ length }, () => 'down')
  },
  { immediate: true },
)
</script>

<template>
  <div>
    <ul
      class="ui-list__list"
      @mouseleave="clearHover"
    >
      <li
        v-for="(item, index) in items"
        :key="item._uid"
        class="
          ui-list__item
          group
          transition-[background-color]
          duration-(--hover-duration)
          ease-out
          select-none
          cursor-default
        "
        :class="{ 'is-active': activeIndex === index }"
        :style="{
          '--clip-hidden': hoverDirections[index] === 'up'
            ? 'inset(0 0 100% 0)'
            : 'inset(100% 0 0 0)',
        }"
        @mouseenter="setHoverDirection(index)"
        @click="!isScreenMd && toggleItem(index)"
      >
        <div
          class="
            ui-list__item-outer
            wrapper-max
          "
        >
          <div
            class="
              relative
              ui-list__item-inner
              border-t
              border-solid
              border-offblack/100
            "
          >
            <div
              class="
                grid
                grid-cols-(--app-grid)
                gap-x-(--app-inner-gutter)
                items-center
                py-4
              "
            >
              <span
                class="
                col-span-1
                sm:col-span-2
                md:col-span-3
                type-h2
                text-outline-current
                transition-[color,-webkit-text-stroke]
                duration-(--hover-duration)
                ease-out
                md:group-hover:text-offblackx
              "
              >
                {{ (index + 1).toString().padStart(2, '0') }}
              </span>

              <h3
                class="
                col-span-3
                sm:col-span-6
                md:col-span-5
                flex
                items-center
                justify-between
                type-h2
                text-outline-current
                transition-[color,-webkit-text-stroke]
                duration-(--hover-duration)
                ease-out
                md:group-hover:text-offblackx
              "
              >
                {{ item.title }}

                <UiPlusMinus
                  class="md:hidden"
                  :is-open="openIndex === index"
                />
              </h3>

              <div
                class="
                col-start-2
                col-span-3
                sm:col-start-3
                sm:col-span-6
                md:col-span-4
                md:opacity-0
                md:transition-opacity
                md:duration-(--hover-duration)
                md:ease-out
                xgroup-hover:md:opacity-100
              "
              >
                <UiExpandable
                  :is-open="openIndex === index"
                  :is-disabled="isScreenMd"
                >
                  <p class="type-p max-md:pt-4">
                    {{ item.copy }}
                  </p>
                </UiExpandable>
              </div>
            </div>

            <div
              class="
                ui-list__item-hover
                absolute
                inset-0
                grid
                grid-cols-(--app-grid)
                gap-x-(--app-inner-gutter)
                items-center
                bg-blue
                z-1
                opacity-100
              "
            >
              <span
                class="
                col-span-1
                sm:col-span-2
                md:col-span-3
                type-h2
              "
              >
                {{ (index + 1).toString().padStart(2, '0') }}
              </span>

              <h3
                class="
                col-span-3
                sm:col-span-6
                md:col-span-5
                flex
                items-center
                justify-between
                type-h2
              "
              >
                {{ item.title }}

                <UiPlusMinus
                  class="md:hidden"
                  :is-open="openIndex === index"
                />
              </h3>

              <div
                class="
                col-start-2
                col-span-3
                sm:col-start-3
                sm:col-span-6
                md:col-span-4
              "
              >
                <UiExpandable
                  :is-open="openIndex === index"
                  :is-disabled="isScreenMd"
                >
                  <p class="type-p max-md:pt-4">
                    {{ item.copy }}
                  </p>
                </UiExpandable>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.ui-list__item {
  --hover-duration: 200ms;
}

.ui-list__item-hover {
  clip-path: var(--clip-hidden, inset(0 0 100% 0));
  overflow: hidden;
  transition: clip-path 200ms ease-out;
}

.ui-list__item.is-active .ui-list__item-hover {
  clip-path: inset(0 0 0 0);
}
</style>
