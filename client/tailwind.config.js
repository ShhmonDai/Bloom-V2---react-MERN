import flowbitePlugin from "flowbite/plugin";
import tailwindScrollbar from 'tailwind-scrollbar';
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
    
  ],
  theme: {
    extend: {
      fontFamily: {
        'BrushFont': ["brushesregular", "sans-serif"],
        'QwigleyFont': ["Qwigley", "sans-serif"],
        'BilboSwash': ["BilboSwash", "sans-serif"],
        'Grandiflora': ["Grandiflora", "sans-serif"],
      },
    },
  },
  plugins: [
    flowbitePlugin,
    tailwindScrollbar,
  ],
}