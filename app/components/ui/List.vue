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
      return 'hover:bg-blue [&:hover_.is-outlined]:text-(--app-text-color)'
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
</script>

<template>
  <div class="wrapper-maxx">
    <ul class="ui-list__list">
      <li
        v-for="(item, index) in items"
        :key="item._uid"
        class="
          ui-list__item
        "
        :class="themeHoverClasses"
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
            <span class="col-span-3 type-h2 is-outlined">
              {{ (index + 1).toString().padStart(2, '0') }}
            </span>

            <h3 class="col-span-5 type-h2 is-outlined">
              {{ item.title }}
            </h3>

            <p class="col-span-4 type-p">
              {{ item.copy }}
            </p>
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
