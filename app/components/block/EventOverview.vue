<script lang="ts" setup>
import type { BlockEventOverview } from '#storyblok-components'

interface Props {
  block: BlockEventOverview
  datetime?: string
}

const { block, datetime } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    class="wrapper-max grid grid-cols-1 md:grid-cols-2 gap-x-(--app-inner-gutter) gap-y-20"
  >
    <time
      v-if="datetime"
      class="col-span-full md:col-span-1 type-h5 text-balance max-w-[36ch]"
    >
      {{ formatDateDMY(datetime) }}
    </time>

    <div class="col-span-full md:col-start-2 flex flex-col gap-10 items-start">
      <div
        v-if="storyblokRichTextContent(block.copy)"
        class="prose-all"
      >
        <StoryblokText :html="block.copy" />
      </div>

      <StoryblokLink
        v-if="block.cta_title && block.cta?.cached_url"
        :item="block.cta"
      >
        <UiButton>
          {{ block.cta_title }}
        </UiButton>
      </StoryblokLink>
    </div>
  </div>
</template>
