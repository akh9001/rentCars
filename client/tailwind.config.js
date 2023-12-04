/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx,ts}"],
  theme: {
    extend: {
      screens: {
        'small': '320px',
        'large': '1024px',
      },
    },
  },
  plugins: [],
};
