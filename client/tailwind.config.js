/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  dark: ['dark'],
  theme: {
    screens: {
      xs: "420px",
      ...defaultTheme.screens
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        xs: "420px",
        sm: "600px",
        md: "700px",
        lg: "900px",
        xl: "1100px",
        "2xl": "1280px"
      }
    },
    extend: {
      colors: {
        bg: {
          primary: "var(--theme-background-primary)"
        },
        text: {
          base: "var(--theme-text-base)",
        }
      },
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

