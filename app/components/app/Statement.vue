<script lang="ts" setup>
import type { StoryblokMultilink } from '@@/.storyblok/types/storyblok'

interface Props {
  statement?: string
  title?: string
  link?: StoryblokMultilink
}

const { statement, title, link } = defineProps<Props>()
</script>

<template>
  <div class="w-full bg-green text-offblack">
    <div class="wrapper py-35 flex flex-col items-center justify-center">
      <div class="flex flex-col items-center justify-center gap-8 w-full max-w-325">
        <h5
          v-if="statement"
          class="type-h2 text-center"
        >
          {{ statement }}
        </h5>

        <StoryblokLink
          v-if="title && link"
          :item="link"
        >
          <UiButton
            theme-override="dark"
            type="solid"
          >
            {{ title }}
          </UiButton>
        </StoryblokLink>
      </div>
    </div>
  </div>
</template>
