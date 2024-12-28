<script lang="ts">
	import { getContext, onMount } from "svelte";
	import { writable } from "svelte/store";
	import { initializeStores, Modal, getModalStore, LightSwitch } from '@skeletonlabs/skeleton';
	import AppSettings from "./AppSettings.svelte";
	import SidebarNavigationDocs from "./docpages/[url]/SidebarNavigationDocs.svelte";
	import axios from "axios";
    import DiscoverIcon from 'svelte-icons/io/IoMdCompass.svelte'
	import config from "../config";
    import { getDrawerStore } from "@skeletonlabs/skeleton";
	import GlobalSettingsPopout from "./popouts/GlobalSettingsPopout.svelte";
	import { getUserAvatar } from "./AvatarRenderer";
	const modalStore = getModalStore();
    const drawerStore = getDrawerStore();
    let activeBg: string = "bg-primary-500/10 text-primary-100";
    let activeBgSpecial: string = "bg-gradient-to-r from-pink-300/80 to-tertiary-500/70";
    let inactiveBgSpecial: string = "bg-gradient-to-r from-pink-300/60 to-tertiary-500/30";
    let path: any = writable("/");
    let loggedInUser:any = getContext("loggedInUser");
    onMount(()=>{
        setInterval(()=>{
            path.set(location.pathname)
        },100)
    })
    let incomingMessages = writable([])
    let teams = writable([])
    let paths = ["/samplethisdoesnotexistidontwanttoshowusersthenewsidebarifudoendupfindingthisiwannalicku"];
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
    let collapsed = getContext("isSidebarCollapsed")
</script>
<style lang="postcss">
    /* .list-nav ul > li {
        @apply lg:py-0 lg:h-fit
    }
    .list-nav ul > li .badge {
        @apply lg:p-0
    } */
