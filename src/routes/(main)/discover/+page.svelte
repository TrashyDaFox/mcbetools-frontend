<script lang="ts">
	import { TabGroup, Tab } from "@skeletonlabs/skeleton";
    import axios from 'axios'
	import config from "../../config";
	import { writable } from "svelte/store";
	import ProjectCard from "../ProjectCard.svelte";
	import styles from "../../styles";
	import ProjectCards from "../ProjectCards.svelte";
	import MeowMeowUwU from "./MeowMeowUwU.svelte";

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
<TabGroup>
    <Tab name="Reocmmendations" bind:group={a} value={0}>
        <span>Browse</span>
    </Tab>
    <Tab name="Search" bind:group={a} value={1}>
        <span>Advanced Search</span>
    </Tab>
</TabGroup>
{#if a == 0}
    <div class="p-4">
        <!-- {#if finisheadLoadingRecommendations}
            <ProjectCards projects={[$exampleProj,$exampleProj,$exampleProj,$exampleProj,$exampleProj]} />
        {/if} -->
        <div class="p-4">
            <div class="flex gap-4 items-center justify-center py-4 w-full">
                <button class="btn variant-ghost-surface flex gap-4 text-red-200 text-xl font-bold" on:click={()=>{
                    flavors = {ADDON:true};
                    tagSearchMode = "default";
                    query = "";
                    search();
                    a = 1;
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="m21.512 6.112-3.89 3.889-3.535-3.536 3.889-3.889a6.501 6.501 0 0 0-8.484 8.486l-6.276 6.275a.999.999 0 0 0 0 1.414l2.122 2.122a.999.999 0 0 0 1.414 0l6.275-6.276a6.501 6.501 0 0 0 7.071-1.414 6.504 6.504 0 0 0 1.414-7.071z"></path></svg>
                    Addons
                </button>
                <button class="btn variant-ghost-surface flex gap-4 text-green-200 text-xl font-bold"  on:click={()=>{
                    flavors = {RESOURCEPACK:true};
                    tagSearchMode = "default";
                    query = "";
                    search();
                    a = 1;
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="m21.207 11.278-2.035-2.035-1.415-1.415-5.035-5.035a.999.999 0 0 0-1.414 0L6.151 7.949 4.736 9.363a2.985 2.985 0 0 0-.878 2.122c0 .802.313 1.556.879 2.121l.707.707-2.122 2.122a2.925 2.925 0 0 0-.873 2.108 2.968 2.968 0 0 0 1.063 2.308 2.92 2.92 0 0 0 1.886.681c.834 0 1.654-.341 2.25-.937l2.039-2.039.707.706c1.133 1.133 3.107 1.134 4.242.001l.708-.707.569-.569.138-.138 5.156-5.157a.999.999 0 0 0 0-1.414zm-7.277 5.865-.708.706a1.021 1.021 0 0 1-1.414 0l-1.414-1.413a.999.999 0 0 0-1.414 0l-2.746 2.745a1.192 1.192 0 0 1-.836.352.914.914 0 0 1-.595-.208.981.981 0 0 1-.354-.782.955.955 0 0 1 .287-.692l2.829-2.829a.999.999 0 0 0 0-1.414l-1.414-1.415c-.189-.188-.293-.438-.293-.706s.104-.519.293-.708l.707-.707 3.536 3.536 3.536 3.535z"></path></svg>
                    Resource Packs
                </button>
                <button class="btn variant-ghost-surface flex gap-4 text-blue-200 text-xl font-bold"  on:click={()=>{
                    flavors = {MAP:true};
                    tagSearchMode = "default";
                    query = "";
                    search();
                    a = 1;
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="m9 6.882-7-3.5v13.236l7 3.5 6-3 7 3.5V7.382l-7-3.5-6 3zM15 15l-6 3V9l6-3v9z"></path></svg>
                    Maps
                </button>
                <button class="btn variant-ghost-surface flex gap-4 text-yellow-200 text-xl font-bold"  on:click={()=>{
                    a = 1;
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path></svg>
                    Advanced Search
                </button>
            </div>
        </div>
    </div>
    <MeowMeowUwU />
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