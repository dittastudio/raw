<script lang="ts" setup>
import type { BlockProjects } from '@@/.storyblok/types/289672313529140/storyblok-components'

interface Props {
  block: BlockProjects
}

const { block } = defineProps<Props>()
const storyblokApi = useStoryblokApi()
const route = useRoute()

const { data: projectCategories } = await useAsyncData('project-categories', async () => await storyblokApi.get(`cdn/datasource_entries`, {
  datasource: 'project-category',
}))

const categories = computed(() => projectCategories.value?.data.datasource_entries || [])

const currentCategory = computed(() => {
  const query = Array.isArray(route.query.category) ? route.query.category[0] : route.query.category
  return getCategoryEntry(query || '', categories.value)
})

const projects = computed(() => {
  const items = Array.isArray(block.projects) ? block.projects.filter(item => typeof item !== 'string') : []
  return currentCategory.value ? items.filter(project => project.content?.category === currentCategory.value?.value) : items
})
</script>

<template>
  <div
    v-editable="block"
    class="w-full"
  >
    <div class="wrapper-max flex flex-col items-start justify-center gap-22">
      <div class="w-full flex flex-col items-start justify-center gap-6">
        <FilterDatasource
          v-if="categories.length"
          slug="category"
          :entries="categories"
        >
          <template #default="{ filters, applied }">
            <h2 class="type-display-28">
              {{ applied.item?.name ? applied.item.name === 'All' ? 'All Projects' : applied.item.name : 'All Projects' }}
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
          v-if="projects?.length"
          :key="`projects-key-${$route.fullPath}`"
          class="w-full flex flex-col items-start justify-center gap-22"
        >
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-(--app-inner-gutter) w-full">
            <li
              v-for="project in projects"
              :key="project.uuid"
            >
              <CardProject
                :slug="project.full_slug"
                :image="project.content.preview_image"
                :tagline="project.content.preview_text"
                :headline="project.name"
              />
            </li>
          </ul>
        </div>

        <p
          v-else
          class="type-mono-16"
        >
          There are no projects available for {{ currentCategory?.name || 'this filter' }}.
        </p>
      </Transition>
    </div>
  </div>
</template>
