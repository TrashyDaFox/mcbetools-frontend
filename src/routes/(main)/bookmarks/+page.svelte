<script lang="ts">
	import axios from "axios";
	import { onMount } from "svelte";
    import autoAnimate from '@formkit/auto-animate';
	import config from "../../config";
	import { writable } from "svelte/store";
	import ProjectCard from "../ProjectCard.svelte";
	import styles from "../../styles";
	import { getModalStore, initializeStores, Modal } from "@skeletonlabs/skeleton";
	import { loggedInUser } from "../loggedInUserStore";
    // initializeStores();
    const modalStore = getModalStore();
    let bookmarks = writable([])
    function load() {
        // http://localhost:3001/api/bookmarks/me
        axios.get(`${config.apiEndpoint}/api/bookmarks/me`, {
            headers: {
                Authorization: localStorage.getItem("sessionToken")
            }
        }).then(res=>{
            if(!res.data.error) bookmarks.set(res.data.folders)
        })
    }

    onMount(()=>{
        load();
    })
    export function array_move(arr, old_index, new_index) {
    while (old_index < 0) {
        old_index += arr.length;
    }
    while (new_index < 0) {
        new_index += arr.length;
    }
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing purposes
    };
</script>

<!-- <Modal /> -->

<div class="p-4">
    <button class="btn variant-filled-primary" on:click={()=>{
        modalStore.trigger({
            type: 'prompt',
            title: 'Type name for folder',
            body: 'This cant be changed later at the moment',
            response(r) {
                axios.post(`${config.apiEndpoint}/api/bookmarks/folder`, {
                    name: r
                }, {
                    headers: {
                        Authorization: localStorage.getItem("sessionToken")
                    }
                }).then(res=>{
                    load();
                })
            }
        })
    }}>Create New Folder</button>
</div>
<div class="bookmark-container" use:autoAnimate={{}}>
    {#each $bookmarks as bookmark, i1 (bookmark.id)}
    <div class="flex gap-2 items-center justify-center p-4">
        <button class="btn btn-icon variant-ghost-surface" on:click={()=>{
            // http://localhost:3001/api/bookmarks/folder/6771aa9428750543b4245bfc/move-up
            axios.post(`${config.apiEndpoint}/api/bookmarks/folder/${bookmark.id}/move-up`, {}, {
                headers: {
                    Authorization: localStorage.getItem("sessionToken")
                }
            }).then(res=>{
                load();
            })
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-up"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
        </button>
        <button class="btn btn-icon variant-ghost-surface" on:click={()=>{
            axios.post(`${config.apiEndpoint}/api/bookmarks/folder/${bookmark.id}/move-down`, {}, {
                headers: {
                    Authorization: localStorage.getItem("sessionToken")
                }
            }).then(res=>{
                load();
            })
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-down"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
        </button>
        <div class="border-b border-surface-500 flex-auto"></div>
        <p>{bookmark.name}</p>
        <div class="border-b border-surface-500 flex-auto"></div>
        <button class="btn {bookmark.showOnProfile ? "variant-filled-primary" : "variant-ghost-surface"} btn-icon" on:click={()=>{
            axios.post(`${config.apiEndpoint}/api/bookmarks/folder/${bookmark.id}/public`, {}, {
                headers: {
                    Authorization: localStorage.getItem("sessionToken")
                }
            }).then(res=>{
                load()
            })
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-globe"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        </button>
        <button class="btn {!bookmark.showOnProfile ? "variant-filled-primary" : "variant-ghost-surface"} btn-icon" on:click={()=>{
            axios.post(`${config.apiEndpoint}/api/bookmarks/folder/${bookmark.id}/private`, {}, {
                headers: {
                    Authorization: localStorage.getItem("sessionToken")
                }
            }).then(res=>{
                load()
            })
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-lock"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </button>

    </div>
    {#if $loggedInUser && $loggedInUser.role >= 2}
        <button on:click={()=>{
            axios.post(`${config.apiEndpoint}/api/bookmarks/folder/${bookmark.id}/${bookmark.curate ? "un" : ""}curate`, {}, {
                headers: {
                    Authorization: localStorage.getItem("sessionToken")
                }
            }).then(res=>{
                load()
            })
        }} class="btn variant-soft-primary ml-4 mb-4">{bookmark.curate ? "Uncurate" : "Curate"}</button>
    {/if}
    {#if !bookmark.projects.length}
        <p class="px-4 opacity-50">This list has no projects. Please go to a project page to add one</p>
    {:else}
        <div class="px-4 {styles.submissionGrid}" use:autoAnimate>
            {#each bookmark.projects as project, i2 (project.url)}
                <ProjectCard project={project} isBookmarkView={true} on:left={()=>{
                    axios.post(`${config.apiEndpoint}/api/bookmarks/folder/${bookmark.id}/project/${project.url}/move-left`, {}, {
                        headers: {
                            Authorization: localStorage.getItem("sessionToken")
                        }
                    }).then(res=>{
                        load(); // Reload and update
                    })
                }} on:right={()=>{
                    axios.post(`${config.apiEndpoint}/api/bookmarks/folder/${bookmark.id}/project/${project.url}/move-right`, {}, {
                        headers: {
                            Authorization: localStorage.getItem("sessionToken")
                        }
                    }).then(res=>{
                        load(); // Reload and update
                    })
                }} on:remove={()=>{
                    //http://localhost:3001/api/bookmarks/folder/6771a133c65f92ad4aa59325/remove-project/ex-6
                    axios.post(`${config.apiEndpoint}/api/bookmarks/folder/${bookmark.id}/remove-project/${project.url}`, {}, {
                        headers: {
                            Authorization: localStorage.getItem("sessionToken")
                        }
                    }).then(res=>{
                        load();
                    })
                }}/>
            {/each}
        </div>
    {/if}
    <div class="p-4">
        <button class="btn btn-sm variant-filled-error" on:click={()=>{
            modalStore.trigger({
                type: 'confirm',
                title: 'Are you sure?',
                body: 'Are you sure you want to delete this list? This cant be undone!',
                response(r) {
                    if(r) {
                        axios.post(`${config.apiEndpoint}/api/bookmarks/folder/${bookmark.id}/remove`, {}, {
                            headers: {
                                Authorization: localStorage.getItem("sessionToken")
                            }
                        }).then(res=>{
                            load(); // Reload and update
                        })
                    }
                }
            })
        }}>Delete Folder</button>
    </div>
    {/each}
</div>
