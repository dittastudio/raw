<script lang="ts" setup>
import type { Link } from '@@/.storyblok/types/289672313529140/storyblok-components'
import type Lenis from 'lenis'
import { useLenis } from 'lenis/vue'
import IconLogo from '@/assets/icons/logo.svg?component'

interface Props {
  navigation?: Link[]
}

const { navigation } = defineProps<Props>()

const isHeaderOpen = useState<boolean>('isHeaderOpen', () => false)
const ready = ref(false)
const hasScrolled = ref(false)
const hasScrolledUp = ref(false)
const hasScrolledDown = ref(false)
const ignoreNextHide = ref(false)

const closeHeaderMenu = () => {
  if (!isHeaderOpen.value) {
    return
  }

  isHeaderOpen.value = false
  hasScrolledUp.value = true
  hasScrolledDown.value = false
  ignoreNextHide.value = true
}

const toggleHeaderMenu = () => {
  if (isHeaderOpen.value) {
    closeHeaderMenu()
    return
  }

  isHeaderOpen.value = true
}

const handleScroll = (lenis: Lenis) => {
  const triggerPoint = 50
  const scrollPos = lenis.scroll

  hasScrolled.value = scrollPos > triggerPoint

  if (lenis.direction === -1) {
    // Scrolling up
    hasScrolledUp.value = scrollPos > triggerPoint
    hasScrolledDown.value = false
  }
  else if (lenis.direction === 1) {
    // Scrolling down
    hasScrolledUp.value = false

    if (ignoreNextHide.value) {
      ignoreNextHide.value = false
      hasScrolledDown.value = false
    }
    else {
      hasScrolledDown.value = scrollPos > triggerPoint
    }
  }
}

const handleMouseEnter = () => {
  hasScrolledUp.value = true
  hasScrolledDown.value = false
  ignoreNextHide.value = true
}

const hideHeader = computed(() => {
  return !ready.value
    || (
      hasScrolledDown.value
      && !isHeaderOpen.value
      && !hasScrolledUp.value
      && !ignoreNextHide.value
    )
})

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeHeaderMenu()
  }
}

onMounted(async () => {
  const lenis = useLenis()

  if (lenis?.value) {
    handleScroll(lenis.value)

    lenis.value.on('scroll', handleScroll)
  }

  window.addEventListener('keydown', handleKeydown)

  await wait(500)
  ready.value = true
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

const isScreenLg = useAtMedia(getMediaQuery('lg'))

watchEffect(() => {
  if (import.meta.client && isScreenLg.value) {
    isHeaderOpen.value = false
  }
})

watchEffect(() => {
  const lenis = useLenis()

  if (import.meta.client && lenis?.value) {
    isHeaderOpen.value ? lenis.value.stop() : lenis.value.start()
  }
})
</script>

<template>
  <header
    :class="{
      'is-open': isHeaderOpen,
      'opacity-0 -translate-y-2': hideHeader,
      'transition-[opacity,translate] duration-300 ease-out': ready,
    }"
    class="header sticky top-0 wrapper py-7.5 w-full flex flex-row items-center justify-between z-10"
    @mouseenter="handleMouseEnter"
  >
    <NuxtLink
      class="p-5 -m-5 md:p-7.5 md:-m-7.5"
      to="/"
    >
      <IconLogo class="w-(--app-header-logo-width) h-(--app-header-logo-height) block" />

      <span class="sr-only">RAW</span>
    </NuxtLink>

    <button
      class="z-1 block lg:hidden outline-none"
      type="button"
      @click="toggleHeaderMenu"
    >
      <AppHeaderSwitch />
    </button>

    <div
      data-lenis-prevent
      class="header__navigation w-full"
    >
      <AppNavigation
        v-if="navigation"
        :items="navigation"
      />
    </div>
  </header>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.header {
  height: var(--app-header-height);

  & + * { /* TEMPORARY: will refactor later down the line */
    /* ...sure you will! 🤣 */
    margin-top: calc(var(--app-header-height) * -1);
  }
}

.header__navigation {
  --disc-size: 19px;
  --disc-x-offset: 39px;
  --disc-y-offset: 49px;

  @variant md {
    --disc-size: 19px;
    --disc-x-offset: 49px;
    --disc-y-offset: 46px;
  }

  @variant max-lg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100dvh;
    background-color: var(--color-offblack);
    color: var(--color-offwhite);
    display: flex;
    flex-direction: column;
    justify-content: safe center;
    align-items: safe center;
    text-align: center;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: contain;
    padding-block: var(--app-header-height);

    clip-path: circle(var(--disc-size) at calc(100% - var(--disc-x-offset)) var(--disc-y-offset));
    transition: clip-path 0.5s cubic-bezier(0.34, 1.06, 0.24, 1);

    .header.is-open & {
      clip-path: circle(150% at calc(100% - var(--disc-x-offset)) var(--disc-y-offset));
      transition: clip-path 0.5s var(--ease-outQuart);
    }
  }
}
</style>
