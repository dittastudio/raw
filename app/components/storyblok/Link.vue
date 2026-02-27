<script lang="ts" setup>
import type { StoryblokMultilink } from '#storyblok-types'

interface Props {
  item: StoryblokMultilink
}

const { item } = defineProps<Props>()

const route = useRoute()
const href = determineHref(item)

const activeAliases: Record<string, string[]> = {
  '/latest': ['/posts'],
}

const isActive = computed(() => {
  if (item.linktype !== 'story') {
    return false
  }

  if (route.path === href || (href !== '/' && route.path.startsWith(`${href}/`))) {
    return true
  }

  return activeAliases[href]?.some(alias => route.path.startsWith(`${alias}/`)) ?? false
})

const attributes = {
  title: item?.title,
  rel: item?.rel,
  to: href,
  target: item?.target ?? item?.linktype === 'asset' ? '_blank' : null,
}
</script>

<template>
  <NuxtLink
    v-bind="attributes"
    :class="{ 'router-link-active': isActive }"
  >
    <slot />
  </NuxtLink>
</template>
