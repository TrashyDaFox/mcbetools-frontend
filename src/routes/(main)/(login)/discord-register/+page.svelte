<script lang="ts">
    import { onMount } from 'svelte';
    import { getToastStore, getModalStore } from '@skeletonlabs/skeleton';
    import axios from 'axios';
    import config from '../../../config';

    const toastStore = getToastStore();
    const modalStore = getModalStore();

    let handle = '';
    let loading = true;
    let discordData: any = null;
    let tempToken = '';

    onMount(async () => {
        const urlParams = new URLSearchParams(window.location.search);
        tempToken = urlParams.get('token') || '';
        
        if (!tempToken) {
            window.location.href = '/login';
            return;
        }
//
        try {
            const response = await axios.get(`${config.apiEndpoint}/auth/discord-data`, {
                params: { token: tempToken }
            });
            
            if (!response.data.error) {
                discordData = response.data.discordData;
            } else {
                toastStore.trigger({
                    message: response.data.message,
                    background: 'variant-filled-error'
                });
                setTimeout(() => window.location.href = '/login', 2000);
            }
        } catch (error) {
            toastStore.trigger({
                message: 'Failed to load Discord data',
                background: 'variant-filled-error'
            });
            setTimeout(() => window.location.href = '/login', 2000);
        }
        
        loading = false;
    });

    async function handleSubmit() {
        if (!handle) {
            toastStore.trigger({
                message: 'Please enter a handle',
                background: 'variant-filled-error'
            });
            return;
        }

        try {
            const response = await axios.post(`${config.apiEndpoint}/auth/complete-discord-registration`, {
                tempToken,
                handle
            });

            if (response.data.error) {
                toastStore.trigger({
                    message: response.data.message,
                    background: 'variant-filled-error'
                });
                return;
            }

            localStorage.setItem('sessionToken', response.data.sessionToken);
            window.location.href = '/';
        } catch (error) {
            toastStore.trigger({
                message: 'Failed to complete registration',
                background: 'variant-filled-error'
            });
        }
    }
</script>

<div class="flex flex-col items-center justify-center min-h-screen">
    {#if loading}
        <div class="card variant-filled-surface p-8">
            <p>Loading...</p>
        </div>
    {:else if discordData}
        <div class="card variant-filled-surface p-8 w-96">
            <h2 class="h2 mb-4">Complete Your Registration</h2>
            
            <div class="flex items-center gap-4 mb-4">
                {#if discordData.avatar}
                    <img src={discordData.avatar} alt="Discord avatar" class="w-16 h-16 rounded-full">
                {/if}
                <div>
                    <p class="font-bold">{discordData.username}</p>
                    <p class="text-sm opacity-70">{discordData.email}</p>
                </div>
            </div>

            <form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4">
                <label class="label">
                    <span>Choose a handle</span>
                    <input
                        type="text"
                        class="input"
                        bind:value={handle}
                        placeholder="your_handle"
                        pattern={"[a-z0-9_.]{2,20}"}
                        title="2-20 characters, lowercase letters, numbers, dots, and underscores only"
                        required
                    >
                </label>
                
                <button type="submit" class="btn variant-filled-primary">Complete Registration</button>
            </form>
        </div>
    {/if}
</div>

<style>
    .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #3498db;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>