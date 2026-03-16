<script lang="ts" setup>
import type { BlockLogoWall } from '#storyblok-components'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import StoryblokLink from '@/components/storyblok/Link.vue'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  block: BlockLogoWall
}

const { block } = defineProps<Props>()

const shouldRenderUiContent = computed(() => {
  const title = block.title?.trim() ?? ''
  const headline = storyblokRichTextContent(block.headline)

  return (title && headline) || (!title && headline)
})

const container = useTemplateRef('container')
const itemRefs = useTemplateRef('item')

onMounted(async () => {
  await nextTick()

  if (!itemRefs.value?.length) {
    return
  }

  gsap.fromTo(itemRefs.value, {
    opacity: 0,
    scale: 0.75,
  }, {
    opacity: 1,
    scale: 1,
    duration: 1.5,
    ease: 'expo.out',
    stagger: {
      amount: 0.9,
    },
    scrollTrigger: {
      trigger: container.value,
      start: 'top 80%',
      end: 'bottom 50%',
      scrub: 1,
      markers: false,
    },
  })
})
</script>

<template>
  <div
    v-editable="block"
    :class="{
      'flex flex-col gap-19 md:gap-38': shouldRenderUiContent,
    }"
  >
    <UiContent
      v-if="shouldRenderUiContent"
      :title="block.title"
      :headline="block.headline"
    />

    <div
      :class="[
        'wrapper-max grid grid-cols-(--app-grid) gap-x-(--app-inner-gutter)',
        {
          'gap-y-10': !shouldRenderUiContent,
        },
      ]"
    >
      <div
        v-if="block.title && !shouldRenderUiContent"
        class="col-span-full md:col-start-1 md:col-span-3"
      >
        <h2 class="type-h5">
          {{ block.title }}
        </h2>
      </div>

      <div class="@container col-span-full md:col-start-4 md:col-span-9">
        <ul
          ref="container"
          class="
            grid
            grid-cols-1
            @xs:grid-cols-2
            @xl:grid-cols-3
            @3xl:grid-cols-4
            border-l
            border-current
          "
        >
          <li
            v-for="logo in block.items"
            :key="logo._uid"
            class="
              w-full
              aspect-square
              border-t
              border-r
              border-b
              border-current
              flex
              -mb-px
            "
          >
            <div
              ref="item"
              class="flex w-full h-full"
            >
              <component
                :is="logo.link?.cached_url ? StoryblokLink : 'span'"
                v-bind="logo.link?.cached_url ? { item: logo.link } : {}"
                class="w-full flex flex-col items-center p-5"
              >
                <div
                  v-if="logo.image.filename && storyblokAssetType(logo.image.filename) === 'image'"
                  class="grow flex items-center"
                >
                  <UiLogoResizer
                    :asset="logo.image"
                    :strength="50"
                    :base-height="3.5"
                    :title="logo.title"
                  />
                </div>

                <p
                  v-if="logo.title"
                  class="text-12 text-center"
                >
                  {{ logo.title }}
                </p>
              </component>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
