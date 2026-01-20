<script lang="ts" setup>
interface Props {
  isOpen: boolean
}

const { isOpen } = defineProps<Props>()

const isAnimating = ref(false)

watch(() => isOpen, () => {
  isAnimating.value = true
})

const handleAnimationEnd = () => {
  isAnimating.value = false
}
</script>

<template>
  <span
    class="
      ui-plus-minus
      relative
      size-3
      flex
      items-center
      justify-center
      text-current
      rounded-full
      before:content-['']
      before:absolute before:w-px
      before:h-full
      before:bg-current
      before:rounded-full
      after:content-['']
      after:absolute
      after:w-full
      after:h-px
      after:bg-current
      after:rounded-full
    "
    :class="{
      'is-open': isOpen,
      'is-animating': isAnimating,
    }"
    @animationend="handleAnimationEnd"
  />
</template>

<style scoped>
@reference "@/assets/css/app.css";

.ui-plus-minus {
  width: 16px;
  height: 16px;

  &::before {
    rotate: 0deg;
  }

  &.is-open::before {
    rotate: 90deg;
  }

  &.is-animating:not(.is-open)::before {
    animation: close 0.3s var(--ease-out) forwards;
  }

  &.is-animating.is-open::before {
    animation: open 0.3s var(--ease-out) forwards;
  }
}

@keyframes open {
  0% {
    rotate: 0deg;
  }
  100% {
    rotate: 90deg;
  }
}

@keyframes close {
  0% {
    rotate: 90deg;
  }
  99.9999% {
    rotate: 180deg;
  }
  100% {
    rotate: 0deg;
  }
}
</style>
