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
        "primary-50": "#f0fdf4",
        "primary-100": "#dcfce7",
        "primary-200": "#bbf7d0",
        "primary-300": "#86efac",
        "primary-400": "#4ade80",
        "primary-500": "#22c55e",
        "primary-600": "#16a34a",
        "primary-700": "#15803d",
        "primary-800": "#166534",
        "primary-900": "#14532d",
        "primary-950": "#052e16",
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
