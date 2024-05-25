// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ["lottie-player"].includes(tag),
    },
  },
  app : {
    head: {
      title: 'Stid',
      htmlAttrs: {
        lang: 'en-us'
      },
      script: [
        {
          hid: 'gtmHead',
          innerHTML: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-T4FX7CL');`,
        },
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'Discover what our open technologies can offer'
        }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
    baseURL: '/us/',
  },
  // dir: {
  //   public: 'us',
  // },
  // rootDir: "us",
  modules: ["@nuxt/image-edge"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  image: {
    domains: ["cloudinary.com"],
    provider: "cloudinary",
    cloudinary: {
      baseURL: "https://res.cloudinary.com/df7vlavbp/",
      modifiers: {
        format: "auto",
        quality: "auto:good",
      },
    },
    // Options
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      "2xl": 1536,
    },
  },
  vite: {
    define: {
      // keep it for theatre
      "process.env.TESS_ENV": process.env.ENV,
    },
  },
})