</style>
<Modal />
<div class="w-full h-full flex flex-col">
    <div class="pt-4 pr-4 flex justify-end items-end" on:click={()=>{
        if(!$collapsed) collapsed.set(true)
        else collapsed.set(false)
    }}>
        <!-- <LightSwitch /> -->
        <button class="variant-ghost-surface btn p-2">
            {#if !$collapsed}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M19.95 5.64 13.59 12l6.36 6.36 1.41-1.41L16.41 12l4.95-4.95-1.41-1.41zM2.64 7.05 7.59 12l-4.95 4.95 1.41 1.41L10.41 12 4.05 5.64 2.64 7.05z"></path></svg>
            {:else}
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M8.29 5.64 1.93 12l6.36 6.36 1.42-1.41L4.76 12l4.95-4.95-1.42-1.41zm6 1.41L19.24 12l-4.95 4.95 1.42 1.41L22.07 12l-6.36-6.36-1.42 1.41z"></path></svg>
            {/if}
        </button>    
    </div>
    <div class="button-container p-4 md:hidden">
        <button class="btn btn-icon variant-ghost-surface" on:click={()=>{
            drawerStore.close()
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        </button>
        
    </div>
    {#if !$collapsed}
            <div class="flex flex-col gap-4 px-4 py-2 pb-4">
                {#if $loggedInUser}
                    <div class="flex gap-4">
                        <img src={getUserAvatar($loggedInUser)} alt="" class="w-16 h-16 object-cover rounded-full">
                        <div class="flex gap-2 flex-col">
                            <h3 class="h3 font-bold p-0 m-0">{$loggedInUser.displayName}</h3>
                            <a href="/profiles/me" class="p-0 m-0 opacity-50 hover:underline hover:opacity-100 hover:text-primary-500">@{$loggedInUser.handle}</a>
                        </div>
        
                    </div>
                {/if}
                <button class="btn variant-ghost-surface btn-sm" on:click={()=>{
                                                    modalStore.trigger({
                                    type: 'component',
                                    component: {ref: AppSettings}
                                })

                }}>Settings</button>
            </div>
            <!-- <div class="flex gap-4 px-2 items-center justify-center">
                <div class="flex-auto border-b border-surface-500"></div>
                <span>Discover</span>
                <div class="flex-auto border-b border-surface-500"></div>
            </div> -->
            <nav class="list-nav px-2 py-4 w-full">
                <ul class="h-full flex w-full items-center gap-1 justify-center">
                    <li class="flex-1">
                        <a href="/" class="flex flex-col gap-1 !items-center !justify-center !w-full !h-full {$path == '/' ? activeBg : ""}">
                            <span class="badge w-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                            </span>
                            <span class="w-fit !m-0 !p-0">Home</span>
                        </a>
                    </li>
                    <li class="flex-1">
                        <a href="/discover" class="flex flex-col gap-1 {$path == '/discover' ? activeBg : ""}">
                            <span class="badge">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm3 13-8 2 2-8 8-2-2 8z"></path><circle cx="12" cy="12" r="2"></circle></svg>
                            </span>
                            <!-- {#if !$collapsed} -->
                            <span class="w-fit !m-0 !p-0">Discover</span>
                            <!-- {/if} -->
                        </a>
                    </li>

                </ul>
            </nav>
            {#if $loggedInUser}
                <!-- <div class="flex gap-4 px-2 items-center justify-center">
                    <div class="flex-auto border-b border-surface-500"></div>
                    <span>Creator</span>
                    <div class="flex-auto border-b border-surface-500"></div>
                </div> -->
                <nav class="list-nav px-2 py-4">
                    <ul class="h-full flex flex-col w-full gap-2">
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
                                <span class="flex-auto">
                                    <span class="flex gap-2">
                                        Messages
                                        {#if $incomingMessages.length}
                                            <span class="badge variant-filled-primary">
                                                {$incomingMessages.length}
                                            </span>
                                        {/if}
                                    </span>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="/followed" class={$path == '/followed' ? activeBg : ""}>
                                <span class="badge">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"></path></svg>
                                </span>
                                <span class="flex-auto">Followed Users</span>
                            </a>
                        </li>
                        {#if $loggedInUser && $loggedInUser.role >= 1}
                            <li>
                                <a href="/mod/pending" class={$path == '/mod/pending' ? activeBg : ""}>
                                    <span class="badge">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M20.995 6.9a.998.998 0 0 0-.548-.795l-8-4a1 1 0 0 0-.895 0l-8 4a1.002 1.002 0 0 0-.547.795c-.011.107-.961 10.767 8.589 15.014a.987.987 0 0 0 .812 0c9.55-4.247 8.6-14.906 8.589-15.014zM12 19.897V12H5.51a15.473 15.473 0 0 1-.544-4.365L12 4.118V12h6.46c-.759 2.74-2.498 5.979-6.46 7.897z"></path></svg>
                                    </span>
                                    <span class="flex-auto">Pending Reviews</span>
                                </a>
                            </li>
                        {/if}
                        {#if $loggedInUser && $loggedInUser.role >= 3}
                        <li>
                            <a href="/cotw-list" class={$path == '/cotw-list' ? activeBg : ""}>
                                <span class="badge">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M5 8.999c0 1.902.765 3.627 2 4.89V21a.998.998 0 0 0 1.447.895L12 20.118l3.553 1.776a.992.992 0 0 0 .972-.043c.295-.183.475-.504.475-.851v-7.11a6.976 6.976 0 0 0 2-4.891C19 5.14 15.86 2 12 2S5 5.14 5 8.999zm7.447 9.106a1 1 0 0 0-.895 0L9 19.382v-4.067c.911.434 1.926.685 3 .685s2.089-.25 3-.685v4.066l-2.553-1.276zM12 4c2.756 0 5 2.242 5 4.999A5.006 5.006 0 0 1 12 14c-2.757 0-5-2.243-5-5.001A5.005 5.005 0 0 1 12 4z"></path></svg>
                                </span>
                                <span class="flex-auto">COTW List</span>
                            </a>
                        </li>
                        {/if}
                    </ul>
                </nav>
            {/if}
        {/if}
    {#if false}
        <div class="flex-1 w-full">
            <nav class="list-nav {$collapsed ? "" : "p-4"} relative h-full flex w-full">
                {#if paths.some(_=>$path.startsWith(_))}
                    <ul class="h-full flex flex-col w-full">
                        <li>
                            <a href="/projects" class={$path == '/projects' ? activeBg : ""}>
                                <span class="badge">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                                </span>
                                {#if $collapsed}
                                    <span class="flex-auto">My Projects</span>
                                {/if}
                            </a>
                        </li>
                        <li>
                            <a href="/dev-tools" class={$path == '/dev-tools' ? activeBg : ""}>
                                <span class="badge">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M8.29 5.64 1.93 12l6.36 6.36 1.42-1.41L4.76 12l4.95-4.95-1.42-1.41zm6 1.41L19.24 12l-4.95 4.95 1.42 1.41L22.07 12l-6.36-6.36-1.42 1.41z"></path></svg>
                                </span>
                                {#if $collapsed}
                                    <span class="flex-auto">Dev Tools</span>
                                    <span class="badge variant-filled-primary">BETA</span>
                                {/if}
                            </a>
                        </li>
                        <li>
                            <a href="/dev-tools" class={$path == '/dev-tools' ? activeBg : ""}>
                                <span class="badge">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M6 22h12a2 2 0 0 0 2-2V8l-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2zm7-18 5 5h-5V4zm-4.5 7a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 8.5 11zm.5 5 1.597 1.363L13 13l4 6H7l2-3z"></path></svg>
                                </span>
                                <span class="flex-auto">My Gallery</span>
                            </a>
                        </li>
                        <li>
                            <a href="/dev-tools" class={$path == '/dev-tools' ? activeBg : ""}>
                                <span class="badge">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M3 3v17a1 1 0 0 0 1 1h17v-2H5V3H3z"></path><path d="M15.293 14.707a.999.999 0 0 0 1.414 0l5-5-1.414-1.414L16 12.586l-2.293-2.293a.999.999 0 0 0-1.414 0l-5 5 1.414 1.414L13 12.414l2.293 2.293z"></path></svg>
                                </span>
                                <span class="flex-auto">Analytics</span>
                            </a>
                        </li>
                    </ul>
                {/if}
                {#if !paths.some(_=>$path.startsWith(_))}
                    <!-- (optionally you can provide a label here) -->
                    <ul class="h-full flex flex-col w-full">
                        <li>
                            <a href="/" class={$path == '/' ? activeBg : ""}>
                                <span class="badge">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                                </span>
                                {#if !$collapsed}
                                <span class="flex-auto">Home</span>
                                {/if}
                            </a>
                        </li>
                        <li>
                            <a href="/discover" class={$path == '/discover' ? activeBg : ""}>
                                <span class="badge">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm3 13-8 2 2-8 8-2-2 8z"></path><circle cx="12" cy="12" r="2"></circle></svg>
                                </span>
                                {#if !$collapsed}
                                <span class="flex-auto">Discover</span>
                                {/if}
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
                        <!-- <li>
                            <a href="/profiles/hazel" class={($path == '/profiles/hazel' ? activeBgSpecial : inactiveBgSpecial) + " relative"}>
                                <img src="https://cdn3.emoji.gg/emojis/84765-birthdaygift.gif" alt="" class="w-8 h-8 object-cover">
                                <span class="flex-auto">@hazel</span>
                                <span class="absolute -z-10 right-5 top-1.5 text-4xl opacity-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" class="fill-white"><path d="M23 7a8.44 8.44 0 0 0-5 1.31c-.36-.41-.73-.82-1.12-1.21l-.29-.27.14-.12a3.15 3.15 0 0 0 .9-3.49A3.9 3.9 0 0 0 14 1v2a2 2 0 0 1 1.76 1c.17.4 0 .84-.47 1.31l-.23.21a16.71 16.71 0 0 0-3.41-2.2c-2.53-1.14-3.83-.61-4.47 0a2.18 2.18 0 0 0-.46.68l-.18.53L5.1 8.87C6.24 11.71 9 16.76 15 18.94l5-1.66a1 1 0 0 0 .43-.31l.21-.18c1.43-1.44.51-4.21-1.41-6.9A6.63 6.63 0 0 1 23 9zm-3.79 8.37h-.06c-.69.37-3.55-.57-6.79-3.81-.34-.34-.66-.67-.95-1-.1-.11-.19-.23-.29-.35l-.53-.64-.28-.39c-.14-.19-.28-.38-.4-.56s-.16-.26-.24-.39-.22-.34-.31-.51-.13-.24-.19-.37-.17-.28-.23-.42-.09-.23-.14-.34-.11-.27-.15-.4S8.6 6 8.58 5.9s-.06-.24-.08-.34a2 2 0 0 1 0-.24 1.15 1.15 0 0 1 0-.26l.11-.31c.17-.18.91-.23 2.23.37a13.83 13.83 0 0 1 2.49 1.54A4.17 4.17 0 0 1 12 7v2a6.43 6.43 0 0 0 3-.94l.49.46c.44.43.83.86 1.19 1.27A5.31 5.31 0 0 0 16 13.2l2-.39a3.23 3.23 0 0 1 0-1.14c1.29 1.97 1.53 3.39 1.21 3.7zM4.4 11l-2.23 6.7A3.28 3.28 0 0 0 5.28 22a3.21 3.21 0 0 0 1-.17l6.52-2.17A18.7 18.7 0 0 1 4.4 11z"></path></svg>
                                </span>

                            </a>
                        </li> -->
                        <div class="flex-auto border-solid border-b border-surface-200/10"></div>
                        {#if loggedInUser && $loggedInUser && $loggedInUser.handle && $loggedInUser.role >= 4}

                        <li>
                            <a on:click={()=>{
                                modalStore.trigger({
                                    type: 'component',
                                    component: {ref: GlobalSettingsPopout}
                                })
                            }} class="w-full">
                                <span class="badge">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M360-360H236q-24 0-35.5-21.5T203-423l299-430q10-14 26-19.5t33 .5q17 6 25 21t6 32l-32 259h155q26 0 36.5 23t-6.5 43L416-100q-11 13-27 17t-31-3q-15-7-23.5-21.5T328-139l32-221Z"/></svg>
                                </span>
                                <span class="flex-auto flex gap-4">Global <span class="badge variant-filled-tertiary">OWNER</span></span>
                            </a>
                        </li>

                        {/if}
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
    {/if}
</div>