<script lang="ts">
	import axios from "axios";
	import { getContext } from "svelte";
	import config from "../config";

    let totptoken = "";
    let error = false;
</script>

<div class="card w-72 max-w-full p-4 flex flex-col gap-4">
    <h3 class="h3 font-bold">Disable 2FA</h3>
    <input type="text" class="w-full input" placeholder="2FA Code" bind:value={totptoken} on:keydown={(event)=>{
        const key = event.key;

        // Allow only digits (0-9) and handle backspace (to delete characters)
        if (!/\d/.test(key) && key !== 'Backspace') {
            event.preventDefault(); // Prevent non-digit input
        }
        if(key === 'Backspace') {
            error = false;
        }
        // Limit input to a maximum of 6 characters
        if (totptoken.length >= 6 && key !== 'Backspace') {
            event.preventDefault(); // Prevent input if 6 characters are already entered
            
        }
        if(totptoken.length == 5 && /\d/.test(key) || key === 'Enter') {
            // event.preventDefault()
            axios.post(`${config.apiEndpoint}/auth/disable-mfa`, {token: totptoken+(key !== 'Enter' ? key : '')}, {
                headers: {
                    Authorization: localStorage.getItem("sessionToken")
                }
            }).then(res=>{
                if(!res.data.success) {
                    error = true;
                } else {
                    location.reload()
                }
            })
        }
    }}>
    {#if error}
        <p class="text-error-500 max-w-96">An error occurred. This is likely because you got the code wrong.</p>
    {/if}
</div>