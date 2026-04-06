/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Optionnel : on peut ajouter tes couleurs exactes ici
        guineeBlue: '#1D4ED8',
        guineeRed: '#EF4444',
        guineePurple: '#9333EA',
      }
    },
  },
  plugins: [],
}