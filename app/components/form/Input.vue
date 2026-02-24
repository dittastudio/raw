<script lang="ts" setup>
interface Props {
  id?: string
  multiLine?: boolean
  field?:
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'hidden'
    | 'month'
    | 'number'
    | 'password'
    | 'range'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
}

const { multiLine = false, id = '', field = 'text' } = defineProps<Props>()
const modelValue = defineModel<string>()

const onInput = (event: Event) => {
  modelValue.value = (event.target as HTMLInputElement).value
}

defineOptions({
  inheritAttrs: false,
})

const mergedAttrs = useMergedAttrs('w-full border-b border-current ring-0 outline-0 transition-colors duration-200 ease-in-out px-0 py-4')
</script>

<template>
  <Component
    :is="multiLine ? 'textarea' : 'input'"
    :id="id"
    v-bind="mergedAttrs"
    :type="field && !multiLine ? field : null"
    :class="{ 'min-h-45 field-sizing-content': multiLine }"
    :value="modelValue"
    autocomplete="off"
    spellcheck="false"
    @input="onInput"
  />
</template>
