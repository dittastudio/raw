import type { Themes } from '@@/types/app'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  // Cookies.
  const cookieConsent = ref<'accepted' | 'declined' | null>(null)
  const hasDecidedCookies = computed(() => cookieConsent.value !== null)

  function setAcceptedCookies(value: boolean) {
    cookieConsent.value = value ? 'accepted' : 'declined'
  }

  // Data capture.
  const dataCaptured = ref(false)

  function setDataCaptured(value: boolean) {
    dataCaptured.value = value
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
    dataCaptured,
    setDataCaptured,
    isHeaderOpen,
    setHeaderMenu,
    toggleHeaderMenu,
    activeTheme,
    setActiveTheme,
  }
}, {
  persist: {
    pick: ['cookieConsent', 'dataCaptured'],
    storage: piniaPluginPersistedstate.cookies(),
  },
})
