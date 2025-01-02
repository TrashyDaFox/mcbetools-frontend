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
    let backupCodes = writable(null)
    let totptoken = "";
    let error = false;
    onMount(()=>{
        axios.post(`${config.apiEndpoint}/auth/enable-mfa/step1`).then(res=>{
            firstStepResponse.set(res.data)
        })
    })
    function fetchBackupCodes(token) {
        axios.get(`${config.apiEndpoint}/view-mfa-backup-codes/${token}`, {
            headers: {
                Authorization: localStorage.getItem("sessionToken")
            }
        }).then(res=>{
            if(res.data.status) {
                backupCodes.set(res.data.backupCodes)
            }
        })
    }
    function saveTextAsFile(text, filename) {
  // Create a Blob from the text content
  const blob = new Blob([text], { type: 'text/plain' });

  // Create a link element
  const link = document.createElement('a');
  
  // Set the download attribute with the filename
  link.download = filename;
  
  // Create a URL for the Blob and set it as the link's href
  link.href = URL.createObjectURL(blob);
  
  // Append the link to the body (required for Firefox)
  document.body.appendChild(link);
  
  // Trigger the download by simulating a click on the link
  link.click();
  
  // Remove the link from the document after the download is triggered
  document.body.removeChild(link);
}
</script>

<div class="card min-w-96 min-h-72 p-4 flex gap-4">
    {#if $backupCodes}
    <div>
        <p>Here are your 2FA backup codes. Please store them somewhere safe</p>
        <button class="btn variant-filled-primary w-full" on:click={()=>{
            saveTextAsFile(`Here are your MCBETools backup codes. These can only be used once, and should only be used when you cant get into your account.\n\n${$backupCodes.join(', ')}`, `mcbetools_backup_codes.txt`)
        }}>
            Download backup codes
        </button>
        <div class="h-2"></div>
        <button class="btn variant-filled-primary w-full" on:click={()=>{
            location.pathname = '/mfa-enabled'

        }}>
            Continue
        </button>
        <div class="h-2"></div>
        <hr>
        <div class="h-2"></div>
        <div class="grid grid-cols-2 grid-rows-4 gap-4">
            {#each $backupCodes as code}
                    <div class="card p-4 px-8 variant-soft-primary text-primary-200 text-xl">
                        {code}
                    </div>
            {/each}
        </div>

    </div>
    {:else if $firstStepResponse}
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
                            backupCodes.set(res.data.backupCodes)
                            // toastStore.trigger({
                            //     background: 'variant-filled-primary',
                            //     message: "MFA enabled successfully!"
                            // })
                            // modalStore.close();
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