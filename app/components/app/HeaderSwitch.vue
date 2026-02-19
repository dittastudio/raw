<script lang="ts" setup>
const isHeaderOpen = useState<boolean>('isHeaderOpen', () => false)
const isAnimating = ref(false)

watch(isHeaderOpen, () => {
  isAnimating.value = true
})

const handleAnimationEnd = () => {
  isAnimating.value = false
}
</script>

<template>
  <span
    class="
      header-switch
      relative
      flex
      items-center
      justify-center
      text-offwhite
      outline-1
      outline-offset-0
      transition-[outline-color]
      duration-500
      ease-inOutBack
      rounded-full
      before:content-['']
      before:absolute before:w-px
      before:h-1/2
      before:bg-current
      before:rounded-full
      after:content-['']
      after:absolute
      after:w-1/2
      after:h-px
      after:bg-current
      after:rounded-full
    "
    :class="{
      'is-open': isHeaderOpen,
      'is-animating': isAnimating,
      'outline-offwhite/10': !isHeaderOpen,
      'outline-offblack/0': isHeaderOpen,
    }"
    @animationend="handleAnimationEnd"
  />
</template>

<style scoped>
@reference "@/assets/css/app.css";

.header-switch {
  width: 38px;
  height: 38px;

  rotate: 0deg;

  &.is-open {
    rotate: 45deg;
  }

  &.is-animating:not(.is-open) {
    animation: close 0.5s var(--ease-inOutBack) forwards;
  }

  &.is-animating.is-open {
    animation: open 0.5s var(--ease-inOutBack) forwards;
  }
}

@keyframes open {
  0% {
    rotate: 0deg;
  }
  100% {
    rotate: 45deg;
  }
}

@keyframes close {
  0% {
    rotate: 45deg;
  }
  99.9999% {
    rotate: 90deg;
  }
  100% {
    rotate: 0deg;
  }
}
</style>
