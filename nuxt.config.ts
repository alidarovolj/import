import axios from 'axios'

const getDynamicRoutes = async () => {
  const response = await axios.get('https://api.codecrafters.kz/api/catalog/')
  return response?.data?.map((post) => `/category/${post.id}`);
};

const getDynamicRoutesProducts = async () => {
  const response = await axios.get('https://api.codecrafters.kz/api/catalog/')
  return response?.data?.map((post) => `/category/${post.id}`);
};

export default defineNuxtConfig({
  ssr: false,
  components: [{
    path: '~/components',
    pathPrefix: false,
  }],
  hooks: {
    async 'nitro:config'(nitroConfig) {
      const categories = await getDynamicRoutes();
      nitroConfig.prerender.routes.push(...categories);
    },
  },
  imports: {
    dirs: ["store", 'composables', 'composables/*/index.{ts,js,mjs,mts}', 'composables/**'],
  },
  devtools: { enabled: true },
  css: ["assets/css/style.css", "assets/css/fonts.css"],
  modules: ['@pinia/nuxt', '@nuxtjs/i18n', "@pinia/nuxt", 'vue3-carousel-nuxt'],
  plugins: ['~/plugins/maska.ts'],
  runtimeConfig: {
    public: {
      API_LINK: process.env.API_LINK,
      IMAGE_LINK: process.env.IMAGE_LINK,
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  // i18n: {
  //   lazy: true,
  //   langDir: 'locales',
  //   strategy: "prefix_except_default",
  //   defaultLocale: 'ru-RU',
  //   locales: [
  //     {
  //       code: "en-US",
  //       iso: "en-US",
  //       name: "English",
  //       sh_name: "Eng",
  //       file: "~/locales/en-US.json"
  //     },
  //     {
  //       code: "ru-RU",
  //       iso: "ru-RU",
  //       name: "Русский",
  //       sh_name: "Рус",
  //       file: "~/locales/ru-RU.json"
  //     }
  //   ],
  //   detectBrowserLanguage: false,
  //   vueI18n: './i18n.config.ts'
  // },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
      },
    },
    transpile: ['@vuepic/vue-datepicker']
  },
  pinia: {
    autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
  },
})
