<script lang="ts" setup>
import type { StoryblokMultilink, StoryblokRichtext } from '@@/.storyblok/types/storyblok'

interface Props {
  title?: string
  headline?: StoryblokRichtext | undefined
  copy?: StoryblokRichtext | undefined
  cta?: StoryblokMultilink | undefined
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
        ui-content__copy
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
        ui-content__cta
      "
      :class="{
        'col-span-full md:col-start-4 md:col-span-9': !storyblokRichTextContent(copy),
        'col-start-2 col-span-3 sm:col-start-5 sm:col-span-4 md:col-start-9 md:col-span-4 lg:col-span-3 lg:col-start-9': storyblokRichTextContent(copy),
      }"
    >
      <StoryblokLink
        class="inline-block"
        :item="cta"
      >
        <UiButton mode="solid">
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

  @variant max-md {
    .ui-content__title + & {
      margin-block-start: --spacing(8);
    }
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

  .ui-content__headline + & {
    margin-block-start: --spacing(20);
  }
}

.ui-content__cta {
  .ui-content__headline + &,
  .ui-content__copy + & {
    margin-block-start: --spacing(8);
  }
}
</style>
