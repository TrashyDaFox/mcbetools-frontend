<script lang="ts">
	import { getModalStore } from "@skeletonlabs/skeleton";
	import { getContext } from "svelte";
	import MfaEnable from "./MFAEnable.svelte";
	import MfaDialog from "./DisableMFADialog.svelte";
    import config from "../config";
    import axios from 'axios'
	import MfaViewBackupCodes from "./MFAViewBackupCodes.svelte";

    let loggedInUser = getContext("loggedInUser")

    let modalStore = getModalStore();
</script>
<div class='flex flex-col'>
{#if $loggedInUser && !$loggedInUser.hasMfaEnabled}
    <button class="variant-filled-primary btn w-full" on:click={()=>{
        modalStore.trigger({
            type: 'component',
            component: {ref: MfaEnable}
        })
    }}>Enable 2FA</button>
{/if}
{#if $loggedInUser && $loggedInUser.hasMfaEnabled}
    <button class="variant-filled-primary btn w-full" on:click={()=>{
        modalStore.trigger({
            type: 'component',
            component: {ref: MfaDialog}
        })
    }}>Disable 2FA</button>
    <div class="h-2"></div>
    <button class="variant-filled-primary btn w-full" on:click={()=>{
        modalStore.trigger({
            type: 'component',
            component: {ref: MfaViewBackupCodes}
        })
    }}>View backup codes</button>

    
{/if}
{#if $loggedInUser}
<div class="h-2"></div>
<button class='btn variant-filled-primary' on:click={() => {
    axios.post(`${config.apiEndpoint}/auth/reset-password`, {}, {
        headers: {
            Authorization: `${localStorage.getItem('sessionToken')}`
        }
    }).then((res) => {
        if(!res.data.error) {
        modalStore.trigger({
            type: 'alert',
            body: 'Password reset email sent'
        })
    } else {
        modalStore.trigger({
            type: 'alert',
            title: "error",
            body: res.data.message
        })
    }
    })
}}>Reset your password</button>
{/if}

</div>