
// import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

// export const trashdev2025: CustomThemeConfig = {
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
// 		"--on-error": "0 0 0",
// 		"--on-surface": "255 255 255",
// 		// =~= Theme Colors  =~=
// 		// primary | #FFB3E6 
// 		"--color-primary-50": "255 244 251", // #fff4fb
// 		"--color-primary-100": "255 240 250", // #fff0fa
// 		"--color-primary-200": "255 236 249", // #ffecf9
// 		"--color-primary-300": "255 225 245", // #ffe1f5
// 		"--color-primary-400": "255 202 238", // #ffcaee
// 		"--color-primary-500": "255 179 230", // #FFB3E6
// 		"--color-primary-600": "230 161 207", // #e6a1cf
// 		"--color-primary-700": "191 134 173", // #bf86ad
// 		"--color-primary-800": "153 107 138", // #996b8a
// 		"--color-primary-900": "125 88 113", // #7d5871
// 		// secondary | #D8B7FF 
// 		"--color-secondary-50": "249 244 255", // #f9f4ff
// 		"--color-secondary-100": "247 241 255", // #f7f1ff
// 		"--color-secondary-200": "245 237 255", // #f5edff
// 		"--color-secondary-300": "239 226 255", // #efe2ff
// 		"--color-secondary-400": "228 205 255", // #e4cdff
// 		"--color-secondary-500": "216 183 255", // #D8B7FF
// 		"--color-secondary-600": "194 165 230", // #c2a5e6
// 		"--color-secondary-700": "162 137 191", // #a289bf
// 		"--color-secondary-800": "130 110 153", // #826e99
// 		"--color-secondary-900": "106 90 125", // #6a5a7d
// 		// tertiary | #80D0FF 
// 		"--color-tertiary-50": "236 248 255", // #ecf8ff
// 		"--color-tertiary-100": "230 246 255", // #e6f6ff
// 		"--color-tertiary-200": "223 243 255", // #dff3ff
// 		"--color-tertiary-300": "204 236 255", // #ccecff
// 		"--color-tertiary-400": "166 222 255", // #a6deff
// 		"--color-tertiary-500": "128 208 255", // #80D0FF
// 		"--color-tertiary-600": "115 187 230", // #73bbe6
// 		"--color-tertiary-700": "96 156 191", // #609cbf
// 		"--color-tertiary-800": "77 125 153", // #4d7d99
// 		"--color-tertiary-900": "63 102 125", // #3f667d
// 		// success | #B1F0B1 
// 		"--color-success-50": "243 253 243", // #f3fdf3
// 		"--color-success-100": "239 252 239", // #effcef
// 		"--color-success-200": "236 251 236", // #ecfbec
// 		"--color-success-300": "224 249 224", // #e0f9e0
// 		"--color-success-400": "200 245 200", // #c8f5c8
// 		"--color-success-500": "177 240 177", // #B1F0B1
// 		"--color-success-600": "159 216 159", // #9fd89f
// 		"--color-success-700": "133 180 133", // #85b485
// 		"--color-success-800": "106 144 106", // #6a906a
// 		"--color-success-900": "87 118 87", // #577657
// 		// warning | #ffc679 
// 		"--color-warning-50": "255 246 235", // #fff6eb
// 		"--color-warning-100": "255 244 228", // #fff4e4
// 		"--color-warning-200": "255 241 222", // #fff1de
// 		"--color-warning-300": "255 232 201", // #ffe8c9
// 		"--color-warning-400": "255 215 161", // #ffd7a1
// 		"--color-warning-500": "255 198 121", // #ffc679
// 		"--color-warning-600": "230 178 109", // #e6b26d
// 		"--color-warning-700": "191 149 91", // #bf955b
// 		"--color-warning-800": "153 119 73", // #997749
// 		"--color-warning-900": "125 97 59", // #7d613b
// 		// error | #FF6F61 
// 		"--color-error-50": "255 233 231", // #ffe9e7
// 		"--color-error-100": "255 226 223", // #ffe2df
// 		"--color-error-200": "255 219 216", // #ffdbd8
// 		"--color-error-300": "255 197 192", // #ffc5c0
// 		"--color-error-400": "255 154 144", // #ff9a90
// 		"--color-error-500": "255 111 97", // #FF6F61
// 		"--color-error-600": "230 100 87", // #e66457
// 		"--color-error-700": "191 83 73", // #bf5349
// 		"--color-error-800": "153 67 58", // #99433a
// 		"--color-error-900": "125 54 48", // #7d3630
// 		// surface | #444444 
//         "--color-surface-50": "223 223 223", // #dfdfdf
// 		"--color-surface-100": "212 212 212", // #d4d4d4
// 		"--color-surface-200": "202 202 202", // #cacaca
// 		"--color-surface-300": "169 169 169", // #a9a9a9
// 		"--color-surface-400": "105 105 105", // #696969
// 		"--color-surface-500": "41 41 41", // #292929
// 		"--color-surface-600": "37 37 37", // #252525
// 		"--color-surface-700": "31 31 31", // #1f1f1f
// 		"--color-surface-800": "25 25 25", // #191919
// 		"--color-surface-900": "20 20 20", // #141414
		
