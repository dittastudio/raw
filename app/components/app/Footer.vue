<script lang="ts" setup>
import IconLogo from '@/assets/icons/logo.svg?component'

interface Props {
}

const {} = defineProps<Props>()
</script>

<template>
  <footer class="w-full bg-black text-white">
    <div class="wrapper py-5 sm:py-12 grid gap-x-(--app-inner-gutter) grid-cols-4 sm:grid-cols-8 md:grid-cols-12">
      <div class="col-span-full sm:col-span-5 md:col-span-7">
        <IconLogo class="w-full h-auto block" />
      </div>
    </div>
  </footer>
</template>
