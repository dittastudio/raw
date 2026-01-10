<script lang="ts" setup>
interface Props {
  loading?: boolean
}

const { loading = false } = defineProps<Props>()
</script>

<template>
  <form
    novalidate
    class="w-full relative transition-opacity duration-200 ease-in-out"
    :class="{
      'opacity-40 pointer-events-none select-none': loading,
    }"
  >
    <div class="flex flex-col gap-2 items-start justify-start w-full">
      <slot />
    </div>
  </form>
</template>
