<script>
	import { Tab, TabGroup } from "@skeletonlabs/skeleton";
	import SettingsContentPanel from "../SettingsContentPanel.svelte";
	import { loggedInUser } from "../loggedInUserStore";
    let valueSingle = 'app-info'
</script>
<TabGroup>
    <Tab bind:group={valueSingle} name="app-info" value="app-info">App Info</Tab>
    <Tab bind:group={valueSingle} name="theme" value="theme">Appearance</Tab>
    {#if $loggedInUser}
        <Tab bind:group={valueSingle} name="account" value="account">Account</Tab>
    {/if}
    <Tab bind:group={valueSingle} name="homepage" value="homepage">Homepage</Tab>
    <Tab bind:group={valueSingle} name="credits" value="credits">MCBETools Contributors</Tab>

</TabGroup>
<div class="p-4"></div>
<div class="p-4 w-full">
    <div class="w-full flex items-center justify-center">
        <SettingsContentPanel {valueSingle} />
    
    </div>
</div>