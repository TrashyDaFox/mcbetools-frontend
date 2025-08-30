<script>
	import { getContext } from "svelte";
	import UserPopout from "./popouts/UserPopout.svelte";
	import AccountSettings from "./AccountSettings.svelte";
	import ThemeSelector from "./ThemeSelector.svelte";

    export let valueSingle = 'theme';
    let loggedInUser = getContext("loggedInUser")
</script>
<div class="w-full h-full">
    {#if valueSingle == "account"}
    <UserPopout user={loggedInUser} />
    <div class="h-2"></div>
    <div class="w-full flex items-center justify-center">
        <AccountSettings />
    </div>
    {/if}
    {#if valueSingle == "profile"}
    {/if}
    {#if valueSingle == "app-info"}
    <!-- <img src="/mcbetools_beta_text.png" class="w-full h-auto" /> -->
    <div class="w-full py-4 flex items-center justify-center flex-col gap-4 bg-gradient-to-br from-primary-500/10 to-primary-500/0 rounded-container-token h-full border border-primary-500/20">
        <h3 class="h3 text-primary-500 flex items-center gap-2 font-bold">MCBETOOLS <span class="badge variant-filled-primary">BETA</span></h3>
        <p class="font-bold text-xl">Version 1.6</p>
        <p class="text-pink-200">Website made with &lt;3 by TrashyDaFox</p>
        <a href="https://discord.gg/Yg9GkuRuAE" class="anchor" target="_blank">Join Our Discord!</a>
    </div>
    {/if}
    {#if valueSingle == "theme"}
    <ThemeSelector />
    {/if}
</div>