// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      meta: [
        { name: "description", content: "" },
        { name: "theme-color", content: "#27498a" }
      ],
      title: "Lyrics Time",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [
        { rel: "icon", href: "/images/logo.png" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/images/logo.png" },
      ]
    }
  },

  modules: [
    "@nuxtjs/tailwindcss",
  ],

  runtimeConfig: {
    public: {
      firebaseConfig: process.env.FIREBASE_CONFIG
    }
  },

  // imports: {
  //   dirs: [
  //     // Scan top-level modules
  //     "composables",
  //     // ... or scan modules nested one level deep with a specific name and file extension
  //     "composables/*/index.{ts,js,mjs,mts}",
  //     // ... or scan all modules within given directory
  //     "composables/**"
  //   ]
  // },
})
