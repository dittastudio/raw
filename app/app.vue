<script lang="ts" setup>
import type { Settings } from '#storyblok-components'
import { VueLenis } from 'lenis/vue'

const story = await useStory<Settings>('/settings')
const route = useRoute()
const cookiesDialog = useTemplateRef('cookiesDialog')
const appStore = useAppStore()
const { initialize } = useGtag()

const decide = (decision: 'accept' | 'decline') => {
  if (decision === 'accept') {
    appStore.setAcceptedCookies(true)
    initialize()
  }
  else {
    appStore.setAcceptedCookies(false)
  }

  cookiesDialog.value?.close()
}

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
  robots: 'index, follow',
})

watch(() => route.fullPath, async () => {
  await wait(500)
  appStore.setHeaderMenu(false)
})
</script>

<template>
  <VueLenis
    root
    :options="{
      lerp: 0.5,
    }"
  >
    <AppHeader :navigation="story.content.navigation" />

    <NuxtPage />

    <AppStatement
      v-if="story.content?.statement"
      :statement="story.content.statement"
      :media="story.content.statement_media?.[0]"
      :title="story.content.cta_title"
      :link="story.content.cta_link"
    />

    <AppFooter
      :text="story.content.newsletter_text"
      :subtext="story.content.newsletter_subtext"
      :links="story.content.links"
      :email="story.content.company_email"
      :telephone="story.content.company_telephone"
      :address="story.content.company_address"
      :logos="story.content.logos"
    />

    <ClientOnly>
      <UiCookies
        v-if="!storyblokEditor(route.query)"
        ref="cookiesDialog"
        :immediate="!appStore.hasDecidedCookies"
      >
        <div class="flex flex-col gap-5 items-start">
          <h6 class="type-h4 text-pretty">
            Accept Cookies
          </h6>

          <p class="type-p">
            We use cookies to improve your experience.<br>
            Confirm your choice using the buttons below.
          </p>

          <div class="flex gap-5 w-full">
            <button
              type="button"
              class="w-30"
              @click="decide('decline')"
            >
              <UiButton
                theme="dark"
                type="outline"
                class="w-full p-0 m-0"
              >
                Decline
              </UiButton>
            </button>

            <button
              type="button"
              class="w-30"
              @click="decide('accept')"
            >
              <UiButton
                theme="dark"
                class="w-full p-0 m-0"
              >
                Accept
              </UiButton>
            </button>
          </div>
        </div>
      </UiCookies>
    </ClientOnly>

    <DevOnly>
      <DevGuide />
    </DevOnly>
  </VueLenis>
</template>
