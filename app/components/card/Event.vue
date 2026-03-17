<script lang="ts" setup>
interface Props {
  slug?: string
  datetime?: string
  headline?: string
  description?: string
}

const { slug, datetime, headline, description } = defineProps<Props>()
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

      <time
        v-if="datetime"
        :datetime="datetime"
        class="type-display-16 bg-purple px-2 py-1.25 border border-offblack"
      >
        {{ formatDateDMY(datetime) }}
      </time>

      <h3
        v-if="headline"
        class="type-h5 text-balance max-w-[64ch]"
      >
        {{ headline }}
      </h3>

      <p
        v-if="description"
        class="max-sm:hidden type-p text-balance"
      >
        {{ description }}
      </p>
    </NuxtLink>
  </article>
</template>
