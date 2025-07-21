<script lang="ts">
	import tags from "../tags";

    export let tag;
</script>

<span class="tag-renderer badge{tags[tag] && tags[tag].class ? ` ${tags[tag].class}` : ``}">
    {#if tags[tag] && tags[tag].prop}
        <svelte:component this={tags[tag].prop} />
    {/if}
    {tag}
</span>

<style>
    :global(.tag-renderer .badge), :global(.tag-renderer .badge > svg) {
        padding: none !important;
        margin: none !important;
    }
</style>