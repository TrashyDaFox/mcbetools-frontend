<script lang="ts">
	import axios from "axios";
	import { writable } from "svelte/store";
	import config from "../config";
	import MinecraftTextRenderer from "./MinecraftTextRenderer.svelte";

    export let method = {};

    let pingRes = writable(null);

    if(method.type == "server") {
        axios.get(`${config.apiEndpoint}/ping-server/${method.details.ip}/${method.details.port}`).then(res=>{
            pingRes.set(res.data)
        }).catch((e)=>{})
    }
</script>
{#if method.type == "server"}
    <div class="card p-4 variant-glass-surface">
        <span class="badge variant-filled-primary">SERVER</span> {method.label}
        <div class="h-2"></div>
        <hr>
        <div class="h-2"></div>
        <div class="flex gap-2 flex-col">
            <div class="flex gap-2">
                <span class="badge variant-ghost-primary">IP</span>
                <span>{method.details.ip}</span>
            </div>
            <div class="flex gap-2">
                <span class="badge variant-ghost-secondary">PORT</span>
                <span>{method.details.port}</span>
            </div>
        </div>
        <div class="h-2"></div>
        <hr>
        <div class="h-2"></div>
        {#if $pingRes}
            {#if !$pingRes.error}
                <!-- {JSON.stringify($pingRes)} -->
                <span class={$pingRes.serverAdvertisement.playersOnline > 0 ? "text-success-500" : "text-error-500"}>{$pingRes.serverAdvertisement.playersOnline}/{$pingRes.serverAdvertisement.playersMax} Online</span>
                {#if $pingRes.serverAdvertisement.playersOnline >= $pingRes.serverAdvertisement.playersMax}
                    <span class="badge variant-filled-error">FILLED</span>
                {/if}

                <div class="p-2 card bg-initial">
                    <MinecraftTextRenderer text={`§7§oMOTD\n\n§r§f${$pingRes.serverAdvertisement.motd}`} />

                </div>
            {:else}
                <span class="badge variant-filled-error">Failed to ping server</span>
            {/if}
        {/if}
    </div>
{:else if method.type == "realm"}
    <div class="card p-4 variant-glass-surface">
        <span class="badge variant-filled-secondary">REALM</span> {method.label}
        <div class="h-2"></div>
        <hr>
        <div class="h-2"></div>
        <a href="https://realms.gg/{method.details.realmCode}" class="anchor">realms.gg/{method.details.realmCode}</a>
    </div>
{/if}