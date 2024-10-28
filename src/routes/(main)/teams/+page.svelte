<script lang="ts">
	import axios from "axios";
	import { writable } from "svelte/store";
	import config from "../../config";
	import { onMount } from "svelte";
	import { getUserAvatar } from "../AvatarRenderer";

    let teams:any = writable([])

    onMount(()=>{
        axios.get(`${config.apiEndpoint}/my-teams`, {
            headers: {
                Authorization: localStorage.getItem("sessionToken")
            }
        }).then(async res=>{
            let teamData = [];
            for(const handle of res.data) {
                let teamUser = await axios.get(`${config.apiEndpoint}/user-profile/${handle}`, {headers: {Authorization: localStorage.getItem("sessionToken")}})
                teamData.push({...teamUser.data.userData, originalHandle: handle})
            }
            teams.set(teamData)
        })
    })
</script>

<div class="p-4">
    <button class="btn variant-ghost-surface">New Team</button>
<div class="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-5 w-full gap-4">

{#each $teams as team}
<a href={`/profiles/${team.handle}`} class="mt-4 card variant-glass-surface card-hover md:w-fit rounded-lg overflow-hidden w-96 sm:w-full flex flex-col">
    <div class="banner w-full">
        <img
            src={team.bannerURL
                ? `${config.apiEndpoint}${team.bannerURL}`
                : `/defaultbanner.png`}
            style="object-fit:cover;width:100%;aspect-ratio:16/9;"
        />
    </div>

    <section class="p-4 flex-auto">
        <h3 class="h3 font-bold flex gap-2 items-center">
            {team.displayName}
        </h3>
        <div class="border-solid border-b border-surface-200/10 w-full h-3"></div>
        <div class="h-2"></div>
        {#if team.bio}
            <p class="opacity-75 max-w-96">{team.bio}</p>
        {/if}
        <div class="h-4"></div>

    </section>

    <div class="actions p-4">
    <div class="h-2"></div>
    <div class="flex cursor-default w-full items-center gap-1" on:click={(e)=>{
        e.preventDefault();
    }}>
        <img src={getUserAvatar(team)} class="w-8 h-8 object-cover rounded-full"/>
        <a href={`/profiles/${team.handle}`} on:click={(e)=>{
            location.pathname = `/profiles/${team.handle}`
        }} class="text-xl hover:underline p-0 m-0 no-underline opacity-50 italic">@{team.handle}</a>
    </div>
    <div class="h-4"></div>
    <button class="btn btn-sm variant-filled-primary w-full" on:click={(e)=>{
        e.preventDefault();
        axios.post(`${config.apiEndpoint}/teams/login`, {
            teamHandle: team.originalHandle
        }, {
            headers: {
                Authorization: localStorage.getItem("sessionToken")
            }
        }).then(res=>{
            if(res.data) {
                localStorage.setItem("sessionToken", res.data);
                location.reload();
            }
        })
    }}>Login</button>
    </div>
</a>
{/each}

</div>
</div>
