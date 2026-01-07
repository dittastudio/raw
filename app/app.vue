<script lang="ts" setup>
import type { Settings } from '@@/.storyblok/types/289672313529140/storyblok-components'
import { VueLenis } from 'lenis/vue'

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
    <AppNavigation
      v-if="story.content?.navigation"
      :items="story.content.navigation"
    />

    <div class="w-full h-screen flex flex-col items-center justify-center bg-pink">
      <div class="flex flex-col items-center justify-center gap-10 text-center">
        <h1 class="text-84 font-extrabold uppercase">
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

    <DevOnly>
      <DevGuide />
    </DevOnly>
  </VueLenis>
</template>
