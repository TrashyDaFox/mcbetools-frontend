<script>
	import { Tab, TabGroup } from "@skeletonlabs/skeleton";
	import axios from "axios";
	import { writable } from "svelte/store";
	import config from "../../config";
	import MessageTable from "./MessageTable.svelte";
	import { onMount } from "svelte";
    let tabSet = 0;
    let outgoingMessages = writable([]);
    let incomingMessages = writable([])
    onMount(()=>{
        axios.get(`${config.apiEndpoint}/outgoing-messages`, {
        headers: {
            Authorization: localStorage.getItem('sessionToken')
        }
    }).then(res=>{
        outgoingMessages.set(res.data.messages);
    })
    axios.get(`${config.apiEndpoint}/incoming-messages`, {
        headers: {
            Authorization: localStorage.getItem('sessionToken')
        }
    }).then(res=>{
        incomingMessages.set(res.data.messages);
    })

    })
    let enabled = false;
</script>

{#if enabled}
    <div class="flex flex-col h-full">
        <TabGroup class="h-fit">
            <Tab bind:group={tabSet} name="tab1" value={0}>
                <span>Outgoing Messages</span>
                <span class={$outgoingMessages.length >= 1 ? "badge variant-filled-primary" : "badge variant-ghost-surface"}>
                    {$outgoingMessages.length}
                </span>
            </Tab>
            <Tab bind:group={tabSet} name="tab2" value={1}>
                <span>Incoming Messages</span>
                <span class={$incomingMessages.length >= 1 ? "badge variant-filled-primary" : "badge variant-ghost-surface"}>
                    {$incomingMessages.length}
                </span>
            </Tab>
            <div class="flex-auto"></div>
            <button class="btn bg-transparent">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell-off w-4 h-4"><path d="M13.73 21a2 2 0 0 1-3.46 0"/><path d="M18.63 13A17.89 17.89 0 0 1 18 8"/><path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14"/><path d="M18 8a6 6 0 0 0-9.33-5"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            </button>
        </TabGroup>
        
        <div class="w-full flex-auto">
            <!-- Tab Panels --->
                {#if tabSet === 0}
                    {#if $outgoingMessages.length < 1}
                        <div class="h-full flex items-center justify-center flex-col">
                            <h3 class="h3">You have not sent any messages</h3>
                            <p class="opacity-50 italic">TIP: Go to any profile to send a message</p>
                        </div>
                    {:else}
                        <MessageTable messages={$outgoingMessages} />
                    {/if}
                {:else if tabSet === 1}
                    {#if $incomingMessages.length < 1}
                        <div class="h-full flex items-center justify-center flex-col">
                            <h3 class="h3">You have no messages</h3>
                        </div>
                    {:else}
                        <MessageTable messages={$incomingMessages} />
                    {/if}
                {/if}
        
        </div>
        
    </div>
{:else}
<style>
    .movey {
        position: relative;
        animation: up-down 3s ease-in-out infinite;
    }
    .up {
        transform: translateY(-20px);

    }
        @keyframes up-down {
      0% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-20px);
      }
      100% {
        transform: translateY(0);
      }
    }
</style>

<div class="w-full h-full flex items-center justify-center flex-col gap-2 bg-gradient-to-b from-transparent to-sky-300/20 relative">
    <img src="/comming_soon_community.png" alt="" class="w-96 h-auto object-cover up">
    <img src="/community_image.png" alt="" class="h-56 w-auto object-cover movey">
    <img src="/community_particles.png" alt="" class="h-full aspect-square absolute right-0 bottom-0 -z-10" style="image-rendering:pixelated;image-rendering:crisp-edges;">
</div>
{/if}