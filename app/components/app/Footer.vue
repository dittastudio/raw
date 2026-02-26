<script lang="ts" setup>
import type { Link, Logo } from '#storyblok-components'
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
  <footer class="wrapper bg-offblack text-offwhite">
    <div class="w-full grid gap-x-(--app-inner-gutter) grid-cols-4 sm:grid-cols-8 md:grid-cols-12 border-b border-offwhite py-(--app-outer-gutter) sm:pb-[clamp(20px,10vw,130px)]">
      <div class="col-span-full sm:col-span-5 md:col-span-7">
        <IconLogo class="w-full h-auto block" />
      </div>
    </div>

    <div class="w-full grid grid-footer gap-(--app-outer-gutter) py-(--app-outer-gutter) sm:pb-[clamp(20px,10vw,130px)]">
      <div class="grid-area-newsletter">
        <div class="w-full flex flex-col items-start gap-(--app-outer-gutter) pb-(--app-outer-gutter)">
          <h6
            v-if="text"
            class="type-h4 text-balance md:max-w-140"
          >
            {{ text }}
          </h6>

          <UiModal>
            <template #trigger>
              <UiButton theme="dark">
                Sign up
              </UiButton>
            </template>

            <NewsletterSignup legend="Newsletter Signup">
              <template #pre>
                <h6
                  v-if="text"
                  class="type-h4 text-pretty pr-6"
                >
                  {{ text }}
                </h6>
              </template>

              <template #post>
                <h6 class="type-h4 text-pretty pr-6">
                  Thanks for signing up to our newsletter
                </h6>
              </template>
            </NewsletterSignup>
          </UiModal>
        </div>
      </div>

      <div class="grid-area-combined">
        <div class="grid-area-contact type-p flex flex-col gap-1">
          <p v-if="email">
            <NuxtLink
              class="hover:opacity-60 transition-opacity duration-200 ease-out p-1 -m-1"
              :to="`mailto:${email}`"
            >
              {{ email }}
            </NuxtLink>
          </p>

          <p v-if="telephone">
            <NuxtLink
              class="hover:opacity-60 transition-opacity duration-200 ease-out p-1 -m-1"
              :to="`tel:${telephone}`"
            >
              {{ telephone }}
            </NuxtLink>
          </p>
        </div>

        <div class="grid-area-location">
          <address
            v-if="address"
            class="block type-p whitespace-pre-line"
            v-html="address"
          />
        </div>

        <div class="grid-area-links">
          <ul
            v-if="links"
            class="type-p flex flex-col gap-1"
          >
            <li
              v-for="item in links"
              :key="item._uid"
            >
              <StoryblokLink
                class="hover:opacity-60 transition-opacity duration-200 ease-out p-1 -m-1"
                :item="item.link"
              >
                {{ item.title }}
              </StoryblokLink>
            </li>
          </ul>
        </div>

        <div class="grid-area-logos">
          <ul
            v-if="logos"
            class="flex items-center justify-start gap-[calc(var(--app-outer-gutter)/2)] sm:gap-(--app-outer-gutter) type-p pt-6"
          >
            <li
              v-for="item in logos"
              :key="item._uid"
            >
              <StoryblokLink
                v-if="item.link"
                :item="item.link"
                class="block size-10 sm:size-15"
              >
                <NuxtImg
                  v-if="item.image?.filename"
                  class="block size-full object-contain"
                  :src="item.image.filename"
                  :alt="item.image.alt || item.title || 'Logo'"
                  :width="200"
                  loading="lazy"
                />
              </StoryblokLink>

              <span
                v-else
                class="block size-10 sm:size-15"
              >
                <NuxtImg
                  v-if="item.image?.filename"
                  class="block size-full object-contain"
                  :src="item.image.filename"
                  :alt="item.image.alt || item.title || 'Logo'"
                  :width="200"
                  loading="lazy"
                />
              </span>
            </li>
          </ul>
        </div>
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
    grid-template-columns: 7fr 5fr;
    grid-template-areas:
      "newsletter combined"
      "newsletter combined"
      "logos combined";
  }

  @variant xl {
    /* Disgusting hack. Columns need to match areas available. */
    grid-template-columns: repeat(6, 1fr);
    grid-template-areas:
      "newsletter newsletter newsletter links contact contact"
      "newsletter newsletter newsletter links location location"
      "newsletter newsletter newsletter links logos logos";
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

.grid-area-combined {
  display: contents;

  @variant md {
    grid-area: combined;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: var(--app-inner-gutter);
  }

  @variant xl {
    display: contents;
  }
}
</style>
