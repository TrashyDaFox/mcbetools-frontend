<script lang="ts">
	import axios from 'axios';
	import { writable } from 'svelte/store';
	import config from '../../../config';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

    export let data;
    let proj = writable(null);
    let status1 = 0;
    let playerName = "";
    let loading = true;
    let errored = false;
    axios.get(`${config.apiEndpoint}/proj/${data.url}`).then(res=>{
        // return;
        if(res.data.error) {
            errored = true;
            return;
        } else {
            proj.set(res.data.project)
        }
        loading = false;
    })
</script>

{#if loading}
    <div class="w-full h-full flex items-center justify-center">
        <ProgressRadial />
    </div>
{:else}
    {#if errored}
        <div class="w-full h-full flex items-center justify-center">
            <div class="card p-4 p-8 variant-ghost-error">
                <h1>Failed to load this page. Likely due to the server not being found</h1>
            </div>
        </div>
    {:else}
        <div class="w-full h-full" style="{$proj.bannerURL ? `background-image:url(${config.apiEndpoint}${$proj.bannerURL});background-size:cover;background-position:center;` : ``}">
            <div class="bg-gradient-to-b from-surface-900/50 to-surface-900 w-full h-full backdrop-blur-sm flex items-center justify-center flex-col gap-4">
                <div class="card p-4 px-8 flex flex-col gap-4">
                {#if status1 == 0}
                <h1 class="text-3xl font-bold">Vote for {$proj.title} for ingame rewards!</h1>
                <a href="/s/{$proj.url}" class="anchor">View project on MCBETools</a>
                <input type="text" placeholder="Minecraft Username" class="input" bind:value={playerName}>
                <button class="btn variant-filled-primary" on:click={()=>{
                    axios.post(`${config.apiEndpoint}/vote/${$proj.url}`, {
                        playerName
                    }).then(res=>{
                        if(res.data.error) {
                            status1 = 1;                            
                        } else {
                            status1 = 2;

                        }
                    })
                }}>Vote</button>
                <p>* Please make sure to type your Minecraft Username correctly :)</p>

                {:else if status1 == 1}
                <p class="text-error-500">Failed to vote. You probably already voted :3</p>
                {:else}
                <p class="text-success-500">Successfully voted! You can now claim your rewards ingame</p>
                {/if}
                </div>
            </div>
        </div>
    {/if}
{/if}