<script lang="ts">
	import { LightSwitch, Tab, TabGroup } from "@skeletonlabs/skeleton";
	import CreatorLeaderboards from "./CreatorLeaderboards.svelte";
	import ProjectLeaderboards from "./ProjectLeaderboards.svelte";
	import { writable } from "svelte/store";
    let limit = writable(25);
    let tab = 0;
</script>
<!-- <LightSwitch /> -->
<div class="w-full h-full bg-gradient-to-br from-primary-400 via-secondary-400 to-tertiary-400 dark:!from-primary-900/20 dark:!via-secondary-900/20 dark:!to-tertiary-900/20">
    <div class="w-full h-full relative">
        <!-- <img src="/community_particles.png" alt="" class="fixed hidden dark:block h-screen aspect-square bottom-0 right-0 image-cover" style="pointer-events: none; image-rendering: pixelated;"> -->
        <div class="p-4 w-full">
            <div class="flex items-center flex-col justify-center w-full">
                <div class="h-8"></div>
                <h1 class="h1 fancy-title2 fancy-title3 font-bold flex items-center gap-4">LEADERBOARDS</h1>
                <!-- <div class="w-full h-[2px] px-8 bg-gradient-to-r from-[#54a7ff99] to-[#54a7ff22]"></div> -->
                <div class="h-8"></div>
                <!-- <p class="text-white">View the best creators on mcbetools!</p> -->
                <div class="max-w-[900px] w-[90%] p-0 card overflow-hidden">
                    <div class="w-full dark:bg-surface-900/10 border-b-[1px] border-surface-300 dark:border-surface-500">
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