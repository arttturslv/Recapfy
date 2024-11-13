/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'dark': '#111111',
      'light': '#FFFFFF', 
    },
    extend: {},
  },
  plugins: [],
}

