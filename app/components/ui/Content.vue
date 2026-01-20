<script lang="ts" setup>
import type { StoryblokMultilink, StoryblokRichtext } from '@@/.storyblok/types/storyblok'

interface Props {
  title?: string
  headline?: StoryblokRichtext | undefined
  copy?: StoryblokRichtext | undefined
  cta?: StoryblokMultilink | undefined
  ctaType?: 'solid' | 'outline'
}

const {
  title,
  headline,
  copy,
  cta,
} = defineProps<Props>()
</script>

<template>
  <div
    class="
      ui-content
      wrapper-max
      grid
      grid-cols-(--app-grid)
      gap-x-(--app-inner-gutter)
      gap-y-20
    "
  >
    <div
      v-if="title"
      class="
        ui-content__title
        col-span-full
        md:col-start-1
        md:col-span-3
      "
    >
      <p class="type-h5">
        {{ title }}
      </p>
    </div>

    <div
      v-if="storyblokRichTextContent(headline)"
      class="
        ui-content__headline
        col-span-full
        md:col-span-9
      "
      :class="{
        'md:col-start-4': title,
        'md:col-start-2': !title,
      }"
    >
      <StoryblokText :html="headline" />
    </div>

    <div
      v-if="storyblokRichTextContent(copy) || cta?.cached_url"
      class="
        ui-content__copy
        col-start-2
        col-span-3
        sm:col-start-5
        sm:col-span-4
        md:col-start-9
        md:col-span-4
        lg:col-start-9
        lg:col-span-3
        grid
        gap-10
      "
    >
      <div v-if="storyblokRichTextContent(copy)">
        <StoryblokText :html="copy" />
      </div>

      <StoryblokLink
        v-if="cta?.cached_url"
        class="inline-block"
        :item="cta"
      >
        <UiButton :type="ctaType">
          {{ cta.title }}
        </UiButton>
      </StoryblokLink>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.ui-content__headline {
  :deep(h2),
  :deep(h3),
  :deep(h4)  {
    @apply type-h2;

    text-wrap: balance;
  }
}

.ui-content__copy {
  :deep(p) {
    @apply type-p;

    text-wrap: pretty;
    max-width: 24em;
  }

  :deep(p + p) {
    padding-top: 1.25em;
  }
}
</style>
