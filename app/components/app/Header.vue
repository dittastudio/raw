<script lang="ts" setup>
import type { Link } from '#storyblok-components'
import type { Themes } from '@@/types/app'
import type Lenis from 'lenis'
import { useLenis } from 'lenis/vue'
import IconLogo from '@/assets/icons/logo.svg?component'

interface Props {
  navigation?: Link[]
}

const { navigation } = defineProps<Props>()

const lenis = useLenis()
const isHeaderOpen = useState<boolean>('isHeaderOpen', () => false)
const activeTheme = useState<Themes>('activeTheme', () => 'light')
const ready = ref(false)
const hasScrolled = ref(false)
const hasScrolledUp = ref(false)
const hasScrolledDown = ref(false)
const ignoreNextHide = ref(false)

const pinHeader = () => {
  hasScrolledUp.value = true
  hasScrolledDown.value = false
  ignoreNextHide.value = true
}

const closeHeaderMenu = () => {
  if (!isHeaderOpen.value) {
    return
  }

  isHeaderOpen.value = false
  pinHeader()
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

const hideHeader = computed(() => {
  return !ready.value
    || (
      hasScrolledDown.value
      && !isHeaderOpen.value
      && !hasScrolledUp.value
    )
})

const hasNotScrolledThemeClasses = computed(() =>
  activeTheme.value === 'dark' ? 'text-offwhite' : 'text-offblack',
)

const headerThemeClasses: Record<Themes, string> = {
  dark: 'lg:bg-offblack lg:text-offwhite',
  light: 'lg:bg-offwhite lg:text-offblack',
  blue: 'lg:bg-blue lg:text-offblack',
  green: 'lg:bg-green lg:text-offblack',
  pink: 'lg:bg-pink lg:text-offblack',
  purple: 'lg:bg-purple lg:text-offblack',
}

const hasScrolledThemeClasses = computed(() => headerThemeClasses[activeTheme.value])

const gradientColorVar = computed(() => ({
  '--app-header-gradient-color': activeTheme.value === 'dark'
    ? 'var(--color-offblack)'
    : 'var(--color-offwhite)',
}))

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

  // await wait(500)
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
      'has-scrolled': hasScrolled,
    }"
    class="header isolate h-(--app-header-height) sticky top-0 w-full z-20"
    @mouseenter="pinHeader"
  >
    <div
      :style="gradientColorVar"
      class="
        header__bar
        relative
        lg:after:absolute
        lg:after:top-full
        lg:after:inset-x-0
        lg:after:h-px
        lg:after:bg-current
        lg:after:transition-opacity
        lg:after:duration-300
        lg:after:ease-in-out
        lg:after:pointer-events-none
        lg:after:z-1
        transition-[opacity,translate,background-color,color]
        duration-300
        ease-in-out
        transform-gpu
      "
      :class="[
        {
          '-translate-y-[calc(100%+1px)]': hideHeader,
          'delay-[0s,0s,0.3s,0.3s]': hasScrolledDown,
          'lg:after:opacity-0': !hasScrolled,
          'lg:after:opacity-10': hasScrolled,
          [hasNotScrolledThemeClasses]: !hasScrolled,
          [hasScrolledThemeClasses]: hasScrolled,
        },
      ]"
    >
      <div
        class="
        wrapper
        flex
        flex-row
        items-center
        justify-between
      "
      >
        <NuxtLink
          class="p-(--app-outer-gutter) -mx-(--app-outer-gutter) md:-mx-(--app-outer-gutter)"
          to="/"
        >
          <IconLogo class="w-(--app-header-logo-width) h-(--app-header-logo-height) block" />

          <span class="sr-only">RAW</span>
        </NuxtLink>

        <button
          class="z-1 block lg:hidden outline-none p-(--app-outer-gutter) -m-(--app-outer-gutter)"
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
      </div>
    </div>
  </header>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.header {
  & + * { /* TEMPORARY: will refactor later down the line */
    /* ...sure you will! 🤣 */
    margin-top: calc(var(--app-header-height) * -1);
  }
}

.header__bar {
  position: relative;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 150%;
    z-index: -1;
    pointer-events: none;
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

    opacity: 0.6;
    translate: 0 0% 0;
    transition: opacity 0.3s var(--ease-out);
  }

  .header.has-scrolled &::before {
    opacity: 0;
  }
}

.header__navigation {
  --disc-size: 19px;
  --disc-x-offset: 39px;
  --disc-y-offset: 36px;

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
