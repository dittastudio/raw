<script lang="ts" setup>
import type { ISbStoryData } from '@storyblok/js'
import type { Post } from '@@/.storyblok/types/289672313529140/storyblok-components'

interface Props {
  story: ISbStoryData<Post>
}

const { story } = defineProps<Props>()
</script>

<template>
  <article>
    <h1>{{ story.name }}</h1>
    <pre>{{ story.created_at }}</pre>

    <div class="flex flex-col gap-6 w-full">
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
  </article>
</template>