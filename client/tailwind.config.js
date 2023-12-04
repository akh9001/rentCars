/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
		"./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
		  backgroundImage: {
			'bg': "url('./assets/login.jpg')",
			'bg_sm': "url('./assets/login_sm.jpg')",
		  }
	},
	screens: {
		'small': '320px',
		'large': '1024px',
	},
  },
  plugins: [],
}
