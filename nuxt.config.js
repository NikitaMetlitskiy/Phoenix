import axios from "axios"

export default {
  // loading: '~/components/common/PageLoader.vue',

  env: {
    apiBaseUrl: process.env.API_BASE_URL,
    hostUrl:'https://phoenix.dev-onfire.work',
    TELEGRAM_TOKEN: '5659803884:AAFs1Zd3yeFllkAz1ZazMHQa0deK5BdsJvs',
    TELEGRAM_CHAT_ID: '-1001716220304'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Phoenix',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      {name: 'robots', content: 'noindex, nofollow'}
    ],
    link: [
      {rel: 'icon', type: 'image/png', href: '/favicon.png'},
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/mixins.js',
    { src: '~/plugins/gsap.js', mode: 'client' },
    { src: '~/plugins/directives-animation/tftl-animation-plugin.js', mode: 'client' },
    {src:'~/plugins/animations.js', mode:'client'},
    { src: "~/plugins/calendar.js", ssr: false, mode: 'client' },
    // { src: '~/plugins/3DScene/dat-gui.plugin.client.js', mode: 'client'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
  ],
  styleResources: {
    scss: './assets/scss/utilities/*.scss',
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    ['@nuxtjs/i18n', {
      locales: [
        { code:'en', file:'en.js', iso:'en-EN' },
        { code:'ua', file:'ua.js', iso:'ua-UA' },
      ],
      strategy: 'prefix_and_default',
      defaultLocale: 'ua',
      langDir:'locales/',
      detectBrowserLanguage: false,
      vueI18n: {
        fallbackLocale: 'ua',
      },
      seo: true,
    }],
    '@nuxtjs/pwa',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.API_BASE_URL,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: "/favicon.png",
    manifest: {
      name: 'Phoenix Hotel',
      lang: 'en',
      short_name:"Phoenix",
      theme_color:"#ffffff",
      background_color:"#3A3A3A",
      display: 'standalone',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile:['gsap', 'dat.gui'],

    // fix to work with swiperjs 8 - need to run with standalone:true. That can make some troubles.
    standalone: true,
    extend(config, ctx) {
      // fix to work with swiperjs 8 add needed deps. you can get them from error when doing nuxt generate
      config.externals = [{ encoding: 'encoding' }]
    },

    loaders: {
      vue: {
        compiler: require('vue-template-babel-compiler')
      }
    },

    html:{
      minify:{
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
        minifyURLs: true,
        removeComments: true,
        removeEmptyElements: true,
        preserveLineBreaks: false,
        collapseWhitespace: true,
      }
    }
  },

  // https://github.com/nuxt-community/robots-module#readme
  robots: {
    UserAgent: '*',
    Disallow: '/',
  },

  // https://sitemap.nuxtjs.org/
  sitemap: {
    path: '/sitemap.xml',
    hostname: process.env.BASE_URL,
    gzip: true,
    cache: true,
    cacheTime: 1000 * 60 * 15,
    exclude: [
      '**/offer-inner',
      '**/accommodation-inner',
      '/ua',
      '**/ua/**',
    ],

    routes: async () => {
      const data = [
        await axios.get(`${process.env.API_BASE_URL}/accommodations?fields[0]=Slug`),
        await axios.get(`${process.env.API_BASE_URL}/offers?fields[0]=Slug`),
      ];

      const all = [
        ...data[0].data.data.map((item) => `/accommodations/${item.attributes.Slug}`),
        ...data[0].data.data.map((item) => `en/accommodations/${item.attributes.Slug}`),
        ...data[1].data.data.map((item) => `/special-offers/${item.attributes.Slug}`),
        ...data[1].data.data.map((item) => `en/special-offers/${item.attributes.Slug}`),
      ];

      return all
    },
  },

//   server:{
//     host: '0.0.0.0',
//     port: 3044 //default 3000 
//   },
  server:{  
    port: 3044 //default 3000 
  },
  target:"static"
  
}
