<script lang="ts">
	import { getModalStore, Toast } from '@skeletonlabs/skeleton';
	import { Avatar } from '@skeletonlabs/skeleton';
	import axios from 'axios';
	// @ts-ignore
	import Identicon from 'identicon.js';
	import config from '../../config';
    import { getToastStore } from '@skeletonlabs/skeleton';
	import { writable } from 'svelte/store';

	const modalStore = getModalStore();
    const toastStore = getToastStore();
    const projects = writable([]);
    let title = "";
    let url = "";
    let shortDescription = "";
    let joke = false;
    let filler = false;
    let submissionType = "ADDON"
</script>
<Toast/>
<div class="card bg-initial p-8 py-4">
    <h3 class="h3 font-bold">Create a project</h3>
    <div class="h-4"></div>
    <input type="text" placeholder="Title" class="input" bind:value={title}>
    <div class="h-1"></div>
    <input type="text" placeholder="Short description" class="input" bind:value={shortDescription}>
    <div class="h-1"></div>
    <input type="text" placeholder="URL" class="input" bind:value={url}>
    <div class="h-1"></div>
    <select class="select" placeholder="Submission Type" bind:value={submissionType}>
        <option value="ADDON">Addon</option>
        <option value="SCRIPT">Script</option>
        <option value="UTILITY">Utility</option>
        <option value="RESOURCEPACK">Texture pack</option>
        <option value="MAP">Map</option>
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
    <button class="w-full btn btn-sm variant-soft-tertiary" on:click={()=>{
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
</div>