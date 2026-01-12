<script lang="ts" setup>
interface Props {
  a11y?: boolean
  id?: string
  label?: string
  as?: string
}

const {
  a11y = false,
  id = null,
  label = '',
  as = 'label',
} = defineProps<Props>()

defineOptions({
  inheritAttrs: false,
})

const mergedAttrs = useMergedAttrs('flex flex-col gap-3 w-full')
</script>

<template>
  <div v-bind="mergedAttrs">
    <Component
      :is="as"
      v-if="label"
      :class="a11y ? 'sr-only' : 'flex flex-col gap-0.5 items-baseline w-auto text-balance'"
      :for="id && as === 'label' ? id : null"
    >
      {{ label }}
    </Component>

    <slot />
  </div>
</template>
