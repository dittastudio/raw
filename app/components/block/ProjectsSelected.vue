<script lang="ts" setup>
import type { BlockProjectsSelected } from '#storyblok-components'

interface Props {
  block: BlockProjectsSelected
}

const { block } = defineProps<Props>()

const projects = computed(() => Array.isArray(block.projects) ? block.projects.filter(item => typeof item !== 'string') : [])

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
      <div class="wrapper-max flex flex-col gap-(--app-vertical-spacing) md:gap-22">
        <p
          v-if="block.title"
          class="type-h5"
        >
          {{ block.title }}
        </p>

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
      </div>
    </div>
  </div>
</template>
