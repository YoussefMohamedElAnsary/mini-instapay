/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#99C445',
          dark: '#7A9D37',
        },
        secondary: {
          light: '#5E99CA',
          dark: '#4A7AA3',
        },
        background: {
          light: '#F0F0F0',
          dark: '#1A1A1A',
        },
        text: {
          light: '#0E0E0E',
          dark: '#F0F0F0',
        },
        card: {
          light: '#FFFFFF',
          dark: '#2D2D2D',
        }
      }
    },
  },
  plugins: [],
} 