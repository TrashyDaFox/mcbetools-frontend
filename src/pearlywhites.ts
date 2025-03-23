
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const pearlywhites: CustomThemeConfig = {
    name: 'pearlywhites',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
		"--theme-font-family-heading": `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
		"--theme-font-color-base": "var(--color-surface-300)",
		"--theme-font-color-dark": "var(--color-primary-400)",
		"--theme-rounded-base": "4px",
		"--theme-rounded-container": "24px",
		"--theme-border-base": "6px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "0 0 0",
		"--on-secondary": "0 0 0",
		"--on-tertiary": "0 0 0",
		"--on-success": "0 0 0",
		"--on-warning": "0 0 0",
		"--on-error": "0 0 0",
		"--on-surface": "255 255 255",
		// =~= Theme Colors  =~=
		// primary | #EAEEE9 
		"--color-primary-50": "252 252 252", // #fcfcfc
		"--color-primary-100": "251 252 251", // #fbfcfb
		"--color-primary-200": "250 251 250", // #fafbfa
		"--color-primary-300": "247 248 246", // #f7f8f6
		"--color-primary-400": "240 243 240", // #f0f3f0
		"--color-primary-500": "234 238 233", // #EAEEE9
		"--color-primary-600": "211 214 210", // #d3d6d2
		"--color-primary-700": "176 179 175", // #b0b3af
		"--color-primary-800": "140 143 140", // #8c8f8c
		"--color-primary-900": "115 117 114", // #737572
		// secondary | #FAF0E6 
		"--color-secondary-50": "254 253 251", // #fefdfb
		"--color-secondary-100": "254 252 250", // #fefcfa
		"--color-secondary-200": "254 251 249", // #fefbf9
		"--color-secondary-300": "253 249 245", // #fdf9f5
		"--color-secondary-400": "252 245 238", // #fcf5ee
		"--color-secondary-500": "250 240 230", // #FAF0E6
		"--color-secondary-600": "225 216 207", // #e1d8cf
		"--color-secondary-700": "188 180 173", // #bcb4ad
		"--color-secondary-800": "150 144 138", // #96908a
		"--color-secondary-900": "123 118 113", // #7b7671
		// tertiary | #FAF0E6 
		"--color-tertiary-50": "254 253 251", // #fefdfb
		"--color-tertiary-100": "254 252 250", // #fefcfa
		"--color-tertiary-200": "254 251 249", // #fefbf9
		"--color-tertiary-300": "253 249 245", // #fdf9f5
		"--color-tertiary-400": "252 245 238", // #fcf5ee
		"--color-tertiary-500": "250 240 230", // #FAF0E6
		"--color-tertiary-600": "225 216 207", // #e1d8cf
		"--color-tertiary-700": "188 180 173", // #bcb4ad
		"--color-tertiary-800": "150 144 138", // #96908a
		"--color-tertiary-900": "123 118 113", // #7b7671
		// success | #FAF0E6 
		"--color-success-50": "254 253 251", // #fefdfb
		"--color-success-100": "254 252 250", // #fefcfa
		"--color-success-200": "254 251 249", // #fefbf9
		"--color-success-300": "253 249 245", // #fdf9f5
		"--color-success-400": "252 245 238", // #fcf5ee
		"--color-success-500": "250 240 230", // #FAF0E6
		"--color-success-600": "225 216 207", // #e1d8cf
		"--color-success-700": "188 180 173", // #bcb4ad
		"--color-success-800": "150 144 138", // #96908a
		"--color-success-900": "123 118 113", // #7b7671
		// warning | #FAF0E6 
		"--color-warning-50": "254 253 251", // #fefdfb
		"--color-warning-100": "254 252 250", // #fefcfa
		"--color-warning-200": "254 251 249", // #fefbf9
		"--color-warning-300": "253 249 245", // #fdf9f5
		"--color-warning-400": "252 245 238", // #fcf5ee
		"--color-warning-500": "250 240 230", // #FAF0E6
		"--color-warning-600": "225 216 207", // #e1d8cf
		"--color-warning-700": "188 180 173", // #bcb4ad
		"--color-warning-800": "150 144 138", // #96908a
		"--color-warning-900": "123 118 113", // #7b7671
		// error | #FAF0E6 
		"--color-error-50": "254 253 251", // #fefdfb
		"--color-error-100": "254 252 250", // #fefcfa
		"--color-error-200": "254 251 249", // #fefbf9
		"--color-error-300": "253 249 245", // #fdf9f5
		"--color-error-400": "252 245 238", // #fcf5ee
		"--color-error-500": "250 240 230", // #FAF0E6
		"--color-error-600": "225 216 207", // #e1d8cf
		"--color-error-700": "188 180 173", // #bcb4ad
		"--color-error-800": "150 144 138", // #96908a
		"--color-error-900": "123 118 113", // #7b7671
		// surface | #FFF5EE 
		"--color-surface-50": "255 254 252", // #fffefc
		"--color-surface-100": "255 253 252", // #fffdfc
		"--color-surface-200": "255 253 251", // #fffdfb
		"--color-surface-300": "255 251 248", // #fffbf8
		"--color-surface-400": "255 248 243", // #fff8f3
		"--color-surface-500": "255 245 238", // #FFF5EE
		"--color-surface-600": "230 221 214", // #e6ddd6
		"--color-surface-700": "191 184 179", // #bfb8b3
		"--color-surface-800": "153 147 143", // #99938f
		"--color-surface-900": "125 120 117", // #7d7875
		
	}
}