<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import config from "../config";
	import { getUserAvatar } from "./AvatarRenderer";
	import { avatarDecos } from "./loggedInUserStore";
	import DOMParticle from "$lib/particle-renderer/DOMParticle.svelte";
	import Particle from "$lib/particle-renderer/Particle.svelte";

    export let profile;
    export let width = "w-10";
    export let useDomParticles = false;
    let dispatcher = createEventDispatcher();
    function click() {
        dispatcher("click")
    }
    // $: sizeClass = `w-[${size}px] h-[${size}px]`;
    $: sizeClass = ``
</script>

<div class="relative {width} aspect-square overflow-visible shrink-0 min-w-0" on:click={click}>
    {#if profile.deco1 && $avatarDecos && $avatarDecos.find(_=>_.id == profile.deco1)}
        <img src={`${config.apiEndpoint}${$avatarDecos.find(_=>_.id == profile.deco1).path}`} class="w-full h-full top-0 left-0 absolute aspect-square scale-[120%] object-cover" alt="" style="z-index: 3;">
    {/if}
    <div class="w-full h-full top-0 left-0 absolute" style="z-index: 1;pointer-events: none;">
        {#if profile.handle == "trashy"}
            {#if useDomParticles}
                <DOMParticle particleString="30a-1a1.3a0.2a20a90a0a10a5a20a20a0a0a8a0a0a0a6a1a0a0a0.6a0.3a0.6a0.3a1a0.3a1a0.3a3a1a0a0a0.784314a0a0.5a0a1a0a1a0a0.27a0a0.27a0a0a0a0a0a0a0a0a2a1a0a0a0a195a0a0a0.25a0a0a0a0a0a0a0a0a0a0a0" offX={0} offY={0} viewScale={2} width={128} height={128} parentClasses="w-full h-full scale-[150%]" />
            {:else}
                <Particle particleString="30a-1a1.3a0.2a20a90a0a10a5a20a20a0a0a8a0a0a0a6a1a0a0a0.6a0.3a0.6a0.3a1a0.3a1a0.3a3a1a0a0a0.784314a0a0.5a0a1a0a1a0a0.27a0a0.27a0a0a0a0a0a0a0a0a2a1a0a0a0a195a0a0a0.25a0a0a0a0a0a0a0a0a0a0a0" offX={0} offY={0} viewScale={2} width={128} height={128} parentClasses="w-full h-full scale-[150%]" />

            {/if}
        {/if}
        <!-- <Particle particleString="30a-1a1.3a0.2a20a90a0a10a5a20a20a0a0a8a0a0a0a4a1a0a0a1a0a0a0a1a0a1a0a2a1a0a0a0.784314a0a0.5a0a1a0a1a0a0.27a0a0.27a0a0a0a0a0a0a0a0a2a1a0a0a0a0a0a0a0.25a0a0a0a0a0a0a0a0a0a0a0" offX={0} offY={0} viewScale={2} width={128} height={128} parentClasses="w-full h-full scale-[150%]"/> -->
        
        <!-- <DOMParticle particleString="200a-1a1a0.3a200a90a360a123a0a11a0a0a0a0a0a0a0a4a1a177a360a0a0a0a0a1a0a0.18a0a28a1a0a360a1a0a0a0a1a0a1a0a0a0a0a0a0a0a180a0a0a0a1a2a1a0a0a0a3a0a0a0a0a0a0a0a0a0a0a0a0a0a0" parentClasses="" offX={0} offY={0} viewScale={2}/> -->
    </div>
    <img src={getUserAvatar(profile)} alt="" class="w-full h-full relative rounded-full object-cover aspect-square w-full h-full left-0 top-0 {sizeClass}" style="z-index: 2;">
</div>