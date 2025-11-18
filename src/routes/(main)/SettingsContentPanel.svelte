<script>
	import { getContext } from "svelte";
	import UserPopout from "./popouts/UserPopout.svelte";
	import AccountSettings from "./AccountSettings.svelte";
	import ThemeSelector from "./ThemeSelector.svelte";
	import versionData from "../versionData";
	import HomepageSettings from "./HomepageSettings.svelte";
	import Credits from "./credits/Credits.svelte";

    export let valueSingle = 'theme';
    let loggedInUser = getContext("loggedInUser")
</script>

<div class="w-full h-full ">
    {#if valueSingle == "account"}
    <div class="w-full flex md:flex-row flex-col gap-4 items-stretch">
        <div class="flex items-center justify-center">
            <UserPopout user={loggedInUser} />

        </div>
        <!-- <div class="h-2 block md:hidden"></div> -->
        <div class="flex-auto h-full items-stretch">
            <AccountSettings />
        </div>
    
    </div>
    {/if}
    {#if valueSingle == "profile"}
    {/if}
    {#if valueSingle == "app-info"}
    <!-- <img src="/mcbetools_beta_text.png" class="w-full h-auto" /> -->
    <!-- bg-gradient-to-br from-primary-500/10 to-primary-500/0 rounded-container-token h-full border border-primary-500/20 -->
    <div class="w-full py-4 flex items-center justify-center flex-col gap-4 ">
        <!-- <h3 class="h3 text-primary-500 flex items-center gap-2 font-bold">MCBETOOLS <span class="badge variant-filled-primary">BETA</span></h3> -->
         <img src="/appbanner2.png" alt="">
        <p class="font-bold text-3xl">Version <span class="text-primary-500 font-mono">{versionData.versionName}</span></p>
        <p class="text-pink-200 text-lg">Website made with &lt;3 by TrashyDaFox</p>
        <a href="https://discord.gg/Yg9GkuRuAE" class="btn variant-filled-primary text-white flex gap-1 discord" target="_blank">
			<img src="/discord.svg" class="w-8 h-auto fill-white" alt="Discord"/>
            <span class="text-white">
                Join Our Discord!

            </span>
        </a>
    </div>
    {/if}
    {#if valueSingle == "theme"}
    <ThemeSelector />
    {/if}
    {#if valueSingle == "homepage"}
        <HomepageSettings />
    {/if}
    {#if valueSingle == "credits"}
        <Credits />
    {/if}
    {#if valueSingle == ""}

    {/if}
</div>