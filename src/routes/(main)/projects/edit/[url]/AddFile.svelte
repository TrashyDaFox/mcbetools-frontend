<svelte:head>
  <!-- Fira font -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap" />
</svelte:head>
<script lang="ts">
	import { getModalStore, Toast } from '@skeletonlabs/skeleton';
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
    let title = "";
    let url = "";
    let shortDescription = "";
    let file:any = writable(null);
    let fileTitle = "";
    let fileChangelog = "";
</script>
<Toast/>
<style>
    :global(.carta-font-code),
  :global(.carta-font-code *) {
    font-family: 'Fira Code', monospace !important;
    font-variant-ligatures: normal !important;
    font-size: 1.1rem !important;
    line-height: 1.5rem !important;
  }

:global(.fuckoffbadcss .carta-input), :global(.fuckoffbadcss .carta-renderer), :global(.fuckoffbadcss textarea) {
        width: 30rem !important;
        height: 20rem !important;
        max-width: 90vw;
        max-height: 100vh;
    }
</style>
<div class="card fuckoffbadcss bg-initial p-4 py-8">
    <h3 class="h3 font-bold">
        File Changelog
    </h3>
    <MarkdownEditor carta={carta} bind:value={fileChangelog} />
    <h3 class="h3 font-bold">File Title</h3>
    <div class="h-2"></div>
    <input type="text" placeholder="Type a title for your file" class="input" bind:value={fileTitle}>
    <div class="h-4"></div>
    <h3 class="h3 font-bold">Upload the file</h3>
    <div class="h-2"></div>
    <button class="btn btn-sm w-full variant-filled-primary" on:click={()=>{
        let fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.onchange = function() {
            if(fileInput.files && fileInput.files.length) {
                file.set(fileInput.files[0]);
            }
        }
        fileInput.click();
    }}>Upload file</button>
    {#if $file}
        <p>{$file.name}</p>
    {/if}
    <div class="h-6"></div>
    <div class="w-full bg-surface-500" style="height:1px;"></div>
    <div class="h-6"></div>
    <button class="btn btn-sm w-full variant-filled-tertiary" on:click={()=>{
        let fd = new FormData();
        fd.append('projectURL', $modalStore[0].meta.url);
        fd.append('fileTitle', fileTitle);
        fd.append('file', $file, $file.name);
        fd.append('changelog', fileChangelog);
        axios({
            method: "POST",
            url: `${config.apiEndpoint}/project/add-file`,
            data: fd,
            headers: {
                Authorization: localStorage.getItem('sessionToken')
            }
        }).then(res=>{
            if(!res.data.error) {
                location.pathname = `/s/${$modalStore[0].meta.url}`
            }
        })
    }}>Create</button>
</div>