<script lang="ts" setup>
import type { Themes } from '@@/types/app'

interface Props {
  tag?: string
  theme?: Themes
}

const {
  tag = 'section',
  theme = 'light',
} = defineProps<Props>()
</script>

<template>
  <component
    :is="tag"
    :class="getThemeClasses[theme]"
  >
    <slot />
  </component>
</template>
