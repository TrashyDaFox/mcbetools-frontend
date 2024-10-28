import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const winter: CustomThemeConfig = {
    name: 'winter',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		"--theme-font-family-heading": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "var(--color-primary-200)",
		"--theme-rounded-base": "6px",
		"--theme-rounded-container": "6px",
		"--theme-border-base": "1px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "0 0 0",
		"--on-secondary": "0 0 0",
		"--on-tertiary": "0 0 0",
		"--on-success": "0 0 0",
		"--on-warning": "0 0 0",
		"--on-error": "0 0 0",
		"--on-surface": "255 255 255",
		// =~= Theme Colors  =~=
		// primary | #66b5ff 
		"--color-primary-50": "232 244 255", // #e8f4ff
		"--color-primary-100": "224 240 255", // #e0f0ff
		"--color-primary-200": "217 237 255", // #d9edff
		"--color-primary-300": "194 225 255", // #c2e1ff
		"--color-primary-400": "148 203 255", // #94cbff
		"--color-primary-500": "102 181 255", // #66b5ff
		"--color-primary-600": "92 163 230", // #5ca3e6
		"--color-primary-700": "77 136 191", // #4d88bf
		"--color-primary-800": "61 109 153", // #3d6d99
		"--color-primary-900": "50 89 125", // #32597d
		// secondary | #6eff6b 
		"--color-secondary-50": "233 255 233", // #e9ffe9
		"--color-secondary-100": "226 255 225", // #e2ffe1
		"--color-secondary-200": "219 255 218", // #dbffda
		"--color-secondary-300": "197 255 196", // #c5ffc4
		"--color-secondary-400": "154 255 151", // #9aff97
		"--color-secondary-500": "110 255 107", // #6eff6b
		"--color-secondary-600": "99 230 96", // #63e660
		"--color-secondary-700": "83 191 80", // #53bf50
		"--color-secondary-800": "66 153 64", // #429940
		"--color-secondary-900": "54 125 52", // #367d34
		// tertiary | #ff94e8 
		"--color-tertiary-50": "255 239 252", // #ffeffc
		"--color-tertiary-100": "255 234 250", // #ffeafa
		"--color-tertiary-200": "255 228 249", // #ffe4f9
		"--color-tertiary-300": "255 212 246", // #ffd4f6
		"--color-tertiary-400": "255 180 239", // #ffb4ef
		"--color-tertiary-500": "255 148 232", // #ff94e8
		"--color-tertiary-600": "230 133 209", // #e685d1
		"--color-tertiary-700": "191 111 174", // #bf6fae
		"--color-tertiary-800": "153 89 139", // #99598b
		"--color-tertiary-900": "125 73 114", // #7d4972
		// success | #c3ff7a 
		"--color-success-50": "246 255 235", // #f6ffeb
		"--color-success-100": "243 255 228", // #f3ffe4
		"--color-success-200": "240 255 222", // #f0ffde
		"--color-success-300": "231 255 202", // #e7ffca
		"--color-success-400": "213 255 162", // #d5ffa2
		"--color-success-500": "195 255 122", // #c3ff7a
		"--color-success-600": "176 230 110", // #b0e66e
		"--color-success-700": "146 191 92", // #92bf5c
		"--color-success-800": "117 153 73", // #759949
		"--color-success-900": "96 125 60", // #607d3c
		// warning | #ffdf80 
		"--color-warning-50": "255 250 236", // #fffaec
		"--color-warning-100": "255 249 230", // #fff9e6
		"--color-warning-200": "255 247 223", // #fff7df
		"--color-warning-300": "255 242 204", // #fff2cc
		"--color-warning-400": "255 233 166", // #ffe9a6
		"--color-warning-500": "255 223 128", // #ffdf80
		"--color-warning-600": "230 201 115", // #e6c973
		"--color-warning-700": "191 167 96", // #bfa760
		"--color-warning-800": "153 134 77", // #99864d
		"--color-warning-900": "125 109 63", // #7d6d3f
		// error | #ff6666 
		"--color-error-50": "255 232 232", // #ffe8e8
		"--color-error-100": "255 224 224", // #ffe0e0
		"--color-error-200": "255 217 217", // #ffd9d9
		"--color-error-300": "255 194 194", // #ffc2c2
		"--color-error-400": "255 148 148", // #ff9494
		"--color-error-500": "255 102 102", // #ff6666
		"--color-error-600": "230 92 92", // #e65c5c
		"--color-error-700": "191 77 77", // #bf4d4d
		"--color-error-800": "153 61 61", // #993d3d
		"--color-error-900": "125 50 50", // #7d3232
		// surface | #1c2730 
		"--color-surface-50": "221 223 224", // #dddfe0
		"--color-surface-100": "210 212 214", // #d2d4d6
		"--color-surface-200": "198 201 203", // #c6c9cb
		"--color-surface-300": "164 169 172", // #a4a9ac
		"--color-surface-400": "96 104 110", // #60686e
		"--color-surface-500": "28 39 48", // #1c2730
		"--color-surface-600": "25 35 43", // #19232b
		"--color-surface-700": "21 29 36", // #151d24
		"--color-surface-800": "17 23 29", // #11171d
		"--color-surface-900": "14 19 24", // #0e1318
		
	}
}