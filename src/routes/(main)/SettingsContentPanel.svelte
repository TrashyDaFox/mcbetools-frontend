<script>
	import { getContext } from "svelte";
	import UserPopout from "./popouts/UserPopout.svelte";
	import AccountSettings from "./AccountSettings.svelte";
	import ThemeSelector from "./ThemeSelector.svelte";

    export let valueSingle = 'theme';
    let loggedInUser = getContext("loggedInUser")
</script>
<div class="w-full">
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
    <img src="/mcbetools_beta_text.png" class="w-full h-auto" />
    <div class="w-full py-4 flex items-center justify-center flex-col gap-4">
        <p class="font-bold text-xl">Version 1.0.1</p>
        <p class="text-pink-200">Website made with &lt;3 by TrashyDaFox</p>
    
    </div>
    {/if}
    {#if valueSingle == "theme"}
    <ThemeSelector />
    {/if}
</div>