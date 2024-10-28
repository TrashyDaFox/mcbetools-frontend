<script lang="ts">
	import axios from "axios";
	import { writable } from "svelte/store";
	import config from "../../config";
	import { onMount } from "svelte";
	import ProjectCard from "../ProjectCard.svelte";

    let projects = writable([]);
    let randomProject = writable(null);
    let query = writable("");
    onMount(()=>{
        let params = new URLSearchParams(window.location.search)
        query.set(params.get('q'));
        axios.get(`${config.apiEndpoint}/search`, {
            headers: {
                Authorization: localStorage.getItem('sessionToken')
            },
            params: {
                q: params.get('q')
            }
        }).then(res=>{
            if(!res.data.length) {
                axios.get(`${config.apiEndpoint}/random`).then(res=>{
                    randomProject.set(res.data);
                })
            }
            projects.set(res.data);
        })

    })
</script>
<div class="p-4">
    <div class="h-4"></div>
    <h3 class="h3 font-bold">Results for {$query}</h3>
    <div class="h-4"></div>
    {#if $projects && $projects.length}
        <div class="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-5 w-full gap-4">
            {#each $projects as project}
                <ProjectCard project={project} />
            {/each}
        </div>
    {:else}
        <p class="opacity-80 italic text-3xl">No results found :(</p>
        <div class="h-4"></div>
        {#if $randomProject}
            <p class="opacity-70 italic text-xl">Heres a random submission instead!</p>
            <div class="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-5 w-full">
                <ProjectCard project={$randomProject} />
            </div>
        {/if}
    {/if}
</div>
