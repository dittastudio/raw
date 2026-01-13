<script lang="ts" setup>
interface Props {
  isOpen: boolean
}

const { isOpen } = defineProps<Props>()
</script>

<template>
  <span
    class="switch relative flex items-center justify-center xbg-green text-white rounded-full"
    :class="{
      'is-open': isOpen,
    }"
  >
    <span
      class="absolute h-[50%] w-[2px] bg-current rounded-full"
    />

    <span
      class="absolute h-[2px] w-[50%] bg-current rounded-full"
    />
  </span>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.switch {
  width: var(--app-header-logo-height);
  height: var(--app-header-logo-height);

  animation: close 0.5s var(--ease-outQuart) forwards;

  &.is-open {
    animation: open 0.5s var(--ease-outQuart) forwards;
  }
}

@keyframes open {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(45deg);
  }
}

@keyframes close {
  0% {
    transform: rotate(45deg);
  }
  99.99% {
    transform: rotate(90deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
