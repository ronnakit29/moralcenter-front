const colors = require("tailwindcss/colors")
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        'primary': {
          '50': '#f0f8ff',
          '100': '#e1f0fd',
          '200': '#bce0fb',
          '300': '#80c9f9',
          '400': '#3dadf3',
          '500': '#1493e3',
          '600': '#0774c2',
          '700': '#0865ab',
          '800': '#0a4f82',
          '900': '#0f426b',
        },
        'secondary': {
          '50': '#fef2f2',
          '100': '#ffe1e1',
          '200': '#ffc8c9',
          '300': '#ffa2a3',
          '400': '#fc6d6e',
          '500': '#f53e40',
          '600': '#e22022',
          '700': '#be1719',
          '800': '#9d1718',
          '900': '#821a1b',
        },
        'info': {
          '50': '#f0faff',
          '100': '#e0f3fe',
          '200': '#bae9fd',
          '300': '#7ed9fb',
          '400': '#41c8f7',
          '500': '#10afe7',
          '600': '#038ec6',
          '700': '#0471a0',
          '800': '#085f84',
          '900': '#0d4f6d',
        },
        'cerise': {
          '50': '#fdf2fa',
          '100': '#fbe8f6',
          '200': '#f9d1ee',
          '300': '#f6abdf',
          '400': '#ee78c8',
          '500': '#e23ba7',
          '600': '#d32f91',
          '700': '#b71f75',
          '800': '#971d61',
          '900': '#7e1d53',
        },
        'sundance': {
          '50': '#fbf9f1',
          '100': '#f5f1df',
          '200': '#ebe1bd',
          '300': '#decb93',
          '400': '#ccaa5c',
          '500': '#c59a4a',
          '600': '#b8863e',
          '700': '#996b35',
          '800': '#7b5531',
          '900': '#64472a',
        },
        'pomegranate': {
          '50': '#fef2f2',
          '100': '#fee2e2',
          '200': '#fecacb',
          '300': '#fca5a6',
          '400': '#f87173',
          '500': '#ee3235',
          '600': '#dc2629',
          '700': '#b91c1f',
          '800': '#991b1d',
          '900': '#7f1d1f',
        },
      }
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
  daisyui: {
    themes: false
  }
}
