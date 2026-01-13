<script lang="ts" setup>
const isHeaderOpen = useState<boolean>('isHeaderOpen', () => false)
</script>

<template>
  <span
    class="header-switch relative flex items-center justify-center xbg-green text-white rounded-full"
    :class="{
      'is-open': isHeaderOpen,
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

.header-switch {
  width: var(--app-header-logo-height);
  height: var(--app-header-logo-height);

  animation: close 0.5s var(--ease-outQuart) forwards;

  &.is-open {
    animation: open 0.5s var(--ease-outQuart) forwards;
  }
}

@keyframes open {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(45deg);
  }
}

@keyframes close {
  0% {
    transform: rotate(45deg);
  }
  99.9999% {
    transform: rotate(90deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
