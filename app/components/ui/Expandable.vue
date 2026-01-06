<script lang="ts" setup>
interface Props {
  isOpen?: boolean
}

const { isOpen = false } = defineProps<Props>()
</script>

<template>
  <div
    data-component="ui-expand-collapse"
    class="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-inOutQuart"
    :class="{
      'grid-rows-[0fr]': !isOpen,
      'grid-rows-[1fr]': isOpen,
    }"
  >
    <div
      class="min-h-0 transition-opacity ease-out"
      :class="{
        'opacity-0 duration-200': !isOpen,
        'opacity-100 duration-500 delay-400': isOpen,
      }"
    >
      <slot />
    </div>
  </div>
</template>
