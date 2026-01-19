<script lang="ts" setup>
import type { BlockPosts, Person, Post } from '@@/.storyblok/types/289672313529140/storyblok-components'
import type { ISbStoryData } from '@storyblok/js'

interface Props {
  block: BlockPosts
}

const { block } = defineProps<Props>()
const storyblokApi = useStoryblokApi()
// const route = useRoute()
// const routeQueryCategory = computed(() => route.query?.category ?? null)

const { data: categories } = await useAsyncData('categories', async () => await storyblokApi.get(`cdn/datasource_entries`, {
  datasource: 'category',
}))

interface Category {
  id: number
  value: string
  name: string
}

const findCategory = (value: string | string[] | undefined): string | undefined => {
  if (categories.value?.data.datasource_entries && value) {
    const postCategory = Array.isArray(value) ? value[0] : value
    const entry = categories.value.data.datasource_entries.find((entry: Category) => entry.value === postCategory)
    return entry ?? undefined
  }

  return undefined
}

const { data: posts } = await useAsyncData('posts', async () => {
  const { data } = await storyblokApi.get('cdn/stories', {
    content_type: 'post',
    per_page: 10,
    page: 1,
    sort_by: 'first_published_at:desc',
    version: 'published',
    resolve_relations: [
      'post.author',
    ],
    // filter_query: {
    //   category: {
    //     in: 'design',
    //   },
    // },
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
})
</script>

<template>
  <div
    v-editable="block"
    class="w-full"
  >
    <div>
      <div v-if="categories?.data.datasource_entries.length">
        <FilterDatasource
          slug="category"
          :entries="categories.data.datasource_entries"
        />
      </div>

      <Transition
        name="fade"
        mode="out-in"
      >
        <ul
          v-if="posts?.length"
          :key="`posts-key-${$route.fullPath}`"
          class="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full"
        >
          <li
            v-for="post in posts"
            :key="post.uuid"
            class="flex flex-col gap-6"
          >
            <CardPost
              :headline="post.name"
              :slug="post.full_slug"
              :image="post.hero"
              :category="findCategory(post.category)?.name"
            >
              <template #author>
                <CardAuthor
                  v-if="post.author"
                  :name="post.author.name"
                  :image="post.author.content.image"
                  :date="post.first_published_at"
                  size="small"
                />
              </template>
            </CardPost>
          </li>
        </ul>

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
