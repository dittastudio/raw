<script lang="ts" setup>
interface Props {
  a11y?: boolean
  legend?: string
}

const { a11y = false, legend = '' } = defineProps<Props>()
</script>

<template>
  <fieldset class="contents">
    <legend
      v-if="legend"
      :class="a11y ? 'sr-only' : 'text-left text-24 @md/form:text-32 font-display'"
    >
      {{ legend }}
    </legend>

    <slot />
  </fieldset>
</template>
