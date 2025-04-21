import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const pinkcloud: CustomThemeConfig = {
    name: 'pinkcloud',
    properties: {

		// =~= Theme Properties =~=
		"--theme-font-family-base": `system-ui`,
		"--theme-font-family-heading": `system-ui`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",  // white text on dark mode
		"--theme-rounded-base": "8px",
		"--theme-rounded-container": "8px",
		"--theme-border-base": "1px",

		// =~= Theme On-X Colors =~=
		"--on-primary": "255 255 255",  // white for better readability
		"--on-secondary": "255 255 255",
		"--on-tertiary": "255 255 255",
		"--on-success": "0 0 0",  // dark text for success
		"--on-warning": "0 0 0",  // dark text for warnings
		"--on-error": "255 255 255",  // white text on error background
		"--on-surface": "230 220 255",  // lavender highlight text

		// =~= Theme Colors  =~=
		// primary | soft lavenders 💜✨
		"--color-primary-50": "230 220 255",  // #e6dcff
		"--color-primary-100": "210 190 255", // #d2beff
		"--color-primary-200": "190 160 255", // #bea0ff
		"--color-primary-300": "170 130 255", // #aa82ff
		"--color-primary-400": "150 110 255", // #966eff
		"--color-primary-500": "130 90 255",  // #825aff
		"--color-primary-600": "110 70 230",  // #6e46e6
		"--color-primary-700": "90 50 205",   // #5a32cd
		"--color-primary-800": "70 40 180",   // #4628b4
		"--color-primary-900": "50 30 155",   // #321e9b

		// secondary | cool purples 💜🦋
		"--color-secondary-50": "235 220 255", // #ebdcff
		"--color-secondary-100": "220 190 255", // #dcdcff
		"--color-secondary-200": "205 160 255", // #cda0ff
		"--color-secondary-300": "190 130 255", // #be82ff
		"--color-secondary-400": "170 110 255", // #aa6eff
		"--color-secondary-500": "150 90 255",  // #9660ff
		"--color-secondary-600": "130 70 230",  // #8246e6
		"--color-secondary-700": "110 50 205",  // #6e32cd
		"--color-secondary-800": "90 40 180",   // #5a28b4
		"--color-secondary-900": "70 30 155",   // #46209b

		// tertiary | deep purple shades 💜💭
		"--color-tertiary-50": "220 200 255",  // #dcc8ff
		"--color-tertiary-100": "210 180 255", // #d2b4ff
		"--color-tertiary-200": "200 160 255", // #c8a0ff
		"--color-tertiary-300": "180 140 255", // #b48cff
		"--color-tertiary-400": "160 120 255", // #a078ff
		"--color-tertiary-500": "140 100 255", // #8c64ff
		"--color-tertiary-600": "120 80 230",  // #784fe6
		"--color-tertiary-700": "100 60 205",  // #643cdc
		"--color-tertiary-800": "80 50 180",   // #5032b4
		"--color-tertiary-900": "60 40 155",   // #3c289b

		// success | lavender green 💚💜
		"--color-success-50": "230 250 235",  // #e6faeb
		"--color-success-100": "215 240 220", // #d7f0dc
		"--color-success-200": "200 230 210", // #c8e6d2
		"--color-success-300": "185 215 200", // #b9d7c8
		"--color-success-400": "170 200 190", // #aac8be
		"--color-success-500": "150 180 180", // #96b4b4
		"--color-success-600": "130 160 170", // #82a0aa
		"--color-success-700": "110 140 150", // #6e8c96
		"--color-success-800": "90 120 130",  // #5a7882
		"--color-success-900": "70 100 110",  // #46646e

		// warning | soft yellows 🌙✨
		"--color-warning-50": "255 245 220",  // #fff5dc
		"--color-warning-100": "255 235 210", // #ffebd2
		"--color-warning-200": "255 225 200", // #ffe1c8
		"--color-warning-300": "255 215 190", // #ffd7be
		"--color-warning-400": "255 205 180", // #ffcfb4
		"--color-warning-500": "255 195 170", // #ffc3aa
		"--color-warning-600": "230 175 150", // #e69b96
		"--color-warning-700": "210 155 130", // #d29b82
		"--color-warning-800": "190 135 110", // #be876e
		"--color-warning-900": "170 115 90",  // #aa735a

		// error | soft reds 💖🌹
		"--color-error-50": "255 230 230",   // #ffe6e6
		"--color-error-100": "250 215 215",  // #fad7d7
		"--color-error-200": "245 200 200",  // #f5c8c8
		"--color-error-300": "230 185 185",  // #e6b9b9
		"--color-error-400": "215 170 170",  // #d79a9a
		"--color-error-500": "200 155 155",  // #c89b9b
		"--color-error-600": "185 140 140",  // #b98c8c
		"--color-error-700": "170 125 125",  // #aa7d7d
		"--color-error-800": "155 110 110",  // #9b6e6e
		"--color-error-900": "140 95 95",    // #8c5f5f

		// surface | darker lavender 💜🖤
		"--color-surface-50":  "190 180 225",  // #beb4e1 (muted lavender)
		"--color-surface-100": "170 150 205",  // #aa96cd
		"--color-surface-200": "150 130 185",  // #9682b9
		"--color-surface-300": "130 110 165",  // #826ea5
		"--color-surface-400": "110 90 145",   // #6e5a91
		"--color-surface-500": "90 70 125",    // #5a487d
		"--color-surface-600": "70 50 105",    // #462d69
		"--color-surface-700": "50 40 85",     // #322855
		"--color-surface-800": "40 30 70",     // #282046
		"--color-surface-900": "30 20 55",     // #1e1437
	}
}
