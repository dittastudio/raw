<script lang="ts" setup>
interface Props {
  headline?: string
  slug?: string
  category?: string
}

const { headline, slug, category } = defineProps<Props>()
</script>

<template>
  <article class="size-full">
    <NuxtLink
      class="flex flex-col items-start justify-start gap-6 size-full border-b border-current pb-6"
      :to="`/${slug}`"
    >
      <div class="w-full overflow-hidden aspect-video">
        <slot name="image" />
      </div>

      <p v-if="category">
        {{ category }}
      </p>

      <h3
        v-if="headline"
        class="type-h5 text-balance max-w-[64ch]"
      >
        {{ headline }}
      </h3>

      <div
        v-if="$slots.author"
        class="mt-auto"
      >
        <slot name="author" />
      </div>
    </NuxtLink>
  </article>
</template>
