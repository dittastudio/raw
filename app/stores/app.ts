import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const cookieConsent = ref<'accepted' | 'declined' | null>(null)
  const hasDecidedCookies = computed(() => cookieConsent.value !== null)

  function setAcceptedCookies(value: boolean) {
    cookieConsent.value = value ? 'accepted' : 'declined'
  }

  return {
    cookieConsent,
    hasDecidedCookies,
    setAcceptedCookies,
  }
}, {
  persist: {
    pick: ['cookieConsent'],
    storage: piniaPluginPersistedstate.cookies(),
  },
})
