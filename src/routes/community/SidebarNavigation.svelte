<script lang="ts">
	import { getContext, onMount } from "svelte";
	import { writable } from "svelte/store";
	import { initializeStores, Modal, getModalStore } from '@skeletonlabs/skeleton';
	import AppSettings from "../(main)/AppSettings.svelte";
	// import SidebarNavigationDocs from "./docpages/[url]/SidebarNavigationDocs.svelte";
	import axios from "axios";
	import config from "../config";
    import { getDrawerStore } from "@skeletonlabs/skeleton";
	import GlobalSettingsPopout from "../(main)/popouts/GlobalSettingsPopout.svelte";
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
            {#if !paths.some(_=>$path.startsWith(_))}
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
                    <li>
                    <li>
                        <a href="/community" class={$path == '/community' ? activeBg : ""}>
                            <span class="badge">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                            </span>
                            <span class="flex-auto">Community</span>
                        </a>
                    </li>
                    <li>
                        <a href="/community/events" class={$path == '/community/events' ? activeBg : ""}>
                            <span class="badge">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-1 15h-6v-6h6v6zm1-10H5V7h14v2z"></path></svg>
                            </span>
                            <span class="flex-auto">Events</span>
                        </a>
                    </li>

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
</div>