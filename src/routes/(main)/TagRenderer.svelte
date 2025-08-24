<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import tags from "../tags";

    export let tag;

    export let clickable = false;

    export let active = false;

    const dispatch = createEventDispatcher();

    function click() {
        dispatch("Click")
    }
</script>

<span class="{clickable ? "cursor-pointer " : ""}tag-renderer badge{active ? ` variant-filled` : tags[tag] && tags[tag].class ? ` ${tags[tag].class}` : ` variant-ghost-primary`}" on:click={click}>
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