// 	}
// }


import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

// export const trashdev2025: CustomThemeConfig = {
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
// 		"--on-error": "0 0 0",
// 		"--on-surface": "255 255 255",
// 		// =~= Theme Colors  =~=
// 		// primary | #80cfff 
// 		"--color-primary-50": "236 248 255", // #ecf8ff
// 		"--color-primary-100": "230 245 255", // #e6f5ff
// 		"--color-primary-200": "223 243 255", // #dff3ff
// 		"--color-primary-300": "204 236 255", // #ccecff
// 		"--color-primary-400": "166 221 255", // #a6ddff
// 		"--color-primary-500": "128 207 255", // #80cfff
// 		"--color-primary-600": "115 186 230", // #73bae6
// 		"--color-primary-700": "96 155 191", // #609bbf
// 		"--color-primary-800": "77 124 153", // #4d7c99
// 		"--color-primary-900": "63 101 125", // #3f657d
// 		// secondary | #bbbdff 
// 		"--color-secondary-50": "245 245 255", // #f5f5ff
// 		"--color-secondary-100": "241 242 255", // #f1f2ff
// 		"--color-secondary-200": "238 239 255", // #eeefff
// 		"--color-secondary-300": "228 229 255", // #e4e5ff
// 		"--color-secondary-400": "207 209 255", // #cfd1ff
// 		"--color-secondary-500": "187 189 255", // #bbbdff
// 		"--color-secondary-600": "168 170 230", // #a8aae6
// 		"--color-secondary-700": "140 142 191", // #8c8ebf
// 		"--color-secondary-800": "112 113 153", // #707199
// 		"--color-secondary-900": "92 93 125", // #5c5d7d
// 		// tertiary | #ffbbf4 
// 		"--color-tertiary-50": "255 245 253", // #fff5fd
// 		"--color-tertiary-100": "255 241 253", // #fff1fd
// 		"--color-tertiary-200": "255 238 252", // #ffeefc
// 		"--color-tertiary-300": "255 228 251", // #ffe4fb
// 		"--color-tertiary-400": "255 207 247", // #ffcff7
// 		"--color-tertiary-500": "255 187 244", // #ffbbf4
// 		"--color-tertiary-600": "230 168 220", // #e6a8dc
// 		"--color-tertiary-700": "191 140 183", // #bf8cb7
// 		"--color-tertiary-800": "153 112 146", // #997092
// 		"--color-tertiary-900": "125 92 120", // #7d5c78
// 		// success | #B1F0B1 
// 		"--color-success-50": "243 253 243", // #f3fdf3
// 		"--color-success-100": "239 252 239", // #effcef
// 		"--color-success-200": "236 251 236", // #ecfbec
// 		"--color-success-300": "224 249 224", // #e0f9e0
// 		"--color-success-400": "200 245 200", // #c8f5c8
// 		"--color-success-500": "177 240 177", // #B1F0B1
// 		"--color-success-600": "159 216 159", // #9fd89f
// 		"--color-success-700": "133 180 133", // #85b485
// 		"--color-success-800": "106 144 106", // #6a906a
// 		"--color-success-900": "87 118 87", // #577657
// 		// warning | #ffc679 
// 		"--color-warning-50": "255 246 235", // #fff6eb
// 		"--color-warning-100": "255 244 228", // #fff4e4
// 		"--color-warning-200": "255 241 222", // #fff1de
// 		"--color-warning-300": "255 232 201", // #ffe8c9
// 		"--color-warning-400": "255 215 161", // #ffd7a1
// 		"--color-warning-500": "255 198 121", // #ffc679
// 		"--color-warning-600": "230 178 109", // #e6b26d
// 		"--color-warning-700": "191 149 91", // #bf955b
// 		"--color-warning-800": "153 119 73", // #997749
// 		"--color-warning-900": "125 97 59", // #7d613b
// 		// error | #FF6F61 
// 		"--color-error-50": "255 233 231", // #ffe9e7
// 		"--color-error-100": "255 226 223", // #ffe2df
// 		"--color-error-200": "255 219 216", // #ffdbd8
// 		"--color-error-300": "255 197 192", // #ffc5c0
// 		"--color-error-400": "255 154 144", // #ff9a90
// 		"--color-error-500": "255 111 97", // #FF6F61
// 		"--color-error-600": "230 100 87", // #e66457
// 		"--color-error-700": "191 83 73", // #bf5349
// 		"--color-error-800": "153 67 58", // #99433a
// 		"--color-error-900": "125 54 48", // #7d3630
// 		// surface | #383838 
// 		"--color-surface-50": "255 255 255", // #ffffff
// 		"--color-surface-100": "245 245 245", // #f5f5f5
// 		"--color-surface-200": "230 230 230", // #e6e6e6
// 		"--color-surface-300": "210 210 210", // #d2d2d2
// 		"--color-surface-400": "180 180 180", // #b4b4b4
// 		"--color-surface-500": "53 53 53", // #252525
// 		"--color-surface-600": "45 45 45", // #212121
// 		"--color-surface-700": "37 37 37", // #1c1c1c
// 		"--color-surface-800": "33 33 33", // #161616
// 		"--color-surface-900": "28 28 28", // #121212
		
