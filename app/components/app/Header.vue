<script lang="ts" setup>
import type { Link } from '@@/.storyblok/types/289672313529140/storyblok-components'
import IconLogo from '@/assets/icons/logo.svg?component'

interface Props {
  navigation?: Link[]
}

const { navigation } = defineProps<Props>()

const isHeaderOpen = useState<boolean>('isHeaderOpen', () => false)
const ready = ref(false)

const toggleHeaderMenu = () => {
  isHeaderOpen.value = !isHeaderOpen.value
}

const prevScrollPos = ref(0)
const hasScrolled = ref(false)
const hasScrolledUp = ref(false)
const hasScrolledDown = ref(false)
const raf = ref<number | null>(null)

const handleScroll = () => {
  const triggerPoint = 50
  const scrollPos = window.scrollY

  hasScrolled.value = scrollPos > triggerPoint

  // Scrolling up
  if (prevScrollPos.value > scrollPos) {
    hasScrolledUp.value = scrollPos > triggerPoint
    hasScrolledDown.value = false
  }
  // Scrolling down
  else {
    hasScrolledUp.value = false
    hasScrolledDown.value = scrollPos > triggerPoint
  }

  prevScrollPos.value = scrollPos

  raf.value = null
}

const rAFHeaderScroll = () => {
  if (!raf.value)
    raf.value = requestAnimationFrame(handleScroll)
}

const handleMouseEnter = () => {
  hasScrolledUp.value = true
  hasScrolledDown.value = false
}

onMounted(async () => {
  rAFHeaderScroll()
  window.addEventListener('scroll', rAFHeaderScroll)

  await wait(500)
  ready.value = true
})

onUnmounted(() => {
  window.removeEventListener('scroll', rAFHeaderScroll)
  raf.value && cancelAnimationFrame(raf.value)
})

const isScreenLg = useAtMedia(getMediaQuery('lg'))

watchEffect(() => {
  if (import.meta.client && isScreenLg.value)
    isHeaderOpen.value = false
})
</script>

<template>
  <header
    :class="{
      'is-open': isHeaderOpen,
      // 'has-scrolled': hasScrolled,
      // 'has-scrolled-up': hasScrolledUp,
      // 'has-scrolled-down': hasScrolledDown,
      'transition-[opacity,translate] duration-300 ease-out': ready,
      'opacity-0 -translate-y-2': ready && hasScrolledDown,
      // 'opacity-0 -translate-y-3': !ready,
      // 'opacity-100 translate-y-0 transition-[opacity,translate] duration-1000 ease-outQuart': ready && !hasScrolled,
    }"
    class="header sticky top-0 wrapper py-7.5 w-full flex flex-row items-center justify-between z-10"
    @mouseenter="handleMouseEnter"
  >
    <NuxtLink
      class="p-7.5 -m-7.5"
      to="/"
    >
      <IconLogo class="text-offblack w-(--app-header-logo-width) h-(--app-header-logo-height) block" />
    </NuxtLink>

    <button
      class="p-7.5 -m-7.5 z-1 lg:hidden"
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

  & + * {
    margin-top: calc(var(--app-header-height) * -1);
  }
}

.header__navigation {
  --disc-size: 18px;
  --disc-offset: 36px;

  @variant md {
    --disc-size: 18px;
    --disc-offset: 46px;
  }

  @variant max-lg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100dvh;
    background-color: var(--color-offblack);
    color: var(--color-white);
    display: flex;
    flex-direction: column;
    justify-content: safe center;
    align-items: safe center;
    text-align: center;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: contain;
    padding-block: var(--app-header-height);

    clip-path: circle(var(--disc-size) at calc(100% - var(--disc-offset)) var(--disc-offset));
    transition: clip-path 0.4s cubic-bezier(0.34, 1.06, 0.24, 1);

    .header.is-open & {
      clip-path: circle(150% at calc(100% - var(--disc-offset)) var(--disc-offset));
      transition: clip-path 0.4s var(--ease-in-out);
    }
  }
}
</style>
