<script lang="ts">
	import { getModalStore, initializeStores } from "@skeletonlabs/skeleton";
	import TagRenderer from "./TagRenderer.svelte";
    // initializeStores()
    const modalStore = getModalStore()
</script>

{#if $modalStore[0]}
    <div class="card p-4 flex flex-col bg-initial gap-4">
        <h3 class="h3 font-bold flex gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="currentColor"><path d="M856-390 570-104q-12 12-27 18t-30 6q-15 0-30-6t-27-18L103-457q-11-11-17-25.5T80-513v-287q0-33 23.5-56.5T160-880h287q16 0 31 6.5t26 17.5l352 353q12 12 17.5 27t5.5 30q0 15-5.5 29.5T856-390ZM260-640q25 0 42.5-17.5T320-700q0-25-17.5-42.5T260-760q-25 0-42.5 17.5T200-700q0 25 17.5 42.5T260-640Z"/></svg>
            Tags ({$modalStore[0].meta.tags.length})
        </h3>
        <hr />
        <div class="flex gap-2 flex-wrap max-w-96">
            {#each $modalStore[0].meta.tags as tag}
                <!-- <span class="badge variant-filled">{tag}</span> -->
                <TagRenderer tag={tag} />
            {/each}
        </div>
    </div>
{/if}