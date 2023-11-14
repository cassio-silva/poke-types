/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      roboto: ['var(--font-roboto)'],
      barlow: ['var(--font-barlow)'],
      garamond: ['var(--font-garamond)'],
      poppins: ['var(--font-poppins)'],
    },
    colors: {
      black: '#000',
      white: '#fff',
      gray: {
        50: '#e3e3e3',
        100: '#c4c4c4',
        200: '#737373',
        300: '#595959',
      },
      blue: {
        50: '#d6f9ff',
        100: '#02d1e8',
        200: '#009fbd',
        300: '#0b6bb0',
        400: '#08558c',
      },
      yellow: {
        100: '#ffda63',
        200: '#ffce30',
        300: '#ffc300',
        400: '#d4a200',
        500: '#a67f00',
      },
      lime: {
        100: '#80ed84',
        200: '#54e359',
        300: '#12de19',
      },
      green: {
        100: '#36c249',
        200: '#1ab82f',
        300: '#00ab17',
        400: '#008512',
        500: '#005c0c',
      },
      teal: {
        100: '#33a191',
        200: '#348a7e',
        300: '#2a6e64',
      },
      red: {
        100: '#ff7070',
        200: '#ff4545',
        300: '#ff2121',
        400: '#ff1212',
        500: '#a60808',
        600: '#630404',
      },
      magenta: {
        100: '#ff5495',
        200: '#ff297a',
        300: '#ff0061',
        400: '#d40051',
        500: '#b50045',
      },
      orange: {
        100: '#ff8f5e',
        200: '#ff783d',
        300: '#ff5f19',
        400: '#ff4e00',
      },
      purple: {
        100: '#9470e6',
        200: '#6c24d1',
      },
      transparent: 'transparent',
    },
    extend: {
      boxShadow: {
        whiteLight: '0px 0px 16px 8px rgba(255, 255, 255, 0.5)',
        under: '0px 0px 8px 3px rgba(0, 0, 0, 0.25)',
      },
      dropShadow: {
        'text-stroke': '0 3px 1px var(--tw-shadow-color)',
      },
      backgroundImage: {
        'gradient-radial':
          'radial-gradient(circle at center, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%);',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        pokeballSpawn: {
          '0%': {
            opacity: 0,
            filter: 'brightness(5)',
            transform: 'translate(-25%, -25%) scale(20%, 30%)',
          },
          '70%': {
            filter: 'brightness(5)',
            transform: 'translate(-10%, 48px) scale(60%, 70%)',
          },
          '100%': {
            opacity: 1,
            filter: 'brightness(1)',
            transform: 'translate(0, 56px) scale(100%, 100%)',
          },
        },
        pokeballSpawnMobile: {
          '0%': {
            opacity: 0,
            filter: 'brightness(5)',
            transform: 'translate(-50%, 5%) scale(33%, 33%)',
          },
          '50%': {
            filter: 'brightness(5)',
            opacity: 1,
            transform: 'translate(-50%, -15%) scale(75%, 75%)',
          },
          '100%': {
            filter: 'brightness(1)',
            transform: 'translate(-50%, -50%) scale(100%, 100%)',
          },
        },
        pokeballSpin: {
          '0%': {
            rotate: '0deg',
          },
          '100%': {
            rotate: '720deg',
          },
        },
        glow: {
          '0%': {
            filter: 'brightness(100%)',
            boxShadow: '0 0 6px 2px var(--tw-shadow-color)',
          },
          '50%': {
            filter: 'brightness(120%)',
            boxShadow: '0 0 12px 3px var(--tw-shadow-color)',
          },
          '100%': {
            filter: 'brightness(100%)',
            boxShadow: '0 0 6px 2px var(--tw-shadow-color)',
          },
        },
      },
      animation: {
        fadeIn: 'fadeIn 200ms linear forwards',
        'pokeball-spawn': 'pokeballSpawn 400ms ease forwards',
        'pokeball-spawn-mobile':
          'pokeballSpawnMobile 300ms ease forwards',
        'pokeball-spin': 'pokeballSpin 300ms ease-in-out forwards',
        glow: 'glow 1s ease infinite',
      },
      screens: {
        mobile: '440px',
        widescreen: '1600px',
        desktop: '1200px',
      },
    },
  },
  plugins: [],
}
