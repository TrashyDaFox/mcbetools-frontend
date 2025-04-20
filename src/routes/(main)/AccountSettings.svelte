<script lang="ts">
	import { getModalStore } from "@skeletonlabs/skeleton";
	import { getContext, onMount } from "svelte";
	import type { Writable } from 'svelte/store';
	import MfaEnable from "./MFAEnable.svelte";
	import MfaDialog from "./DisableMFADialog.svelte";
    import config from "../config";
    import axios from 'axios'
	import MfaViewBackupCodes from "./MFAViewBackupCodes.svelte";

    interface User {
        hasMfaEnabled: boolean;
        discordName: string | null;
        discordId: string | null;
        // ... other user properties
    }

    const loggedInUser = getContext<Writable<User>>("loggedInUser");
    const modalStore = getModalStore();

    async function linkDiscord() {
        try {
            const res = await axios({
                method: 'post',
                url: `${config.apiEndpoint}/auth/link-discord`,
                headers: {
                    'Authorization': localStorage.getItem('sessionToken')
                },
                withCredentials: true
            });
            
            if (res.data.url) {
                localStorage.setItem('preDiscordLink', window.location.href);
                window.location.href = res.data.url;
            } else {
                modalStore.trigger({
                    type: 'alert',
                    title: 'Error',
                    body: res.data.message || 'Failed to initiate Discord linking'
                });
            }
        } catch (error) {
            console.error('Discord linking error:', error);
            modalStore.trigger({
                type: 'alert',
                title: 'Error',
                body: 'Failed to connect to server. Please check that the server is running and try again.'
            });
        }
    }

    async function unlinkDiscord() {
        modalStore.trigger({
            type: 'confirm',
            title: 'Unlink Discord Account',
            body: 'Are you sure you want to unlink your Discord account? You will need to link it again to use Discord login.',
            response: async (confirmed) => {
                if (confirmed) {
                    try {
                        const res = await axios({
                            method: 'post',
                            url: `${config.apiEndpoint}/auth/unlink-discord`,
                            headers: {
                                'Authorization': localStorage.getItem('sessionToken')
                            }
                        });

                        if (!res.data.error) {
                            modalStore.trigger({
                                type: 'alert',
                                title: 'Success',
                                body: 'Discord account unlinked successfully!'
                            });
                            // Update the user store to reflect the change
                            $loggedInUser = {
                                ...$loggedInUser,
                                discordName: null,
                                discordId: null
                            };
                        } else {
                            modalStore.trigger({
                                type: 'alert',
                                title: 'Error',
                                body: res.data.message || 'Failed to unlink Discord account'
                            });
                        }
                    } catch (error) {
                        console.error('Discord unlinking error:', error);
                        modalStore.trigger({
                            type: 'alert',
                            title: 'Error',
                            body: 'Failed to unlink Discord account. Please try again.'
                        });
                    }
                }
            }
        });
    }

    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const error = urlParams.get('error');
        const success = urlParams.get('success');

        if (error === 'discord_already_linked') {
            modalStore.trigger({
                type: 'alert',
                title: 'Error',
                body: 'This Discord account is already linked to another user'
            });
        } else if (success === 'discord_linked') {
            modalStore.trigger({
                type: 'alert',
                title: 'Success',
                body: 'Discord account successfully linked!'
            });
            // Refresh the page to update the UI
            window.location.reload();
        }
    });
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

<div class="h-2"></div>
{#if $loggedInUser && !$loggedInUser.discordName}
    <button class="btn variant-filled-primary w-full" on:click={linkDiscord}>
        Link Discord Account
    </button>
{:else if $loggedInUser?.discordName}
    <div class="card p-4 w-full">
        <div class="flex justify-between items-center">
            <p>Connected to Discord as: {$loggedInUser.discordName}</p>
            <button 
                class="btn btn-sm variant-filled-error" 
                on:click={unlinkDiscord}
            >
                Unlink
            </button>
        </div>
    </div>
{/if}

</div>