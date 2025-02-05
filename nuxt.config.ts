// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  routeRules: {
    '/admin/**' : { ssr: false },
  },
  components: true,
  modules: ["nuxt-auth-utils", "@nuxt/icon"],
  css: ['~/assets/scss/global.scss'],
  runtimeConfig: {
    secretCloud: process.env.NUXT_CLOUD_API_SECRET_KEY,
    cloud: process.env.NUXT_CLOUD_API_KEY,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "~/assets/scss/_vars.scss" as *;
          @use "~/assets/scss/_mixins.scss" as *;
          `
        }
      }
    }
  },

  compatibilityDate: "2024-12-24"
})