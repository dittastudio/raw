<script lang="ts" setup>
import type { Settings } from '@@/.storyblok/types/289672313529140/storyblok-components'
import { VueLenis } from 'lenis/vue'
// import IconLogo from '@/assets/icons/logo.svg?component'

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
    <AppHeader :navigation="story.content.navigation" />

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
