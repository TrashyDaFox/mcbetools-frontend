<script lang="ts">
	import axios from 'axios';
	import config from '../../config';
	import { getModalStore, getToastStore, initializeStores, Modal, Toast } from '@skeletonlabs/skeleton';
	import HandleRequirements from './HandleRequirements.svelte';
	initializeStores();
	const toastStore = getToastStore();
	const modalStore = getModalStore();
	let username = "";
	let password = "";
	let handle = "";
	let email = "";
</script>
<Toast />
<!-- res.json({
	error: false,
	errorCode: -1,
	message: "Account created. Check your email to verify!",
	data: {
		sessionToken,
		baseToken
	}
}) -->
	<Modal />
<div class="container h-full h-full flex justify-center items-center p-0 max-w-none">
	<div
		class="bg w-full h-full flex justify-center items-center"
		style="background:url(/loginbg.png);background-size:cover;background-position:center;"
	>
    <div class="w-full h-full flex justify-center items-center bg-gradient-to-b from-surface-900/10 to-surface-900 flex-col gap-4">
        <img src="/mcbetoolslogo.png" alt="" class="w-72 h-auto object-cover">

		<form
			on:submit={(e) => {
				e.preventDefault();
				
				let formData = new FormData();
				formData.append("email", email)
				formData.append("handle", handle)
				formData.append("username", username)
				formData.append("password", password)
				axios({
					method: 'post',
					url: `${config.apiEndpoint}/auth/register`,
					data: formData
				}).then(res=>{
					if(res.data.error) {
						toastStore.trigger({
							background: 'variant-glass-error',
							message: res.data.message,
							timeout: 5 * 1000
						})
					} else {
						toastStore.trigger({
							background: 'variant-glass-primary',
							message: res.data.message,
							timeout: 5 * 1000
						})
						localStorage.setItem('sessionToken', res.data.data.sessionToken);
						location.pathname = '/';
					}
					console.log(res.data);
				})
			}}
			class="card variant-filled-surface p-8 py-12 w-72"
		>
			<input type="email" placeholder="Email" class="input w-full" bind:value={email} />
			<div class="h-3"></div>
			<input type="text" placeholder="Username" class="input w-full" bind:value={username} />
			<div class="h-3"></div>
			<div class="flex gap-2 items-center">
				<input type="text" placeholder="Handle" class="input w-full" bind:value={handle} />
				<button class="btn btn-icon variant-soft-primary !text-primary-400 w-8 h-8" on:click={(e)=>{
					e.preventDefault();
					modalStore.trigger({
						type: 'component',
						component: {ref: HandleRequirements}
					})
				}}>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
				</button>
			</div>
			<div class="h-3"></div>
			<input type="password" placeholder="Password" class="input w-full" bind:value={password} />
			<div class="h-3"></div>
			<button class="btn btn-sm variant-filled-primary w-full">Register</button>
			<div class="h-3"></div>
            <a href="/login" class="w-full flex justify-center items-center text-primary-500 underline hover:no-underline">Login instead</a>
		</form>
	</div>
	</div>
</div>
