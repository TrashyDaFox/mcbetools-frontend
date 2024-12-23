<script lang="ts">
	import styles from "../styles";
	import ProjectCard from "./ProjectCard.svelte";
    export let isDraft:boolean = false;
    export let projects = [];
</script>

<div class="{styles.submissionGrid}">
    {#each projects as project}
        <ProjectCard project={project} isDraft={isDraft} />
    {/each}
</div>