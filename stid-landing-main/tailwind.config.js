/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      height: {
        "real-screen": "var(--screen-height)",
        "app-screen": "var(--app-height)",
      }
    },
    screens: {
      'mobile':  {
        'raw': '(orientation: portrait)'
      },
      'desktop':  {
        'raw': '(orientation: landscape)'
      },
    },
  },
  plugins: [],
}
