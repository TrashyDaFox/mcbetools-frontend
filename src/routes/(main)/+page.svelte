<script>
	import { onMount } from "svelte";
	import HomepageDefault from "./HomepageDefault.svelte";
	import { clientConfigAPI } from "$lib/mcbetools/ClientConfigAPI";
	import HomepageMinimal from "./HomepageMinimal.svelte";
	let type = 'loading';
	onMount(()=>{
		type = clientConfigAPI.get("HOMEPAGE_TYPE") ?? 'default'
	})
</script>
{#if type == 'default'}
	<HomepageDefault />
{:else if type == 'minimal'}
	<HomepageMinimal />
{/if}