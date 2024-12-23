<script lang="ts">
	import { getContext } from "svelte";
	import ProjectUpdateNotification from "./ProjectUpdateNotification.svelte";
	import config from "../config";
	import axios from "axios";
    // import TeamNotification from "./TeamNotification.svelte"
    // let notifs = [
    //     {
    //         type: 1,
    //         teamInvite: "kittyteam",
    //         teamOwner: "trash"
    //     }
    // ]
    let notifs = getContext("notificationsList")
</script>
<div class="flex pb-2 items-center justify-center">
    <h1>My notifications</h1>
</div>
{#if $notifs.length}
    <div class="p-4">
        <button class="variant-ghost-error w-full btn btn-sm" on:click={()=>{
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
        <div class="h-2"></div>
        <hr>
        <div class="h-2"></div>
        {#each $notifs.reverse() as notif}
            {#if notif.notificationType == 0}
               <ProjectUpdateNotification notif={notif} />
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