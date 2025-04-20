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
<div class="p-4 {styles.submissionGrid}">
    {#if $projects && !$projects.length}
        <h3 class="h3 font-bold">There are no pending submission requests</h3>
    {/if}

    {#if !$projects}
        <ProgressRadial />
    {/if}

    {#if $projects && $projects.length}
        <!-- <ProjectCards projects={$projects} isDraft={true}/> -->
        {#each $projects as project}
            <ProjectCard project={project} isDraft={true} on:modfeedback={()=>{
                projects.set($projects.filter(_=>_.url != project.url))
            }} />
        {/each}
    {/if}
</div>