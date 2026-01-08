<script lang="ts" setup>
import type { Settings } from '@@/.storyblok/types/289672313529140/storyblok-components'
import { VueLenis } from 'lenis/vue'
import IconLogo from '@/assets/icons/logo.svg?component'

const story = await useStory<Settings>('/settings')
const route = useRoute()
const url = useRequestURL()

const globalClasses = computed(() => ({
  'is-storyblok-editor': storyblokEditor(route.query),
}))

useHead({
  htmlAttrs: {
    class: globalClasses,
  },
})

useSeoMeta({
  titleTemplate: title => (title ? `${title} - RAW` : 'RAW'),
  robots: url.host === 'raw.london' ? 'index, follow' : 'noindex, nofollow',
})
</script>

<template>
  <VueLenis root>
    <div class="fixed top-0 p-8 w-full flex flex-row items-center justify-between z-50">
      <IconLogo class="text-black w-auto h-8 block" />

      <div class="w-full">
        <AppNavigation
          v-if="story.content?.navigation"
          :items="story.content.navigation"
        />
      </div>
    </div>

    <div class="w-full h-screen flex flex-col items-center justify-center bg-pink">
      <div class="flex flex-col items-center justify-center gap-10 text-center">
        <h1 class="text-84 font-bold uppercase">
          Brave Thinking.
          <span class="block text-outline-black">
            Backed by proof.
          </span>
        </h1>

        <p class="text-28 max-w-148">
          The agency that de-risks big ideas through data
        </p>

        <p class="text-16 max-w-148 font-mono">
          We’re a talented and diverse crew who’ll root for your cause like it’s our own - your critical friends asking tough questions, uncovering opportunities and standing shoulder to shoulder with you from brief to launch.
        </p>
      </div>
    </div>

    <NuxtPage />

    <AppStatement
      v-if="story.content?.statement"
      :statement="story.content.statement"
      :title="story.content.cta_title"
      :link="story.content.cta_link"
    />

    <!-- Hello Will...for <AppFooter /> you could use these... -->
    <pre>
{{ story.content.company_email }}
{{ story.content.company_telephone }}
{{ story.content.company_address }}
    </pre>

    <ul v-if="story.content.links">
      <li
        v-for="item in story.content.links"
        :key="item._uid"
      >
        <StoryblokLink :item="item.link">
          {{ item.title }}
        </StoryblokLink>
      </li>
    </ul>

    <DevOnly>
      <DevGuide />
    </DevOnly>
  </VueLenis>
</template>
