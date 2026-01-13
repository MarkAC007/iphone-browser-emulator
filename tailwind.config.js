/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      /**
       * Custom colours for iPhone device frame and Safari browser
       * Using British English spelling in comments
       */
      colors: {
        'device-frame': {
          'space-grey': '#1d1d1f',
          'silver': '#f5f5f7',
          'gold': '#fad7bd',
          'midnight': '#0d0d0d',
        },
        'safari': {
          'toolbar': '#f9f9f9',
          'toolbar-dark': '#2c2c2e',
          'url-bar': '#e8e8ed',
          'url-bar-dark': '#1c1c1e',
          'accent': '#007aff',
        },
      },
      /**
       * iPhone device dimensions and border radii
       * Based on actual iPhone specifications
       */
      borderRadius: {
        'device': '47px',
        'device-inner': '40px',
        'notch': '24px',
        'dynamic-island': '36px',
      },
      /**
       * Box shadows for realistic device appearance
       */
      boxShadow: {
        'device': '0 50px 100px -20px rgba(0, 0, 0, 0.25), 0 30px 60px -30px rgba(0, 0, 0, 0.3)',
        'device-inner': 'inset 0 0 30px rgba(0, 0, 0, 0.1)',
      },
      /**
       * Animation timings for iOS-like interactions
       */
      transitionTimingFunction: {
        'ios': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'ios-spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
    },
  },
  plugins: [],
}
