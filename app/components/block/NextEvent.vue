<script lang="ts" setup>
import type { BlockNextEvent, Event, Post } from '#storyblok-components'
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
  preview_image: Post['preview_image'] | Post['hero'] | Event['preview_image']
  preview_text: Post['preview_text'] | Event['preview_text']
  eventDatetime: Post['event_datetime'] | Event['event_datetime']
}

const { data: event } = await useAsyncData(() => `next-event`, async () => {
  const today = new Date().toISOString().split('T')[0] // Format: YYYY-MM-DD

  const { data } = await storyblokApi.get('cdn/stories', {
    page: 1,
    per_page: 1,
    sort_by: 'content.event_datetime:asc',
    version: 'published',
    excluding_fields: 'blocks,seo_title,seo_description,seo_image',
    filter_query: {
      __or: [
        { component: { in: 'event' } },
        { category: { in: 'events' } },
      ],
      event_datetime: {
        gt_date: `${today} 00:01`, // Only events after today
      },
    },
  })

  return data.stories as ISbStoryData<Post | Event>[]
}, {
  transform: (payload: ISbStoryData<Post | Event>[]): EventPost | undefined => {
    const events = payload.map(post => ({
      uuid: post.uuid,
      name: post.name,
      full_slug: post.full_slug,
      preview_image: post.content.preview_image?.filename ? post.content.preview_image : undefined,
      preview_text: post.content.preview_text,
      eventDatetime: post.content.event_datetime,
    }))

    return events.length ? events[0] : undefined
  },
})
</script>

<template>
  <div
    v-editable="block"
    class="wrapper-max grid grid-cols-(--app-grid) gap-x-(--app-inner-gutter) gap-y-10 md:gap-y-20"
  >
    <div class="col-span-full md:col-start-1 md:col-span-3">
      <p class="type-h5">
        Coming up
      </p>
    </div>

    <div class="col-span-full md:col-start-4 md:col-span-9">
      <div class="w-full flex flex-col gap-6">
        <p class="type-h2">
          <span class="is-outlined block">Next event</span>

          <template v-if="event?.eventDatetime">
            {{ formatDateDMY(event.eventDatetime) }}
          </template>
        </p>

        <h2 class="type-h4 max-w-[30em] text-balance">
          {{ event?.name ? event.name : `There are no upcoming events at this time. Please check back soon.` }}
        </h2>
      </div>
    </div>

    <div
      v-if="event?.preview_image"
      class="col-start-1 col-span-full md:col-span-7 max-md:order-1 flex flex-col gap-6 md:gap-10"
    >
      <NuxtImg
        v-if="event.preview_image.filename && storyblokAssetType(event.preview_image.filename) === 'image'"
        class="block w-full h-auto"
        :src="event.preview_image.filename"
        :alt="event.preview_image.alt || event.name || event.preview_text || ''"
        :width="500"
        :height="Math.round(storyblokImageDimensions(event.preview_image.filename).height / storyblokImageDimensions(event.preview_image.filename).width * 500)"
        loading="lazy"
      />

      <UiPartnershipButton :theme="block.theme" />
    </div>

    <div
      v-if="event"
      class="flex flex-col gap-6 md:gap-10 col-start-2 sm:col-start-5 md:col-start-9 col-span-full"
    >
      <p
        v-if="event.preview_text"
        class="type-p text-pretty max-w-[24em] whitespace-pre-wrap"
      >
        {{ event.preview_text }}
      </p>

      <NuxtLink :to="`/${event.full_slug}`">
        <UiButton>
          Learn more
        </UiButton>
      </NuxtLink>
    </div>
  </div>
</template>
