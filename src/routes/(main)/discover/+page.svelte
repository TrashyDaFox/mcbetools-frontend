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
    {/if}
</TabGroup>
{#if a == 0}
<div class="p-4 flex flex-col gap-6 max-w-none lg:max-w-6xl mx-auto">
    <!-- Filters / Navigation -->
    <div class="w-full flex gap-4 flex-col md:flex-row">
        <button class="btn variant-soft-primary flex-auto" on:click={()=>{
            a = 2;
        }}>
            Addons
        </button>
        <button class="btn variant-soft-secondary flex-auto" on:click={()=>{
            a = 3;
        }}>
            Resource Packs
        </button>
        <button class="btn variant-soft-tertiary flex-auto" on:click={(e)=>{
            a = 4;
        }}>
            Maps
        </button>
        <button class="btn variant-soft-success flex-auto" on:click={()=>{
            a = 5;
        }}>
            Servers
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