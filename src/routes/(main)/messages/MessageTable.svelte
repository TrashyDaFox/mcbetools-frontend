<script lang="ts">
	import { Avatar, Paginator, type PaginationSettings } from "@skeletonlabs/skeleton";
	import axios from "axios";
	import config from "../../config";
	import { getUserAvatar } from "../AvatarRenderer";
    export let messages;
    let paginationSettings = {
        page: 0,
        limit: 5,
        size: messages.length,
        amounts: [3,5,10],
    } satisfies PaginationSettings;

    $: paginatedSource = messages.slice(
        paginationSettings.page * paginationSettings.limit,
        paginationSettings.page * paginationSettings.limit + paginationSettings.limit
    );
    let users = {};
    for(const message of messages) {
        if(!users[message.author]) {
            axios.get(`${config.apiEndpoint}/id-to-handle/${message.author}`).then(res=>{
                axios.get(`${config.apiEndpoint}/user-profile/${res.data.handle}`).then(res=>{
                    users[message.author] = res.data.userData;
                })
            })
        }
    }
</script>
<div class="m-4 p-2 card bg-initial">
    <dl class="list-dl flex flex-col gap-2">
        {#each paginatedSource as message, i}
    
            <div class="hover:bg-surface-400/20 cursor-pointer">
                <img src={users[message.author] ? getUserAvatar(users[message.author]) : null} class="w-12 h-12 rounded-full object-cover bg-surface-400" />
                <span class="flex-auto">
                    <dt>{message.subject}</dt>
                    <dd class="opacity-50">From: {users[message.author] ? users[message.author].displayName: "Unknown"}</dd>
                </span>
                <button class="btn-icon variant-soft-error">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                </button>
            </div>
            {#if i + 1 < paginatedSource.length}
                <hr />
            {/if}
            
            <!-- ... -->
    
        {/each}
    </dl>    
</div>
<div class="m-4">
    <Paginator
	bind:settings={paginationSettings}
	showFirstLastButtons="{true}"
	showPreviousNextButtons="{true}"
/>

</div>
