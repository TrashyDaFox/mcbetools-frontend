<script lang="ts">
	import { initializeStores, Modal } from '@skeletonlabs/skeleton';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import NewProject from './NewProject.svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import axios from 'axios';
	import config from '../../config';
	import ProjectCard from '../ProjectCard.svelte';

	initializeStores();
    const modalStore = getModalStore();
    const projects:any = writable([]);

    onMount(()=>{
        axios.get(`${config.apiEndpoint}/get-my-projects`, {
            headers: {
                Authorization: localStorage.getItem('sessionToken')
            }
        }).then(res=>{
            if(!res.data.error) {
                projects.set(res.data.userProjects);
            }
        })
    })
</script>
<Modal />
<div class="w-full flex max-w-none flex-col">
	<div class="h-24 p-4 w-full">
        <h3 class="h3 font-bold flex items-center justify-center w-fit gap-2">Welcome to Projects <span class="badge bg-gradient-to-br variant-gradient-secondary-tertiary">BETA</span></h3>
        <p class="opacity-50">You can manage your submissions here.</p>
        <div class="h-3 w-full"></div>
        <button class="btn btn-md variant-ghost flex gap-4 w-fit" on:click={()=>{
            modalStore.trigger({
                type: 'component',
                component: { ref: NewProject }
            })
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            New Project
        </button>
    </div>
    <div class="h-3"></div>
    <div class="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-5 w-full p-4 gap-4">
        {#if $projects && $projects.length}
            {#each $projects as project}
                <ProjectCard edit={true} project={project} />
            {/each}
        {:else}
            <p>No projects here :(</p>
        {/if}
    </div>
</div>
