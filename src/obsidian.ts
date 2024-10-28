
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const obsidian: CustomThemeConfig = {
    name: 'obsidian',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `system-ui`,
		"--theme-font-family-heading": `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "12px",
		"--theme-rounded-container": "12px",
		"--theme-border-base": "1px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "255 255 255",
		"--on-secondary": "0 0 0",
		"--on-tertiary": "0 0 0",
		"--on-success": "0 0 0",
		"--on-warning": "0 0 0",
		"--on-error": "0 0 0",
		"--on-surface": "255 255 255",
		// =~= Theme Colors  =~=
		// primary | #6f47ff 
		"--color-primary-50": "233 227 255", // #e9e3ff
		"--color-primary-100": "226 218 255", // #e2daff
		"--color-primary-200": "219 209 255", // #dbd1ff
		"--color-primary-300": "197 181 255", // #c5b5ff
		"--color-primary-400": "154 126 255", // #9a7eff
		"--color-primary-500": "111 71 255", // #6f47ff
		"--color-primary-600": "100 64 230", // #6440e6
		"--color-primary-700": "83 53 191", // #5335bf
		"--color-primary-800": "67 43 153", // #432b99
		"--color-primary-900": "54 35 125", // #36237d
		// secondary | #e232dc 
		"--color-secondary-50": "251 224 250", // #fbe0fa
		"--color-secondary-100": "249 214 248", // #f9d6f8
		"--color-secondary-200": "248 204 246", // #f8ccf6
		"--color-secondary-300": "243 173 241", // #f3adf1
		"--color-secondary-400": "235 112 231", // #eb70e7
		"--color-secondary-500": "226 50 220", // #e232dc
		"--color-secondary-600": "203 45 198", // #cb2dc6
		"--color-secondary-700": "170 38 165", // #aa26a5
		"--color-secondary-800": "136 30 132", // #881e84
		"--color-secondary-900": "111 25 108", // #6f196c
		// tertiary | #ff4284 
		"--color-tertiary-50": "255 227 237", // #ffe3ed
		"--color-tertiary-100": "255 217 230", // #ffd9e6
		"--color-tertiary-200": "255 208 224", // #ffd0e0
		"--color-tertiary-300": "255 179 206", // #ffb3ce
		"--color-tertiary-400": "255 123 169", // #ff7ba9
		"--color-tertiary-500": "255 66 132", // #ff4284
		"--color-tertiary-600": "230 59 119", // #e63b77
		"--color-tertiary-700": "191 50 99", // #bf3263
		"--color-tertiary-800": "153 40 79", // #99284f
		"--color-tertiary-900": "125 32 65", // #7d2041
		// success | #00ff1e 
		"--color-success-50": "217 255 221", // #d9ffdd
		"--color-success-100": "204 255 210", // #ccffd2
		"--color-success-200": "191 255 199", // #bfffc7
		"--color-success-300": "153 255 165", // #99ffa5
		"--color-success-400": "77 255 98", // #4dff62
		"--color-success-500": "0 255 30", // #00ff1e
		"--color-success-600": "0 230 27", // #00e61b
		"--color-success-700": "0 191 23", // #00bf17
		"--color-success-800": "0 153 18", // #009912
		"--color-success-900": "0 125 15", // #007d0f
		// warning | #ffaa00 
		"--color-warning-50": "255 242 217", // #fff2d9
		"--color-warning-100": "255 238 204", // #ffeecc
		"--color-warning-200": "255 234 191", // #ffeabf
		"--color-warning-300": "255 221 153", // #ffdd99
		"--color-warning-400": "255 196 77", // #ffc44d
		"--color-warning-500": "255 170 0", // #ffaa00
		"--color-warning-600": "230 153 0", // #e69900
		"--color-warning-700": "191 128 0", // #bf8000
		"--color-warning-800": "153 102 0", // #996600
		"--color-warning-900": "125 83 0", // #7d5300
		// error | #ea1f33 
		"--color-error-50": "252 221 224", // #fcdde0
		"--color-error-100": "251 210 214", // #fbd2d6
		"--color-error-200": "250 199 204", // #fac7cc
		"--color-error-300": "247 165 173", // #f7a5ad
		"--color-error-400": "240 98 112", // #f06270
		"--color-error-500": "234 31 51", // #ea1f33
		"--color-error-600": "211 28 46", // #d31c2e
		"--color-error-700": "176 23 38", // #b01726
		"--color-error-800": "140 19 31", // #8c131f
		"--color-error-900": "115 15 25", // #730f19
		// surface | #1f1f1f 
		"--color-surface-50": "221 221 221", // #dddddd
		"--color-surface-100": "210 210 210", // #d2d2d2
		"--color-surface-200": "199 199 199", // #c7c7c7
		"--color-surface-300": "165 165 165", // #a5a5a5
		"--color-surface-400": "98 98 98", // #626262
		"--color-surface-500": "31 31 31", // #1f1f1f
		"--color-surface-600": "28 28 28", // #1c1c1c
		"--color-surface-700": "23 23 23", // #171717
		"--color-surface-800": "19 19 19", // #131313
		"--color-surface-900": "15 15 15", // #0f0f0f
		
	}
}