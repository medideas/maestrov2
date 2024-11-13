import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [
    require('@tailwindcss/typography'),
  ],
  theme:{
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {

      colors:{
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        gray: colors.gray,
        emerald: colors.emerald,
        indigo: colors.indigo,
        yellow: colors.yellow,
        'navbar': '#ECE5E0',
        'primary': '#DEE5EA',
        'secondary': '#E9E5D9',
        'tertiary': '#E1E2E2',
        'quartery': '#E7CFCF',
      }
    }
  }
};

export default config;
