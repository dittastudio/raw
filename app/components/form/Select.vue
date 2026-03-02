<script lang="ts" setup>
interface Props {
  id?: string
  options?: {
    label: string
    value: string
  }[]
}

const { id = '', options = [] } = defineProps<Props>()
const modelValue = defineModel<string>()

const onInput = (event: Event) => {
  modelValue.value = (event.target as HTMLSelectElement).value
}

defineOptions({
  inheritAttrs: false,
})

const mergedAttrs = useMergedAttrs('appearance-none w-full border-b border-current ring-0 outline-0 transition-colors duration-200 ease-in-out px-0 py-3')
</script>

<template>
  <select
    :id="id"
    v-bind="mergedAttrs"
    :value="modelValue"
    @input="onInput"
  >
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>
