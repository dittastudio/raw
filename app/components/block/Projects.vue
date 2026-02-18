<script lang="ts" setup>
import type { BlockProjects } from '#storyblok-components'

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

const setSizes = (isLarge: boolean) => {
  if (isLarge) {
    return `
      2xs:100vw
      xs:100vw
      sm:100vw
      md:100vw
      lg:100vw
      xl:100vw
      2xl:1200px
    `
  }

  return `
    2xs:100vw
    xs:100vw
    sm:100vw
    md:50vw
    lg:50vw
    xl:50vw
    2xl:860px
  `
}
</script>

<template>
  <div
    v-editable="block"
    class="w-full"
  >
    <div class="flex flex-col gap-16 overflow-hidden">
      <div class="w-full flex flex-col">
        <FilterDatasource
          v-if="categories.length"
          slug="category"
          :entries="categories"
        >
          <template #default="{ filters, applied }">
            <h2 class="type-display-28 wrapper-max">
              {{ applied.item?.name ? applied.item.name === 'All' ? 'All Projects' : applied.item.name : 'All Projects' }}
            </h2>

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
            v-if="projects?.length"
            :key="`projects-key-${$route.fullPath}`"
            class="w-full flex flex-col items-start justify-center gap-22"
          >
            <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-(--app-inner-gutter) gap-y-10 md:gap-y-12 w-full">
              <li
                v-for="(project, index) in projects"
                :key="project.uuid"
                :class="{
                  'md:col-span-2': index % 3 === 2,
                }"
              >
                <CardProject
                  :slug="project.full_slug"
                  :image="project.content.preview_image"
                  :tagline="project.content.preview_text"
                  :headline="project.content.preview_headline || project.name"
                  :logo="project.content.preview_logo"
                >
                  <template #image>
                    <NuxtImg
                      v-if="project.content.preview_image?.filename && storyblokAssetType(project.content.preview_image.filename) === 'image'"
                      class="block size-full object-cover aspect-video"
                      :src="project.content.preview_image.filename"
                      :alt="project.content.preview_image.alt || project.content.preview_headline || project.name || ''"
                      :width="16"
                      :height="9"
                      :sizes="setSizes(index % 3 === 2)"
                      loading="lazy"
                    />
                  </template>
                </CardProject>
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
  </div>
</template>
