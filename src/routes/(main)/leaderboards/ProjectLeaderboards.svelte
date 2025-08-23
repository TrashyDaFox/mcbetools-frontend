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
        axios.get(`${config.apiEndpoint}/leaderboards/projects/25`, {headers: {Authorization: localStorage.getItem("sessionToken")}}).then(res=>{
            creators.set(res.data)
        })
    })
    function formatNumber(num) {
    if (num >= 1e9) {
        return (num / 1e9).toFixed(1) + 'B';  // For billions
    } else if (num >= 1e6) {
        return (num / 1e6).toFixed(1) + 'M';  // For millions
    } else if (num >= 1e3) {
        return (num / 1e3).toFixed(1) + 'K';  // For thousands
    } else {
        return num.toString();  // For numbers less than 1000
    }
}

</script>

<div class="flex gap-4 flex-col p-4">
    {#each $creators as creator, i}
        <a class="cursor-pointer card-hover card {i == 0 ? "variant-soft-primary !bg-[#54a7ff22]" : "variant-soft-surface !bg-surface-900/20"} p-4 flex gap-4 items-center" href="/s/{creator.proj.url}">
            <p class="{i == 0 ? "text-[#54a7ff]" : "text-white"} text-xl p-0 m-0">#{i+1}</p>
            <img src={getUserAvatar(creator.proj)} class="w-8 h-8 rounded-full object-cover" alt="">
            <p>{creator.proj.title}</p>
            <a href="" class="text-white/50 hover:text-white no-underline hover:underline italic" on:click={(e)=>{
                e.preventDefault();
                location.href = `/@${creator.user.handle}`
            }}>By @{creator.user.handle}</a>
            <div class="flex-auto"></div>
            <div class="flex gap-3 opacity-50">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-296q85 0 144.5-59.5T684-500q0-85-59.5-144.5T480-704q-85 0-144.5 59.5T276-500q0 85 59.5 144.5T480-296Zm-.12-94Q434-390 402-422.12q-32-32.12-32-78T402.12-578q32.12-32 78-32T558-577.88q32 32.12 32 78T557.88-422q-32.12 32-78 32Zm.12 220q-144 0-264.5-76.5T29-451q-6-11-9-23.42-3-12.43-3-25.5 0-13.08 3-25.58 3-12.5 9-23.5 66-128 186.5-204.5T480-830q144 0 264.5 76.5T931-549q6 11 9 23.42 3 12.43 3 25.5 0 13.08-3 25.58-3 12.5-9 23.5-66 128-186.5 204.5T480-170Zm0-330Zm0 224q115 0 211.87-60.58T840-500q-51.26-102.84-148.13-163.42Q595-724 480-724t-211.87 60.58Q171.26-602.84 120-500q51.26 102.84 148.13 163.42Q365-276 480-276Z"/></svg>
                <span class="font-bold">{formatNumber(creator.proj.viewCount) ? formatNumber(creator.proj.viewCount) : "0"}</span>
            </div>
        </a>
    {/each}
</div>