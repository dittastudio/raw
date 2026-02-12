<script lang="ts" setup>
import type { BlockContact } from '#storyblok-components'

interface Props {
  block: BlockContact
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    class="wrapper-max flex flex-col gap-19 md:gap-38"
  >
    <div class="grid grid-cols-1 md:grid-cols-3 gap-x-(--app-inner-gutter) gap-y-6">
      <h2 class="col-span-full md:col-span-1 type-h5">
        {{ block.title }}
      </h2>

      <div
        v-if="storyblokRichTextContent(block.headline)"
        class="col-span-full md:col-span-2 type-h4 [&_*+*]:mt-[1.25em] **:text-balance"
      >
        <StoryblokText :html="block.headline" />
      </div>
    </div>

    <ul class="prose-p flex flex-col">
      <li
        v-for="info in block.info"
        :key="info._uid"
        class="grid grid-cols-1 md:grid-cols-3 gap-x-(--app-inner-gutter) gap-y-6 border-b border-current py-15 md:py-20 first:border-t"
      >
        <h3 class="type-h5">
          {{ info.title }}
        </h3>

        <div v-if="storyblokRichTextContent(info.column_one)">
          <StoryblokText :html="info.column_one" />
        </div>

        <div v-if="storyblokRichTextContent(info.column_two)">
          <StoryblokText :html="info.column_two" />
        </div>
      </li>
    </ul>
  </div>
</template>
