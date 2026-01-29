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
    <span
      class="ui-list-item__number type-h2"
      :class="{
        'text-outline-current': type === 'default',
      }"
    >
      {{ (index + 1).toString().padStart(2, '0') }}
    </span>

    <h3 class="ui-list-item__title type-h2">
      <span
        :class="{
          'text-outline-current': type === 'default',
        }"
        class="type-h2"
      >
        {{ item.title }}
      </span>

      <UiPlusMinus
        v-if="item.copy"
        class="md:hidden shrink-0"
        :is-open="isOpen"
      />
    </h3>

    <div
      v-if="item.copy"
      class="ui-list-item__copy"
    >
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
  display: grid;
  grid-template-columns: var(--app-grid);
  column-gap: var(--app-inner-gutter);
  align-items: center;
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
  gap: var(--app-inner-gutter);
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
