<script lang="ts" setup>
import type { Page } from '@@/.storyblok/types/289672313529140/storyblok-components'

const relations: string[] = []

const imageOptions = {
  width: 1200,
  height: 630,
  format: 'jpg',
  smart: true,
  quality: 80,
}
const route = useRoute()
const story = await useStory<Page>(
  route.path,
  { resolve_relations: relations },
  { resolveRelations: relations },
)

useSeoMeta({
  title: story.value?.content.seo_title ?? '',
  description: story.value?.content.seo_description,
  ogTitle: story.value?.content.seo_title ?? '',
  ogDescription: story.value?.content.seo_description,
  ogImage:
    storyblokImage(story.value?.content.seo_image?.filename, imageOptions)
    || null,
  ogType: 'website',
  twitterTitle: story.value?.content.seo_title ?? '',
  twitterCard: 'summary_large_image',
  twitterImage:
    storyblokImage(story.value?.content.seo_image?.filename, imageOptions)
    || null,
})
</script>

<template>
  <main class="w-full min-h-svh">
    <AppComponents
      v-if="story"
      :content="story.content"
    />
  </main>
</template>
