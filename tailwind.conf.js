/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./node_modules/@abifa-ui/components/**/*.{js,vue,ts}",
    "./@abifa-ui/components/**/*.{js,vue,ts}",
    "./app.vue"
  ],
  // important: true,
  theme: {
    extend: {
      colors: {
        "primary-50": "#f0f9ff",
        "primary-100": "#e0f2fe",
        "primary-200": "#bae6fd",
        "primary-300": "#7dd3fc",
        "primary-400": "#38bdf8",
        "primary-500": "#0284c7",
        "primary-600": "#0369a1",
        "primary-700": "#075985",
        "primary-800": "#0c4a6e",
        "primary-900": "#082f49",
        "primary-950": "#082f49",

        "secondary-500": "#27498a"
      }
    },
    screens: {
      "mm": "200px",
      "phone": "412px",
      "sm": "640px",
      "md": "768px",
      "lg": "1024px",
      "xl": "1280px",
      "2xl": "1536px"
    }
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
