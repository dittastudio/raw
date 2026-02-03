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
    sort_by: 'content.event_datetime:asc',
    version: 'published',
    excluding_fields: 'blocks,seo_title,seo_description,seo_image',
    filter_query: {
      category: {
        in: 'events',
      },
      event_datetime: {
        gt_date: `${today} 00:01`, // Only events after today
      },
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
  <!-- <div
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
  </div> -->

  <div
    v-if="post"
    v-editable="block"
    class="wrapper-max grid grid-cols-(--app-grid) gap-x-(--app-inner-gutter) gap-y-10 md:gap-y-20"
  >
    <div
      class="
        col-span-full
        md:col-start-1
        md:col-span-3
      "
    >
      <h2 class="type-h5">
        Coming up
      </h2>
    </div>

    <div
      v-if="post.eventDatetime"
      class="
        col-span-full
        md:col-start-4
        md:col-span-9
      "
    >
      <p class="type-h2">
        <span class="is-outlined block">Next event</span>
        {{ formatDateDMY(post.eventDatetime) }}
      </p>

      <h2
        v-if="post.name"
        class="type-h4 mt-6"
      >
        {{ post.name }}
      </h2>
    </div>

    <div
      v-if="post.hero"
      class="col-start-1 col-span-full md:col-span-7 max-md:order-1"
    >
      <NuxtImg
        v-if="post.hero.filename && storyblokAssetType(post.hero.filename) === 'image'"
        class="block w-full h-auto"
        :src="post.hero.filename"
        :alt="post.hero.alt || ''"
        :width="500"
        :height="Math.round(storyblokImageDimensions(post.hero.filename).height / storyblokImageDimensions(post.hero.filename).width * 500)"
        loading="lazy"
      />
    </div>

    <div
      class="flex flex-col gap-6 md:gap-10 col-start-2 sm:col-start-5 md:col-start-9 col-span-full"
    >
      <div
        class="next-event__copy"
      >
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis exercitationem fugiat ab cum eligendi ad perferendis eveniet vero corrupti recusandae explicabo tempora placeat similique, tenetur fuga necessitatibus itaque, voluptates quae!</p>
      </div>

      <NuxtLink :to="`/${post.full_slug}`">
        <UiButton type="solid">
          Learn more
        </UiButton>
      </NuxtLink>
    </div>
  </div>

  <template v-else>
    <p>No upcoming events.</p>
  </template>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.next-event__copy {
  :deep(p),
  :deep(li) {
    @apply type-p;

    text-wrap: pretty;
    max-width: 24em;
  }

  :deep(p + p),
  :deep(p + ul),
  :deep(p + ol),
  :deep(ul + p),
  :deep(ol + p) {
    padding-top: 1.25em;
  }
}
</style>
