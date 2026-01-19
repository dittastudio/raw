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
      return 'hover:bg-blue'
    case 'green':
      return 'hover:text-green'
    case 'pink':
      return 'hover:text-pink'
    case 'purple':
      return 'hover:text-purple'
    default:
      return 'hover:text-blue'
  }
})

const openIndex = ref<number | null>(null)

const toggleItem = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}

const isScreenMd = useAtMedia(getMediaQuery('md'))
</script>

<template>
  <div class="">
    <ul class="ui-list__list">
      <li
        v-for="(item, index) in items"
        :key="item._uid"
        class="
          ui-list__item
          group
          transition-[background-color]
          duration-200
          ease-out
        "
        :class="themeHoverClasses"
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
            <span class="col-span-1 sm:col-span-2 md:col-span-3 type-h2 text-outline-current transition-[color,-webkit-text-stroke] duration-200 ease-out group-hover:text-offblack cursor-default">
              {{ (index + 1).toString().padStart(2, '0') }}
            </span>

            <h3 class="col-span-3 sm:col-span-6 md:col-span-5 type-h2 text-outline-current transition-[color,-webkit-text-stroke] duration-200 ease-out group-hover:text-offblack cursor-default">
              {{ item.title }}
            </h3>

            <div class="col-start-2 col-span-3 sm:col-start-3 sm:col-span-6 md:col-span-4">
              <UiExpandable :is-open="isScreenMd || openIndex === index">
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

.ui-list__list {
}

.ui-list__item {
}

.ui-list__item-inner {
  border-top: 1px solid --alpha(currentColor / 20%);

  .ui-list__item:last-child & {
    border-bottom: 1px solid --alpha(currentColor / 20%);
  }
}
</style>
