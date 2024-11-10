<script lang="ts">
	import styles from "../styles";
	import ProjectCard from "./ProjectCard.svelte";

    export let projects = [];
</script>

<div class="{styles.submissionGrid}">
    {#each projects as project}
        <ProjectCard project={project} />
    {/each}
</div>