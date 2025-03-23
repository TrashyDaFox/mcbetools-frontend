
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const halloween: CustomThemeConfig = {
    name: 'halloween',
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
		"--on-primary": "0 0 0",
		"--on-secondary": "0 0 0",
		"--on-tertiary": "0 0 0",
		"--on-success": "0 0 0",
		"--on-warning": "0 0 0",
		"--on-error": "255 255 255",
		"--on-surface": "255 255 255",
		// =~= Theme Colors  =~=
		// primary | #fc7b2c 
		"--color-primary-50": "255 235 223", // #ffebdf
		"--color-primary-100": "254 229 213", // #fee5d5
		"--color-primary-200": "254 222 202", // #fedeca
		"--color-primary-300": "254 202 171", // #fecaab
		"--color-primary-400": "253 163 107", // #fda36b
		"--color-primary-500": "252 123 44", // #fc7b2c
		"--color-primary-600": "227 111 40", // #e36f28
		"--color-primary-700": "189 92 33", // #bd5c21
		"--color-primary-800": "151 74 26", // #974a1a
		"--color-primary-900": "123 60 22", // #7b3c16
		// secondary | #e8224f 
		"--color-secondary-50": "252 222 229", // #fcdee5
		"--color-secondary-100": "250 211 220", // #fad3dc
		"--color-secondary-200": "249 200 211", // #f9c8d3
		"--color-secondary-300": "246 167 185", // #f6a7b9
		"--color-secondary-400": "239 100 132", // #ef6484
		"--color-secondary-500": "232 34 79", // #e8224f
		"--color-secondary-600": "209 31 71", // #d11f47
		"--color-secondary-700": "174 26 59", // #ae1a3b
		"--color-secondary-800": "139 20 47", // #8b142f
		"--color-secondary-900": "114 17 39", // #721127
		// tertiary | #dfcf26 
		"--color-tertiary-50": "250 248 222", // #faf8de
		"--color-tertiary-100": "249 245 212", // #f9f5d4
		"--color-tertiary-200": "247 243 201", // #f7f3c9
		"--color-tertiary-300": "242 236 168", // #f2eca8
		"--color-tertiary-400": "233 221 103", // #e9dd67
		"--color-tertiary-500": "223 207 38", // #dfcf26
		"--color-tertiary-600": "201 186 34", // #c9ba22
		"--color-tertiary-700": "167 155 29", // #a79b1d
		"--color-tertiary-800": "134 124 23", // #867c17
		"--color-tertiary-900": "109 101 19", // #6d6513
		// success | #d02cca 
		"--color-success-50": "248 223 247", // #f8dff7
		"--color-success-100": "246 213 244", // #f6d5f4
		"--color-success-200": "243 202 242", // #f3caf2
		"--color-success-300": "236 171 234", // #ecabea
		"--color-success-400": "222 107 218", // #de6bda
		"--color-success-500": "208 44 202", // #d02cca
		"--color-success-600": "187 40 182", // #bb28b6
		"--color-success-700": "156 33 152", // #9c2198
		"--color-success-800": "125 26 121", // #7d1a79
		"--color-success-900": "102 22 99", // #661663
		// warning | #12d6a2 
		"--color-warning-50": "219 249 241", // #dbf9f1
		"--color-warning-100": "208 247 236", // #d0f7ec
		"--color-warning-200": "196 245 232", // #c4f5e8
		"--color-warning-300": "160 239 218", // #a0efda
		"--color-warning-400": "89 226 190", // #59e2be
		"--color-warning-500": "18 214 162", // #12d6a2
		"--color-warning-600": "16 193 146", // #10c192
		"--color-warning-700": "14 161 122", // #0ea17a
		"--color-warning-800": "11 128 97", // #0b8061
		"--color-warning-900": "9 105 79", // #09694f
		// error | #6e1e10 
		"--color-error-50": "233 221 219", // #e9dddb
		"--color-error-100": "226 210 207", // #e2d2cf
		"--color-error-200": "219 199 195", // #dbc7c3
		"--color-error-300": "197 165 159", // #c5a59f
		"--color-error-400": "154 98 88", // #9a6258
		"--color-error-500": "110 30 16", // #6e1e10
		"--color-error-600": "99 27 14", // #631b0e
		"--color-error-700": "83 23 12", // #53170c
		"--color-error-800": "66 18 10", // #42120a
		"--color-error-900": "54 15 8", // #360f08
		// surface | #524558 
		"--color-surface-50": "229 227 230", // #e5e3e6
		"--color-surface-100": "220 218 222", // #dcdade
		"--color-surface-200": "212 209 213", // #d4d1d5
		"--color-surface-300": "186 181 188", // #bab5bc
		"--color-surface-400": "134 125 138", // #867d8a
		"--color-surface-500": "82 69 88", // #524558
		"--color-surface-600": "74 62 79", // #4a3e4f
		"--color-surface-700": "62 52 66", // #3e3442
		"--color-surface-800": "49 41 53", // #312935
		"--color-surface-900": "40 34 43", // #28222b
		
	}
}