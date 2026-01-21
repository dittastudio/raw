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
    class="ui-list-item"
    :class="[
      `ui-list-item--${type}`,
      {
        'is-open': isOpen,
      },
    ]"
  >
    <h3 class="ui-list-item__title type-h4">
      {{ item.title }}

      <UiPlusMinus
        class="md:hidden"
        :is-open="isOpen"
      />
    </h3>

    <div class="ui-list-item__copy">
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

<style scoped>
@reference "@/assets/css/app.css";

.ui-list-item {
  padding-block: --spacing(4);
}

.ui-list-item--mask {
  @variant max-md {
    opacity: 0;
    transition: opacity 0.2s var(--ease-out);

    &.is-open {
      opacity: 1;
    }
  }
}

.ui-list-item__number {
  grid-column: span 1;

  @variant sm {
    grid-column: span 2;
  }

  @variant md {
    grid-column: span 3;
  }
}

.ui-list-item__title {
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

.ui-list-item__copy {
  grid-column: 2 / span 3;

  @variant sm {
    grid-column: 3 / span 6;
  }

  @variant md {
    grid-column: span 4;
  }

  .ui-list-item--default & {
    opacity: 0;
  }
}
</style>
