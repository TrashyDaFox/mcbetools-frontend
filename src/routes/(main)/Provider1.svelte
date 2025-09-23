<script lang="ts">
	import { clientConfigAPI } from "$lib/mcbetools/ClientConfigAPI";
	import { onMount } from "svelte";

    onMount(()=>{
        let scale = clientConfigAPI.get("UISCALE") ?? 1;
        document.documentElement.style.setProperty("--ui-scale", scale.toString());
    })
</script>