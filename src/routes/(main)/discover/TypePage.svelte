<script lang="ts">
	import { Accordion, AccordionItem, Paginator, RadioGroup, RadioItem } from "@skeletonlabs/skeleton";
	import { writable } from "svelte/store";
	import ProjectCards from "../ProjectCards.svelte";
	import axios from "axios";
	import config from "../../config";
	import { onMount } from "svelte";

    export let type = 0;
    let lastKnownType = -1;
    export let sortMode = "MOST-POPULAR";
    let types = [
        ["Addons", "/project-types-banners/addon.png", "Enhance your game by adding new features!", "ADDON,SCRIPT,UTILITY"],
        ["Resource Packs", "/project-types-banners/resource-packs.png", "Change how Minecraft looks!", "RESOURCEPACK"],
        ["Maps", "/project-types-banners/maps.png", "Worlds made by the community for YOU to download!", "MAP"],
        ["Servers", "/project-types-banners/servers.png", "Play with other people, online", "SERVER"],
        ["Lists", "/project-types-banners/lists.png", "View curated content lists on MCBETools!", "SERVER"],
        ["Skin Packs", "/project-types-banners/skinpack.png", "Customize your skin ingame!", "SKINPACK"],
    ]

    let loading = writable(true)
    let query = "";
    let results = writable([])
    let maxPages = writable(1);
    let totalDocs = writable(1);
    let currentPage = writable(1);
    let limit = writable(25);
    function updateResults(resetPage = true) {
        if(resetPage) currentPage.set(1);
        loading.set(true)
        axios.get(`${config.apiEndpoint}/v2/search`, {
            params: {
                paginate: "on",
                tagSearchMode: "default",
                tags: types[type][3],
                q: query ? query : "null",
                sortMode,
                limit: $limit.toString(),
                page: $currentPage.toString(),
                ignoreDeprecated: "true"
            }
        }).then(res=>{
            results.set(res.data.projects)
            maxPages.set(res.data.totalPages)
            currentPage.set(res.data.page)
            totalDocs.set(res.data.totalCount)
            loading.set(false)
        })
    }
    let lists = writable([])
    function getLists() {
        loading.set(true)
        axios.get(`${config.apiEndpoint}/api/bookmarks/curated`, {
            headers: {
                Authorization: localStorage.getItem("sessionToken")
            }
        }).then(res=>{
            lists.set(res.data.result);
            loading.set(false)
        })
    }
    onMount(()=>{
        let interval = setInterval(()=>{
            if(lastKnownType != type) {
                loading.set(true)
                if(type != 4) updateResults()
                else getLists()
                lastKnownType = type;
            }
        }, 5)
        return ()=>{
            clearInterval(interval)
        }
    })
</script>
<style>
    .fancy-title2 {
	/* font-size: 2rem; */
	font-weight: 800;
	background: linear-gradient(
		-45deg,
		#ffadff,
		#ffd6ff,
		#cafffb,
		#d2f1ff,
		#ffadff
	);
	background-size: 300% 300%;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	animation: shimmer 4s ease-in-out infinite;
	position: relative;
}
@keyframes shimmer {
	0% { background-position: 0% 50%; }
	50% { background-position: 100% 50%; }
	100% { background-position: 0% 50%; }
}
.loader {
  width: 32px;
  aspect-ratio: 1;
  --_g: no-repeat radial-gradient(farthest-side,rgb(var(--color-primary-500)) 90%,#0000);
  background: var(--_g), var(--_g), var(--_g), var(--_g);
  background-size: 40% 40%;
  animation: l46 1s infinite;
}
@keyframes l46 {
  0%  {background-position: 0 0      ,100% 0,100% 100%,0 100%}
  40%,
  50% {background-position: 100% 100%,100% 0,0    0   ,0 100%}
  90%,
  100%{background-position: 100% 100%,0 100%,0    0   ,100% 0}
}
</style>
<div class="p-4">
    <div class="w-full h-56 md:h-72 rounded-lg overflow-hidden shadow-xl" style="background-image:url({types[type][1]});background-size:cover;background-position:center;">
        <div class="w-full h-full backdrop-blur-[7px] bg-gradient-to-bl from-surface-900/30 to-surface-900">
            <div class="p-8 flex items-end justify-start w-full h-full">
                <div class="flex flex-col">
                    <h1 class="text-5xl fancy-title2">{types[type][0]}</h1>
                    <p>{types[type][2]}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="h-4"></div>
    {#if type != 4}
        <div class="flex gap-4">
            <select class="select w-40 hidden md:block" bind:value={sortMode} on:change={()=>{
                currentPage.set(1);
                updateResults()
            }}>
                <option value="MOST-POPULAR">Most Popular</option>
                <option value="RECENT">Recent</option>
            </select>
            <input type="text" class="input" placeholder="Search..." bind:value={query} on:change={updateResults}>
            <button class="btn btn-icon variant-soft-primary" on:click={updateResults}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
        </div>
        <div class="h-4 block md:hidden"></div>
        <select class="select w-full block md:hidden" bind:value={sortMode} on:change={updateResults}>
            <option value="MOST-POPULAR">Most Popular</option>
            <option value="RECENT">Recent</option>
        </select>
        <div class="h-4"></div>
    {/if}
    {#if $loading}
        <div class="w-full flex items-center justify-center py-16 flex-col gap-4">
            <div class="loader h-16 !w-16"></div>
            <p class="text-primary-500">Loading...</p>
        </div>
    {:else}
        {#if type == 4}
            <div class="card variant-glass-surface">
                <Accordion>
                    {#each $lists as list}
                        <AccordionItem>
                            <svelte:fragment slot="summary">
                                <span class="font-bold">{list.name}</span> by <a class="anchor" href="/@{list.byHandle}">{list.by}</a>
                            </svelte:fragment>
                            <svelte:fragment slot="content">
                                <ProjectCards projects={list.projects} />
                            </svelte:fragment>
                        </AccordionItem>
                    {/each}
                </Accordion>
    
            </div>
        {:else}
            <Paginator settings={{
                amounts: [1, 2, 5, 10, 25, 50, 75, 100],
                size: $totalDocs,
                page: $currentPage - 1,
                limit: $limit
            }} on:page={(e=>{
                currentPage.set(e.detail + 1)
                updateResults(false);
            })} on:amount={(e)=>{
                limit.set(e.detail)
                updateResults()
            }}/>
            <div class="h-4"></div>
            <ProjectCards projects={$results} />
            <div class="h-4"></div>
            <Paginator settings={{
                amounts: [1, 2, 5, 10, 25, 50, 75, 100],
                size: $totalDocs,
                page: $currentPage - 1,
                limit: $limit
            }} on:page={(e=>{
                currentPage.set(e.detail + 1)
                updateResults(false);
            })} on:amount={(e)=>{
                limit.set(e.detail)
                updateResults()
            }}/>
        {/if}

    {/if}
</div>
