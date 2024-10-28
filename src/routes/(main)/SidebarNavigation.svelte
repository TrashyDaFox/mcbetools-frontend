<script lang="ts">
	import { getContext, onMount } from "svelte";
	import { writable } from "svelte/store";
	import { initializeStores, Modal, getModalStore } from '@skeletonlabs/skeleton';
	import AppSettings from "./AppSettings.svelte";
	import SidebarNavigationDocs from "./docpages/[url]/SidebarNavigationDocs.svelte";
	import axios from "axios";
	import config from "../config";
    import { getDrawerStore } from "@skeletonlabs/skeleton";
	const modalStore = getModalStore();
    const drawerStore = getDrawerStore();
    let activeBg: string = "bg-primary-500/10 text-primary-100";
    let path: any = writable("/");
    let loggedInUser:any = getContext("loggedInUser");
    onMount(()=>{
        setInterval(()=>{
            path.set(location.pathname)
        },100)
    })
    let incomingMessages = writable([])
    let teams = writable([])
    onMount(()=>{
        axios.get(`${config.apiEndpoint}/my-teams`, {
            headers: {
                Authorization: localStorage.getItem(`sessionToken`)
            }
        }).then(res=>{
            teams.set(res.data);
        }).catch(err=>{

        })
        axios.get(`${config.apiEndpoint}/incoming-messages`, {
        headers: {
            Authorization: localStorage.getItem('sessionToken')
        }
    }).then(res=>{
        incomingMessages.set(res.data.messages);
    })

    })
</script>
<Modal />
<div class="w-full h-full flex flex-col">
    <div class="button-container p-4 md:hidden">
        <button class="btn btn-icon variant-ghost-surface" on:click={()=>{
            drawerStore.close()
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        </button>
        
    </div>
    <div class="flex-1 w-full">
        <nav class="list-nav p-4 relative h-full flex w-full">
    
            {#if !$path.startsWith('/docpages')}
                <!-- (optionally you can provide a label here) -->
                <ul class="h-full flex flex-col w-full">
                    <li>
                        <a href="/" class={$path == '/' ? activeBg : ""}>
                            <span class="badge">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                            </span>
                            <span class="flex-auto">Home</span>
                        </a>
                    </li>
                    {#if loggedInUser && $loggedInUser && $loggedInUser.handle}
                        <li>
                            <a href="/profiles/me" class={$path == '/profiles/me' ? activeBg : ""}>
                                <span class="badge">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                </span>
                                <span class="flex-auto">My Profile</span>
                            </a>
                        </li>
                        <li>
                            <a href="/projects" class={$path == '/projects' ? activeBg : ""}>
                                <span class="badge">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                                </span>
                                <span class="flex-auto">My Projects</span>
                            </a>
                        </li>
                        <li>
                            <a href="/messages" class={$path == '/messages' ? activeBg : ""}>
                                <span class="badge">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                                </span>
                                <span class="flex-auto">Messages</span>
                                <!-- {#if $incomingMessages && $incomingMessages.length}
                                    <span class="badge variant-filled-primary">
                                        {$incomingMessages.length}
                                    </span>
                                {/if} -->
                            </a>
                        </li>
                        {/if}
                        <!-- <li>
                            <a href="/following" class={$path == '/following' ? activeBg : ""}>
                                <span class="badge">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                                </span>
                                <span class="flex-auto">Following</span>
                            </a>
                        </li> -->
                    <!-- {/if} -->
                    <li>
                        <a href="/tagsearch?q=script" class={$path == '/tagsearch?q=script' ? activeBg : ""}>
                            <span class="badge">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-code"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                            </span>
                            <span class="flex-auto">Scripts</span>
                        </a>
                    </li>
                    <li>
                        <a href="/tagsearch?q=addon" class={$path == '/tagsearch?q=addon' ? activeBg : ""}>
                            <span class="badge">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-tool"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                            </span>
                            <span class="flex-auto">Addons</span>
                        </a>
                    </li>
                    <li>
                        <a href="/tagsearch?q=resourcepack" class={$path == '/tagsearch?q=resourcepack' ? activeBg : ""}>
                            <span class="badge">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-image"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                            </span>
                            <span class="flex-auto">Texture Packs</span>
                        </a>
                    </li>
                    <li>
                        <a href="/tagsearch?q=map" class={$path == '/tagsearch?q=map' ? activeBg : ""}>
                            <span class="badge">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
                            </span>
                            <span class="flex-auto">Maps</span>
                        </a>
                    </li>
                    <!-- {#if $loggedInUser}
                        <li>
                            <a href="/teams" class={$path == '/teams' ? activeBg : ""}>
                                <span class="badge">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-box"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                                </span>
                                <span class="flex-auto">
                                    Teams
                                    <span class="badge variant-filled-primary">
                                        {$teams.length}
                                    </span>
                                </span>
                            </a>
                        </li>
                    {/if} -->
                    <!-- 
                    <li>
                        <a href="/creators" class={$path == '/creators' ? activeBg : ""}>
                            <span class="badge">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            </span>
                            <span class="flex-auto">Creators</span>
                        </a>
                    </li> -->
                    <li>
                        <a href="/realms" class={$path == '/realms' ? activeBg : ""}>
                            <span class="badge">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-hard-drive"><line x1="22" y1="12" x2="2" y2="12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" y1="16" x2="6.01" y2="16"/><line x1="10" y1="16" x2="10.01" y2="16"/></svg>
                            </span>
                            <span class="flex-auto">Realms</span>
                        </a>
                    </li>
                    <li>
                        <a href="/community" class={$path == '/community' ? activeBg : ""}>
                            <span class="badge">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                            </span>
                            <span class="flex-auto">Community</span>
                        </a>
                    </li>
                    <li>
                        <a href="/announcements" class={$path == '/announcements' ? activeBg : ""}>
                            <span class="badge">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-at-sign"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"/></svg>
                            </span>
                            <span class="flex-auto">Announcements</span>
                        </a>
                    </li>
        
                    {#if loggedInUser && $loggedInUser && $loggedInUser.handle && $loggedInUser.role >= 3}
                        <li>
                            <a href="/staffpanel" class={$path == '/staffpanel' ? activeBg : ""}>
                                <span class="badge">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shield"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                </span>
                                <span class="flex-auto">Staff Panel</span>
                            </a>
                        </li>
                    {/if}
                    <div class="flex-auto border-solid border-b border-surface-200/10"></div>
                    <li>
                        <a on:click={()=>{
                            modalStore.trigger({
                                type: 'component',
                                component: {ref: AppSettings}
                            })
                        }} class="w-full">
                            <span class="badge">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                            </span>
                            <span class="flex-auto">App Settings</span>
                        </a>
                    </li>
                    <!-- ... -->
                </ul>
            {:else}
                <SidebarNavigationDocs />
            {/if}
        </nav>
    </div>
</div>