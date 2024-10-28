
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const trashdev: CustomThemeConfig = {
    name: 'trashdev',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		"--theme-font-family-heading": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		"--theme-font-color-base": "var(--color-surface-500)",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "8px",
		"--theme-rounded-container": "8px",
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
		// primary | #5cd6ff 
		"--color-primary-50": "231 249 255", // #e7f9ff
		"--color-primary-100": "222 247 255", // #def7ff
		"--color-primary-200": "214 245 255", // #d6f5ff
		"--color-primary-300": "190 239 255", // #beefff
		"--color-primary-400": "141 226 255", // #8de2ff
		"--color-primary-500": "92 214 255", // #5cd6ff
		"--color-primary-600": "83 193 230", // #53c1e6
		"--color-primary-700": "69 161 191", // #45a1bf
		"--color-primary-800": "55 128 153", // #378099
		"--color-primary-900": "45 105 125", // #2d697d
		// secondary | #398efe 
		"--color-secondary-50": "225 238 255", // #e1eeff
		"--color-secondary-100": "215 232 255", // #d7e8ff
		"--color-secondary-200": "206 227 255", // #cee3ff
		"--color-secondary-300": "176 210 255", // #b0d2ff
		"--color-secondary-400": "116 176 254", // #74b0fe
		"--color-secondary-500": "57 142 254", // #398efe
		"--color-secondary-600": "51 128 229", // #3380e5
		"--color-secondary-700": "43 107 191", // #2b6bbf
		"--color-secondary-800": "34 85 152", // #225598
		"--color-secondary-900": "28 70 124", // #1c467c
		// tertiary | #4dff61 
		"--color-tertiary-50": "228 255 231", // #e4ffe7
		"--color-tertiary-100": "219 255 223", // #dbffdf
		"--color-tertiary-200": "211 255 216", // #d3ffd8
		"--color-tertiary-300": "184 255 192", // #b8ffc0
		"--color-tertiary-400": "130 255 144", // #82ff90
		"--color-tertiary-500": "77 255 97", // #4dff61
		"--color-tertiary-600": "69 230 87", // #45e657
		"--color-tertiary-700": "58 191 73", // #3abf49
		"--color-tertiary-800": "46 153 58", // #2e993a
		"--color-tertiary-900": "38 125 48", // #267d30
		// success | #c2e151 
		"--color-success-50": "246 251 229", // #f6fbe5
		"--color-success-100": "243 249 220", // #f3f9dc
		"--color-success-200": "240 248 212", // #f0f8d4
		"--color-success-300": "231 243 185", // #e7f3b9
		"--color-success-400": "212 234 133", // #d4ea85
		"--color-success-500": "194 225 81", // #c2e151
		"--color-success-600": "175 203 73", // #afcb49
		"--color-success-700": "146 169 61", // #92a93d
		"--color-success-800": "116 135 49", // #748731
		"--color-success-900": "95 110 40", // #5f6e28
		// warning | #feb058 
		"--color-warning-50": "255 243 230", // #fff3e6
		"--color-warning-100": "255 239 222", // #ffefde
		"--color-warning-200": "255 235 213", // #ffebd5
		"--color-warning-300": "255 223 188", // #ffdfbc
		"--color-warning-400": "254 200 138", // #fec88a
		"--color-warning-500": "254 176 88", // #feb058
		"--color-warning-600": "229 158 79", // #e59e4f
		"--color-warning-700": "191 132 66", // #bf8442
		"--color-warning-800": "152 106 53", // #986a35
		"--color-warning-900": "124 86 43", // #7c562b
		// error | #ff7aaf 
		"--color-error-50": "255 235 243", // #ffebf3
		"--color-error-100": "255 228 239", // #ffe4ef
		"--color-error-200": "255 222 235", // #ffdeeb
		"--color-error-300": "255 202 223", // #ffcadf
		"--color-error-400": "255 162 199", // #ffa2c7
		"--color-error-500": "255 122 175", // #ff7aaf
		"--color-error-600": "230 110 158", // #e66e9e
		"--color-error-700": "191 92 131", // #bf5c83
		"--color-error-800": "153 73 105", // #994969
		"--color-error-900": "125 60 86", // #7d3c56
		// surface | #383838 
		"--color-surface-50": "225 225 225", // #e1e1e1
		"--color-surface-100": "215 215 215", // #d7d7d7
		"--color-surface-200": "205 205 205", // #cdcdcd
		"--color-surface-300": "175 175 175", // #afafaf
		"--color-surface-400": "116 116 116", // #747474
		"--color-surface-500": "56 56 56", // #383838
		"--color-surface-600": "50 50 50", // #323232
		"--color-surface-700": "42 42 42", // #2a2a2a
		"--color-surface-800": "34 34 34", // #222222
		"--color-surface-900": "27 27 27", // #1b1b1b
		
	}
}

