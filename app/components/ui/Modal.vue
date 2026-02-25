<script lang="ts" setup>
interface Props {
  immediate?: boolean
}

const { immediate = false } = defineProps<Props>()

interface Emits {
  (event: 'opened'): void
  (event: 'closed'): void
}

const emit = defineEmits<Emits>()

const modal = useTemplateRef('modal')
const modalOpen = ref(immediate)

const open = () => {
  modal.value?.showModal()
  modalOpen.value = true

  emit('opened')
}

const close = async () => {
  modalOpen.value = false

  await wait(1000)

  modal.value?.close()

  emit('closed')
}

const cancel = (event: Event) => {
  const target = event.target as HTMLElement

  const hasFileInput = event.composedPath().some((element) => {
    if (element instanceof HTMLInputElement) {
      return element.type === 'file'
    }
    return false
  })

  if (target instanceof HTMLInputElement && target.type === 'file') {
    return
  }

  if (hasFileInput) {
    return
  }

  close()
}

defineExpose({
  open,
  close,
})

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <template v-if="$slots.trigger">
    <div
      role="button"
      tabindex="0"
      :aria-pressed="modalOpen"
      class="size-full cursor-pointer"
      @click="open"
    >
      <slot name="trigger" />
    </div>
  </template>

  <dialog
    ref="modal"
    class="fixed inset-0 block w-full h-dvh max-w-full max-h-none backdrop-blur-xl transition-opacity duration-500 overflow-hidden backdrop:hidden bg-offblack/80"
    :class="{
      'opacity-0 delay-500 pointer-events-none': !modalOpen,
      'opacity-100 delay-0 pointer-events-auto': modalOpen,
    }"
    @cancel.prevent="cancel"
  >
    <div
      data-lenis-prevent
      class="flex flex-col items-center size-full wrapper p-(--app-outer-gutter) overflow-y-scroll overscroll-contain"
      @click.self="close"
    >
      <div
        class="relative w-full max-w-140 m-auto"
        :class="{
          'opacity-0 scale-95 transition-[opacity,scale] duration-500 ease-out delay-0': !modalOpen,
          'opacity-100 scale-100 transition-[opacity,scale] duration-500 ease-outQuart delay-500': modalOpen,
        }"
      >
        <button
          class="
            absolute
            top-5
            right-5
            z-50
            flex
            flex-col
            items-center
            justify-center
            pointer-events-auto
            bg-white
            text-offblack
            outline-0
            size-10
            rounded-full
            rotate-45
            before:content-['']
            before:absolute before:w-px
            before:h-1/2
            before:bg-current
            before:rounded-full
            after:content-['']
            after:absolute
            after:w-1/2
            after:h-px
            after:bg-current
            after:rounded-full
          "
          type="button"
          @click="close"
        >
          <span class="sr-only">Close</span>
        </button>

        <div class="w-full text-left p-10 bg-offblack text-white border border-white">
          <slot />
        </div>
      </div>
    </div>
  </dialog>
</template>
