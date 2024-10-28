<script lang="ts">
    import axios from "axios";
    import config from "../config"
	import { writable } from "svelte/store";
	import { getUserAvatar } from "./AvatarRenderer";
    export let teamNotif;
    let teamOwner = writable(null);
    let teamInvite = writable(null);

    axios.get(`${config.apiEndpoint}/user-profile/${teamNotif.teamOwner}`).then(res=>{
        if(res.data.userData) teamOwner.set(res.data.userData)
    })
    axios.get(`${config.apiEndpoint}/user-profile/${teamNotif.teamInvite}`).then(res=>{
        if(res.data.userData) teamInvite.set(res.data.userData)
    })
</script>
{#if $teamOwner && $teamInvite}
    <div class="card variant-filled-surface flex gap-2 p-2">
        <div class="image">
            <img src={getUserAvatar($teamInvite)} class="w-24 h-24 rounded-full"/>
        </div>
        <div class="info flex-col gap-4 p-4">
            <a href="/profiles/{$teamOwner.handle}" class="anchor"><b>{$teamOwner.displayName}</b></a> invited you to join <a href="/profiles/{$teamInvite.handle}" class="anchor"><b>{$teamInvite.displayName}</b></a>
            <div class="flex gap-2 pt-3">
                <button class="btn btn-sm variant-filled-primary">
                    Accept
                </button>
                <button class="btn btn-sm variant-filled-error">
                    Deny
                </button>
            </div>
        </div>
    </div>
{/if}