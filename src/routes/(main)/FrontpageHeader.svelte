<script lang="ts">
	import { onMount } from "svelte";

let maxPage = 1;
let currentIndex = 0;
let interval;
function nextSlide() {
    currentIndex = (currentIndex + 1) % maxPage
}
onMount(()=>{
    interval = setInterval(nextSlide, 3000)
    return () => clearInterval(interval)
})
</script>
<div class="flex gap-4 h-72 w-full relative">
    <h1>{currentIndex}</h1>
    {#if currentIndex == 0}

    {/if}
</div>