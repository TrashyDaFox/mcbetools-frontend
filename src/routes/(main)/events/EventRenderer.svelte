<script>
	import { createEventDispatcher } from "svelte";

    export let event;
    function fmt(date) {
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }
    let start = new Date(event.startDate);
    let end = new Date(event.endDate);
    let now = new Date();
    let dispatcher = createEventDispatcher();
    function dispatch() {
        dispatcher("click")
    }
</script>
<div class="flex-col gap-4 hover:variant-soft-primary rounded-container-token p-4" on:click={dispatch}>
    <div class="flex gap-4 items-center">
        <div class="relative flex">
            <!-- pulsing background -->
            <div class="absolute w-4 h-4 rounded-full opacity-50 animate-ping" class:bg-success-500={end >= now && start <= now} class:bg-warning-500={start >= now} class:bg-error-500={now >= end}></div>
            <!-- solid center -->
            <div class="w-4 h-4 rounded-full" class:bg-success-500={end >= now && start <= now} class:bg-warning-500={start >= now} class:bg-error-500={now >= end}></div>
        </div>
        <p>{event.name}</p>
        <p class="opacity-50">{fmt(start)} - {fmt(end)}</p>
    </div>
    {#if event.description}
        <div class="pt-4 opacity-75 italic">
            {event.description}
        </div>
    {/if}
    <slot />

</div>
