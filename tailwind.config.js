import defaultColors from 'tailwindcss/colors'

/* BackgroundImage */

const backgroundImage = {
	mashiro: "url('/images/mashiro.png')",
	haruha: "url('/images/haruha.png')"
}

/* BacgroundSize */

const backgroundSize = {
	'3/4': '75%',
	'2/3': '66.66%',
	'1/2': '50%',
	'1/3': '33.33%',
	'1/4': '25%',
	'1/5': '20%'
}

/* Colors */

// Remove deprecated colors
for (const key of ['lightBlue', 'warmGray', 'trueGray', 'coolGray', 'blueGray']){
	delete defaultColors[key]
}

const colors = {
	...defaultColors,
	gray: {
		50: '#FAFAFA',
		100: '#F4F4F5',
		200: '#E4E4E7',
		300: '#D4D4D8',
		400: '#A1A1AA',
		500: '#71717A',
		600: '#52525B',
		700: '#3F3F46',
		800: '#27272A',
		900: '#18181B'
	},
	primary: defaultColors.purple 
}

/* Data */

const data = {
	active: 'active~="true"',
	'is-open': 'is-open~="true"'

}

/* Fonts */

const fontFamily = {
	'nunito-sans': 'Nunito-Sans',
}

// <size-title>: [<font-size>, <line-height>]
const fontSize = {
	xs: ['0.75rem', '1rem'], // 12px, 16px
	sm: ['0.875rem', '1.25rem'], // 14px, 20px
	base: ['1rem', '1.25rem'], // 16px, 24px
	lg: ['1.125rem', '1.75rem'], // 18px, 28px
	xl: ['1.25rem', '1.75rem'], // 20px, 18px
	'2xl': ['1.5rem', '2rem'] // 24px, 32px
}

/**
 * @type {import('tailwindcss').Config}
 * */

module.exports = {
	darkMode: 'class',
	data,
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./widgets/**/*.{js,ts,jsx,tsx,mdx}',
		'./shared/**/*.{js,ts,jsx,tsx,mdx}',
		'./styles/**/*.css'
	],
	theme: {
		backgroundSize,
		colors,
		extend: {
			backgroundImage
		},
		fontFamily,
		fontSize,
		data
	},
	plugins: []
}
