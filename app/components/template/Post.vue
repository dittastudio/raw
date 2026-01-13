<script lang="ts" setup>
import type { ISbStoryData } from '@storyblok/js'
import type { Post } from '@@/.storyblok/types/289672313529140/storyblok-components'

interface Props {
  story: ISbStoryData<Post>
}

const { story } = defineProps<Props>()
const author = computed(() => typeof story.content.author !== 'string' ? story.content.author : null)
</script>

<template>
  <article>
    <NuxtImg
      v-if="story.content.hero?.filename && storyblokAssetType(story.content.hero.filename) === 'image'"
      class="block w-full h-auto"
      :src="story.content.hero.filename"
      :alt="story.content.hero.alt || story.name"
      :width="1000"
      :height="Math.round(storyblokImageDimensions(story.content.hero.filename).height / storyblokImageDimensions(story.content.hero.filename).width * 1000)"
      provider="storyblok"
      format="webp"
      quality="85"
      :modifiers="{
        smart: true,
      }"
    />

    <div class="wrapper w-full flex flex-col gap-18">
      <header class="w-full pt-18 pb-10 border-b border-offblack grid gap-x-(--app-inner-gutter) grid-cols-1 md:grid-cols-12">
        <div class="col-span-full md:col-start-1 md:col-end-3 lg:col-end-4">
          CATEGORY
        </div>
        
        <div class="flex flex-col gap-18 col-span-full md:col-start-4 lg:col-start-5 md:col-end-11">
          <h1 class="type-display-28">{{ story.name }}</h1>

          <div v-if="author" class="flex items-center justify-start gap-6">
            <div
              v-if="author.content.image?.filename && storyblokAssetType(author.content.image.filename) === 'image'"
              class="size-18 rounded-full">
              <NuxtImg
                class="block size-full object-cover rounded-full"
                :src="author.content.image.filename"
                :alt="author.content.image.alt || story.name"
                :width="100"
                :height="Math.round(storyblokImageDimensions(author.content.image.filename).height / storyblokImageDimensions(author.content.image.filename).width * 100)"
                provider="storyblok"
                format="webp"
                quality="85"
                :modifiers="{
                  smart: true,
                }"
              />
            </div>

            <div>
              <p class="font-bold">{{ author.name }}</p>
              <time :datetime="story.created_at">{{ formatDate(story.created_at) }}</time>
            </div>
          </div>
        </div>
      </header>

      <div class="w-full grid gap-x-(--app-inner-gutter) grid-cols-1 md:grid-cols-12">
        <div class="flex flex-col gap-6 w-full col-span-full md:col-start-4 lg:col-start-5 md:col-end-11">
          <section
            v-for="block in story.content.blocks"
            :key="block._uid"
          >
            <BlockPostHeading
              v-if="block.component === 'post_heading'"
              :block="block"
            />

            <BlockPostText
              v-else-if="block.component === 'post_text'"
              :block="block"
            />
          </section>
        </div>
      </div>
    </div>
  </article>
</template>