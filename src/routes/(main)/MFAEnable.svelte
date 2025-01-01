<script lang="ts">
	import axios from "axios";
	import { getContext, onMount } from "svelte";
	import config from "../config";
	import { writable } from "svelte/store";
	import { getModalStore, getToastStore } from "@skeletonlabs/skeleton";
    let toastStore = getToastStore();
    let modalStore = getModalStore();
    let loggedInUser = getContext("loggedInUser");

    let firstStepResponse = writable(null)

    let totptoken = "";
    let error = false;
    onMount(()=>{
        axios.post(`${config.apiEndpoint}/auth/enable-mfa/step1`).then(res=>{
            firstStepResponse.set(res.data)
        })
    })
</script>

<div class="card min-w-96 min-h-72 p-4 flex gap-4">
    {#if $firstStepResponse}
        <div class="flex-col flex gap-4">
            <p class="text-md">Scan this QRCode with an authenticator app:</p>            
            <img src={$firstStepResponse.qrCode} alt="" class="w-72 h-72 rounded-lg">
        </div>
        <div class="othershit flex flex-col">
            <div class="flex flex-col gap-4">
                <p class="text-md">Or, if you want to type it manually:</p>
                <div class="w-full card variant-filled-surface text-lg p-4" style="font-family: monospace;">
                    {$firstStepResponse.secret}
                </div>
            </div>
            <div class="h-4"></div>
            <hr>
            <div class="h-4"></div>
            <p>Once you get it added, type in the code here to finish:</p>
            <input type="text" class="input w-full" placeholder="2FA Code" bind:value={totptoken} on:keydown={(event)=>{
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
                    axios.post(`${config.apiEndpoint}/auth/enable-mfa/step2`, {token: totptoken+(key !== 'Enter' ? key : '')}, {
                        headers: {
                            Authorization: localStorage.getItem("sessionToken")
                        }
                    }).then(res=>{
                        if(!res.data.success) {
                            error = true;
                        } else {
                            location.pathname = '/mfa-enabled'
                            toastStore.trigger({
                                background: 'variant-filled-primary',
                                message: "MFA enabled successfully!"
                            })
                            modalStore.close();
                        }
                    })
                }
        }}>
            <div class="h-2"></div>
            {#if error}
                <p class="text-error-500 max-w-96">An error occurred. This is likely because you got the code wrong.</p>
            {/if}
        </div>
    {/if}
</div>