// import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

// export const trashdev: CustomThemeConfig = {
//     name: 'trashdev',
//     properties: {
// 		// =~= Theme Properties =~=
// 		"--theme-font-family-base": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
// 		"--theme-font-family-heading": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
// 		"--theme-font-color-base": "0 0 0",
// 		"--theme-font-color-dark": "var(--color-primary-200)",
// 		"--theme-rounded-base": "6px",
// 		"--theme-rounded-container": "6px",
// 		"--theme-border-base": "1px",
// 		// =~= Theme On-X Colors =~=
// 		"--on-primary": "0 0 0",
// 		"--on-secondary": "0 0 0",
// 		"--on-tertiary": "0 0 0",
// 		"--on-success": "0 0 0",
// 		"--on-warning": "0 0 0",
// 		"--on-error": "0 0 0",
// 		"--on-surface": "255 255 255",
// 		// =~= Theme Colors  =~=
// 		// primary | #66b5ff 
// 		"--color-primary-50": "232 244 255", // #e8f4ff
// 		"--color-primary-100": "224 240 255", // #e0f0ff
// 		"--color-primary-200": "217 237 255", // #d9edff
// 		"--color-primary-300": "194 225 255", // #c2e1ff
// 		"--color-primary-400": "148 203 255", // #94cbff
// 		"--color-primary-500": "102 181 255", // #66b5ff
// 		"--color-primary-600": "92 163 230", // #5ca3e6
// 		"--color-primary-700": "77 136 191", // #4d88bf
// 		"--color-primary-800": "61 109 153", // #3d6d99
// 		"--color-primary-900": "50 89 125", // #32597d
// 		// secondary | #6eff6b 
// 		"--color-secondary-50": "233 255 233", // #e9ffe9
// 		"--color-secondary-100": "226 255 225", // #e2ffe1
// 		"--color-secondary-200": "219 255 218", // #dbffda
// 		"--color-secondary-300": "197 255 196", // #c5ffc4
// 		"--color-secondary-400": "154 255 151", // #9aff97
// 		"--color-secondary-500": "110 255 107", // #6eff6b
// 		"--color-secondary-600": "99 230 96", // #63e660
// 		"--color-secondary-700": "83 191 80", // #53bf50
// 		"--color-secondary-800": "66 153 64", // #429940
// 		"--color-secondary-900": "54 125 52", // #367d34
// 		// tertiary | #ff94e8 
// 		"--color-tertiary-50": "255 239 252", // #ffeffc
// 		"--color-tertiary-100": "255 234 250", // #ffeafa
// 		"--color-tertiary-200": "255 228 249", // #ffe4f9
// 		"--color-tertiary-300": "255 212 246", // #ffd4f6
// 		"--color-tertiary-400": "255 180 239", // #ffb4ef
// 		"--color-tertiary-500": "255 148 232", // #ff94e8
// 		"--color-tertiary-600": "230 133 209", // #e685d1
// 		"--color-tertiary-700": "191 111 174", // #bf6fae
// 		"--color-tertiary-800": "153 89 139", // #99598b
// 		"--color-tertiary-900": "125 73 114", // #7d4972
// 		// success | #c3ff7a 
// 		"--color-success-50": "246 255 235", // #f6ffeb
// 		"--color-success-100": "243 255 228", // #f3ffe4
// 		"--color-success-200": "240 255 222", // #f0ffde
// 		"--color-success-300": "231 255 202", // #e7ffca
// 		"--color-success-400": "213 255 162", // #d5ffa2
// 		"--color-success-500": "195 255 122", // #c3ff7a
// 		"--color-success-600": "176 230 110", // #b0e66e
// 		"--color-success-700": "146 191 92", // #92bf5c
// 		"--color-success-800": "117 153 73", // #759949
// 		"--color-success-900": "96 125 60", // #607d3c
// 		// warning | #ffdf80 
// 		"--color-warning-50": "255 250 236", // #fffaec
// 		"--color-warning-100": "255 249 230", // #fff9e6
// 		"--color-warning-200": "255 247 223", // #fff7df
// 		"--color-warning-300": "255 242 204", // #fff2cc
// 		"--color-warning-400": "255 233 166", // #ffe9a6
// 		"--color-warning-500": "255 223 128", // #ffdf80
// 		"--color-warning-600": "230 201 115", // #e6c973
// 		"--color-warning-700": "191 167 96", // #bfa760
// 		"--color-warning-800": "153 134 77", // #99864d
// 		"--color-warning-900": "125 109 63", // #7d6d3f
// 		// error | #ff6666 
// 		"--color-error-50": "255 232 232", // #ffe8e8
// 		"--color-error-100": "255 224 224", // #ffe0e0
// 		"--color-error-200": "255 217 217", // #ffd9d9
// 		"--color-error-300": "255 194 194", // #ffc2c2
// 		"--color-error-400": "255 148 148", // #ff9494
// 		"--color-error-500": "255 102 102", // #ff6666
// 		"--color-error-600": "230 92 92", // #e65c5c
// 		"--color-error-700": "191 77 77", // #bf4d4d
// 		"--color-error-800": "153 61 61", // #993d3d
// 		"--color-error-900": "125 50 50", // #7d3232
// 		// surface | #1c2730 
// 		"--color-surface-50": "221 223 224", // #dddfe0
// 		"--color-surface-100": "210 212 214", // #d2d4d6
// 		"--color-surface-200": "198 201 203", // #c6c9cb
// 		"--color-surface-300": "164 169 172", // #a4a9ac
// 		"--color-surface-400": "96 104 110", // #60686e
// 		"--color-surface-500": "28 39 48", // #1c2730
// 		"--color-surface-600": "25 35 43", // #19232b
// 		"--color-surface-700": "21 29 36", // #151d24
// 		"--color-surface-800": "17 23 29", // #11171d
// 		"--color-surface-900": "14 19 24", // #0e1318
		
