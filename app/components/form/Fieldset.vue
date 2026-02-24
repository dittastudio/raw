<script lang="ts" setup>
interface Props {
  a11y?: boolean
  legend?: string
}

const { a11y = false, legend = '' } = defineProps<Props>()

defineOptions({
  inheritAttrs: false,
})

const mergedAttrs = useMergedAttrs('w-full flex flex-col items-start gap-4')
</script>

<template>
  <fieldset
    class="contents"
    v-bind="mergedAttrs"
  >
    <legend
      v-if="legend"
      :class="a11y ? 'sr-only' : 'text-left'"
    >
      {{ legend }}
    </legend>

    <slot />
  </fieldset>
</template>
