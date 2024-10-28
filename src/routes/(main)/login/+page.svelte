<script>

	import axios from "axios";
	import config from "../../config";
	import { getToastStore, initializeStores, Toast } from "@skeletonlabs/skeleton";
    initializeStores();
    const toastStore = getToastStore();
    let email = "";
    let password = "";
</script>
<Toast />
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
                let fd = new FormData();
                fd.append("email", email)
                fd.append("password", password);
                axios({
                    method: "POST",
                    url: `${config.apiEndpoint}/auth/login`,
                    data: fd
                }).then(res=>{
                    if(res.data.error) {
                        toastStore.trigger({
                            background: 'variant-glass-error',
                            message: res.data.message
                        })
                    } else {
                        localStorage.setItem('sessionToken', res.data.token);
                        location.pathname = '/';
                    }
                })
			}}
			class="card variant-filled-surface p-8 py-12 w-72"
		>
			<input type="email" placeholder="Email" class="input w-full" bind:value={email} />
			<div class="h-3"></div>
			<input type="password" placeholder="Password" class="input w-full" bind:value={password} />
			<div class="h-3"></div>
			<button class="btn btn-sm variant-filled-primary w-full">Login</button>
			<div class="h-3"></div>
            <a href="/register" class="w-full flex justify-center items-center text-primary-500 underline hover:no-underline">Create an account instead</a>
		</form>
        
    </div>
	</div>
</div>
