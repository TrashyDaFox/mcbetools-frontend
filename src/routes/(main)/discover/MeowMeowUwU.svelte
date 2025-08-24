<script lang="ts">
	import axios from "axios";
	import { writable } from "svelte/store";
	import config from "../../config";
	import { getUserAvatar } from "../AvatarRenderer";
	import { ProgressRadial } from "@skeletonlabs/skeleton";
	import CreatorPointRenderer from "../CreatorPointRenderer.svelte";

    let featuredCreators:any = writable([]);
    let creators = [];

    axios.get(`${config.apiEndpoint}/featured-creators`).then(async res=>{
        for(const handle of res.data) {
            let res = await axios.get(`${config.apiEndpoint}/user-profile/${handle}`)
            creators.push(res.data.userData)
        }
        featuredCreators.set(creators)
    })
</script>

<div class="flex items-center justify-center gap-4">
    <div class="flex-auto bg-surface-500 h-[1px]"></div>
    <h1 class="h3 font-bold px-4 fancy-title2">⭐ Featured Creators ⭐</h1>
    <div class="flex-auto bg-surface-500 h-[1px]"></div>
</div>

{#if $featuredCreators && $featuredCreators.length}
    <div class="p-4 grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 xl2:grid-cols-5 w-full gap-4 justify-items-center flex flex-col">
        {#each $featuredCreators as creator}
            <a class="card bg-initial overflow-hidden flex flex-col w-full card-hover" href="/@{creator.handle}">
                <div class="banner w-full h-32">
                    <img src={creator.bannerURL ? `${config.apiEndpoint}${creator.bannerURL}` : `/loginbg.png`} alt="" class="w-full h-full object-cover">
                </div>
                <div class="p-4 flex gap-4">
                    <img src={getUserAvatar(creator)} class="w-16 h-16 rounded-full object-cover"/>
                    <div class="flex gap-2 flex-col">
                        <h3 class="h3 font-bold">
                            {creator.displayName}
                        </h3>
                        {#if creator.bio}
                            <p>{creator.bio}</p>
                        {/if}
                        <!-- {#if creator.creatorpoints && creator.creatorpoints > 0}
                            <CreatorPointRenderer amt={creator.creatorpoints} />
                        {/if} -->
                    </div>
                </div>
                <div class="flex-auto"></div>
                <div class="px-4 pb-4 w-full">
                    <div class="h-2"></div>
                    <hr>
                    <div class="h-2"></div>
                    <button class="btn variant-filled-primary w-full">View Profile</button>    
                </div>

            </a>
        {/each}

    </div>
{:else}
    <div class="w-full py-12 w-full flex items-center justify-center">
        <ProgressRadial />
    </div>
{/if}