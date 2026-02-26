<script lang="ts" setup>
import type { BlockImpactDetails } from '#storyblok-components'
import type { Themes } from '@@/types/app'

interface Props {
  block: BlockImpactDetails
}

const { block } = defineProps<Props>()

const theme = computed(() => (block.theme as Themes) ?? 'light')
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
        class="col-start-1 col-span-full md:col-span-7"
        :class="{
          'max-md:row-start-2': media && (storyblokRichTextContent(block.copy) || block.cta?.cached_url),
        }"
      >
        <NuxtImg
          v-if="isImageComponent(media) && media.image?.filename && storyblokAssetType(media.image.filename) === 'image'"
          class="block w-full h-auto"
          :src="media.image.filename"
          :alt="media.image.alt || block.title || ''"
          :width="storyblokImageDimensions(media.image.filename).width"
          :height="storyblokImageDimensions(media.image.filename).height"
          sizes="
            xs:100vw
            sm:100vw
            md:66vw
            lg:66vw
            xl:800px
          "
          loading="lazy"
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
          class="prose-p"
        >
          <StoryblokText :html="block.copy" />
        </div>

        <StoryblokLink
          v-if="block.cta_title && block.cta?.cached_url"
          class="inline-block"
          :item="block.cta"
        >
          <UiButton
            :type="block.theme === 'dark' ? 'outline' : 'solid'"
            :theme="theme"
          >
            {{ block.cta_title }}
          </UiButton>
        </StoryblokLink>

        <UiPartnershipButton
          v-if="block.jaa_partnership"
          :theme="(block.theme as Themes) ?? 'light'"
        />

        <ul
          v-if="block.logos?.length"
          class="flex items-center justify-start gap-[calc(var(--app-outer-gutter)/2)] sm:gap-(--app-outer-gutter) mt-auto"
        >
          <template
            v-for="item in block.logos"
            :key="item.id"
          >
            <li v-if="item?.filename">
              <span class="block size-10 sm:size-15">
                <img
                  v-if="fileExtension(item.filename) === 'svg'"
                  class="block size-full object-contain"
                  :src="item.filename"
                  :alt="item.alt || item.title || 'Logo'"
                  loading="lazy"
                >

                <NuxtImg
                  v-else
                  class="block size-full object-contain"
                  :src="item.filename"
                  :alt="item.alt || item.title || 'Logo'"
                  :width="200"
                  loading="lazy"
                />
              </span>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>
