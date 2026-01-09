<script lang="ts" setup>
import type { Link } from '@@/.storyblok/types/289672313529140/storyblok-components'
import IconLogo from '@/assets/icons/logo.svg?component'

interface Props {
  text?: string
  links?: Link[]
  email?: string
  telephone?: string
  address?: string
}

const { text, links, email, telephone, address } = defineProps<Props>()
</script>

<template>
  <footer class="wrapper bg-black text-white">
    <div class="w-full grid gap-x-(--app-inner-gutter) grid-cols-4 sm:grid-cols-8 md:grid-cols-12 border-b border-white py-(--app-outer-gutter) sm:pb-[clamp(20px,10vw,130px)]">
      <div class="col-span-full sm:col-span-5 md:col-span-7">
        <IconLogo class="w-full h-auto block" />
      </div>
    </div>

    <div class="w-full grid gap-(--app-inner-gutter) grid-cols-4 sm:grid-cols-8 md:grid-cols-12 py-5 sm:py-(--app-outer-gutter)">
      <div class="col-span-full sm:col-span-5 sm:row-span-full bg-[red]">
        <h6
          v-if="text"
          class="type-h4 text-balance"
        >
          {{ text }}
        </h6>
      </div>

      <div
        v-if="email || telephone"
        class="col-span-2 sm:col-span-3 bg-[orange] type-p"
      >
        <p v-if="email">
          <NuxtLink :to="`mailto:${email}`">
            {{ email }}
          </NuxtLink>
        </p>

        <p v-if="telephone">
          <NuxtLink :to="`tel:${telephone}`">
            {{ telephone }}
          </NuxtLink>
        </p>
      </div>

      <address
        v-if="address"
        class="col-span-2 sm:col-span-3 bg-[lime] type-p"
        v-html="address"
      />

      <ul
        v-if="links"
        class="col-span-2 sm:col-span-3 bg-[pink] type-p"
      >
        <li
          v-for="item in links"
          :key="item._uid"
        >
          <StoryblokLink :item="item.link">
            {{ item.title }}
          </StoryblokLink>
        </li>
      </ul>
    </div>
  </footer>
</template>
