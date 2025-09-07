import { join } from 'path'
import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { trashdev } from './src/trashdev'
import { winter } from './src/winter'
import { fall } from './src/fall'
import { lunr } from './src/lunr'
import { catpuccin } from './src/catpuccin'
import { candy } from './src/candy'
import { doors } from './src/doors'
import { nord } from './src/nord'
import { obsidian } from './src/obsidian'
import { prismdark } from './src/prismdark'
import { cherry } from './src/cherry'
import { trashdevlight } from './src/trashdevlight'
import { trashdevNew } from './src/trashdevnew'
import { caves } from './src/caves'
import { kawaii } from './src/kawaii'
import { pearlywhites } from './src/pearlywhites'
import { blossom } from './src/blossom'
import { ocean } from './src/ocean'
import { halloween } from './src/halloween'
import { pinkcloud } from './src/pinkcloud'
import { trashdev2025 } from './src/meowmrrp'
function createColorVars(name) {
	return {
	  50: `rgb(var(--color-${name}-50) / <alpha-value>)`,
	  100: `rgb(var(--color-${name}-100) / <alpha-value>)`,
	  200: `rgb(var(--color-${name}-200) / <alpha-value>)`,
	  300: `rgb(var(--color-${name}-300) / <alpha-value>)`,
	  400: `rgb(var(--color-${name}-400) / <alpha-value>)`,
	  500: `rgb(var(--color-${name}-500) / <alpha-value>)`,
	  600: `rgb(var(--color-${name}-600) / <alpha-value>)`,
	  700: `rgb(var(--color-${name}-700) / <alpha-value>)`,
	  800: `rgb(var(--color-${name}-800) / <alpha-value>)`,
	  900: `rgb(var(--color-${name}-900) / <alpha-value>)`,
	};
  }
export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
	theme: {
		extend: {
				colors: {
				  quaternary: {
					50: "rgb(var(--color-quaternary-50) / <alpha-value>)",
					100: "rgb(var(--color-quaternary-100) / <alpha-value>)",
					200: "rgb(var(--color-quaternary-200) / <alpha-value>)",
					300: "rgb(var(--color-quaternary-300) / <alpha-value>)",
					400: "rgb(var(--color-quaternary-400) / <alpha-value>)",
					500: "rgb(var(--color-quaternary-500) / <alpha-value>)",
					600: "rgb(var(--color-quaternary-600) / <alpha-value>)",
					700: "rgb(var(--color-quaternary-700) / <alpha-value>)",
					800: "rgb(var(--color-quaternary-800) / <alpha-value>)",
					900: "rgb(var(--color-quaternary-900) / <alpha-value>)",
				  },
				  quinary: {
					50: "rgb(var(--color-quinary-50) / <alpha-value>)",
					100: "rgb(var(--color-quinary-100) / <alpha-value>)",
					200: "rgb(var(--color-quinary-200) / <alpha-value>)",
					300: "rgb(var(--color-quinary-300) / <alpha-value>)",
					400: "rgb(var(--color-quinary-400) / <alpha-value>)",
					500: "rgb(var(--color-quinary-500) / <alpha-value>)",
					600: "rgb(var(--color-quinary-600) / <alpha-value>)",
					700: "rgb(var(--color-quinary-700) / <alpha-value>)",
					800: "rgb(var(--color-quinary-800) / <alpha-value>)",
					900: "rgb(var(--color-quinary-900) / <alpha-value>)",
				  },
				  senary: {
					50: "rgb(var(--color-senary-50) / <alpha-value>)",
					100: "rgb(var(--color-senary-100) / <alpha-value>)",
					200: "rgb(var(--color-senary-200) / <alpha-value>)",
					300: "rgb(var(--color-senary-300) / <alpha-value>)",
					400: "rgb(var(--color-senary-400) / <alpha-value>)",
					500: "rgb(var(--color-senary-500) / <alpha-value>)",
					600: "rgb(var(--color-senary-600) / <alpha-value>)",
					700: "rgb(var(--color-senary-700) / <alpha-value>)",
					800: "rgb(var(--color-senary-800) / <alpha-value>)",
					900: "rgb(var(--color-senary-900) / <alpha-value>)",
				  },
				  septenary: createColorVars('septenary'),
				  octonary: createColorVars('octonary'),
				  nonary: createColorVars('nonary'),
				},
		},
	},
	safelist: [
		{
		  pattern: /grid-cols-(1|2|3|4|5|6|7|8|9|10|11|12)/,
		},
		{
			pattern: /bg-opacity-70/
		},
		{
			pattern: /variant-soft-nonary/
		},
		'variant-soft-quinary',
		'variant-soft-nonary',
		'variant-soft-senary',
		'variant-soft-surface'
	],
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				preset: [{"name":"wintry", "enhancements": true}, {"name":"skeleton", "enhancements":true}],
				custom: [
					trashdev,
					pinkcloud,
					winter,
					fall,
					catpuccin,
					candy,
					doors,
					nord,
					lunr,
					obsidian,
					prismdark,
					cherry,
					trashdevNew,
					trashdevlight,
					caves,
					kawaii,
					pearlywhites,
					blossom,
					ocean,
					halloween,
					trashdev2025
				],
			},
		}),
	],
} satisfies Config;
