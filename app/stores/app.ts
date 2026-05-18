import type { Themes } from '@/types/app'
import { defineStore } from 'pinia'

type VideoCapture = {
  name: string
  email: string
  captured: boolean
}

export const useAppStore = defineStore('app', () => {
  // Cookies.
  const cookieConsent = ref<'accepted' | 'declined' | null>(null)
  const hasDecidedCookies = computed(() => cookieConsent.value !== null)

  function setAcceptedCookies(value: boolean) {
    cookieConsent.value = value ? 'accepted' : 'declined'
  }

  // Data capture.
  const videoDataCapture = ref({
    name: '',
    email: '',
    captured: false
  })

  function setVideoDataCapture(value: VideoCapture) {
    videoDataCapture.value = value
  }

  // Header.
  const isHeaderOpen = ref(false)

  function toggleHeaderMenu() {
    isHeaderOpen.value = !isHeaderOpen.value
  }

  function setHeaderMenu(value: boolean) {
    isHeaderOpen.value = value
  }

  // Theme.
  const activeTheme = ref<Themes>('light')

  function setActiveTheme(value: Themes) {
    activeTheme.value = value
  }

  return {
    cookieConsent,
    hasDecidedCookies,
    setAcceptedCookies,
    videoDataCapture,
    setVideoDataCapture,
    isHeaderOpen,
    setHeaderMenu,
    toggleHeaderMenu,
    activeTheme,
    setActiveTheme,
  }
}, {
  persist: {
    pick: ['cookieConsent', 'videoDataCapture'],
    storage: piniaPluginPersistedstate.cookies(),
  },
})
