<script lang="ts">
	import { Tab, TabGroup } from "@skeletonlabs/skeleton";
	import CreatorLeaderboards from "./CreatorLeaderboards.svelte";
	import ProjectLeaderboards from "./ProjectLeaderboards.svelte";
	import { writable } from "svelte/store";
    let limit = writable(25);
    let tab = 0;
</script>
<div class="w-full h-full bg-surface-800">
    <div class="w-full h-full relative bg-gradient-to-br from-[#54a7ff05] to-[#54a7ff3F]">
        <img src="/community_particles.png" alt="" class="fixed h-screen aspect-square bottom-0 right-0 image-cover" style="pointer-events: none; image-rendering: pixelated;">
        <div class="p-4 w-full">
            <div class="flex items-center flex-col justify-center w-full">
                <h1 class="h1 text-[#54a7ff] font-bold flex items-center gap-4">Leaderboards <span class="badge variant-filled-primary !bg-[#54a7ff] mt-2">EARLY ALPHA</span></h1>
                <div class="h-8"></div>
                <div class="w-full h-[2px] px-8 bg-gradient-to-r from-[#54a7ff99] to-[#54a7ff22]"></div>
                <div class="h-8"></div>
                <!-- <p class="text-white">View the best creators on mcbetools!</p> -->
                <div class="max-w-[900px] w-[90%] p-0 variant-glass-surface card overflow-hidden">
                    <div class="w-full bg-surface-900/10 border-b-[1px] border-surface-500">
                        <TabGroup>
                            <Tab bind:group={tab} name="tab1" value={0}>
                                Creator Points
                            </Tab>
                            <Tab bind:group={tab} name="tab1" value={1}>
                                Projects
                            </Tab>
                        </TabGroup>    
                    </div>
                    <div class="w-full min-h-[30vh]">
                        {#if tab == 0}
                            <CreatorLeaderboards limit={$limit} />
                        {:else if tab == 1}
                            <ProjectLeaderboards limit={$limit} />
                        {/if}
                    </div>
                </div>
            </div>
        </div>
            
    </div>
</div>