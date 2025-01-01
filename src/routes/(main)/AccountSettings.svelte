<script lang="ts">
	import { getModalStore } from "@skeletonlabs/skeleton";
	import { getContext } from "svelte";
	import MfaEnable from "./MFAEnable.svelte";

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