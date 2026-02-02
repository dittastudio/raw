import tailwindcss from '@tailwindcss/vite'
import devtoolsJson from 'vite-plugin-devtools-json'
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/seo',
    '@nuxt/eslint',
    '@nuxt/image',
    '@regle/nuxt',
    'lenis/nuxt',
    [
      '@storyblok/nuxt',
      {
        accessToken: process.env.NUXT_STORYBLOK_TOKEN,
      },
    ],
  ],
  ssr: true,
  devtools: false,
  app: {
    pageTransition: { name: 'fade', mode: 'out-in' },
    layoutTransition: false,
    head: {
      htmlAttrs: {
        lang: 'en-GB',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
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
    public: {
      STORYBLOK_TOKEN: process.env.NUXT_STORYBLOK_TOKEN,
      STORYBLOK_VERSION: process.env.NUXT_STORYBLOK_VERSION,
    },
  },
  routeRules: {
    '/latest': { prerender: false },
    '/posts/**': { prerender: false },
    '/**': { prerender: process.env.NUXT_PRERENDER === 'true' },
  },
  compatibilityDate: '2025-04-13',
  nitro: {
    experimental: {
      openAPI: false,
    },
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },
  vite: {
    plugins: [
      devtoolsJson(),
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
  sitemap: {
    sources: [
      '/api/sitemap',
    ],
  },
})
