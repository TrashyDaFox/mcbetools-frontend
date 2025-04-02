<script lang="ts">
	import { Carta } from 'carta-md';
	import config from '../../../config';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';

    const carta = new Carta({
        theme: 'github-dark'
    });

    export let data;

    let description = writable("");
    
    onMount(()=>{
        carta.render(data.data.longDescription).then(res=>{
            description.set(res)
        })
    })
</script>

<svelte:head>
    <title>MCBETools Blog - {data.data.title}</title>
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="description" content={data.data.shortDescription} />
    <meta name="og:description" content={data.data.shortDescription} />
    <meta name="og:title" content="MCBETools Blog - {data.data.title}" />
    {#if data.data.bannerURL}
        <meta property="og:image" content={`${config.apiEndpoint}${data.data.bannerURL}`} />
    {/if}
</svelte:head>

<div class="w-full flex justify-center">
    <div class="hidden lg:block flex-auto"></div>
    <div class="w-full md:max-w-4xl">
        {#if data.data.bannerURL}
            <div class="pt-4">
                <div class="w-full aspect-video rounded-token" style="background: url({config.apiEndpoint}{data.data.bannerURL});background-size:cover;background-position:center"></div>
            </div>
        {/if}
        <div class="h-4"></div>
        <h2 class="h2 font-bold">{data.data.title}</h2>
        <div class="h-2"></div>
        <p class="text-white/50 flex gap-2 items-center">
            Posted by
            <img src="{config.apiEndpoint}{data.profile.avatarURL}" alt="" class="w-8 h-8 object-cover rounded-full">
            <a href="/@{data.profile.handle}" class="text-white hover:underline">{data.profile.displayName}</a>
        </p>
        <div class="h-2"></div>
        <hr>
        <div class="h-2"></div>
        <div class="prose prose-invert">
            {@html $description}
        </div>
        <div class="h-4"></div>
    </div>
    <div class="hidden lg:block flex-auto"></div>
</div>