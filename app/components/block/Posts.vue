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
    return entry ?? undefined
  }

  return undefined
}

const perPage = 10
const page = computed(() => {
  const raw = Array.isArray(route.query.page) ? route.query.page[0] : route.query.page
  const n = Number(raw ?? 1)
  return Number.isFinite(n) && n > 0 ? n : 1
})

const { data: posts } = await useAsyncData('posts', async () => {
  const { data } = await storyblokApi.get('cdn/stories', {
    content_type: 'post',
    per_page: perPage * page.value,
    page: 1,
    sort_by: 'first_published_at:desc',
    version: 'published',
    resolve_relations: [
      'post.author',
    ],
    filter_query: {
      category: {
        in: getCategory((route.query.category as string) || '')?.value,
      },
    },
  })
  return data.stories
}, {
  transform: (data: ISbStoryData<Post>[]) => {
    const payload = data.map(post => ({
      uuid: post.uuid,
      name: post.name,
      full_slug: post.full_slug,
      first_published_at: post.first_published_at,
      hero: post.content.hero,
      category: post.content.category,
      author: post.content.author as ISbStoryData<Person> | undefined,
    }))

    return payload
  },
  watch: [route],
})
</script>

<template>
  <div
    v-editable="block"
    class="w-full bg-offwhite text-offblack"
  >
    <div class="wrapper-max py-22 flex flex-col items-start justify-center gap-22">
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

          <div class="w-full flex flex-col items-center justify-center">
            <NuxtLink
              :to="{
                path: $route.path,
                query: { ...$route.query, page: ((Number($route.query.page) || 1) + 1).toString() },
              }"
            >
              <UiButton colour="dark">
                Load more
              </UiButton>
            </NuxtLink>
          </div>
        </div>

        <div
          v-else
          class="w-full"
        >
          <p>
            There are no posts available for this category.
          </p>
        </div>
      </Transition>
    </div>
  </div>
</template>
