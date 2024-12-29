<script lang="ts">
	import axios from "axios";
	import config from "../config";
	import { writable } from "svelte/store";
	import { getUserAvatar } from "./AvatarRenderer";
	import { getContext } from "svelte";
    let notificationsList = getContext("notificationsList")

    export let notif;
    export let message;
    let messageData = writable(null)
    let user = writable(null)
    axios.get(`${config.apiEndpoint}/message/${message}`, {
        headers: {
            Authorization: localStorage.getItem("sessionToken")
        }
    }).then(async res=>{
        messageData.set(res.data)
        let handle = await axios.get(`${config.apiEndpoint}/id-to-handle/${res.data.author}`);
        let profile = await axios.get(`${config.apiEndpoint}/user-profile/${handle.data.handle}`);
        user.set(profile.data.userData);
    })
</script>
{#if $messageData && $user}
    <div class="card variant-filled-surface w-full p-4">
        <p class="font-bold">New Message: {$messageData.subject}</p>
        <div class="flex gap-2">
            <img src={getUserAvatar($user)} alt="" class="w-12 h-12 rounded-lg">
            <div class="flex-col">
                <p>{$user.displayName}</p>
                <a href="/profiles/{$user.handle}" class="opacity-50 hover:opacity-100 hover:text-primary-500">@{$user.handle}</a>
            </div>
        </div>
        <div class="h-4"></div>
        <div class="flex gap-2">
            <button class="btn variant-filled-primary btn-sm" on:click={()=>{
                window.location = `/messages?id=${message}`
            }}>
                View
            </button>
            <button class="w-8 h-8 btn btn-icon variant-soft-error" on:click={()=>{
                axios.post(`${config.apiEndpoint}/clear-notification`, {
                    notification: notif._id
                }, {
                    headers: {
                        Authorization: localStorage.getItem("sessionToken")
                    }
                }).then(res=>{
                    axios.get(`${config.apiEndpoint}/my-notifications`, {
                        headers: {
                            Authorization: localStorage.getItem("sessionToken")
                        }
                    }).then(res=>{
                        notificationsList.set(res.data)
                    })
                })
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;" class="w-4 h-4"><path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path></svg>
            </button>
        </div>
    </div>
{/if}