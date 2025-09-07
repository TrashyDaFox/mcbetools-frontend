<script lang="ts">
	import axios from "axios";
	import config from "../../config";
	import { writable } from "svelte/store";
	import { onMount } from "svelte";
	import { getUserAvatar } from "../AvatarRenderer";
	import CreatorPointRenderer from "../CreatorPointRenderer.svelte";

    export let limit;
    let creators = writable([]);
    onMount(()=>{
        axios.get(`${config.apiEndpoint}/leaderboards/creators/25`, {headers: {Authorization: localStorage.getItem("sessionToken")}}).then(res=>{
            creators.set(res.data)
        })
    })
</script>

<div class="flex gap-4 flex-col p-4">
    <!-- <a href="" class="p-4 variant-soft-nonary">FRFERUFER*(FUE(R*))</a> -->
    {#each $creators as creator, i}
    <a
      class="card 
        {i == 0 ? 'variant-soft-quinary' : ''} 
        {i == 1 ? 'variant-soft-nonary' : ''} 
        {i == 2 ? 'variant-soft-senary' : ''} 
        {i > 2 ? 'variant-ghost-surface !bg-surface-200 dark:!bg-surface-600/20' : ''} 
        p-4 flex gap-4 items-center"
      href="/@{creator.handle}"
    >
      <p
        class="{i == 0 ? 'text-quinary-700 dark:text-quinary-200' : ''} 
               {i == 1 ? 'text-nonary-700 dark:text-nonary-200' : ''} 
               {i == 2 ? 'text-senary-700 dark:text-senary-200' : ''} 
               {i > 2 ? 'text-black dark:text-white' : ''} 
               text-xl p-0 m-0"
      >
        #{i+1}
      </p>
      <img src={getUserAvatar(creator)} class="w-8 h-8 rounded-full object-cover" alt="" />
      <p class="text-black dark:text-white">{creator.displayName}</p>
      <a
        href=""
        class="text-white/50 hover:text-white no-underline hover:underline italic"
        onclick={(e)=>{
          e.preventDefault();
          location.href = `/@${creator.handle}`
        }}
      >
        @{creator.handle}
      </a>
      <div class="flex-auto"></div>
      <CreatorPointRenderer amt={creator.creatorpoints} />
    </a>
  {/each}
  
</div>
