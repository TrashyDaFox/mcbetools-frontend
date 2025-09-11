<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import EventRenderer from "./EventRenderer.svelte";

    // export let filterFn = ()=>{return true};
    export let events = [];
    let dispatcher = createEventDispatcher();
    function dispatch(event) {
        dispatcher('use', event._id)
    }
</script>
{#if events && events.length}
    <div class="flex gap-4 flex-col">
        {#each events as event}
            <div class="card p-4">
                <EventRenderer {event} on:click={()=>{
                    dispatch(event)
                }}>

                </EventRenderer>
            </div>
        {/each}
    </div>
{:else}
    <div class="w-full h-full flex items-center justify-center flex-col py-32">
        <h1 class="h1 font-bold fancy-title2 pb-2">Nothing here :(</h1>
        <h3 class="h3 max-w-[calc(100vw-30px)] text-center">There are no events here...</h3>
    </div>
{/if}