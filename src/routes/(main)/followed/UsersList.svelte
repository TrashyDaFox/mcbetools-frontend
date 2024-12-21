<script lang="ts">
	import axios from "axios";
	import config from "../../config";
	import { writable } from "svelte/store";
	import { getUserAvatar } from "../AvatarRenderer";
    export let users;

    let userList = [];
    let userList2 = writable([])
    for(const user of users) {
        axios.get(`${config.apiEndpoint}/user-profile/${user}`).then(res=>{
            userList.push(res.data.userData)
            userList2.set(userList)
        })
    }
</script>
<div class="flex-col gap-4">
    {#each $userList2 as user}
        <div class="flex gap-4">
            <img src={getUserAvatar(user)} class="w-16 h-16 rounded-full object-cover" />
            <div class="flex-col gap-2">
                <h3 class="h3 font-bold">{user.displayName}</h3>
                <a class="opacity-50 hover:opacity-100 hover:text-primary-500 hover:underline" href="/profiles/{user.handle}">@{user.handle}</a>
            </div>
        </div>
        <hr>
    {/each}
</div>