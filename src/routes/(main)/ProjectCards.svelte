<script lang="ts">
	import { RadioGroup, RadioItem } from "@skeletonlabs/skeleton";
import styles from "../styles";
	import ProjectCard from "./ProjectCard.svelte";
	import ProjectCardCompact from "./ProjectCardCompact.svelte";
    export let isDraft:boolean = false;
    export let projects = [];
    let view = 0;
</script>
<div class="w-full flex justify-end items-end">
    <RadioGroup>
        <RadioItem bind:group={view} name="viewMode" value={0}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></RadioItem>
        <RadioItem bind:group={view} name="viewMode" value={1}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></RadioItem>
    </RadioGroup>
</div>
{#if view == 0}
    <div class="{styles.submissionGrid}">
        {#each projects as project}
            <ProjectCard project={project} isDraft={isDraft} />
        {/each}
    </div>
{:else}
    <div class="p-4 flex flex-col gap-4">
        {#each projects as project}
            <ProjectCardCompact project={project} isDraft={isDraft} />
        {/each}
    </div>
{/if}
