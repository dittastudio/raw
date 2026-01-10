<script lang="ts" setup>
interface Props {
  type?: 'error' | 'success'
  message?: string
}

const { type = 'error', message = '' } = defineProps<Props>()
</script>

<template>
  <p
    class="text-12"
    :class="{
      'text-orange': type === 'error',
      'text-black': type === 'success',
    }"
  >
    {{ message }}
  </p>
</template>
