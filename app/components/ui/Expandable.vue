<script lang="ts" setup>
interface Props {
  isOpen?: boolean
  isDisabled?: boolean
  openOnHover?: 'group/expandable' | false
}

const { isOpen = false, isDisabled = false, openOnHover = false } = defineProps<Props>()

const isHoverMode = computed(() => openOnHover === 'group/expandable')

const wrapperClasses = computed(() => {
  if (isDisabled) {
    return ''
  }

  const base = 'grid overflow-hidden transition-[grid-template-rows] duration-300 ease-inOutExpo'

  if (isHoverMode.value) {
    return `${base} only-touch:!grid-rows-[1fr] grid-rows-[0fr] group-hover/expandable:grid-rows-[1fr]`
  }

  return `${base} ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`
})

const contentClasses = computed(() => {
  if (isDisabled) {
    return ''
  }

  const base = 'min-h-0 transition-opacity ease-out'

  if (isHoverMode.value) {
    return `${base} only-touch:!opacity-100 opacity-0 duration-200 group-hover/expandable:opacity-100 group-hover/expandable:duration-300 group-hover/expandable:delay-250`
  }

  return isOpen
    ? `${base} opacity-100 duration-300 delay-250`
    : `${base} opacity-0 duration-200`
})
</script>

<template>
  <div :class="wrapperClasses">
    <div :class="contentClasses">
      <slot />
    </div>
  </div>
</template>
