<script lang="ts" setup>
import type { BlockFeaturedEvent, Event } from '#storyblok-components'
import type { Themes } from '@@/types/app'
import type { ISbStoryData } from '@storyblok/js'

interface Props {
  block: BlockFeaturedEvent
}

const { block } = defineProps<Props>()

const event = computed(() => {
  const eventData = block.event as ISbStoryData<Event> | undefined

  if (!eventData?.content) {
    return {
      name: eventData?.name,
      preview_image: undefined,
      preview_text: undefined,
      eventDatetime: undefined,
      jaaPartnership: undefined,
    }
  }

  return {
    name: eventData.name,
    preview_image: eventData.content.preview_image?.filename ? eventData.content.preview_image : undefined,
    preview_text: eventData.content.preview_text,
    eventDatetime: eventData.content.event_datetime,
    jaaPartnership: eventData.content.jaa_partnership,
  }
})
</script>

<template>
  <div
    v-editable="block"
    class="wrapper-max grid grid-cols-(--app-grid) gap-x-(--app-inner-gutter) gap-y-10 md:gap-y-20"
  >
    <div class="col-span-full md:col-start-1 md:col-span-3">
      <p
        v-if="block.title"
        class="type-h5"
      >
        {{ block.title }}
      </p>
    </div>

    <div class="col-span-full md:col-start-4 md:col-span-9">
      <div class="w-full flex flex-col gap-6">
        <EffectTextReveal
          v-if="storyblokRichTextContent(block.headline) || event?.eventDatetime"
          :delay="500"
          class="**:type-h2"
        >
          <StoryblokText
            v-if="storyblokRichTextContent(block.headline)"
            :html="block.headline"
          />

          <time
            v-if="event?.eventDatetime"
            :datetime="event.eventDatetime"
          >
            {{ formatDateDMY(event.eventDatetime) }}
          </time>
        </EffectTextReveal>

        <EffectTextReveal
          v-if="event?.name"
          :delay="1000"
        >
          <h2 class="type-h4 max-w-[30em] text-balance">
            {{ event.name }}
          </h2>
        </EffectTextReveal>
      </div>
    </div>

    <div
      v-if="event?.preview_image"
      class="col-start-1 col-span-full md:col-span-7 max-md:order-1 flex flex-col gap-6 md:gap-10"
    >
      <NuxtImg
        v-if="event.preview_image.filename && storyblokAssetType(event.preview_image.filename) === 'image'"
        class="block w-full h-auto"
        :src="event.preview_image.filename"
        :alt="event.preview_image.alt || event.name || event.preview_text || ''"
        :width="500"
        :height="Math.round(storyblokImageDimensions(event.preview_image.filename).height / storyblokImageDimensions(event.preview_image.filename).width * 500)"
        loading="lazy"
      />

      <UiPartnershipButton
        v-if="event?.jaaPartnership"
        :theme="(block.theme as Themes) ?? 'light'"
      />
    </div>

    <div class="flex flex-col gap-6 md:gap-10 col-start-2 sm:col-start-5 md:col-start-9 col-span-full">
      <p
        v-if="event?.preview_text"
        class="type-p text-pretty max-w-[24em] whitespace-pre-wrap"
      >
        {{ event.preview_text }}
      </p>

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
