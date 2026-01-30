<script lang="ts" setup>
import type { Page, Post, Project } from '@@/.storyblok/types/289672313529140/storyblok-components'

const route = useRoute()

const relations: string[] = [
  'post.author',
  'team.people',
  'block_projects.projects',
]

const story = await useStory<Page | Post | Project>(
  route.path,
  { resolve_relations: relations },
  { resolveRelations: relations },
)

// Set initial theme
if (story.value) {
  useInitialTheme(story.value.content.blocks)
}

const imageOptions = {
  width: 1200,
  height: 630,
  format: 'jpg',
  smart: true,
  quality: 80,
}

useSeoMeta({
  title: story.value?.content.seo_title ?? '',
  description: story.value?.content.seo_description,
  ogTitle: story.value?.content.seo_title ?? '',
  ogDescription: story.value?.content.seo_description,
  ogImage: storyblokImage(story.value?.content.seo_image?.filename, imageOptions) || null,
  ogType: 'website',
  twitterTitle: story.value?.content.seo_title ?? '',
  twitterCard: 'summary_large_image',
  twitterImage: storyblokImage(story.value?.content.seo_image?.filename, imageOptions) || null,
})
</script>

<template>
  <main class="w-full min-h-svh">
    <TemplatePage
      v-if="isPage(story)"
      :story="story"
    />

    <TemplatePost
      v-else-if="isPost(story)"
      :story="story"
    />

    <TemplateProject
      v-else-if="isProject(story)"
      :story="story"
    />
  </main>
</template>
