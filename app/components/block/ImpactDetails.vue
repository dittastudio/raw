<script lang="ts" setup>
import type { BlockImpactDetails } from '@@/.storyblok/types/289672313529140/storyblok-components'
// import type { Themes } from '@@/types/app'

interface Props {
  block: BlockImpactDetails
}

const { block } = defineProps<Props>()
const media = computed(() => block.media?.[0])
</script>

<template>
  <div
    v-editable="block"
    class="grid gap-y-10 md:gap-y-20"
  >
    <UiContent
      :title="block.title"
      :headline="block.headline"
    />

    <div
      class="wrapper-max grid grid-cols-(--app-grid) gap-x-(--app-inner-gutter) gap-y-10 md:gap-y-20"
      :class="{
        'grid-rows-[auto_auto] md:grid-rows-1': media && (storyblokRichTextContent(block.copy) || block.cta?.cached_url),
      }"
    >
      <div
        v-if="media"
        class="col-start-1 col-span-full md:col-span-7 bg-[orange]"
        :class="{
          'max-md:row-start-2': media && (storyblokRichTextContent(block.copy) || block.cta?.cached_url),
        }"
      >
        <NuxtImg
          v-if="isImageComponent(media) && media.image?.filename && storyblokAssetType(media.image.filename) === 'image'"
          class="block w-full h-auto"
          :src="media.image.filename"
          :alt="media.image.alt || ''"
          :width="500"
          :height="Math.round(storyblokImageDimensions(media.image.filename).height / storyblokImageDimensions(media.image.filename).width * 500)"
          quality="85"
          loading="lazy"
          :modifiers="{
            smart: true,
          }"
        />
      </div>

      <div
        class="flex flex-col gap-10 col-start-2 sm:col-start-5 md:col-start-9 col-span-full"
        :class="{
          'max-md:row-start-1': media && (storyblokRichTextContent(block.copy) || block.cta?.cached_url),
        }"
      >
        <div
          v-if="storyblokRichTextContent(block.copy)"
          class="ui-content__copy"
        >
          <StoryblokText :html="block.copy" />
        </div>

        <StoryblokLink
          v-if="block.cta_title && block.cta?.cached_url"
          class="inline-block"
          :item="block.cta"
        >
          <UiButton>
            {{ block.cta_title }}
          </UiButton>
        </StoryblokLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.ui-content__copy {
  :deep(p),
  :deep(li) {
    @apply type-p;

    text-wrap: pretty;
    max-width: 24em;
  }

  :deep(p + p),
  :deep(p + ul),
  :deep(p + ol),
  :deep(ul + p),
  :deep(ol + p) {
    padding-top: 1.25em;
  }
}
</style>
