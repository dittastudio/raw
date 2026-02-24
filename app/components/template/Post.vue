<script lang="ts" setup>
import type { Post } from '#storyblok-components'
import type { ISbStoryData } from '@storyblok/js'

interface Props {
  story: ISbStoryData<Post>
}

const { story } = defineProps<Props>()
const author = computed(() => typeof story.content.author !== 'string' ? story.content.author : null)
const storyblokApi = useStoryblokApi()

const { data: categories } = await useAsyncData('post-categories', async () => await storyblokApi.get(`cdn/datasource_entries`, {
  datasource: 'post-category',
}))

interface CategoryEntry {
  id: number
  value: string
  name: string
}

const category = computed(() => {
  if (categories.value?.data.datasource_entries) {
    const postCategory = Array.isArray(story.content.category) ? story.content.category[0] : story.content.category
    const entry = categories.value.data.datasource_entries.find((entry: CategoryEntry) => entry.value === postCategory)
    return entry ? entry.name : null
  }

  return null
})
</script>

<template>
  <article class="w-full">
    <UiTheme theme="dark">
      <NuxtImg
        v-if="story.content.hero?.filename && storyblokAssetType(story.content.hero.filename) === 'image'"
        class="block w-full h-auto max-h-svh object-cover"
        :src="story.content.hero.filename"
        :alt="story.content.hero.alt || story.name || ''"
        :width="1000"
        :height="Math.round(storyblokImageDimensions(story.content.hero.filename).height / storyblokImageDimensions(story.content.hero.filename).width * 1000)"
        loading="lazy"
      />
    </UiTheme>

    <UiTheme theme="light">
      <div class="wrapper w-full flex flex-col gap-18">
        <header
          class="w-full pb-9 border-b border-offblack grid gap-x-(--app-inner-gutter) gap-y-[calc(var(--app-inner-gutter)*2)] grid-cols-1 md:grid-cols-12"
          :class="{
            'pt-18': story.content.hero?.filename,
            'pt-[calc(--spacing(18)+var(--app-header-height))]': !story.content.hero?.filename,
          }"
        >
          <div
            v-if="category"
            class="col-span-full md:col-start-1 md:col-end-3 lg:col-end-4"
          >
            <p class="type-h5">
              {{ category }}
            </p>
          </div>

          <div class="flex flex-col gap-18 col-span-full md:col-start-4 lg:col-start-5 md:col-end-11">
            <h1 class="type-display-28 text-pretty">
              {{ story.name }}
            </h1>

            <CardAuthor
              v-if="author"
              :name="author.content.name"
              :image="author.content.image"
              :date="story.first_published_at"
            />
          </div>
        </header>

        <div class="w-full grid gap-x-(--app-inner-gutter) grid-cols-1 md:grid-cols-12">
          <div class="flex flex-col gap-6 w-full col-span-full md:col-start-4 lg:col-start-5 md:col-end-11">
            <!--
            Examples with all blocks:
            http://0.0.0.0:3000/posts/raw-london-agency-brand-2024
            http://0.0.0.0:3000/posts/raw-london-shortlisted-for-purpose-awards-emea-2023
          -->
            <section
              v-for="block in story.content.blocks"
              :key="block._uid"
            >
              <BlockPostEmbed
                v-if="block.component === 'post_embed'"
                :block="block"
                :name="story.name"
              />

              <BlockPostHeading
                v-else-if="block.component === 'post_heading'"
                :block="block"
              />

              <BlockPostGallery
                v-else-if="block.component === 'post_gallery'"
                :block="block"
              />

              <BlockPostHtml
                v-else-if="block.component === 'post_html'"
                :block="block"
              />

              <BlockPostImage
                v-else-if="block.component === 'post_image'"
                :block="block"
              />

              <BlockPostQuote
                v-else-if="block.component === 'post_quote'"
                :block="block"
              />

              <BlockPostText
                v-else-if="block.component === 'post_text'"
                :block="block"
              />

              <BlockPostWistia
                v-else-if="block.component === 'post_wistia'"
                :block="block"
              />
            </section>
          </div>
        </div>

        <div
          v-if="author"
          class="prose w-full grid gap-x-(--app-inner-gutter) grid-cols-1 md:grid-cols-12"
        >
          <div class="border-t border-offblack py-18 w-full col-span-full md:col-start-4 lg:col-start-5 md:col-end-11">
            <h5
              v-if="author.content.name"
              class="type-mono-20 font-bold"
            >
              {{ author.content.name }}
            </h5>

            <p v-if="author.content.biography">
              {{ author.content.biography }}
            </p>

            <p v-if="author.content.email">
              Want to say hi? Email
              <NuxtLink :to="`mailto:${author.content.email}`">
                {{ author.content.email }}
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </UiTheme>
  </article>
</template>
