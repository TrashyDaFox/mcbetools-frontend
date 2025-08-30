<script lang="ts">
	import { getContext, onMount } from "svelte";
	import ProjectUpdateNotification from "./ProjectUpdateNotification.svelte";
	import config from "../config";
	import axios from "axios";
	import NewMessageNotification from "./NewMessageNotification.svelte";
	import ReplyModal from "./ReplyModal.svelte";
	import ReplyNotification from "./ReplyNotification.svelte";
	import { writable } from "svelte/store";
	// import { permission } from "process";
    // import TeamNotification from "./TeamNotification.svelte"
    // let notifs = [
    //     {
    //         type: 1,
    //         teamInvite: "kittyteam",
    //         teamOwner: "trash"
    //     }
    // ]
    let VAPID_PUBKEY = "BMe_oLeNV93Z_jjxGZos85K1UKr4j9PYhEm913DIjHy7aJhKR-e0z7nPzb-2-8WUGf18ZixKT8YumKVs2XNXuIM";
    async function subscribe() {
        const reg = await navigator.serviceWorker.ready;
        const sub = await reg.pushManager.subscribe({
            userVisibleOnly: true,applicationServerKey: VAPID_PUBKEY
        });
        await axios.post(`${config.apiEndpoint}/subscribe`, {sub}, {headers: {Authorization: localStorage.getItem("sessionToken")}})
        showButton.set(false)
    }
    let notifs = getContext("notificationsList")

    let showButton = writable(false);

    onMount(async ()=>{
        const reg = await navigator.serviceWorker.ready;
        const subscription = await reg.pushManager.getSubscription();
        if(!subscription && Notification.permission != "granted" && Notification.permission != "denied") showButton.set(true)
    })
</script>
<!-- <div class="flex pb-2 items-center justify-center">
    <h1>My notifications</h1>
</div> -->
{#if $notifs.length}
    <div class="p-4 overflow-y-scroll">
        <button class="variant-filled-error btn" on:click={()=>{
            axios.post(`${config.apiEndpoint}/clear-notifications`, null, {
                    headers: {
                        Authorization: localStorage.getItem("sessionToken")
                    }
                }).then(res=>{
                axios.get(`${config.apiEndpoint}/my-notifications`, {
                    headers: {
                        Authorization: localStorage.getItem("sessionToken")
                    }
                }).then(res=>{
                    notifs.set(res.data)
                })
            })
        }}>
            Clear Notifications
        </button>
        {#if $showButton}
            <button class="variant-filled-success btn" on:click={subscribe}>
                Get Push Notifications
            </button>
        {/if}
        <div class="h-2"></div>
        <hr>
        <div class="h-2"></div>
        {#each $notifs.reverse() as notif}
            {#if notif.notificationType == 0}
               <ProjectUpdateNotification notif={notif} />
            {/if}
            {#if notif.notificationType == 1}
                <ProjectUpdateNotification notif={notif} />
             {/if}
             {#if notif.notificationType == 2}
                <NewMessageNotification message={notif.message} notif={notif} />
             {/if}
             {#if notif.notificationType == 3}
                 <!-- <NewMessageNotification message={notif.message} /> -->
                  <ReplyNotification message={notif.reply} notif={notif} />
                {/if}
            <div class="h-2"></div>
        {/each}
    </div>
{:else}
    <h3 class="h3 font-bold opacity-50">theres nothing here</h3>
{/if}
<!-- {#each notifs as notif}
    {#if notif.type == 1}
        <TeamNotification teamNotif={notif} />
    {/if}
{/each} -->