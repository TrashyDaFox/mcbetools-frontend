
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const kawaii: CustomThemeConfig = {
    name: 'kawaii',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
		"--theme-font-family-heading": `ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif`,
		"--theme-font-color-base": "var(--color-primary-50)",
		"--theme-font-color-dark": "var(--color-primary-200)",
		"--theme-rounded-base": "16px",
		"--theme-rounded-container": "4px",
		"--theme-border-base": "8px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "255 255 255",
		"--on-secondary": "0 0 0",
		"--on-tertiary": "0 0 0",
		"--on-success": "0 0 0",
		"--on-warning": "255 255 255",
		"--on-error": "0 0 0",
		"--on-surface": "255 255 255",
		// =~= Theme Colors  =~=
		// primary | #C3799B 
		"--color-primary-50": "246 235 240", // #f6ebf0
		"--color-primary-100": "243 228 235", // #f3e4eb
		"--color-primary-200": "240 222 230", // #f0dee6
		"--color-primary-300": "231 201 215", // #e7c9d7
		"--color-primary-400": "213 161 185", // #d5a1b9
		"--color-primary-500": "195 121 155", // #C3799B
		"--color-primary-600": "176 109 140", // #b06d8c
		"--color-primary-700": "146 91 116", // #925b74
		"--color-primary-800": "117 73 93", // #75495d
		"--color-primary-900": "96 59 76", // #603b4c
		// secondary | #D16587 
		"--color-secondary-50": "248 232 237", // #f8e8ed
		"--color-secondary-100": "246 224 231", // #f6e0e7
		"--color-secondary-200": "244 217 225", // #f4d9e1
		"--color-secondary-300": "237 193 207", // #edc1cf
		"--color-secondary-400": "223 147 171", // #df93ab
		"--color-secondary-500": "209 101 135", // #D16587
		"--color-secondary-600": "188 91 122", // #bc5b7a
		"--color-secondary-700": "157 76 101", // #9d4c65
		"--color-secondary-800": "125 61 81", // #7d3d51
		"--color-secondary-900": "102 49 66", // #663142
		// tertiary | #D16587 
		"--color-tertiary-50": "248 232 237", // #f8e8ed
		"--color-tertiary-100": "246 224 231", // #f6e0e7
		"--color-tertiary-200": "244 217 225", // #f4d9e1
		"--color-tertiary-300": "237 193 207", // #edc1cf
		"--color-tertiary-400": "223 147 171", // #df93ab
		"--color-tertiary-500": "209 101 135", // #D16587
		"--color-tertiary-600": "188 91 122", // #bc5b7a
		"--color-tertiary-700": "157 76 101", // #9d4c65
		"--color-tertiary-800": "125 61 81", // #7d3d51
		"--color-tertiary-900": "102 49 66", // #663142
		// success | #D16587 
		"--color-success-50": "248 232 237", // #f8e8ed
		"--color-success-100": "246 224 231", // #f6e0e7
		"--color-success-200": "244 217 225", // #f4d9e1
		"--color-success-300": "237 193 207", // #edc1cf
		"--color-success-400": "223 147 171", // #df93ab
		"--color-success-500": "209 101 135", // #D16587
		"--color-success-600": "188 91 122", // #bc5b7a
		"--color-success-700": "157 76 101", // #9d4c65
		"--color-success-800": "125 61 81", // #7d3d51
		"--color-success-900": "102 49 66", // #663142
		// warning | #D16587 
		"--color-warning-50": "248 232 237", // #f8e8ed
		"--color-warning-100": "246 224 231", // #f6e0e7
		"--color-warning-200": "244 217 225", // #f4d9e1
		"--color-warning-300": "237 193 207", // #edc1cf
		"--color-warning-400": "223 147 171", // #df93ab
		"--color-warning-500": "209 101 135", // #D16587
		"--color-warning-600": "188 91 122", // #bc5b7a
		"--color-warning-700": "157 76 101", // #9d4c65
		"--color-warning-800": "125 61 81", // #7d3d51
		"--color-warning-900": "102 49 66", // #663142
		// error | #D16587 
		"--color-error-50": "248 232 237", // #f8e8ed
		"--color-error-100": "246 224 231", // #f6e0e7
		"--color-error-200": "244 217 225", // #f4d9e1
		"--color-error-300": "237 193 207", // #edc1cf
		"--color-error-400": "223 147 171", // #df93ab
		"--color-error-500": "209 101 135", // #D16587
		"--color-error-600": "188 91 122", // #bc5b7a
		"--color-error-700": "157 76 101", // #9d4c65
		"--color-error-800": "125 61 81", // #7d3d51
		"--color-error-900": "102 49 66", // #663142
		// surface | #D16587 
		"--color-surface-50": "248 232 237", // #f8e8ed
		"--color-surface-100": "246 224 231", // #f6e0e7
		"--color-surface-200": "244 217 225", // #f4d9e1
		"--color-surface-300": "237 193 207", // #edc1cf
		"--color-surface-400": "223 147 171", // #df93ab
		"--color-surface-500": "209 101 135", // #D16587
		"--color-surface-600": "188 91 122", // #bc5b7a
		"--color-surface-700": "157 76 101", // #9d4c65
		"--color-surface-800": "125 61 81", // #7d3d51
		"--color-surface-900": "102 49 66", // #663142
		
	}
}