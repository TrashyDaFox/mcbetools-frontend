<script lang="ts">
	import axios from "axios";
	import { writable } from "svelte/store";
	import config from "../../config";

    let guidelines = writable([
        // ["No NSFW!", "Please save our eyes, and don't upload NSFW."],
        // ["No impersonation", "Impersonation of creators on MCPEDL and other services on MCBETools is prohibited. This will result in your account being disabled until looked into further."],
        // ["No discrimination", "Any forms of discrimination (such as racism, sexism, transphobia, homophobia, etc.) are strictly prohibited. Doing so publicly on this platform will get you banned if caught."],
        // ["No underage users", "MCBETools strictly enforces the underage laws in all countries for Social Media. We hope to add child protection or parental controls in the future. Research these laws, but in the US, the general minimum age is 13 years old."],
        // ["Keep the platform pg13.", "Minecraft is a vast community, with loads of players streching from 5 to 30 year olds and we can't ban all of the underage users, so please keep swearing and arguing to a minimum."],
    ])

    axios.get(`${config.apiEndpoint}/guidelines`).then(res=>{
        guidelines.set(res.data);
    })
</script>

<div class="w-full p-4 flex items-center justify-center">
    <img src="/mcbetoolsguidelines.png" class="max-w-full h-auto object-cover" alt="">
</div>

<!-- use these to separate sections -->
<div class="p-4">
    <div class="h-4"></div>
    <hr>
    <div class="h-4"></div>
</div>

<div class="p-4 text-lg">
    <p class="italic opacity-50">Welcome to MCBETools! All of these guidelines are put in place to keep everyone in the community happy and safe! Not following these rules will result in a punishment depending on the amount of times you have broken rules and the severity of the rule that was broken.</p>
</div>

<div class="p-4">
    <div class="h-4"></div>
    <hr>
    <div class="h-4"></div>
</div>

<div class="p-4">
    {#if $guidelines && $guidelines.length}
        {#each $guidelines as guideline}
            <div class="card p-4">
                <h3 class="h3 font-bold">{guideline[0]}</h3>
                <div class="h-2"></div>
                <hr>
                <div class="h-2"></div>
                <p class="opacity-50">{guideline[1]}</p>
            </div>
            <div class="h-4"></div>
        {/each}
    {:else}
        <div class="w-full py-12 flex items-center justify-center">
            <div class="loader max-w-screen w-96"></div>

        </div>
    {/if}
</div>
