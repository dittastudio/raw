<script lang="ts" setup>
import type { StoryblokMultilink, StoryblokRichtext } from '#storyblok-types'
import type { Themes } from '@@/types/app'

interface Props {
  title?: string
  headline?: StoryblokRichtext
  copy?: StoryblokRichtext
  cta?: StoryblokMultilink
  ctaTitle?: string
  ctaType?: 'solid' | 'outline'
  ctaTheme?: Themes
}

const {
  title,
  headline,
  copy,
  cta,
  ctaTitle,
  ctaType = 'solid',
  ctaTheme = 'light',
} = defineProps<Props>()
</script>

<template>
  <div class="wrapper-max grid grid-cols-(--app-grid) gap-x-(--app-inner-gutter) gap-y-10 md:gap-y-20">
    <div
      v-if="title"
      class="col-span-full md:col-start-1 md:col-span-3"
    >
      <h2 class="type-h5">
        {{ title }}
      </h2>
    </div>

    <div
      v-if="storyblokRichTextContent(headline)"
      class="col-span-full sm:col-start-2 sm:col-span-7 md:col-span-9 [&_h3]:type-h2 [&_h3]:text-wrap[balance] [&_h3]:max-w-[20ch]"
      :class="{
        'md:col-start-4': title,
        'md:col-start-2': !title,
      }"
    >
      <StoryblokText :html="headline" />
    </div>

    <div
      v-if="storyblokRichTextContent(copy) || cta?.cached_url"
      class="prose-p flex flex-col gap-10 items-start"
      :class="{
        'col-start-2 col-span-3 sm:col-start-5 sm:col-span-4 md:col-start-9 md:col-span-4 lg:col-start-9 lg:col-span-3': storyblokRichTextContent(copy),
        'col-start-1 col-span-full md:col-start-4': !storyblokRichTextContent(copy),
      }"
    >
      <div v-if="storyblokRichTextContent(copy)">
        <StoryblokText :html="copy" />
      </div>

      <StoryblokLink
        v-if="ctaTitle && cta?.cached_url"
        :item="cta"
      >
        <UiButton
          :type="ctaType"
          :theme="ctaTheme"
        >
          {{ ctaTitle }}
        </UiButton>
      </StoryblokLink>
    </div>
  </div>
</template>
