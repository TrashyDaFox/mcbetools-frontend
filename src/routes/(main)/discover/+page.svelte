<script lang="ts">
	import { TabGroup, Tab } from "@skeletonlabs/skeleton";
    import axios from 'axios'
	import config from "../../config";
	import { writable } from "svelte/store";
	import ProjectCard from "../ProjectCard.svelte";
	import styles from "../../styles";
	import ProjectCards from "../ProjectCards.svelte";
	import MeowMeowUwU from "./MeowMeowUwU.svelte";
	import NyaMrrp from "./NyaMrrp.svelte";
	import TypePage from "./TypePage.svelte";

    let a = 0;
    let finisheadLoadingRecommendations = false;
    let exampleProj = writable(null)
    axios.get(`${config.apiEndpoint}/proj/blossom`).then(res=>{
        exampleProj.set(res.data.project)
        finisheadLoadingRecommendations = true;
    })
  

let flavors = {};

function toggle(tag: string): void {
    if(!flavors[tag]) {
        flavors[tag] = true;
        return;
    }
    flavors[tag] = !flavors[tag]
}
let tagSearchMode = "default";
let projects = writable([])
axios.get(`${config.apiEndpoint}/random`).then(res=>{
    projects.update(currValue=>{return [res.data]})
})
let query = "";
function search() {
    axios.get(`${config.apiEndpoint}/v2/search`, {
        params: {
            tagSearchMode,
            tags: Object.keys(flavors).filter(_=>flavors[_] ? true : false).join(','),
            q: query ? query : "null"
        }
    }).then(res=>{
        projects.set(res.data)
    })
}
let tags = [];
axios.get(`${config.apiEndpoint}/valid-tags`).then(res=>{
    tags = res.data.split(',')
})
</script>
<!-- <style></style> -->
<TabGroup>
    <Tab name="Reocmmendations" bind:group={a} value={0}>
        <span>Browse</span>
    </Tab>
    <Tab name="Search" bind:group={a} value={1}>
        <span>Advanced Search</span>
    </Tab>
    {#if a > 1}
        <Tab name="Search" bind:group={a} value={2} active="border-b-2 border-primary-500">
            <span class="text-primary-500">Addons</span>
        </Tab>
        <Tab name="Search" bind:group={a} value={3} active="border-b-2 border-secondary-500">
            <span class="text-secondary-500">Resource Packs</span>
        </Tab>
        <Tab name="Search" bind:group={a} value={4} active="border-b-2 border-tertiary-500">
            <span class="text-tertiary-500">Maps</span>
        </Tab>
        <Tab name="Search" bind:group={a} value={5} active="border-b-2 border-success-500">
            <span class="text-success-500">Servers</span>
        </Tab>
        <Tab name="Search" bind:group={a} value={6} active="border-b-2 border-error-500">
            <span class="text-error-500">Lists</span>
        </Tab>
    {/if}
</TabGroup>
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
{#if a == 0}
<div class="p-4 flex flex-col gap-6 max-w-none lg:max-w-6xl mx-auto">
    <div class="w-full h-56 md:h-72 rounded-lg overflow-hidden shadow-xl" style="background-image:url(/project-types-banners/maps.png);background-size:cover;background-position:center;">
        <div class="w-full h-full backdrop-blur-[7px] bg-gradient-to-bl from-surface-900/30 to-surface-900">
            <div class="p-8 flex items-end justify-start w-full h-full">
                <div class="flex flex-col">
                    <h1 class="text-5xl fancy-title2">Discover</h1>
                    <p>Discover content on MCBETools!</p>
                </div>
            </div>
        </div>
    </div>
    <!-- Filters / Navigation -->
    <div class="w-full flex gap-4 flex-col md:flex-row">
        <button class="btn variant-soft-primary flex-auto flex gap-4 items-center" on:click={()=>{
            a = 2;
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-box"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            Addons
        </button>
        <button class="btn variant-soft-secondary flex-auto flex gap-4 items-center" on:click={()=>{
            a = 3;
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-droplet"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
            Resource Packs
        </button>
        <button class="btn variant-soft-tertiary flex-auto flex gap-4 items-center" on:click={(e)=>{
            a = 4;
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
            Maps
        </button>
        <button class="btn variant-soft-success flex-auto flex gap-4 items-center" on:click={()=>{
            a = 5;
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-server"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
            Servers
        </button>
        <button class="btn variant-soft-error flex-auto flex gap-4 items-center" on:click={()=>{
            a = 6;
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            Lists
        </button>
        <!-- <div class="card card-hover variant-soft-primary overflow-hidden flex-auto max-w-[350px]">
            <div class="w-full aspect-video flex items-center justify-center">
                Resource Packs
            </div>
        </div> -->
    </div>
    <NyaMrrp />
    <MeowMeowUwU />
</div>

{/if}

{#if a == 1}
<div class="flex gap-4 p-4">
    <input type="text" placeholder="Search" class="input" bind:value={query}>
    <button class="btn variant-filled" on:click={search}>Search</button>
    <select class="select w-56">
        <option value="RECENT">Recent</option>
        <option value="MOST-POPULAR">Most Popular</option>
    </select>
</div>
<div class="px-4 pb-4 flex gap-4 flex-wrap">
    {#each tags as f}
	<button
		class="chip h-8 {flavors[f] ? 'variant-filled' : 'bg-surface-500'}"
		on:click={() => { toggle(f); }}
		on:keypress
	>
		{#if flavors[f]}<span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg></span>{/if}
		<span class="capitalize">{f}</span>
	</button>
{/each}
</div>
<div class="px-4 pb-4 flex gap-4 items-center">
    <p>Tag search mode</p>
    <select class="select" bind:value={tagSearchMode}>
        <option value="default">At least one tag</option>
        <option value="all">All tags</option>
        <option value="exclude">Exclude tags</option>
        <option value="exact">Exact</option>
    </select>
</div>
<div class="px-4 pb-4">
    <button class="btn variant-filled" on:click={()=>{
        axios.get(`${config.apiEndpoint}/random`).then(res=>{
            // projects = [];
            projects.update(currVal=>{return [res.data]})
        })
    }}>Random</button>
</div>
<hr />
<div class="px-4">
    <ProjectCards projects={$projects} />
</div>
{/if}

{#if a > 1}
    <TypePage type={a - 2} />
{/if}