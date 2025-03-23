
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const ocean: CustomThemeConfig = {
    name: 'ocean',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		"--theme-font-family-heading": `system-ui`,
		"--theme-font-color-base": "var(--color-secondary-200)",
		"--theme-font-color-dark": "var(--color-secondary-200)",
		"--theme-rounded-base": "9999px",
		"--theme-rounded-container": "24px",
		"--theme-border-base": "0px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "0 0 0",
		"--on-secondary": "0 0 0",
		"--on-tertiary": "0 0 0",
		"--on-success": "0 0 0",
		"--on-warning": "0 0 0",
		"--on-error": "0 0 0",
		"--on-surface": "255 255 255",
		// =~= Theme Colors  =~=
		// primary | #259c94 
		"--color-primary-50": "222 240 239", // #def0ef
		"--color-primary-100": "211 235 234", // #d3ebea
		"--color-primary-200": "201 230 228", // #c9e6e4
		"--color-primary-300": "168 215 212", // #a8d7d4
		"--color-primary-400": "102 186 180", // #66bab4
		"--color-primary-500": "37 156 148", // #259c94
		"--color-primary-600": "33 140 133", // #218c85
		"--color-primary-700": "28 117 111", // #1c756f
		"--color-primary-800": "22 94 89", // #165e59
		"--color-primary-900": "18 76 73", // #124c49
		// secondary | #5CB3FF 
		"--color-secondary-50": "231 244 255", // #e7f4ff
		"--color-secondary-100": "222 240 255", // #def0ff
		"--color-secondary-200": "214 236 255", // #d6ecff
		"--color-secondary-300": "190 225 255", // #bee1ff
		"--color-secondary-400": "141 202 255", // #8dcaff
		"--color-secondary-500": "92 179 255", // #5CB3FF
		"--color-secondary-600": "83 161 230", // #53a1e6
		"--color-secondary-700": "69 134 191", // #4586bf
		"--color-secondary-800": "55 107 153", // #376b99
		"--color-secondary-900": "45 88 125", // #2d587d
		// tertiary | #5CB3FF 
		"--color-tertiary-50": "231 244 255", // #e7f4ff
		"--color-tertiary-100": "222 240 255", // #def0ff
		"--color-tertiary-200": "214 236 255", // #d6ecff
		"--color-tertiary-300": "190 225 255", // #bee1ff
		"--color-tertiary-400": "141 202 255", // #8dcaff
		"--color-tertiary-500": "92 179 255", // #5CB3FF
		"--color-tertiary-600": "83 161 230", // #53a1e6
		"--color-tertiary-700": "69 134 191", // #4586bf
		"--color-tertiary-800": "55 107 153", // #376b99
		"--color-tertiary-900": "45 88 125", // #2d587d
		// success | #5CB3FF 
		"--color-success-50": "231 244 255", // #e7f4ff
		"--color-success-100": "222 240 255", // #def0ff
		"--color-success-200": "214 236 255", // #d6ecff
		"--color-success-300": "190 225 255", // #bee1ff
		"--color-success-400": "141 202 255", // #8dcaff
		"--color-success-500": "92 179 255", // #5CB3FF
		"--color-success-600": "83 161 230", // #53a1e6
		"--color-success-700": "69 134 191", // #4586bf
		"--color-success-800": "55 107 153", // #376b99
		"--color-success-900": "45 88 125", // #2d587d
		// warning | #5CB3FF 
		"--color-warning-50": "231 244 255", // #e7f4ff
		"--color-warning-100": "222 240 255", // #def0ff
		"--color-warning-200": "214 236 255", // #d6ecff
		"--color-warning-300": "190 225 255", // #bee1ff
		"--color-warning-400": "141 202 255", // #8dcaff
		"--color-warning-500": "92 179 255", // #5CB3FF
		"--color-warning-600": "83 161 230", // #53a1e6
		"--color-warning-700": "69 134 191", // #4586bf
		"--color-warning-800": "55 107 153", // #376b99
		"--color-warning-900": "45 88 125", // #2d587d
		// error | #5CB3FF 
		"--color-error-50": "231 244 255", // #e7f4ff
		"--color-error-100": "222 240 255", // #def0ff
		"--color-error-200": "214 236 255", // #d6ecff
		"--color-error-300": "190 225 255", // #bee1ff
		"--color-error-400": "141 202 255", // #8dcaff
		"--color-error-500": "92 179 255", // #5CB3FF
		"--color-error-600": "83 161 230", // #53a1e6
		"--color-error-700": "69 134 191", // #4586bf
		"--color-error-800": "55 107 153", // #376b99
		"--color-error-900": "45 88 125", // #2d587d
		// surface | #70C7FF 
		"--color-surface-50": "234 247 255", // #eaf7ff
		"--color-surface-100": "226 244 255", // #e2f4ff
		"--color-surface-200": "219 241 255", // #dbf1ff
		"--color-surface-300": "198 233 255", // #c6e9ff
		"--color-surface-400": "155 216 255", // #9bd8ff
		"--color-surface-500": "112 199 255", // #70C7FF
		"--color-surface-600": "101 179 230", // #65b3e6
		"--color-surface-700": "84 149 191", // #5495bf
		"--color-surface-800": "67 119 153", // #437799
		"--color-surface-900": "55 98 125", // #37627d
		
	}
}