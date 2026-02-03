<script lang="ts" setup>
import type { BlockNextEvent, Post } from '@@/.storyblok/types/289672313529140/storyblok-components'
import type { ISbStoryData } from '@storyblok/js'

interface Props {
  block: BlockNextEvent
}

const { block } = defineProps<Props>()
const storyblokApi = useStoryblokApi()

interface EventPost {
  uuid: string
  name: string
  full_slug: string
  first_published_at?: string
  hero: Post['hero']
  category: Post['category']
  eventDatetime: Post['event_datetime']
}

const { data: post } = await useAsyncData(() => `next-event`, async () => {
  const today = new Date().toISOString().split('T')[0] // Format: YYYY-MM-DD

  const { data } = await storyblokApi.get('cdn/stories', {
    content_type: 'post',
    page: 1,
    per_page: 1,
    sort_by: 'first_published_at:desc',
    version: 'published',
    excluding_fields: 'blocks,seo_title,seo_description,seo_image',
    filter_query: {
      category: {
        in: 'events',
      },
      event_datetime: {
        gt_date: `${today} 00:01`, // Only events after today
      },
      // component: {
      //   in: 'post,project',
      // },
    },
  })

  return data.stories as ISbStoryData<Post>[]
}, {
  transform: (payload: ISbStoryData<Post>[]): EventPost | undefined => {
    const posts = payload.map(post => ({
      uuid: post.uuid,
      name: post.name,
      full_slug: post.full_slug,
      first_published_at: post.first_published_at ?? undefined,
      hero: post.content.hero,
      category: post.content.category,
      eventDatetime: post.content.event_datetime ?? undefined,
    }))

    return posts.length ? posts[0] : undefined
  },
})
</script>

<template>
  <div
    v-editable="block"
    class="w-full"
  >
    <div class="wrapper-max">
      <template v-if="post">
        <p
          v-if="post.eventDatetime"
          class="type-h2"
        >
          <span class="text-outline-offblack block">Next event</span>
          {{ formatDateDMY(post.eventDatetime) }}
        </p>

        <h3 class="type-h4">
          {{ post.name }}
        </h3>

        <NuxtLink :to="`/${post.full_slug}`">
          <UiButton type="solid">
            Learn more
          </UiButton>
        </NuxtLink>

        <pre>{{ post }}</pre>
      </template>

      <template v-else>
        <p>No upcoming events.</p>
      </template>
    </div>
  </div>
</template>