// 	}
// }

export const trashdev2025: CustomThemeConfig = {
  name: 'trashdev',
  properties: {
    // =~= Theme Properties =~=
    "--theme-font-family-base": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
    "--theme-font-family-heading": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
    "--theme-font-color-base": "var(--color-surface-900)",
    "--theme-font-color-dark": "255 255 255",
    "--theme-rounded-base": "16px",
    "--theme-rounded-container": "16px",
    "--theme-border-base": "1px",


    // =~= Theme On-X Colors =~=
    "--on-secondary": "30 40 35",
    "--on-primary": "25 35 45",
    "--on-tertiary": "35 25 45",
    "--on-success": "30 35 20",
    "--on-warning": "40 30 10",
    "--on-error": "45 20 35",
    "--on-surface": "240 240 240",

    // =~= Theme Colors  =~=
    // primary | minty
    "--color-secondary-50": "228 255 244",
    "--color-secondary-100": "212 255 236",
    "--color-secondary-200": "194 255 225",
    "--color-secondary-300": "158 252 204",
    "--color-secondary-400": "120 249 180",
    "--color-secondary-500": "90 230 150",
    "--color-secondary-600": "65 190 120",
    "--color-secondary-700": "48 150 95",
    "--color-secondary-800": "38 120 75",
    "--color-secondary-900": "30 95 60",

    // secondary | sky
    "--color-primary-50": "232 248 255",
    "--color-primary-100": "215 241 255",
    "--color-primary-200": "200 234 255",
    "--color-primary-300": "168 219 255",
    "--color-primary-400": "135 203 255",
    "--color-primary-500": "100 186 255",
    "--color-primary-600": "85 160 225",
    "--color-primary-700": "70 132 185",
    "--color-primary-800": "55 105 150",
    "--color-primary-900": "40 80 115",

    // tertiary | lavender
    "--color-tertiary-50": "245 238 255",
    "--color-tertiary-100": "238 228 255",
    "--color-tertiary-200": "230 216 255",
    "--color-tertiary-300": "215 190 255",
    "--color-tertiary-400": "195 158 255",
    "--color-tertiary-500": "170 125 255",
    "--color-tertiary-600": "150 110 230",
    "--color-tertiary-700": "120 90 190",
    "--color-tertiary-800": "95 70 150",
    "--color-tertiary-900": "75 55 120",

    // success | lime
    "--color-success-50": "245 252 230",
    "--color-success-100": "238 250 215",
    "--color-success-200": "230 248 200",
    "--color-success-300": "210 240 160",
    "--color-success-400": "185 230 120",
    "--color-success-500": "160 215 80",
    "--color-success-600": "135 185 65",
    "--color-success-700": "110 155 50",
    "--color-success-800": "90 125 40",
    "--color-success-900": "70 100 32",

    // warning | peach
    "--color-warning-50": "255 245 233",
    "--color-warning-100": "255 238 220",
    "--color-warning-200": "255 232 208",
    "--color-warning-300": "255 213 170",
    "--color-warning-400": "255 185 130",
    "--color-warning-500": "255 155 90",
    "--color-warning-600": "230 135 75",
    "--color-warning-700": "195 115 60",
    "--color-warning-800": "155 90 48",
    "--color-warning-900": "120 70 38",

    // error | candy pink
    "--color-error-50": "255 240 246",
    "--color-error-100": "255 230 240",
    "--color-error-200": "255 220 234",
    "--color-error-300": "255 195 220",
    "--color-error-400": "255 155 195",
    "--color-error-500": "255 115 170",
    "--color-error-600": "230 100 150",
    "--color-error-700": "195 80 125",
    "--color-error-800": "155 60 100",
    "--color-error-900": "125 50 75",

    // surface | warm dark
	"--color-surface-50": "245 243 243",
	"--color-surface-100": "235 230 230",
	"--color-surface-200": "225 220 220",
	"--color-surface-300": "205 200 200",
	"--color-surface-400": "180 170 170",
    "--color-surface-500": "52 50 50",
    "--color-surface-600": "46 43 43",
    "--color-surface-700": "38 35 35",
    "--color-surface-800": "30 28 28",
    "--color-surface-900": "24 22 22",
  }
};
