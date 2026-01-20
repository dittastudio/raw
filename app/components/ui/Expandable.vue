<script lang="ts" setup>
interface Props {
  isOpen?: boolean
  isDisabled?: boolean
}

const { isOpen = false, isDisabled = false } = defineProps<Props>()
</script>

<template>
  <div
    data-component="ui-expand-collapse"
    :class="{
      'grid overflow-hidden transition-[grid-template-rows] duration-300 ease-inOutExpo': !isDisabled,
      'grid-rows-[0fr]': !isOpen && !isDisabled,
      'grid-rows-[1fr]': isOpen && !isDisabled,
    }"
  >
    <div
      :class="{
        'min-h-0': !isDisabled,
        'opacity-0 transition-opacity duration-200 ease-out': !isOpen && !isDisabled,
        'opacity-100 transition-opacity duration-300 ease-out delay-250': isOpen && !isDisabled,
      }"
    >
      <slot />
    </div>
  </div>
</template>
