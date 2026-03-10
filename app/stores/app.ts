import type { Themes } from '@@/types/app'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const cookieConsent = ref<'accepted' | 'declined' | null>(null)
  const hasDecidedCookies = computed(() => cookieConsent.value !== null)
  const isHeaderOpen = ref(false)
  const activeTheme = ref<Themes>('light')

  function setAcceptedCookies(value: boolean) {
    cookieConsent.value = value ? 'accepted' : 'declined'
  }

  function setHeaderMenu(value: boolean) {
    isHeaderOpen.value = value
  }

  function toggleHeaderMenu() {
    isHeaderOpen.value = !isHeaderOpen.value
  }

  function setActiveTheme(value: Themes) {
    activeTheme.value = value
  }

  return {
    cookieConsent,
    hasDecidedCookies,
    setAcceptedCookies,
    isHeaderOpen,
    setHeaderMenu,
    toggleHeaderMenu,
    activeTheme,
    setActiveTheme,
  }
}, {
  persist: {
    pick: ['cookieConsent'],
    storage: piniaPluginPersistedstate.cookies(),
  },
})
