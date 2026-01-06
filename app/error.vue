<script lang="ts" setup>
import IconLogo from '@/assets/icons/logo.svg'

interface Props {
  error: {
    statusCode: number
    statusMessage: string
  }
}

const { error } = defineProps<Props>()

const message = computed(() => error?.statusCode && error?.statusMessage
  ? `${error?.statusCode} ${error?.statusMessage}`
  : 'an unexpected error',
)

useHead({
  title: message.value.toLowerCase(),
})
</script>

<template>
  <div class="w-full h-screen flex flex-col items-center justify-center gap-10 px-4">
    <div class="flex flex-col items-center gap-10 text-center">
      <NuxtLink
        to="/"
        class="block"
      >
        <IconLogo class="w-20 h-auto mx-auto" />
      </NuxtLink>

      <h1>
        {{ message }}
      </h1>
    </div>
  </div>
</template>
