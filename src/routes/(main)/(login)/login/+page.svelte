<script lang="ts">
	import axios from 'axios';
	import config from '../../../config';
	import { getModalStore, getToastStore, initializeStores, Modal, Toast } from '@skeletonlabs/skeleton';
	import styles from '../../../styles';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import ProjectCard from '../../ProjectCard.svelte';
	// initializeStores();
	const toastStore = getToastStore();
    const modalStore = getModalStore();
	let email = '';
	let password = '';
	let totptoken = '';
	let mfaScreen = false;
	let recentProjects = writable([]);

	onMount(() => {
		// Add URL parameter handling for Discord OAuth callback
		const urlParams = new URLSearchParams(window.location.search);
		const token = urlParams.get('token');
		const error = urlParams.get('error');
		
		if (token) {
			localStorage.setItem('sessionToken', token);
			window.location.href = '/';
		} else if (error) {
			modalStore.trigger({
				type: 'alert',
				title: 'Error',
				body: error === 'oauth_failed' 
					? 'Failed to login with Discord' 
					: 'An error occurred during login'
			});
		}

		function updateZoomFix() {
			document.documentElement.style.setProperty('--zoom', window.devicePixelRatio);
		}
		updateZoomFix();
		window.addEventListener('resize', updateZoomFix);
		// axios.get(`${config.apiEndpoint}/get-recent-projects2`).then((res) => {
		//     recentProjects.set(res.data);
		// });
	});

	function loginWithDiscord() {
		try {
			window.location.href = `${config.apiEndpoint}/auth/discord`;
		} catch (error) {
			console.error('Error initiating Discord login:', error);
			modalStore.trigger({
				type: 'alert',
				title: 'Error',
				body: 'Failed to initiate Discord login. Please try again.'
			});
		}
	}
</script>

<Toast />
<style>
    .discord {
        --color-primary-50: 234 237 250;
        --color-primary-100: 227 232 248;
        --color-primary-200: 220 226 246;
        --color-primary-300: 199 208 241;
        --color-primary-400: 157 173 230;
        --color-primary-500: 115 138 219;
        --color-primary-600: 104 124 197;
        --color-primary-700: 86 104 164;
        --color-primary-800: 69 83 131;
        --color-primary-900: 56 68 107;
    }
</style>
<!-- <img src="/mcbetoolslogo.png" alt="" class="w-72 h-auto object-cover"> -->
{#if mfaScreen}
	<form
		on:submit={(e) => {
			e.preventDefault();
			let fd = new FormData();
			fd.append('email', email);
			fd.append('password', password);
			fd.append('totptoken', totptoken);
			axios({
				method: 'POST',
				url: `${config.apiEndpoint}/auth/login`,
				data: fd
			}).then((res) => {
				if (res.data.error) {
					if (res.data.errorCode == 5) {
						mfaScreen = true;
						return;
					}
					toastStore.trigger({
						background: 'variant-filled-error',
						message: res.data.message
					});
				} else {
					localStorage.setItem('sessionToken', res.data.token);
					location.pathname = '/';
				}
			});
		}}
		class="card variant-filled-surface p-8 py-12 w-72"
	>
		<input
			type="text"
			placeholder="6 digit 2FA Code"
			class="input w-full"
			bind:value={totptoken}
			on:keydown={(event) => {
				const key = event.key;

				// Allow only digits (0-9) and handle backspace (to delete characters)
				if (!/\d/.test(key) && key !== 'Backspace') {
					event.preventDefault(); // Prevent non-digit input
				}

				// Limit input to a maximum of 6 characters
				if (totptoken.length >= 6 && key !== 'Backspace') {
					event.preventDefault(); // Prevent input if 6 characters are already entered
				}
			}}
		/>
		<div class="h-3"></div>
		<button class="btn btn-sm variant-filled-primary w-full">Login</button>
	</form>
{:else}
	<form
		on:submit={(e) => {
			e.preventDefault();
			let fd = new FormData();
			fd.append('email', email);
			fd.append('password', password);
			axios({
				method: 'POST',
				url: `${config.apiEndpoint}/auth/login`,
				data: fd
			}).then((res) => {
				if (res.data.error) {
					if (res.data.errorCode == 6 || res.data.errorCode == 5 || res.data.message == 'MFA token required') {
						if (res.data.message == 'MFA token required' || res.data.errorCode == 5) {
							mfaScreen = true;
						}
						return;
					}
					toastStore.trigger({
						background: 'variant-filled-error',
						message: res.data.message
					});
				} else {
					localStorage.setItem('sessionToken', res.data.token);
					location.pathname = '/';
				}
			});
		}}
		class="card max-w-full w-96 variant-filled-surface shadow-lg !bg-surface-800 backdrop-blur-lg p-8 py-12 w-72"
	>
		<input type="email" placeholder="Email" class="input w-full" bind:value={email} />
		<div class="h-3"></div>
		<input type="password" placeholder="Password" class="input w-full" bind:value={password} />
		<div class="h-3"></div>
		<button class="btn variant-filled-primary w-full">Login</button>
		<div class="h-3"></div>
		<a href="/register" class="flex text-white/50 hover:underline hover:text-white"
			>Don't have an account?</a
		>
		<a href="/forgot-password" class="flex text-white/50 hover:underline hover:text-white"
			>Forgot password?</a
		>
		<div class="h-2"></div>
		<hr />
		<div class="h-2"></div>
		<div class="flex gap-2 items-center justify-center">
			<div class="flex-auto h-[1px] w-full bg-surface-400"></div>
			<p class="opacity-50">OR</p>
			<div class="flex-auto h-[1px] w-full bg-surface-400"></div>
		</div>
		<div class="h-2"></div>
		<button 
			class="btn w-full variant-filled-primary text-white flex gap-4 w-12 discord" 
			on:click|preventDefault={loginWithDiscord}
		>
			<img src="/discord.svg" class="w-8 h-auto fill-white" alt="Discord"/>
			<p class="text-white">Login With Discord</p>
		</button>
		<div class="h-4"></div>
		<div class="w-full h-[1px] w-full bg-surface-400"></div>
		<div class="h-2"></div>
		<a href="/contact" class="flex text-primary-500 hover:underline no-underline"
			>Need help? Contact support!</a
		>
	</form>
{/if}
