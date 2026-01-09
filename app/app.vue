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
      <IconLogo class="text-offblack w-auto h-8 block" />

      <div class="w-full">
        <AppNavigation
          v-if="story.content?.navigation"
          :items="story.content.navigation"
        />
      </div>
    </div>

    <div class="relative overflow-hidden w-full min-h-screen flex flex-col items-center justify-center">
      <div class="absolute inset-0">
        <EffectMorphGradient />
      </div>

      <div class="z-1 flex flex-col items-center justify-center gap-10 text-center">
        <h1 class="type-h1">
          Brave Thinking.
          <span class="block text-outline-offblack">
            Backed by proof.
          </span>
        </h1>

        <p class="type-h4 max-w-[30em] text-balance">
          The agency that de-risks big ideas through data
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

    <AppFooter
      :text="story.content.newsletter_text"
      :links="story.content.links"
      :email="story.content.company_email"
      :telephone="story.content.company_telephone"
      :address="story.content.company_address"
      :logos="story.content.logos"
    />

    <DevOnly>
      <DevGuide />
    </DevOnly>
  </VueLenis>
</template>
