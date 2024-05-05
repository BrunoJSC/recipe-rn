/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'olive-green': '#708238',
        terracotta: '#CB4F3D',
        mustard: '#DAA520',
        cream: '#F5F5DC',
        charcoal: '#383838',
      },
      fontFamily: {
        "inter-regular": ["Inter_400Regular", "sans-serif"],
        "inter-medium": ["Inter_500Medium", "sans-serif"],
        "inter-semibold": ["Inter_600SemiBold", "sans-serif"],
        "inter-bold": ["Inter_700Bold", "sans-serif"],
      }
    },
  },
  plugins: [],
};
