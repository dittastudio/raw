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
  <div class="flex flex-col items-center justify-center w-full bg-green px-8 py-24">
    <div class="flex flex-col items-center justify-center gap-8 w-full max-w-325">
      <h6
        v-if="statement"
        class="text-50-fluid font-bold uppercase text-center"
      >
        {{ statement }}
      </h6>

      <StoryblokLink
        v-if="title && link"
        :item="link"
      >
        <UiButton
          colour="dark"
          mode="solid"
        >
          {{ title }}
        </UiButton>
      </StoryblokLink>
    </div>
  </div>
</template>
