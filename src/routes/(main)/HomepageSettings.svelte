<script>
	import { clientConfigAPI } from "$lib/mcbetools/ClientConfigAPI";
	import { ListBox, ListBoxItem } from "@skeletonlabs/skeleton";
	import { onMount } from "svelte";
    let valueSingle = 'default'
    onMount(()=>{
        valueSingle = clientConfigAPI.get("HOMEPAGE_TYPE") ?? 'default';
    })
</script>
<div class="p-4 card">
    <p class="opacity-50">Homepage Layout</p>
    <ListBox>
        <ListBoxItem bind:group={valueSingle} name="homepage-layout" value="default" on:click={()=>{
            clientConfigAPI.set("HOMEPAGE_TYPE", 'default')
        }}>Default Homepage</ListBoxItem>
        <ListBoxItem bind:group={valueSingle} name="homepage-layout" value="minimal" on:click={()=>{
            clientConfigAPI.set("HOMEPAGE_TYPE", 'minimal')
        }}>Minimal <span class="badge variant-filled-primary">BETA</span></ListBoxItem>
    </ListBox>
</div>
<div class="h-4"></div>
<div class="card variant-soft-warning p-4">
    <h3 class="font-bold text-warning-500">INFO</h3>

    <p>This is a new feature, it might have bugs and/or improvements that could be made in the future. Please suggest anything in the Discord server or messages to the @admin account!</p>
</div>