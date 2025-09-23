
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const moonlight: CustomThemeConfig = {
    name: 'moonlight',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `system-ui`,
		"--theme-font-family-heading": `system-ui`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "var(--color-primary-200)",
		"--theme-rounded-base": "12px",
		"--theme-rounded-container": "12px",
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
		// primary | #dcb0ff 
        "--color-primary-50": "252 247 255", // #fcf7ff
        "--color-primary-100": "249 240 255", // #f9f0ff
        "--color-primary-200": "245 232 255", // #f5e8ff
        "--color-primary-300": "238 218 255", // #eedaff
        "--color-primary-400": "227 195 255", // #e3c3ff
		"--color-primary-500": "220 176 255", // #dcb0ff
		"--color-primary-600": "198 158 230", // #c69ee6
		"--color-primary-700": "165 132 191", // #a584bf
		"--color-primary-800": "132 106 153", // #846a99
		"--color-primary-900": "108 86 125", // #6c567d
		// secondary | #b892ff 
        "--color-secondary-50": "248 245 255", // #f8f5ff
        "--color-secondary-100": "243 236 255", // #f3ecff
        "--color-secondary-200": "238 228 255", // #eee4ff
        "--color-secondary-300": "229 213 255", // #e5d5ff
        "--color-secondary-400": "212 187 255", // #d4bbff
		"--color-secondary-500": "184 146 255", // #b892ff
		"--color-secondary-600": "166 131 230", // #a683e6
		"--color-secondary-700": "138 110 191", // #8a6ebf
		"--color-secondary-800": "110 88 153", // #6e5899
		"--color-secondary-900": "90 72 125", // #5a487d
		// tertiary | #ffb4e6 
        "--color-tertiary-50": "255 247 252", // #fff7fc
        "--color-tertiary-100": "255 242 250", // #fff2fa
        "--color-tertiary-200": "255 237 248", // #ffedf8
        "--color-tertiary-300": "255 225 243", // #ffe1f3
        "--color-tertiary-400": "255 206 236", // #ffceec   
		"--color-tertiary-500": "255 180 230", // #ffb4e6
		"--color-tertiary-600": "230 162 207", // #e6a2cf
		"--color-tertiary-700": "191 135 173", // #bf87ad
		"--color-tertiary-800": "153 108 138", // #996c8a
		"--color-tertiary-900": "125 88 113", // #7d5871
		// success | #9ef0c0 
        "--color-success-50": "242 255 249", // #f2fff9
        "--color-success-100": "236 254 246", // #ecfef6
        "--color-success-200": "229 253 242", // #e5fdf2
        "--color-success-300": "213 250 233", // #d5fae9
        "--color-success-400": "186 247 218", // #baf7da
		"--color-success-500": "158 240 192", // #9ef0c0
		"--color-success-600": "142 216 173", // #8ed8ad
		"--color-success-700": "119 180 144", // #77b490
		"--color-success-800": "95 144 115", // #5f9073
		"--color-success-900": "77 118 94", // #4d765e
		// warning | #ffd18a 
        "--color-warning-50": "255 250 242", // #fffaf2
        "--color-warning-100": "255 247 236", // #fff7ec
        "--color-warning-200": "255 243 229", // #fff3e5
        "--color-warning-300": "255 235 214", // #ffebd6
        "--color-warning-400": "255 222 186", // #ffdeba
		"--color-warning-500": "255 209 138", // #ffd18a
		"--color-warning-600": "230 188 124", // #e6bc7c
		"--color-warning-700": "191 157 104", // #bf9d68
		"--color-warning-800": "153 125 83", // #997d53
		"--color-warning-900": "125 102 68", // #7d6644
		// error | #ff99a4 
        "--color-error-50": "255 245 246", // #fff5f6
        "--color-error-100": "255 240 242", // #fff0f2
        "--color-error-200": "255 234 236", // #ffeaec
        "--color-error-300": "255 220 224", // #ffdce0
        "--color-error-400": "255 193 199", // #ffc1c7
		"--color-error-500": "255 153 164", // #ff99a4
		"--color-error-600": "230 138 148", // #e68a94
		"--color-error-700": "191 115 123", // #bf737b
		"--color-error-800": "153 92 98", // #995c62
		"--color-error-900": "125 75 80", // #7d4b50
		// surface | #1a1525 
        "--color-surface-50": "250 247 255", // #faf7ff (very soft lavender white)
        "--color-surface-100": "244 239 254", // #f4effe
        "--color-surface-200": "238 231 252", // #eee7fc
        "--color-surface-300": "228 219 248", // #e4dbf8
        "--color-surface-400": "213 199 242", // #d5c7f2
        "--color-surface-500": "32 30 38",   // #201e26 (mostly neutral dark gray w/ a hint of violet)
        "--color-surface-600": "28 26 34",   // #1c1a22
        "--color-surface-700": "24 22 30",   // #18161e
        "--color-surface-800": "20 18 26",   // #14121a
        "--color-surface-900": "16 14 22",   // #100e16

		
	}
}