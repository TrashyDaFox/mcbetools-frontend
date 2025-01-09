<svelte:head>
  <!-- Fira font -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap" />
</svelte:head>
<script lang="ts">
	import { getModalStore, Tab, TabGroup, Toast } from '@skeletonlabs/skeleton';
	import { Avatar } from '@skeletonlabs/skeleton';
	import axios from 'axios';
	// @ts-ignore
	import Identicon from 'identicon.js';
	import config from '../../../../config';
    import { getToastStore } from '@skeletonlabs/skeleton';
	import { writable } from 'svelte/store';
    import { Carta, MarkdownEditor } from 'carta-md';
    import 'carta-md/default.css'
    import './description/theme.css'
	import { onMount } from 'svelte';

    import { attachment } from '@cartamd/plugin-attachment';
//@ts-ignore
    const carta = new Carta({
        theme: 'github-dark'
    });
	const modalStore = getModalStore();
    const toastStore = getToastStore();
    let tabSet = 1;
    let label = "";
    let realmCode = "";
    let host = "";
    let port = "19132";
    let project = $modalStore[0].meta.project

    function isValidHost(host) {
        // Regular expression for validating IPv4
        const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    
        // Regular expression for validating domain names (simple version)
        const domainRegex = /^(?!:\/\/)([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/;
    
        // Check if the host matches IPv4 or domain pattern
        return ipv4Regex.test(host) || domainRegex.test(host);
    }
    function isValidPort(port) {
        // Check if the port is a number and within the valid range
        const portNumber = Number(port);
        return Number.isInteger(portNumber) && portNumber >= 1 && portNumber <= 65535;
    }
    let serverHostInputValid = true;
    let serverPortInputValid = false;
    function handleServerHostInput(e) {
        if(!isValidHost(e.target.value)) serverHostInputValid = true;
        else serverHostInputValid = false;
    }
    function handleServerPortInput(e) {
        if(!isValidPort(e.target.value)) serverPortInputValid = true;
        else serverPortInputValid = false;
    }
    function addJoinMethod() {
        if(tabSet == 2) {
            axios.post(`${config.apiEndpoint}/server/add-join-method`, {
                ip: host,
                port: port,
                projectURL: project,
                label: label,
                type: "server"
            }).then(res=>{
                location.reload()
            })
        } else {
            axios.post(`${config.apiEndpoint}/server/add-join-method`, {
                realmCode,
                projectURL: project,
                label,
                type: "realm"
            }).then(res=>{
                location.reload()
            })
        }
    }
</script>
<Toast/>
<style>

</style>
<div class="card bg-initial p-8">
    <TabGroup>
        <Tab bind:group={tabSet} value={1} name="tab1">Realm</Tab>
        <Tab bind:group={tabSet} value={2} name="tab2">Server</Tab>
    </TabGroup>
    <div class="h-4"></div>
    {#if tabSet == 1}
        <input type="text" class="input w-full" placeholder="Label" bind:value={label}>
        <div class="h-4"></div>
        <input type="text" class="input w-full" placeholder="Realm Code" bind:value={realmCode}>
        <div class="h-4"></div>
        <button class="btn w-full variant-filled-primary" on:click={addJoinMethod}>Add Realm</button>
    {/if}

    {#if tabSet == 2}
        <input type="text" class="input w-full" placeholder="Label" bind:value={label}>
        <div class="h-4"></div>
        <input type="text" class="input w-full {serverHostInputValid ? "!border-error-500" : ""}" placeholder="Server IP" bind:value={host} on:input={handleServerHostInput}>
        <div class="h-4"></div>
        <input type="text" class="input w-full {serverPortInputValid ? "!border-error-500" : ""}" placeholder="Server Port" bind:value={port} on:input={handleServerPortInput}>
        <div class="h-4"></div>
        <button class="btn w-full variant-filled-primary" disabled={serverHostInputValid || serverPortInputValid ? true : false} on:click={addJoinMethod}>Add Server</button>
    {/if}
</div>