// 	}
// }

import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const trashdev: CustomThemeConfig = {
    name: 'trashdev',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		"--theme-font-family-heading": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		"--theme-font-color-base": "var(--color-surface-500)",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "8px",
		"--theme-rounded-container": "8px",
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
		// primary | #5cd6ff 
		"--color-primary-50": "231 249 255", // #e7f9ff
		"--color-primary-100": "222 247 255", // #def7ff
		"--color-primary-200": "214 245 255", // #d6f5ff
		"--color-primary-300": "190 239 255", // #beefff
		"--color-primary-400": "141 226 255", // #8de2ff
		"--color-primary-500": "92 214 255", // #5cd6ff
		"--color-primary-600": "83 193 230", // #53c1e6
		"--color-primary-700": "69 161 191", // #45a1bf
		"--color-primary-800": "55 128 153", // #378099
		"--color-primary-900": "45 105 125", // #2d697d
		// secondary | #398efe 
		"--color-secondary-50": "225 238 255", // #e1eeff
		"--color-secondary-100": "215 232 255", // #d7e8ff
		"--color-secondary-200": "206 227 255", // #cee3ff
		"--color-secondary-300": "176 210 255", // #b0d2ff
		"--color-secondary-400": "116 176 254", // #74b0fe
		"--color-secondary-500": "57 142 254", // #398efe
		"--color-secondary-600": "51 128 229", // #3380e5
		"--color-secondary-700": "43 107 191", // #2b6bbf
		"--color-secondary-800": "34 85 152", // #225598
		"--color-secondary-900": "28 70 124", // #1c467c
		// tertiary | #4dff61 
		"--color-tertiary-50": "228 255 231", // #e4ffe7
		"--color-tertiary-100": "219 255 223", // #dbffdf
		"--color-tertiary-200": "211 255 216", // #d3ffd8
		"--color-tertiary-300": "184 255 192", // #b8ffc0
		"--color-tertiary-400": "130 255 144", // #82ff90
		"--color-tertiary-500": "77 255 97", // #4dff61
		"--color-tertiary-600": "69 230 87", // #45e657
		"--color-tertiary-700": "58 191 73", // #3abf49
		"--color-tertiary-800": "46 153 58", // #2e993a
		"--color-tertiary-900": "38 125 48", // #267d30
		// success | #c2e151 
		"--color-success-50": "246 251 229", // #f6fbe5
		"--color-success-100": "243 249 220", // #f3f9dc
		"--color-success-200": "240 248 212", // #f0f8d4
		"--color-success-300": "231 243 185", // #e7f3b9
		"--color-success-400": "212 234 133", // #d4ea85
		"--color-success-500": "194 225 81", // #c2e151
		"--color-success-600": "175 203 73", // #afcb49
		"--color-success-700": "146 169 61", // #92a93d
		"--color-success-800": "116 135 49", // #748731
		"--color-success-900": "95 110 40", // #5f6e28
		// warning | #feb058 
		"--color-warning-50": "255 243 230", // #fff3e6
		"--color-warning-100": "255 239 222", // #ffefde
		"--color-warning-200": "255 235 213", // #ffebd5
		"--color-warning-300": "255 223 188", // #ffdfbc
		"--color-warning-400": "254 200 138", // #fec88a
		"--color-warning-500": "254 176 88", // #feb058
		"--color-warning-600": "229 158 79", // #e59e4f
		"--color-warning-700": "191 132 66", // #bf8442
		"--color-warning-800": "152 106 53", // #986a35
		"--color-warning-900": "124 86 43", // #7c562b
		// error | #ff7aaf 
		"--color-error-50": "255 235 243", // #ffebf3
		"--color-error-100": "255 228 239", // #ffe4ef
		"--color-error-200": "255 222 235", // #ffdeeb
		"--color-error-300": "255 202 223", // #ffcadf
		"--color-error-400": "255 162 199", // #ffa2c7
		"--color-error-500": "255 122 175", // #ff7aaf
		"--color-error-600": "230 110 158", // #e66e9e
		"--color-error-700": "191 92 131", // #bf5c83
		"--color-error-800": "153 73 105", // #994969
		"--color-error-900": "125 60 86", // #7d3c56
		// surface | #383838 
		"--color-surface-50": "225 225 225", // #e1e1e1
		"--color-surface-100": "215 215 215", // #d7d7d7
		"--color-surface-200": "205 205 205", // #cdcdcd
		"--color-surface-300": "175 175 175", // #afafaf
		"--color-surface-400": "116 116 116", // #747474
		"--color-surface-500": "56 56 56", // #383838
		"--color-surface-600": "50 50 50", // #323232
		"--color-surface-700": "42 42 42", // #2a2a2a
		"--color-surface-800": "34 34 34", // #222222
		"--color-surface-900": "27 27 27", // #1b1b1b
		
	}
}

