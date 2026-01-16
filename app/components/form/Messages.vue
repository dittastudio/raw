<script lang="ts" setup>
interface Props {
  messages?: string[]
}

const { messages = [] } = defineProps<Props>()
</script>

<template>
  <ul>
    <li
      v-for="(message, index) in messages"
      :key="index"
    >
      {{ message }}
    </li>
  </ul>
</template>
