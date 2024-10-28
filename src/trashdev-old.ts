
// import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

// export const trashdev: CustomThemeConfig = {
//     name: 'trashdev',
//     properties: {
// 		// =~= Theme Properties =~=
// 		"--theme-font-family-base": `system-ui`,
// 		"--theme-font-family-heading": `system-ui`,
// 		"--theme-font-color-base": "0 0 0",
// 		"--theme-font-color-dark": "255 255 255",
// 		"--theme-rounded-base": "8px",
// 		"--theme-rounded-container": "8px",
// 		"--theme-border-base": "1px",
// 		// =~= Theme On-X Colors =~=
// 		"--on-primary": "0 0 0",
// 		"--on-secondary": "0 0 0",
// 		"--on-tertiary": "0 0 0",
// 		"--on-success": "0 0 0",
// 		"--on-warning": "0 0 0",
// 		"--on-error": "255 255 255",
// 		"--on-surface": "255 255 255",
// 		// =~= Theme Colors  =~=
// 		// primary | #34fea0 
// 		"--color-primary-50": "225 255 241", // #e1fff1
// 		"--color-primary-100": "214 255 236", // #d6ffec
// 		"--color-primary-200": "204 255 231", // #ccffe7
// 		"--color-primary-300": "174 255 217", // #aeffd9
// 		"--color-primary-400": "113 254 189", // #71febd
// 		"--color-primary-500": "52 254 160", // #34fea0
// 		"--color-primary-600": "47 229 144", // #2fe590
// 		"--color-primary-700": "39 191 120", // #27bf78
// 		"--color-primary-800": "31 152 96", // #1f9860
// 		"--color-primary-900": "25 124 78", // #197c4e
// 		// secondary | #726bff 
// 		"--color-secondary-50": "234 233 255", // #eae9ff
// 		"--color-secondary-100": "227 225 255", // #e3e1ff
// 		"--color-secondary-200": "220 218 255", // #dcdaff
// 		"--color-secondary-300": "199 196 255", // #c7c4ff
// 		"--color-secondary-400": "156 151 255", // #9c97ff
// 		"--color-secondary-500": "114 107 255", // #726bff
// 		"--color-secondary-600": "103 96 230", // #6760e6
// 		"--color-secondary-700": "86 80 191", // #5650bf
// 		"--color-secondary-800": "68 64 153", // #444099
// 		"--color-secondary-900": "56 52 125", // #38347d
// 		// tertiary | #ff5ca3 
// 		"--color-tertiary-50": "255 231 241", // #ffe7f1
// 		"--color-tertiary-100": "255 222 237", // #ffdeed
// 		"--color-tertiary-200": "255 214 232", // #ffd6e8
// 		"--color-tertiary-300": "255 190 218", // #ffbeda
// 		"--color-tertiary-400": "255 141 191", // #ff8dbf
// 		"--color-tertiary-500": "255 92 163", // #ff5ca3
// 		"--color-tertiary-600": "230 83 147", // #e65393
// 		"--color-tertiary-700": "191 69 122", // #bf457a
// 		"--color-tertiary-800": "153 55 98", // #993762
// 		"--color-tertiary-900": "125 45 80", // #7d2d50
// 		// success | #beff5c 
// 		"--color-success-50": "245 255 231", // #f5ffe7
// 		"--color-success-100": "242 255 222", // #f2ffde
// 		"--color-success-200": "239 255 214", // #efffd6
// 		"--color-success-300": "229 255 190", // #e5ffbe
// 		"--color-success-400": "210 255 141", // #d2ff8d
// 		"--color-success-500": "190 255 92", // #beff5c
// 		"--color-success-600": "171 230 83", // #abe653
// 		"--color-success-700": "143 191 69", // #8fbf45
// 		"--color-success-800": "114 153 55", // #729937
// 		"--color-success-900": "93 125 45", // #5d7d2d
// 		// warning | #fed762 
// 		"--color-warning-50": "255 249 231", // #fff9e7
// 		"--color-warning-100": "255 247 224", // #fff7e0
// 		"--color-warning-200": "255 245 216", // #fff5d8
// 		"--color-warning-300": "255 239 192", // #ffefc0
// 		"--color-warning-400": "254 227 145", // #fee391
// 		"--color-warning-500": "254 215 98", // #fed762
// 		"--color-warning-600": "229 194 88", // #e5c258
// 		"--color-warning-700": "191 161 74", // #bfa14a
// 		"--color-warning-800": "152 129 59", // #98813b
// 		"--color-warning-900": "124 105 48", // #7c6930
// 		// error | #ff70b8 
// 		"--color-error-50": "255 234 244", // #ffeaf4
// 		"--color-error-100": "255 226 241", // #ffe2f1
// 		"--color-error-200": "255 219 237", // #ffdbed
// 		"--color-error-300": "255 198 227", // #ffc6e3
// 		"--color-error-400": "255 155 205", // #ff9bcd
// 		"--color-error-500": "255 112 184", // #ff70b8
// 		"--color-error-600": "230 101 166", // #e665a6
// 		"--color-error-700": "191 84 138", // #bf548a
// 		"--color-error-800": "153 67 110", // #99436e
// 		"--color-error-900": "125 55 90", // #7d375a
// 		// surface | #262626 
// 		"--color-surface-50": "222 222 222", // #dedede
// 		"--color-surface-100": "212 212 212", // #d4d4d4
// 		"--color-surface-200": "201 201 201", // #c9c9c9
// 		"--color-surface-300": "168 168 168", // #a8a8a8
// 		"--color-surface-400": "103 103 103", // #676767
// 		"--color-surface-500": "38 38 38", // #262626
// 		"--color-surface-600": "34 34 34", // #222222
// 		"--color-surface-700": "29 29 29", // #1d1d1d
// 		"--color-surface-800": "23 23 23", // #171717
// 		"--color-surface-900": "19 19 19", // #131313
		
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
		// primary | #67f99f 
		"--color-primary-50": "232 254 241", // #e8fef1
		"--color-primary-100": "225 254 236", // #e1feec
		"--color-primary-200": "217 254 231", // #d9fee7
		"--color-primary-300": "194 253 217", // #c2fdd9
		"--color-primary-400": "149 251 188", // #95fbbc
		"--color-primary-500": "103 249 159", // #67f99f
		"--color-primary-600": "93 224 143", // #5de08f
		"--color-primary-700": "77 187 119", // #4dbb77
		"--color-primary-800": "62 149 95", // #3e955f
		"--color-primary-900": "50 122 78", // #327a4e
		// secondary | #71c1fe 
		"--color-secondary-50": "234 246 255", // #eaf6ff
		"--color-secondary-100": "227 243 255", // #e3f3ff
		"--color-secondary-200": "220 240 255", // #dcf0ff
		"--color-secondary-300": "198 230 255", // #c6e6ff
		"--color-secondary-400": "156 212 254", // #9cd4fe
		"--color-secondary-500": "113 193 254", // #71c1fe
		"--color-secondary-600": "102 174 229", // #66aee5
		"--color-secondary-700": "85 145 191", // #5591bf
		"--color-secondary-800": "68 116 152", // #447498
		"--color-secondary-900": "55 95 124", // #375f7c
		// tertiary | #b380ff 
		"--color-tertiary-50": "244 236 255", // #f4ecff
		"--color-tertiary-100": "240 230 255", // #f0e6ff
		"--color-tertiary-200": "236 223 255", // #ecdfff
		"--color-tertiary-300": "225 204 255", // #e1ccff
		"--color-tertiary-400": "202 166 255", // #caa6ff
		"--color-tertiary-500": "179 128 255", // #b380ff
		"--color-tertiary-600": "161 115 230", // #a173e6
		"--color-tertiary-700": "134 96 191", // #8660bf
		"--color-tertiary-800": "107 77 153", // #6b4d99
		"--color-tertiary-900": "88 63 125", // #583f7d
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
		// surface | #3b3b3b 
		"--color-surface-50": "226 226 226", // #e2e2e2
		"--color-surface-100": "216 216 216", // #d8d8d8
		"--color-surface-200": "206 206 206", // #cecece
		"--color-surface-300": "177 177 177", // #b1b1b1
		"--color-surface-400": "118 118 118", // #767676
		"--color-surface-500": "59 59 59", // #3b3b3b
		"--color-surface-600": "53 53 53", // #353535
		"--color-surface-700": "44 44 44", // #2c2c2c
		"--color-surface-800": "35 35 35", // #232323
		"--color-surface-900": "29 29 29", // #1d1d1d
		
	}
}