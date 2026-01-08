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
  <div class="w-full bg-green">
    <div class="wrapper py-24 flex flex-col items-center justify-center">
      <div class="flex flex-col items-center justify-center gap-8 w-full max-w-325">
        <h5
          v-if="statement"
          class="text-50-fluid font-bold font-display uppercase text-center"
        >
          {{ statement }}
        </h5>

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
  </div>
</template>
