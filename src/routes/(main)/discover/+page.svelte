<script lang="ts">
	import axios from "axios";
	import config from "../../config";
	import { writable } from "svelte/store";
	import styles from "../../styles";
	import ProjectCard from "../ProjectCard.svelte";
	import ProjectCards from "../ProjectCards.svelte";


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