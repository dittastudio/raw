<script lang="ts" setup>
import type { StoryblokMultilink } from '@@/.storyblok/types/storyblok'

interface Props {
  item: StoryblokMultilink
}

const { item } = defineProps<Props>()

const customAttributes = {
  title: item?.title,
  rel: item?.rel,
}

const attributes = {
  ...customAttributes,
  to: determineHref(item),
  target: item?.target ?? item?.linktype === 'asset' ? '_blank' : null,
}
</script>

<template>
  <NuxtLink v-bind="attributes">
    <slot />
  </NuxtLink>
</template>
