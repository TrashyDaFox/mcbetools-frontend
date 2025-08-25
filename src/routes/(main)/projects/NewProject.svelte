<script lang="ts">
	import { getModalStore, Toast } from '@skeletonlabs/skeleton';
	import { Avatar } from '@skeletonlabs/skeleton';
	import axios from 'axios';
    import { page } from '$app/stores';
	// @ts-ignore
	import Identicon from 'identicon.js';
	import config from '../../config';
    import { getToastStore } from '@skeletonlabs/skeleton';
	import { writable } from 'svelte/store';
	import { onDestroy } from 'svelte';

	const modalStore = getModalStore();
    const toastStore = getToastStore();
    const projects = writable([]);
    let title = "";
    let url = "";
    let shortDescription = "";
    let joke = false;
    let filler = false;
    let submissionType = "ADDON"
    let validURL = false;
    let error = null;
    let timeout;
    function validateURL() {
        error = null;
        validURL = false;
        axios.get(`${config.apiEndpoint}/validate-url/${encodeURIComponent(url)}`).then(res=>{
            if(res.data.error) {
                error = res.data.message;
                validURL = false;
            } else {
                error = null;
                validURL = true;
            }
        })
    }

    $: if (url) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            validateURL();
        }, 1000);
    }
    
    onDestroy(() => clearTimeout(timeout));
</script>
<Toast/>
<div class="card bg-initial p-8 py-4 max-w-lg w-full max-h-[calc(100vh-30px)] overflow-y-auto">
    <h3 class="h3 font-bold fancy-title2 text-center w-full">Create a project</h3>
    <div class="h-4"></div>
    <p class="w-full text-right opacity-50">{title.length} / 30</p>
    <input type="text" placeholder="Title" class="input" bind:value={title} maxlength={30}>
    <div class="h-2"></div>
    <p class="w-full text-right opacity-50">{shortDescription.length} / 3000</p>
    <textarea type="text" style="resize: none;" placeholder="Short description" maxlength={3000} class="input h-32" bind:value={shortDescription} />
    <div class="h-2"></div>
    <input type="text" placeholder="URL" class="input" class:input-error={!validURL && error} bind:value={url}>
    {#if url && validURL}
        <div class="h-1"></div>
        <p><span class="opacity-50">Your project will be available at:</span></p>
        <span><span class="opacity-50">{$page.url.protocol}//{$page.url.host}/s/</span>{url}</span>
    {/if}
    {#if !validURL && error}
    <div class="h-2"></div>
    <div class="p-2 variant-soft-error card" style="
        display: block;
        max-width: 100%;
        min-width: 0;
        white-space: normal;
        overflow-wrap: break-word;
        word-wrap: break-word;
    ">
        <h3 class="text-error-400 h4 font-bold">ERROR</h3>
        {error}
    </div>
    
    {/if}
    <div class="h-1"></div>
    <p class="opacity-50">Project Type:</p>
    <select class="select" placeholder="Submission Type" bind:value={submissionType}>
        <option value="ADDON">Addon</option>
        <option value="SCRIPT">Script</option>
        <option value="UTILITY">Utility</option>
        <option value="RESOURCEPACK">Texture pack</option>
        <option value="MAP">Map</option>
        <option value="SERVER">Server</option>
        <option value="SKINPACK">Skin Pack</option>
    </select>
    <div class="h-3"></div>
    <hr />
    <div class="h-1"></div>
    <label class="flex items-center space-x-2">
		<input class="checkbox" type="checkbox" bind:checked={joke} />
        <div class="flex-col">
            <p class="font-bold">Joke submission</p>

            <p class="opacity-50 max-w-96">Only check this if this submission is a joke and not a serious project.</p>
        </div>
	</label>
    <label class="flex items-center space-x-2">
		<input class="checkbox" type="checkbox" bind:checked={filler} />
        <div class="flex-col">
            <p class="font-bold">Filler Content</p>

            <p class="opacity-50 max-w-96">If this is a submission you dont consider to be great and is just something random to upload, check this box</p>
        </div>
	</label>
    <div class="h-1"></div>
    <hr />
    <div class="h-3"></div>
    <button class="w-full btn btn-sm variant-soft-tertiary" disabled={url && validURL ? false : true} on:click={()=>{
        let formData = new FormData();
        formData.append('title', title);
        formData.append('shortDescription', shortDescription);
        formData.append('url', url);
        let tags = [];
        tags.push(submissionType);
        if(joke) tags.push("JOKE")
        if(filler) tags.push("FILLER")
        formData.append('tags', tags.join(','))
        axios({
            method: 'post',
            url: `${config.apiEndpoint}/create-project`,
            data: formData,
            headers: {
                Authorization: localStorage.getItem('sessionToken')
            }
        }).then(res=>{
            if(!res.data.error) {
                modalStore.close()
                location.reload()
            } else {
                toastStore.trigger({
                    message: `ERROR: ${res.data.message}`,
                    timeout: 5000,
                    background: 'variant-filled-error'
                })
            }
        })
    }}>
        Create
    </button>
    {#if !validURL && error}
        <p class="opacity-50">You must have a valid URL.</p>
    {:else if !url}
        <p class="opacity-50">You must have a url.</p>
    {/if}
</div>