<script lang="ts">
	import axios from "axios";
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import config from "../../../config";
	import ProjectCards from "../../ProjectCards.svelte";
	import ProjectCard from "../../ProjectCard.svelte";
	import styles from "../../../styles";
	import { ProgressRadial } from "@skeletonlabs/skeleton";
    let projects = writable(null)
    onMount(()=>{
        axios.get(`${config.apiEndpoint}/pending-drafts`,{
            headers: {
                Authorization: localStorage.getItem("sessionToken")
            }
        }).then(res=>{
            projects.set(res.data)
        })
    })
</script>
{#if $projects && !$projects.length}
    <div class="w-full h-full flex items-center justify-center flex-col">
        <h1 class="h1 font-bold fancy-title2 pb-2">Nothing here...</h1>
        <h3 class="h3 max-w-[calc(100vw-30px)] text-center">There are no pending submission requests, you're caught up!</h3>
    </div>
{:else if !$projects}
    <ProgressRadial />
{:else}
    <div class="p-4 {styles.submissionGrid}">
        {#if $projects && $projects.length}
            <!-- <ProjectCards projects={$projects} isDraft={true}/> -->
            {#each $projects as project}
                <ProjectCard project={project} isDraft={true} on:modfeedback={()=>{
                    projects.set($projects.filter(_=>_.url != project.url))
                }} />
            {/each}
        {/if}
    </div>
{/if}