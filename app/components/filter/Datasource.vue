<script lang="ts" setup>
export interface Entry {
  id: number
  value: string
  name: string
}

interface Props {
  slug: string
  entries?: Entry[]
}

const { slug, entries = [] } = defineProps<Props>()
const route = useRoute()
const applied = computed(() => route.query[slug] ?? null)

const filters = computed(() => {
  const others = entries.map(entry => ({
    ...entry,
    to: {
      path: route.path,
      query: {
        ...route.query,
        [slug]: entry.value,
      },
    },
  }))

  const all = route.query
  const { [slug]: _, ...rest } = all

  return [
    {
      id: 1,
      value: null,
      name: 'All',
      to: {
        path: route.path,
        query: rest,
      },
    },
    ...others,
  ]
})
</script>

<template>
  <ul class="w-full flex items-center justify-start gap-4 lg:gap-6">
    <li
      v-for="filter in filters"
      :key="filter.id"
      class="text-18 last:pr-(--app-fluid-gutter)"
    >
      <NuxtLink
        :to="filter.to"
        class="p-2 -m-2 lg:p-3 lg:-m-3 hover:opacity-100 transition-opacity duration-200 ease-out whitespace-nowrap"
        :class="[
          {
            'opacity-50': applied !== filter.value,
            'opacity-100': applied === filter.value || (!applied && !filter.value),
          },
        ]"
      >
        {{ filter.name }}
      </NuxtLink>
    </li>
  </ul>
</template>
