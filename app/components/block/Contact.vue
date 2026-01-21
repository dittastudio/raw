<script lang="ts" setup>
import type { BlockContact } from '@@/.storyblok/types/289672313529140/storyblok-components'

interface Props {
  block: BlockContact
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    class="flex flex-col gap-19 md:gap-38"
  >
    <UiContent
      :title="block.title"
      :headline="block.headline"
    />

    <div class="wrapper-max">
      <ul class="contact__list flex flex-col">
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
  </div>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.contact__list {
  :deep(p) {
    @apply type-p;
  }

  :deep(p a) {
    text-decoration: underline;
    text-underline-offset: 0.1em;
    text-decoration-thickness: 1px;
    transition: opacity 0.2s var(--ease-out);

    &:hover {
      opacity: 0.6;
    }
  }
}
</style>
