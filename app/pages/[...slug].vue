<script lang="ts" setup>
import type { Event, Page, Post, Project } from '#storyblok-components'

const route = useRoute()

const relations: string[] = [
  'post.author',
  'team.people',
  'block_featured_event.event',
  'block_projects_filtered.projects',
  'block_projects_selected.projects',
  'block_project_carousel.projects',
]

const story = await useStory<Event | Page | Post | Project>(
  route.path,
  { resolve_relations: relations },
  { resolveRelations: relations },
)

const { seo_title, seo_description, seo_image } = story.value.content
const imageOptions = { width: 1200, height: 630, format: 'jpg', smart: true, quality: 80 }

useSeoMeta({
  title: seo_title ?? story.value.name,
  description: seo_description,
  ogTitle: seo_title ?? story.value.name,
  ogDescription: seo_description,
  ogImage: storyblokImage(seo_image?.filename, imageOptions) || null,
  ogImageWidth: imageOptions.width,
  ogImageHeight: imageOptions.height,
  ogType: 'website',
})
</script>

<template>
  <main class="w-full min-h-svh">
    <TemplateEvent
      v-if="isEvent(story)"
      :story="story"
    />

    <TemplatePage
      v-else-if="isPage(story)"
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
