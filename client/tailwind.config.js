/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
		"./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
		  backgroundImage: {
			  'bg': "url('./assets/login.jpg')",
		  }
	},
	screens: {
		'small': '320px',
		'large': '1024px',
	},
  },
  plugins: [],
}