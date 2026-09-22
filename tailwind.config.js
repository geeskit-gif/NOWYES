/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nowyes: {
          bg: "#0A0A0B",
          card: "#151519",
          gold: "#D4A845",
          silver: "#C0C4CC"
        }
      },
      fontFamily: {
        sans: ["Inter","system-ui","-apple-system","BlinkMacSystemFont","Segoe UI","Roboto","sans-serif"]
      }
    },
  },
  plugins: [],
}
