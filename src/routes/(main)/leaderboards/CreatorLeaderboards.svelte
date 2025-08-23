<script lang="ts">
	import axios from "axios";
	import config from "../../config";
	import { writable } from "svelte/store";
	import { onMount } from "svelte";
	import { getUserAvatar } from "../AvatarRenderer";
	import CreatorPointRenderer from "../CreatorPointRenderer.svelte";

    export let limit;
    let creators = writable([]);
    onMount(()=>{
        axios.get(`${config.apiEndpoint}/leaderboards/creators/25`, {headers: {Authorization: localStorage.getItem("sessionToken")}}).then(res=>{
            creators.set(res.data)
        })
    })
</script>

<div class="flex gap-4 flex-col p-4">
    {#each $creators as creator, i}
        <a class="card {i == 0 ? "variant-soft-primary !bg-[#54a7ff22]" : "variant-soft-surface !bg-surface-900/20"} p-4 flex gap-4 items-center" href="/@{creator.handle}">
            <p class="{i == 0 ? "text-[#54a7ff]" : "text-white"} text-xl p-0 m-0">#{i+1}</p>
            <img src={getUserAvatar(creator)} class="w-8 h-8 rounded-full object-cover" alt="">
            <p>{creator.displayName}</p>
            <a href="" class="text-white/50 hover:text-white no-underline hover:underline italic" onclick={(e)=>{
                e.preventDefault();
                location.href = `/@${creator.handle}`
            }}>@{creator.handle}</a>
            <div class="flex-auto"></div>
            <CreatorPointRenderer amount={creator.creatorPoints} />
        </a>
    {/each}
</div>
