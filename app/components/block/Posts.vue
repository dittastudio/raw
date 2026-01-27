<script lang="ts" setup>
import type { BlockPosts, Person, Post } from '@@/.storyblok/types/289672313529140/storyblok-components'
import type { ISbStoryData } from '@storyblok/js'

interface Props {
  block: BlockPosts
}

const { block } = defineProps<Props>()
const storyblokApi = useStoryblokApi()
const route = useRoute()

const { data: categories } = await useAsyncData('categories', async () => await storyblokApi.get(`cdn/datasource_entries`, {
  datasource: 'category',
}))

interface Entry {
  id: number
  value: string
  name: string
}

const getCategory = (value?: string | string[] | number): Entry | undefined => {
  if (categories.value?.data.datasource_entries && value) {
    const postCategory = Array.isArray(value) ? value[0] : value
    const entry = categories.value.data.datasource_entries.find((entry: Entry) => entry.value === postCategory)
    return entry as Entry ?? undefined
  }

  return undefined
}

const page = computed(() => {
  const raw = Array.isArray(route.query.page) ? route.query.page[0] : route.query.page
  const num = Number(raw ?? 1)
  return Number.isFinite(num) && num > 0 ? num : 1
})

const categoryValue = computed(() => {
  const query = Array.isArray(route.query.category) ? route.query.category[0] : route.query.category
  return getCategory(query || '')?.value
})

interface Posts {
  uuid: string
  name: string
  full_slug: string
  first_published_at?: string
  hero: Post['hero']
  category: Post['category']
  author?: ISbStoryData<Person>
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

const { data: postsPayload } = await useAsyncData(() => `posts-${categoryValue.value ?? 'all'}-${page.value}`, async () => {
  const requested = perPage * page.value

  const { data } = await storyblokApi.get('cdn/stories', {
    content_type: 'post',
    per_page: requested + 1,
    page: 1,
    sort_by: 'first_published_at:desc',
    version: 'published',
    resolve_relations: [
      'post.author',
    ],
    filter_query: {
      category: {
        in: categoryValue.value,
      },
    },
  })

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
      hero: post.content.hero,
      category: post.content.category,
      author: post.content.author as ISbStoryData<Person> | undefined,
    }))

    return {
      posts,
      hasMore,
    }
  },
  watch: [categoryValue, page],
})

const posts = computed(() => postsPayload.value?.posts ?? [])
const hasMore = computed(() => postsPayload.value?.hasMore ?? false)
</script>

<template>
  <UiTheme
    v-editable="block"
    theme="light"
    class="w-full"
  >
    <div class="wrapper-max flex flex-col items-start justify-center gap-22">
      <div class="w-full flex flex-col items-start justify-center gap-6">
        <FilterDatasource
          v-if="categories?.data.datasource_entries.length"
          slug="category"
          :entries="categories.data.datasource_entries"
        >
          <template #default="{ filters, applied }">
            <h2 class="type-display-28">
              {{ applied.item?.name ? applied.item.name === 'All' ? 'All Posts' : applied.item.name : 'All Posts' }}
            </h2>

            <ul class="w-full flex items-center justify-start gap-4 md:gap-5">
              <li
                v-for="filter in filters"
                :key="filter.id"
                class="type-h5 flex items-center justify-center not-last:after:content-['|'] after:ml-4 md:after:ml-5"
              >
                <NuxtLink
                  :to="filter.to"
                  class="block hover:opacity-100 transition-opacity duration-200 ease-out whitespace-nowrap"
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
          </template>
        </FilterDatasource>
      </div>

      <Transition
        name="fade"
        mode="out-in"
      >
        <div
          v-if="posts?.length"
          :key="`posts-key-${$route.fullPath}`"
          class="w-full flex flex-col items-start justify-center gap-22"
        >
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-(--app-inner-gutter) w-full">
            <li
              v-for="post in posts"
              :key="post.uuid"
            >
              <CardPost
                :headline="post.name"
                :slug="post.full_slug"
                :image="post.hero"
                :category="getCategory(post.category)?.name"
              >
                <template #author>
                  <CardAuthor
                    v-if="post.author"
                    :name="post.author.content.name"
                    :image="post.author.content.image"
                    :date="post.first_published_at"
                    size="small"
                  />
                </template>
              </CardPost>
            </li>
          </ul>

          <div
            v-if="hasMore"
            class="w-full flex flex-col items-center justify-center"
          >
            <NuxtLink
              :to="{
                path: $route.path,
                query: { ...$route.query, page: ((Number($route.query.page) || 1) + 1).toString() },
              }"
            >
              <UiButton theme-override="dark">
                Load more
              </UiButton>
            </NuxtLink>
          </div>
        </div>

        <p
          v-else
          class="type-mono-16"
        >
          There are no posts available for {{ getCategory(categoryValue)?.name || 'this filter' }}.
        </p>
      </Transition>
    </div>
  </UiTheme>
</template>
