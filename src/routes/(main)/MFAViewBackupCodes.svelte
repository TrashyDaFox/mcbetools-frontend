<script lang="ts">
	import { writable } from "svelte/store";
	import TotpInputWidget from "./TOTPInputWidget.svelte";
	import axios from "axios";
	import config from "../config";

    let backupCodes = writable([])
// /view-mfa-backup-codes/:token
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
<div class="card p-4">
    {#if !$backupCodes.length}
        <p>Please enter the code from your authenticator app.</p>
        <div class="h-2"></div>
        <TotpInputWidget on:ontotpinput={(e)=>{
            fetchBackupCodes(e.detail)
        }}/>
    {:else}
        <p>Here are your 2FA backup codes</p>
        <button class="btn variant-filled-primary w-full" on:click={()=>{
            saveTextAsFile(`Here are your MCBETools backup codes. These can only be used once, and should only be used when you cant get into your account.\n\n${$backupCodes.join(', ')}`, `mcbetools_backup_codes.txt`)
        }}>
            Download backup codes
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
    {/if}
</div>