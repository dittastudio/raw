<script lang="ts" setup>
import type { Link, Logo } from '@@/.storyblok/types/289672313529140/storyblok-components'
import IconLogo from '@/assets/icons/logo.svg?component'

interface Props {
  text?: string
  links?: Link[]
  email?: string
  telephone?: string
  address?: string
  logos?: Logo[]
}

const { text, links, email, telephone, address, logos } = defineProps<Props>()
</script>

<template>
  <footer class="wrapper bg-offblack text-white">
    <div class="w-full grid gap-x-(--app-inner-gutter) grid-cols-4 sm:grid-cols-8 md:grid-cols-12 border-b border-white py-(--app-outer-gutter) sm:pb-[clamp(20px,10vw,130px)]">
      <div class="col-span-full sm:col-span-5 md:col-span-7">
        <IconLogo class="w-full h-auto block" />
      </div>
    </div>

    <div class="w-full grid grid-footer gap-(--app-inner-gutter) py-(--app-outer-gutter) sm:pb-[clamp(20px,10vw,130px)]">
      <div class="grid-area-newsletter bg-[red]">
        <h6
          v-if="text"
          class="type-h4 text-balance"
        >
          {{ text }}
        </h6>
      </div>

      <div class="grid-area-contact bg-[orange] type-p">
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

      <div class="grid-area-location bg-[lime]">
        <address
          v-if="address"
          class="type-p whitespace-pre"
          v-html="address"
        />
      </div>

      <div class="grid-area-links bg-[pink]">
        <ul
          v-if="links"
          class="type-p"
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

      <div class="grid-area-logos bg-[tomato]">
        <ul
          v-if="logos"
          class="type-p"
        >
          <li
            v-for="item in logos"
            :key="item._uid"
          >
            <StoryblokLink
              v-if="item.link"
              :item="item.link"
            >
              {{ item.title }}
            </StoryblokLink>

            <span v-else>
              {{ item.title }}
            </span>

            <NuxtImg
              v-if="item.image?.filename"
              :src="item.image.filename"
              :alt="item.image.alt || item.title || 'Logo'"
              class=""
              :width="150"
              :height="50"
              loading="lazy"
            />

            <!-- {{ item.image }} -->
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.grid-footer {
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    "newsletter newsletter"
    "contact location"
    "links logos";

  @variant md {
    grid-template-columns: 5fr 3fr;
    grid-template-areas:
      "newsletter contact"
      "newsletter location"
      "logos links";
  }

  @variant xl {
    grid-template-columns: 6fr 2fr 4fr;
    grid-template-areas:
      "newsletter links contact"
      "newsletter links location"
      "newsletter links logos";
  }
}

.grid-area-newsletter {
  grid-area: newsletter;
}

.grid-area-contact {
  grid-area: contact;
}

.grid-area-location {
  grid-area: location;
}

.grid-area-links {
  grid-area: links;
}

.grid-area-logos {
  grid-area: logos;
}
</style>
