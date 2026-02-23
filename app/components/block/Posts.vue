<script lang="ts" setup>
import type { BlockPosts, Event, Post } from '#storyblok-components'
import type { ISbStoriesParams, ISbStoryData } from '@storyblok/js'

interface Props {
  block: BlockPosts
}

const { block } = defineProps<Props>()
const storyblokApi = useStoryblokApi()
const route = useRoute()

const { data: postCategories } = await useAsyncData('post-categories', async () => await storyblokApi.get(`cdn/datasource_entries`, {
  datasource: 'post-category',
}))

const categories = computed(() => postCategories.value?.data.datasource_entries || [])

const currentCategory = computed(() => {
  const query = Array.isArray(route.query.category) ? route.query.category[0] : route.query.category
  return getCategoryEntry(query || '', categories.value)
})

const currentPage = computed(() => {
  const raw = Array.isArray(route.query.page) ? route.query.page[0] : route.query.page
  const num = Number(raw ?? 1)
  return Number.isFinite(num) && num > 0 ? num : 1
})

interface Posts {
  uuid: string
  name: string
  full_slug: string
  first_published_at?: string
  image: Post['hero'] | Post['preview_image'] | undefined
  category: Post['category']
  component: Post['component'] | Event['component']
}

interface PostsPayload {
  posts: Posts[]
  hasMore: boolean
}

interface PostsTransformInput {
  stories: ISbStoryData<Post>[]
  requested: number
}

const perPage = 8

const { data: postsPayload } = await useAsyncData(() => `posts-${currentCategory.value ?? 'all'}-${currentPage.value}`, async () => {
  const requested = perPage * currentPage.value

  // Awful query hack below because we have both events as posts and events as an event content type.

  let query = {} as ISbStoriesParams

  // All / no category.
  if (!currentCategory.value) {
    query = {
      page: 1,
      per_page: requested + 1,
      sort_by: 'first_published_at:desc',
      version: 'published',
      excluding_fields: 'blocks,seo_title,seo_description,seo_image',
      filter_query: {
        component: {
          in: 'post,event',
        },
      },
    }
  }
  // Events combined.
  else if (currentCategory.value.value === 'events') {
    query = {
      page: 1,
      per_page: requested + 1,
      sort_by: 'content.event_datetime:desc',
      version: 'published',
      excluding_fields: 'blocks,seo_title,seo_description,seo_image',
      filter_query: {
        __or: [
          { component: { in: 'event' } },
          { category: { in: 'events' } },
        ],
        event_datetime: {
          is: 'not_empty',
        },
      },
    }
  }
  // Specific category.
  else {
    query = {
      page: 1,
      per_page: requested + 1,
      sort_by: 'first_published_at:desc',
      version: 'published',
      excluding_fields: 'blocks,seo_title,seo_description,seo_image',
      filter_query: {
        component: {
          in: 'post',
        },
        category: {
          in: currentCategory.value?.value,
        },
      },
    }
  }

  const { data } = await storyblokApi.get('cdn/stories', query)

  return {
    stories: data.stories as ISbStoryData<Post>[],
    requested,
  }
}, {
  transform: (input: PostsTransformInput): PostsPayload => {
    const hasMore = input.stories.length > input.requested
    const payload = hasMore ? input.stories.slice(0, -1) : input.stories

    const posts = payload.map(post => ({
      uuid: post.uuid,
      name: post.name,
      full_slug: post.full_slug,
      first_published_at: post.first_published_at ?? undefined,
      image: post.content.preview_image?.filename ? post.content.preview_image : post.content.hero?.filename ? post.content.hero : undefined,
      category: post.content.category,
      component: post.content.component,
    }))

    return {
      posts,
      hasMore,
    }
  },
  watch: [currentCategory, currentPage],
})

const posts = computed(() => postsPayload.value?.posts ?? [])
const hasMore = computed(() => postsPayload.value?.hasMore ?? false)
</script>

<template>
  <div
    v-editable="block"
    class="w-full"
  >
    <div class="flex flex-col gap-16">
      <div class="w-full flex flex-col overflow-hidden">
        <FilterDatasource
          v-if="categories.length"
          slug="category"
          :entries="categories"
        >
          <template #default="{ filters, applied }">
            <Transition
              name="fade"
              mode="out-in"
            >
              <h2
                :key="applied.item?.name ?? 'all'"
                class="type-display-28 wrapper-max"
              >
                {{ applied.item?.name ? applied.item.name === 'All' ? 'All Posts' : applied.item.name : 'All Posts' }}
              </h2>
            </Transition>

            <div class="scroll-x">
              <div class="wrapper-max">
                <ul class="w-full flex items-center justify-start gap-4 md:gap-5">
                  <li
                    v-for="filter in filters"
                    :key="filter.id"
                    class="type-h5 flex items-center justify-center not-last:after:content-['|'] after:ml-4 md:after:ml-5"
                  >
                    <NuxtLink
                      :to="filter.to"
                      class="block hover:opacity-100 transition-opacity duration-200 ease-out whitespace-nowrap py-6"
                      :class="[
                        {
                          'opacity-40': applied.slug !== filter.value,
                          'opacity-100': applied.slug === filter.value || (!applied.slug && !filter.value),
                        },
                      ]"
                    >
                      {{ filter.name }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>
          </template>
        </FilterDatasource>
      </div>

      <div class="wrapper-max">
        <Transition
          name="fade"
          mode="out-in"
        >
          <div
            v-if="posts?.length"
            :key="`posts-key-${$route.fullPath}`"
            class="w-full flex flex-col items-start justify-center gap-22"
          >
            <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-(--app-inner-gutter) gap-y-(--app-outer-gutter) w-full">
              <li
                v-for="post in posts"
                :key="post.uuid"
              >
                <CardPost
                  :headline="post.name"
                  :slug="post.full_slug"
                  :image="post.image"
                  :category="getCategoryEntry(post.category, categories)?.name || (post.component === 'event' ? 'Events' : undefined)"
                />
              </li>
            </ul>

            <div
              v-if="hasMore && posts.length <= 100"
              class="w-full flex flex-col items-center justify-center"
            >
              <NuxtLink
                :to="{
                  path: $route.path,
                  query: { ...$route.query, page: ((Number($route.query.page) || 1) + 1).toString() },
                }"
              >
                <UiButton>
                  Load more
                </UiButton>
              </NuxtLink>
            </div>
          </div>

          <p
            v-else
            class="type-mono-16"
          >
            There are no posts available for {{ currentCategory?.name || 'this filter' }}.
          </p>
        </Transition>
      </div>
    </div>
  </div>
</template>
