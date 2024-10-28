import { join } from 'path'
import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { trashdev } from './src/trashdev'
import { winter } from './src/winter'
import { fall } from './src/fall'
import { catpuccin } from './src/catpuccin'
import { candy } from './src/candy'
import { doors } from './src/doors'
import { nord } from './src/nord'
import { obsidian } from './src/obsidian'
import { prismdark } from './src/prismdark'

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
	theme: {
		extend: {},
	},
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				custom: [
					trashdev,
					winter,
					fall,
					catpuccin,
					candy,
					doors,
					nord,
					obsidian,
					prismdark
				],
			},
		}),
	],
} satisfies Config;
