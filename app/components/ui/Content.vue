<script lang="ts" setup>
import type { StoryblokMultilink, StoryblokRichtext } from '@@/.storyblok/types/storyblok'

interface Props {
  title?: string
  headline?: StoryblokRichtext
  copy: StoryblokRichtext
  cta?: StoryblokMultilink
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
      lg:gap-y-40
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
      <h2 class="type-h5">
        {{ title }}
      </h2>
    </div>

    <div
      v-if="storyblokRichTextContent(headline)"
      class="
          ui-content__headline
          col-span-full
          md:col-start-4
          md:col-span-9
        "
    >
      <StoryblokText :html="headline" />
    </div>

    <div
      v-if="storyblokRichTextContent(copy)"
      class="
          ui-content__text
          xrow-start-2
          col-start-2
          col-span-3
          sm:col-start-5
          sm:col-span-4
          md:col-start-9
          md:col-span-4
          lg:col-start-9
          lg:col-span-3
        "
    >
      <StoryblokText :html="copy" />
    </div>

    <div
      v-if="cta?.cached_url"
      class="
          row-start-3
          col-span-full
        "
    >
      <StoryblokLink
        class="inline-block"
        :item="cta"
      >
        <UiButton
          colour="dark"
          mode="solid"
        >
          {{ cta.title }}
        </UiButton>
      </StoryblokLink>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.ui-content__headline {
  :deep(h2, h3, h4) {
    @apply type-h2;

    text-wrap: balance;
  }
}

.ui-content__text {
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
