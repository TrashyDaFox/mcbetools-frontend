
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const blossom: CustomThemeConfig = {
    name: 'blossom',
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
		// primary | #F9B7FF 
		"--color-primary-50": "254 244 255", // #fef4ff
		"--color-primary-100": "254 241 255", // #fef1ff
		"--color-primary-200": "254 237 255", // #feedff
		"--color-primary-300": "253 226 255", // #fde2ff
		"--color-primary-400": "251 205 255", // #fbcdff
		"--color-primary-500": "249 183 255", // #F9B7FF
		"--color-primary-600": "224 165 230", // #e0a5e6
		"--color-primary-700": "187 137 191", // #bb89bf
		"--color-primary-800": "149 110 153", // #956e99
		"--color-primary-900": "122 90 125", // #7a5a7d
		// secondary | #F2A2E8 
		"--color-secondary-50": "253 241 252", // #fdf1fc
		"--color-secondary-100": "252 236 250", // #fcecfa
		"--color-secondary-200": "252 232 249", // #fce8f9
		"--color-secondary-300": "250 218 246", // #fadaf6
		"--color-secondary-400": "246 190 239", // #f6beef
		"--color-secondary-500": "242 162 232", // #F2A2E8
		"--color-secondary-600": "218 146 209", // #da92d1
		"--color-secondary-700": "182 122 174", // #b67aae
		"--color-secondary-800": "145 97 139", // #91618b
		"--color-secondary-900": "119 79 114", // #774f72
		// tertiary | #F2A2E8 
		"--color-tertiary-50": "253 241 252", // #fdf1fc
		"--color-tertiary-100": "252 236 250", // #fcecfa
		"--color-tertiary-200": "252 232 249", // #fce8f9
		"--color-tertiary-300": "250 218 246", // #fadaf6
		"--color-tertiary-400": "246 190 239", // #f6beef
		"--color-tertiary-500": "242 162 232", // #F2A2E8
		"--color-tertiary-600": "218 146 209", // #da92d1
		"--color-tertiary-700": "182 122 174", // #b67aae
		"--color-tertiary-800": "145 97 139", // #91618b
		"--color-tertiary-900": "119 79 114", // #774f72
		// success | #F2A2E8 
		"--color-success-50": "253 241 252", // #fdf1fc
		"--color-success-100": "252 236 250", // #fcecfa
		"--color-success-200": "252 232 249", // #fce8f9
		"--color-success-300": "250 218 246", // #fadaf6
		"--color-success-400": "246 190 239", // #f6beef
		"--color-success-500": "242 162 232", // #F2A2E8
		"--color-success-600": "218 146 209", // #da92d1
		"--color-success-700": "182 122 174", // #b67aae
		"--color-success-800": "145 97 139", // #91618b
		"--color-success-900": "119 79 114", // #774f72
		// warning | #F2A2E8 
		"--color-warning-50": "253 241 252", // #fdf1fc
		"--color-warning-100": "252 236 250", // #fcecfa
		"--color-warning-200": "252 232 249", // #fce8f9
		"--color-warning-300": "250 218 246", // #fadaf6
		"--color-warning-400": "246 190 239", // #f6beef
		"--color-warning-500": "242 162 232", // #F2A2E8
		"--color-warning-600": "218 146 209", // #da92d1
		"--color-warning-700": "182 122 174", // #b67aae
		"--color-warning-800": "145 97 139", // #91618b
		"--color-warning-900": "119 79 114", // #774f72
		// error | #F2A2E8 
		"--color-error-50": "253 241 252", // #fdf1fc
		"--color-error-100": "252 236 250", // #fcecfa
		"--color-error-200": "252 232 249", // #fce8f9
		"--color-error-300": "250 218 246", // #fadaf6
		"--color-error-400": "246 190 239", // #f6beef
		"--color-error-500": "242 162 232", // #F2A2E8
		"--color-error-600": "218 146 209", // #da92d1
		"--color-error-700": "182 122 174", // #b67aae
		"--color-error-800": "145 97 139", // #91618b
		"--color-error-900": "119 79 114", // #774f72
		// surface | #E0B0FF 
		"--color-surface-50": "250 243 255", // #faf3ff
		"--color-surface-100": "249 239 255", // #f9efff
		"--color-surface-200": "247 235 255", // #f7ebff
		"--color-surface-300": "243 223 255", // #f3dfff
		"--color-surface-400": "233 200 255", // #e9c8ff
		"--color-surface-500": "224 176 255", // #E0B0FF
		"--color-surface-600": "202 158 230", // #ca9ee6
		"--color-surface-700": "168 132 191", // #a884bf
		"--color-surface-800": "134 106 153", // #866a99
		"--color-surface-900": "110 86 125", // #6e567d
		
	}
}