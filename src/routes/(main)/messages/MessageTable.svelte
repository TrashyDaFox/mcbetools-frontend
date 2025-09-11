<script lang="ts">
	import { Avatar, getModalStore, Paginator, type PaginationSettings } from "@skeletonlabs/skeleton";
	import axios from "axios";
	import config from "../../config";
	import { getUserAvatar } from "../AvatarRenderer";
	import { createEventDispatcher } from "svelte";
	import MessageOptions from "./MessageOptions.svelte";
	import { loggedInUser } from "../loggedInUserStore";
    export let messages;
    export let outgoing = false;
    export let archived = false;
    const dispatcher = createEventDispatcher();
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
    let modalStore = getModalStore();
    let users = {};
    let readReceipts = {};
    for(const message of messages) {
        if (!users[message.to] || !users[message.author]) {
    // Get user data for both message.to and message.author
    const userRequests = [
        axios.get(`${config.apiEndpoint}/id-to-handle/${message.to}`),
        axios.get(`${config.apiEndpoint}/id-to-handle/${message.author}`)
    ];
    axios.get(`${config.apiEndpoint}/replies-unread/${message._id}`, {
        headers: {
            Authorization: localStorage.getItem("sessionToken")
        }
    }).then(res=>{
        readReceipts[message._id] = res.data && res.data.count ? res.data.count : 0
    })

    // Make both requests in parallel
    Promise.all(userRequests).then(responses => {
        const toHandle = responses[0].data.handle;
        const authorHandle = responses[1].data.handle;

        // Fetch user profiles based on handles
        const profileRequests = [
            axios.get(`${config.apiEndpoint}/user-profile/${toHandle}`),
            axios.get(`${config.apiEndpoint}/user-profile/${authorHandle}`)
        ];

        // Make the profile requests in parallel
        Promise.all(profileRequests).then(profileResponses => {
            // Store the user data in the 'users' object
            users[message.to] = profileResponses[0].data.userData;
            users[message.author] = profileResponses[1].data.userData;
        }).catch(error => {
            console.error('Error fetching user profiles:', error);
        });
    }).catch(error => {
        console.error('Error fetching user handles:', error);
    });
}

    }
</script>
<div class="m-4 p-2 card bg-initial">
    <dl class="list-dl flex flex-col gap-2">
        {#each paginatedSource as message, i}
    
            <div class="hover:bg-surface-500/50 cursor-pointer" class:variant-soft-primary={!outgoing && !message.read} on:click={()=>{
                dispatcher("open", {message: {
                    ...message,
                    user: outgoing ? users[message.author] : users[message.author]
                }})
            }}>
            {#if archived}
               <img src={message.to == $loggedInUser._id ? users[message.from] ? getUserAvatar(users[message.from]) : null : users[message.to] ? getUserAvatar(users[message.to]) : null} class="w-12 h-12 rounded-full object-cover bg-surface-400" />
            {:else if outgoing}
            <img src={users[message.to] ? getUserAvatar(users[message.to]) : null} class="w-12 h-12 rounded-full object-cover bg-surface-400" />

            {:else}
            <img src={users[message.author] ? getUserAvatar(users[message.author]) : null} class="w-12 h-12 rounded-full object-cover bg-surface-400" />

            {/if}
                <span class="flex-auto">
                    <dt class="flex gap-4">
                        {message.subject}
                        {#if !outgoing && !message.read}
                            <span class="badge variant-filled-primary">NEW</span>
                        {/if}
                        {#if archived}
                            <span class="badge variant-filled-warning">ARCHIVED</span>
                        {/if}
                        {#if !archived && outgoing}
                            <span class="badge" class:variant-filled-error={!message.read} class:variant-filled-success={message.read}>{message.read ? "READ" : "NOT READ"}</span>
                        {/if}
                    </dt>
                    {#if archived}
                        <dd class="opacity-50">
                            {message.to == $loggedInUser._id ? "INCOMING" : "OUTGOING"};
                            {#if message.to == $loggedInUser._id}
                                From: {users[message.author] ? users[message.author].displayName: "Unknown"}
                            {:else}
                                To: {users[message.to] ? users[message.to].displayName: "Unknown"}
                            {/if}
                        </dd>
                    {:else if outgoing}
                        <dd class="opacity-50">To: {users[message.to] ? users[message.to].displayName: "Unknown"}</dd>
                    {:else}
                        <dd class="opacity-50">From: {users[message.author] ? users[message.author].displayName: "Unknown"}</dd>
                    {/if}
                </span>
                {#if readReceipts[message._id]}
                    <span class="badge variant-filled-primary">{readReceipts[message._id]}</span>
                {/if}
                <button class="btn-icon variant-soft-primary" on:click|preventDefault={(e)=>{
                    e.preventDefault();
                    e.stopPropagation()
                    modalStore.trigger({
                        type: 'component',
                        component: {ref: MessageOptions},
                        meta: {message},
                    })
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-icon lucide-ellipsis"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                </button>
                <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-archive-icon lucide-archive"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg> -->
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
