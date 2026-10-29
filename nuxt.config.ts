import type { ISbLink } from 'storyblok-js-client'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import StoryblokClient from 'storyblok-js-client'
import svgLoader from 'vite-svg-loader'

const isSpa = process.env.IS_SPA === 'true'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/seo',
    '@nuxt/eslint',
    '@nuxt/image',
    '@regle/nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    'lenis/nuxt',
    ['@storyblok/nuxt', { accessToken: process.env.NUXT_STORYBLOK_TOKEN }],
    ['nuxt-gtag', { id: 'G-P5WQCFSK22', initMode: 'manual' }],
  ],
  ssr: !isSpa,
  devtools: false,
  app: {
    pageTransition: { name: 'fade', mode: 'out-in' },
    layoutTransition: false,
    head: {
      htmlAttrs: {
        lang: 'en-GB',
      },
      meta: [
        { name: 'author', content: 'RAW' },
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { name: 'theme-color', content: '#ffffff' },
        { name: 'apple-mobile-web-app-title', content: 'RAW' },
        { 'http-equiv': 'content-language', 'content': 'en-GB' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },
  css: ['~/assets/css/app.css'],
  vue: {
    compilerOptions: {
      isCustomElement: tag => tag.startsWith('mux-'),
    },
  },
  site: {
    url: 'https://raw.london',
    name: 'RAW',
  },
  runtimeConfig: {
    STORYBLOK_SPACE_ID: process.env.NUXT_STORYBLOK_SPACE_ID,
    MUX_ACCESS_TOKEN: process.env.NUXT_MUX_ACCESS_TOKEN,
    MUX_SECRET_KEY: process.env.NUXT_MUX_SECRET_KEY,
    CORS_ORIGINS: process.env.NUXT_CORS_ORIGINS,
    GHL_TOKEN: process.env.NUXT_GHL_TOKEN,
    GHL_LOCATION_ID: process.env.NUXT_GHL_LOCATION_ID,
    public: {
      STORYBLOK_TOKEN: process.env.NUXT_STORYBLOK_TOKEN,
      STORYBLOK_VERSION: process.env.NUXT_STORYBLOK_VERSION,
    },
  },
  alias: {
    '#storyblok-schema': fileURLToPath(new URL('./.storyblok/schema/schema', import.meta.url)),
  },
  routeRules: {
    '/**': {
      prerender: !isSpa,
    },
  },
  compatibilityDate: '2026-02-10',
  nitro: {
    experimental: {
      wasm: true, // ...for Cloudflare Workers
    },
    prerender: {
      crawlLinks: !isSpa,
      routes: isSpa ? [] : ['/'],
      autoSubfolderIndex: false,
      ignore: [route => route.includes('?')],
    },
  },
  vite: {
    optimizeDeps: {
      include: [
        '@storyblok/vue',
        '@regle/rules',
        '@regle/core',
        '@vueuse/core',
        '@mux/mux-player',
        'tailwind-merge',
        'gsap',
        'gsap/ScrollTrigger',
        'gsap/SplitText',
        'gsap/DrawSVGPlugin',
        'keen-slider/vue.es',
      ],
    },
    plugins: [
      tailwindcss(),
      svgLoader({
        svgo: false,
      }),
    ],
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    },
  },
  postcss: {
    plugins: {
      'postcss-nested': {},
    },
  },
  hooks: {
    // Not every post is linked from the site, so the crawler can't find them all.
    // Queue every published post explicitly.
    'prerender:routes': async function ({ routes }) {
      if (isSpa) {
        return
      }

      const storyblokApi = new StoryblokClient({
        accessToken: process.env.NUXT_STORYBLOK_TOKEN,
        region: 'eu',
      })

      const links: ISbLink[] = await storyblokApi.getAll('cdn/links', {
        version: 'published',
        starts_with: 'posts/',
        per_page: 1000,
      })

      for (const link of links) {
        if (!link.is_folder && link.published) {
          routes.add(`/${link.slug}`)
        }
      }
    },
  },
  eslint: {
    config: {
      standalone: false,
      stylistic: true,
      autoInit: false,
    },
  },
  image: {
    provider: 'storyblok',
    storyblok: {
      baseURL: 'https://a2.storyblok.com',
      modifiers: {
        smart: true,
      },
    },
    format: ['webp'],
    domains: ['storyblok.com', 'raw.london'],
    quality: 85,
    screens: {
      '2xs': 375,
      'xs': 480,
      'sm': 600,
      'md': 800,
      'lg': 1200,
      'xl': 1440,
      '2xl': 1800,
    },
  },
  linkChecker: {
    skipInspections: ['no-uppercase-chars', 'link-text'],
  },
  seo: {
    automaticOgAndTwitterTags: false,
  },
  sitemap: {
    excludeAppSources: true,
    sitemaps: {
      posts: {
        sources: [
          '/api/sitemap/posts',
        ],
      },
      pages: {
        sources: [
          '/api/sitemap/pages',
        ],
      },
    },
  },
})
