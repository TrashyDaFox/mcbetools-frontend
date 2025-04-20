<script lang="ts">
	import { Accordion, AccordionItem, initializeStores, Modal } from '@skeletonlabs/skeleton';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import NewProject from './NewProject.svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import axios from 'axios';
	import config from '../../config';
	import ProjectCard from '../ProjectCard.svelte';
	import Folder from './Folder.svelte';

	// initializeStores();
    const modalStore = getModalStore();
    const projects:any = writable(null);
    const collapsedFolders:any = writable([])

    onMount(()=>{
        axios.get(`${config.apiEndpoint}/collapsed-folders`, {
            headers: {
                Authorization: localStorage.getItem('sessionToken')
            }
        }).then(res=>{
            collapsedFolders.set(res.data)
        })
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
<!-- <Modal /> -->
<div class="w-full flex max-w-none flex-col">
	<div class="h-24 p-4 w-full">
        <!-- <span class="badge bg-gradient-to-br variant-gradient-secondary-tertiary">BETA</span> -->
        <h3 class="h3 font-bold flex items-center justify-center w-fit gap-2">Welcome to Projects</h3>
        <p class="opacity-50">You can manage your submissions here.</p>
        <div class="h-3 w-full"></div>
        <button class="btn btn-md variant-filled-primary flex gap-4 w-fit" on:click={()=>{
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
    {#if $projects}
        <div class="h-8"></div>
        <div class="p-4">
            <Accordion regionPanel="card bg-initial p-4 w-full !rounded-tl-none !border-t-0 !rounded-tr-none" spacing="space-y-4" regionControl="card bg-initial p-4 !rounded-bl-none !rounded-br-none">
                {#each Object.keys($projects) as key}
                    <AccordionItem open={$collapsedFolders.includes(key) ? false : true} on:toggle={(e)=>{
                        axios.post(`${config.apiEndpoint}/set-collapsed`, {folder: key, value: !e.detail.open}, {headers: {Authorization:localStorage.getItem("sessionToken")}}).then(res=>{})
                    }}>
                        <svelte:fragment slot="summary">{key}</svelte:fragment>
                        <svelte:fragment slot="content">
                            <div class="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-5 w-full p-4 gap-4">
                                {#each $projects[key] as project}
                                    <ProjectCard edit={true} project={project}>
                                        <button class="variant-soft-warning btn btn-icon" on:click={()=>{
                                            modalStore.trigger({
                                                type: 'component',
                                                component: { ref: Folder },
                                                meta: { folderList: Object.keys($projects) },
                                                response(r) {
                                                    axios.post(`${config.apiEndpoint}/set-folder`, {projectURL: project.url, category: r}, {
                                                        headers: {
                                                            Authorization: localStorage.getItem("sessionToken")
                                                        }
                                                    }).then(res=>{
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
                                                }
                                            })
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-folder"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                                        </button>
                                    </ProjectCard>
                                {/each}
                            </div>
                        </svelte:fragment>
                    </AccordionItem>
                {/each}
            </Accordion>
        </div>
    {:else}
        <div class="h-8"></div>
        <p>No projects here :(</p>
    {/if}
</div>
