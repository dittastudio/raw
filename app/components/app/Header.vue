<script lang="ts" setup>
import type { Link } from '@@/.storyblok/types/289672313529140/storyblok-components'
import type Lenis from 'lenis'
import { useLenis } from 'lenis/vue'
import IconLogo from '@/assets/icons/logo.svg?component'

interface Props {
  navigation?: Link[]
}

const { navigation } = defineProps<Props>()

const lenis = useLenis()
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
  if (isScreenLg.value) {
    isHeaderOpen.value = false
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
    class="header sticky top-0 wrapper py-7.5 w-full flex flex-row items-center justify-between z-100"
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

@property --app-header-gradient-color {
  syntax: '<color>';
  inherits: true;
  initial-value: #000;
}

.header {
  height: var(--app-header-height);

  & + * { /* TEMPORARY: will refactor later down the line */
    /* ...sure you will! 🤣 */
    margin-top: calc(var(--app-header-height) * -1);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200%;
    z-index: -1;
    transition: --app-header-gradient-color var(--app-transition-duration) var(--app-transition-ease);
    pointer-events: none;
  }

  &::after {
    --app-header-gradient-color: var(--app-background-color);

    background-image:
      linear-gradient(
        to bottom,
        --alpha(var(--app-header-gradient-color) / 100%) 0%,
        --alpha(var(--app-header-gradient-color) / 98.7%) 8.1%,
        --alpha(var(--app-header-gradient-color) / 95.1%) 15.5%,
        --alpha(var(--app-header-gradient-color) / 89.6%) 22.5%,
        --alpha(var(--app-header-gradient-color) / 82.5%) 29%,
        --alpha(var(--app-header-gradient-color) / 74.1%) 35.3%,
        --alpha(var(--app-header-gradient-color) / 64.8%) 41.2%,
        --alpha(var(--app-header-gradient-color) / 55%) 47.1%,
        --alpha(var(--app-header-gradient-color) / 45%) 52.9%,
        --alpha(var(--app-header-gradient-color) / 35.2%) 58.8%,
        --alpha(var(--app-header-gradient-color) / 25.9%) 64.7%,
        --alpha(var(--app-header-gradient-color) / 17.5%) 71%,
        --alpha(var(--app-header-gradient-color) / 10.4%) 77.5%,
        --alpha(var(--app-header-gradient-color) / 4.9%) 84.5%,
        --alpha(var(--app-header-gradient-color) / 1.3%) 91.9%,
        --alpha(var(--app-header-gradient-color) / 0%) 100%
      )
    ;
    opacity: 0.25;
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
    --header-ease-in: cubic-bezier(0.76, 0, 0.66, -0.06);
    --header-ease-out: cubic-bezier(0.34, 1.06, 0.24, 1);

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
    transition: clip-path 0.5s var(--header-ease-out);

    .header.is-open & {
      clip-path: circle(150% at calc(100% - var(--disc-x-offset)) var(--disc-y-offset));
      transition: clip-path 0.5s var(--header-ease-in);
    }
  }
}
</style>
