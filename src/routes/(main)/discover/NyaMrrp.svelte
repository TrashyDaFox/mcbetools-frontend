<script>
	import axios from "axios";
	import config from "../../config";
	import { writable } from "svelte/store";
	import ProjectCards from "../ProjectCards.svelte";
	import styles from "../../styles";
	import ProjectCard from "../ProjectCard.svelte";

    let potd = writable([])
    axios.get(`${config.apiEndpoint}/submissions-of-the-day`).then(res=>{
        potd.set(res.data)
    })
</script>

<style>
    /* HTML: <div class="loader"></div> */
/* HTML: <div class="loader"></div> */
.loader {
  width: 32px;
  aspect-ratio: 1;
  --_g: no-repeat radial-gradient(farthest-side,rgb(var(--color-primary-500)) 90%,#0000);
  background: var(--_g), var(--_g), var(--_g), var(--_g);
  background-size: 40% 40%;
  animation: l46 1s infinite;
}
@keyframes l46 {
  0%  {background-position: 0 0      ,100% 0,100% 100%,0 100%}
  40%,
  50% {background-position: 100% 100%,100% 0,0    0   ,0 100%}
  90%,
  100%{background-position: 100% 100%,0 100%,0    0   ,100% 0}
}
</style>

<div class="flex items-center justify-center flex-col">
    <div class="h-2"></div>
    <h3 class="h3 font-bold text-surface-100">Submissions of The Day</h3>
    <div class="h-2"></div>
</div>

{#if $potd.length}
    <div class="w-full flex justify-center flex-wrap gap-4">
        {#each $potd as project}
            <ProjectCard project={project} f1={true} />
        {/each}
    </div>
{:else}
    <div class="w-full h-full flex items-center justify-center">
        <div class="loader h-16 !w-16"></div>
    </div>
{/if}