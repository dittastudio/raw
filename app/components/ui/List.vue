<script lang="ts" setup>
import type { ListItem } from '@@/.storyblok/types/289672313529140/storyblok-components'
import type { Themes } from '@@/types/app'

interface Props {
  theme?: Themes
  items: ListItem[]
}

const {
  theme = 'blue',
  items,
} = defineProps<Props>()

const themeHoverClasses = computed(() => {
  switch (theme) {
    case 'blue':
      return 'md:hover:bg-blue'
    default:
      return ''
  }
})

const themeActiveClasses = computed(() => {
  switch (theme) {
    case 'blue':
      return 'max-md:bg-blue'
    default:
      return ''
  }
})

const themeActiveTextClasses = computed(() => {
  switch (theme) {
    case 'blue':
      return 'max-md:text-offblack'
    default:
      return ''
  }
})

const openIndex = ref<number | null>(null)
const isHoverLocked = ref(false)
const initialHoverIndex = ref<number | null>(null)

const toggleItem = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}

const isScreenMd = useAtMedia(getMediaQuery('md'))

const handleItemEnter = (index: number) => {
  if (!isScreenMd.value) {
    return
  }

  if (!isHoverLocked.value) {
    initialHoverIndex.value = index
    isHoverLocked.value = true
  }

  if (initialHoverIndex.value !== null && index !== initialHoverIndex.value) {
    initialHoverIndex.value = null
  }
}

const handleListLeave = () => {
  if (!isScreenMd.value) {
    return
  }

  isHoverLocked.value = false
  initialHoverIndex.value = null
}
</script>

<template>
  <div class="">
    <ul
      class="ui-list__list"
      @mouseleave="handleListLeave"
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
        :class="[
          themeHoverClasses,
          {
            [themeActiveClasses]: openIndex === index,
          },
        ]"
        :style="{
          '--hover-duration': isHoverLocked && initialHoverIndex !== index ? '0s' : '200ms',
        }"
        @mouseenter="handleItemEnter(index)"
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
              ui-list__item-inner
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
                md:group-hover:text-offblack
              "
              :class="{
                [themeActiveTextClasses]: openIndex === index,
              }"
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
                md:group-hover:text-offblack
              "
              :class="{
                [themeActiveTextClasses]: openIndex === index,
              }"
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
                group-hover:md:opacity-100
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
      </li>
    </ul>
  </div>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.ui-list__item-inner {
  border-top: 1px solid --alpha(currentColor / 20%);

  .ui-list__item:last-child & {
    border-bottom: 1px solid --alpha(currentColor / 20%);
  }
}
</style>
