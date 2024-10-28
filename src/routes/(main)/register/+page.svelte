<script lang="ts">
	import axios from 'axios';
	import config from '../../config';
	import { getToastStore, initializeStores, Toast } from '@skeletonlabs/skeleton';
	initializeStores();
	const toastStore = getToastStore();
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
<div class="container h-full h-full flex justify-center items-center p-0 max-w-none">
	<div
		class="bg w-full h-full flex justify-center items-center"
		style="background:url(/leafbg.png)"
	>
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
			class="p-8 py-10 bg-surface-600/75 rounded-lg backdrop-blur-sm border border-surface-100/15"
		>
			<input type="email" placeholder="Email" class="input w-full" bind:value={email} />
			<div class="h-3"></div>
			<input type="text" placeholder="Username" class="input w-full" bind:value={username} />
			<div class="h-3"></div>
			<input type="text" placeholder="Handle" class="input w-full" bind:value={handle} />
			<div class="h-3"></div>
			<input type="password" placeholder="Password" class="input w-full" bind:value={password} />
			<div class="h-3"></div>
			<button class="btn btn-sm variant-filled-primary w-full">Register</button>
			<div class="h-3"></div>
            <a href="/login" class="w-full flex justify-center items-center text-primary-500 underline hover:no-underline">Login instead</a>
		</form>
	</div>
</div>
