<script lang="ts" setup>
import type { BlockPastEvents, Post } from '#storyblok-components'
import type { ISbStoryData } from '@storyblok/js'

interface Props {
  block: BlockPastEvents
}

const { block } = defineProps<Props>()
const storyblokApi = useStoryblokApi()

interface EventPost {
  uuid: string
  name: string
  full_slug: string
  preview_image: Post['preview_image'] | Post['hero']
  preview_text: Post['preview_text']
  eventDatetime: Post['event_datetime']
}

const { data: events } = await useAsyncData(() => `past-events`, async () => {
  const today = new Date().toISOString().split('T')[0] // Format: YYYY-MM-DD

  const { data } = await storyblokApi.get('cdn/stories', {
    page: 1,
    per_page: 4,
    sort_by: 'content.event_datetime:desc',
    version: 'published',
    excluding_fields: 'blocks,seo_title,seo_description,seo_image',
    filter_query: {
      __or: [
        { component: { in: 'event' } },
        { category: { in: 'events' } },
      ],
      event_datetime: {
        lt_date: `${today} 00:01`, // Only events before today
      },
    },
  })

  return data.stories as ISbStoryData<Post>[]
}, {
  transform: (payload: ISbStoryData<Post>[]): EventPost[] => {
    const events = payload.map(post => ({
      uuid: post.uuid,
      name: post.name,
      full_slug: post.full_slug,
      preview_image: post.content.preview_image?.filename ? post.content.preview_image : post.content.hero?.filename ? post.content.hero : undefined,
      preview_text: post.content.preview_text,
      eventDatetime: post.content.event_datetime,
    }))

    return events
  },
})
</script>

<template>
  <div
    v-editable="block"
    class="wrapper-max flex flex-col gap-15"
  >
    <p class="type-h5">
      Past events
    </p>

    <ul class="grid grid-cols-2 lg:grid-cols-4 gap-x-(--app-inner-gutter) gap-y-(--app-outer-gutter)">
      <li
        v-for="event in events"
        :key="event.uuid"
      >
        <CardEvent
          :slug="event.full_slug"
          :datetime="event.eventDatetime"
          :headline="event.name"
          :description="event.preview_text"
        >
          <template #image>
            <NuxtImg
              v-if="event.preview_image?.filename && storyblokAssetType(event.preview_image.filename) === 'image'"
              class="block size-full object-cover"
              :src="event.preview_image.filename"
              :alt="event.preview_image.alt || event.name || event.preview_text || ''"
              :width="storyblokImageDimensions(event.preview_image.filename).width"
              :height="storyblokImageDimensions(event.preview_image.filename).height"
              sizes="
                xs:50vw
                sm:50vw
                md:50vw
                lg:25vw
                xl:330px
              "
              loading="lazy"
            />
          </template>
        </CardEvent>
      </li>
    </ul>

    <StoryblokLink
      v-if="block.cta_title && block.cta?.cached_url"
      :item="block.cta"
      class="block mx-auto"
    >
      <UiButton>
        {{ block.cta_title }}
      </UiButton>
    </StoryblokLink>
  </div>
</template>
