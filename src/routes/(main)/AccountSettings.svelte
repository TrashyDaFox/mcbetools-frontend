<script lang="ts">
	import { getModalStore } from "@skeletonlabs/skeleton";
	import { getContext } from "svelte";
	import MfaEnable from "./MFAEnable.svelte";
	import MfaDialog from "./DisableMFADialog.svelte";

    let loggedInUser = getContext("loggedInUser")

    let modalStore = getModalStore();
</script>

{#if $loggedInUser && !$loggedInUser.hasMfaEnabled}
    <button class="variant-filled btn w-full" on:click={()=>{
        modalStore.trigger({
            type: 'component',
            component: {ref: MfaEnable}
        })
    }}>Enable 2FA</button>
{/if}
{#if $loggedInUser && $loggedInUser.hasMfaEnabled}
    <button class="variant-filled btn w-full" on:click={()=>{
        modalStore.trigger({
            type: 'component',
            component: {ref: MfaDialog}
        })
    }}>Disable 2FA</button>
{/if}