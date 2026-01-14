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
      text-white
      outline-1
      outline-offset-2
      outline-(--app-text-color)/10
      rounded-full
      before:content-['']
      before:absolute before:w-[2px]
      before:h-[50%]
      before:bg-current
      before:rounded-full
      after:content-['']
      after:absolute
      after:w-[50%]
      after:h-[2px]
      after:bg-current
      after:rounded-full
    "
    :class="{
      'is-open': isHeaderOpen,
      'is-animating': isAnimating,
    }"
    @animationend="handleAnimationEnd"
  />
</template>

<style scoped>
@reference "@/assets/css/app.css";

.header-switch {
  width: var(--app-header-logo-height);
  height: var(--app-header-logo-height);

  rotate: 0deg;

  &.is-open {
    rotate: 45deg;
  }

  &.is-animating:not(.is-open) {
    animation: close 0.5s var(--ease-inOutBack) forwards;
  }

  &.is-animating.is-open {
    animation: open 0.5s var(--ease-outQuart) forwards;
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
