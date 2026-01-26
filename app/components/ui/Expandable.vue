<script lang="ts" setup>
interface Props {
  isOpen?: boolean
  isDisabled?: boolean
  openOnHover?: boolean
}

const { isOpen = false, isDisabled = false, openOnHover = false } = defineProps<Props>()
</script>

<template>
  <div
    data-component="ui-expandable"
    :class="{
      'grid overflow-hidden transition-[grid-template-rows] duration-300 ease-inOutExpo': !isDisabled,
      'grid-rows-[0fr] group-hover/expandable:grid-rows-[1fr]': openOnHover && !isDisabled,
      'grid-rows-[0fr]': !isOpen && !isDisabled && !openOnHover,
      'grid-rows-[1fr]': isOpen && !isDisabled && !openOnHover,
    }"
  >
    <div
      :class="{
        'min-h-0': !isDisabled,
        'opacity-0 group-hover/expandable:opacity-100 transition-opacity duration-200 ease-out group-hover/expandable:duration-300 group-hover/expandable:delay-250': openOnHover && !isDisabled,
        'opacity-0 transition-opacity duration-200 ease-out': !isOpen && !isDisabled && !openOnHover,
        'opacity-100 transition-opacity duration-300 ease-out delay-250': isOpen && !isDisabled && !openOnHover,
      }"
    >
      <slot />
    </div>
  </div>
</template>
