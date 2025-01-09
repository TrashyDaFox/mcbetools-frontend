<script lang="ts">
    import axios from 'axios';
    import autoAnimate from "@formkit/auto-animate"
    import { Avatar, ProgressBar } from '@skeletonlabs/skeleton';
    // @ts-ignore
    import Identicon from 'identicon.js';
	import { writable } from 'svelte/store';
	import config from '../../../config.js';
	import { getContext, onDestroy, onMount } from 'svelte';
    import { initializeStores, Modal } from '@skeletonlabs/skeleton';
    import { getModalStore, ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	import EditProfile from './EditProfile.svelte';
	import ProjectCard from '../../ProjectCard.svelte';
	import MessageModal from '../../MessageModal.svelte';
	import badges from '../../../badges.ts';
    import { Confetti } from "svelte-confetti"
	import { getUserAvatar } from '../../AvatarRenderer.js';
	import PromoteUser from '../../profiles/[user]/PromoteUser.svelte';
    import { page } from '$app/stores';

    let user = $page.params.user;

    $: {
        user = $page.params.user;
    }

    initializeStores();
    const modalStore = getModalStore();
    export let data;
    let profileData:any = writable({})
    let profileFinished:any = writable(false);
    let projects = writable([]);
    let mcUsername = writable(null);
    let extraMetadata = writable(null)
    let bookmarks = writable([])
    let currBookmark = "";
    let followedList = getContext("followedList")
    let followerList = getContext("followerList")
    let loggedInUser = getContext("loggedInUser")
    let userNotFound = false;
    let unsubscribe;
    function nya() {
        axios.get(`${config.apiEndpoint}/api/bookmarks/${data.user}`, {
            headers: {
                Authorization: localStorage.getItem("sessionToken")
            }
        }).then(res=>{
            if(!res.data.error) bookmarks.set(res.data.folders)
        })
        axios.get(`${config.apiEndpoint}/user-profile/${data.user}`, {
            headers: {
                Authorization: localStorage.getItem('sessionToken')
            }
        }).then(res=>{
            if(!res.data.error) {
                
                axios.get(`${config.apiEndpoint}/profiles/extra-metadata/${res.data.userData.handle}`).then(res=>{
                    extraMetadata.set(res.data)
                })


                axios.get(`${config.apiEndpoint}/mc-username/${res.data.userData.handle}`).then(res=>{
                    if(res.data.gotUsername) {
                        mcUsername.set(res.data.username);
                    }
                })
                profileData.update((val:any)=>res.data.userData);
                profileFinished.update((val:any)=>true);
                axios.get(`${config.apiEndpoint}/get-projects/${res.data.userData.handle}`).then(res=>{
                    if(!res.data.error) {
                        projects.set(res.data.userProjects)
                    }
                })
            } else {
                userNotFound = true;
            }
        })
    }

    $: {
        unsubscribe = page.subscribe(($page) => {
            if($page.params.user !== user) {
                user = $page.params.user;
                nya();
            }
        })
    }

    onDestroy(()=>{
        unsubscribe()
    })

    onMount(()=>{
        nya()
    })

    function textToHex(text: string) {
        let hex = text.split('').map(_=>{
            return _.charCodeAt(0).toString(16)
        }).join('')
        if(hex.length < 15) {
            return `5cedaf0abc4a5a9efd0126a9${hex}`
        } else {
            return `${hex}`
        }
    }
    let opacity = writable(1);
    let tabSet = 0;
    function promoteUser(role, handle) {
        axios({
                        method: "post",
                        url: `${config.apiEndpoint}/account/promote/`,
                        data: {
                            handle: $profileData.handle,
                            role: role
                        },
                        headers: {
                            Authorization: localStorage.getItem('sessionToken')
                        }
                    }).then(res=>{
                        
                    })
    /**
    <div class="card bg-initial p-4 py-8 justify-center items-center">
        <button class="btn variant-filled">Co-Owner</button>
        <button class="btn variant-filled">Admin</button>
        <button class="btn variant-filled">Mod</button>
        <button class="btn variant-filled">Demote</button>
    </div>
    */
    }
    function rolePopup() {
        modalStore.trigger({
            type: 'component',
            title: 'Promote User',
            body: 'Select a role to promote this user to',
            component: {
                ref: PromoteUser
            },
            meta: { handle: $profileData.handle }
        })
    }
</script>
<Modal />
{#if userNotFound}
    <div class="p-4">
        <div class="w-full card variant-ghost-error p-4">
            <h3 class="h3 font-bold">Error</h3>
            {#if user == "me"}
                <p>You need to be logged in to view @me</p>
            {:else}
                <p>User: {user} is not found.</p>
            {/if}
            <a href="/" class="anchor">Back to home</a>
        </div>
    </div>
{/if}
{#if $profileFinished}
    <div class="w-full flex justify-center" key={user}>
        <div class="hidden lg:block flex-auto"></div>
        <div class="w-full md:max-w-4xl">
            {#if $profileData.bannerURL}
                <div class="px-4 pt-4">
                    <div class="w-full h-56 rounded-lg" style="background-image:url({config.apiEndpoint}{$profileData.bannerURL});background-size:cover;background-position:center;background-repeat:none;"></div>
                </div>
            {/if}
            <div class="p-4 flex gap-2">
                <img src={getUserAvatar($profileData)} alt="" class="object-cover w-16 h-16 rounded-full">
                <div class="flex flex-col">
                    <div class="flex gap-2 items-center">
                        <p class="font-bold h3">{$profileData.displayName}</p>
                        {#if $profileData.badges.includes("TEAM") || $profileData.role >= 1}
                            <span class="badge variant-soft-primary h-fit">{$profileData.badges.includes("TEAM") ? "TEAM" : $profileData.role == 1 ? "MODERATOR" : $profileData.role == 2 ? "ADMIN" : $profileData.role == 3 ? "CO-OWNER" : $profileData.role == 4 ? "OWNER" : "MODERATOR"}</span>
                        {/if}
                    </div>
                    <div class="flex gap-2">
                        <p class="opacity-50">@{$profileData.handle}</p>
                        {#if $profileData.status}
                            <p>&bullet;</p>
                            <p class="italic">{$profileData.status}</p>
                        {/if}
                    </div>
                    {#if $profileData.bio}
                        <p>{$profileData.bio}</p>
                    {/if}
                    {#if $extraMetadata}
                        {#if $extraMetadata.followers == 1}
                            <p class="opacity-40">{$extraMetadata.followers} follower</p>
                        {:else}
                            <p class="opacity-40">{$extraMetadata.followers} followers</p>
                        {/if}
                    {/if}
                </div>
            </div>
            {#if $profileData.badges.filter(_=>badges[_] ? true : false).length}
                <div class="card p-2 flex gap-4">
                    {#each $profileData.badges as badge}
                        {#if badges[badge]}
                            <img src={badges[badge].icon} alt="" class="w-8 h-8 object-cover">
                        {/if}
                    {/each}

                </div>
                <div class="h-8"></div>
            {/if}
            {#if $loggedInUser}
                <div class="p-4 card w-full flex gap-4 flex-wrap items-center justify-center">
                    {#if $loggedInUser && $loggedInUser.role > 3 && $profileData && $profileData.role < 4}
                        <button class="btn btn-sm variant-ghost-surface" on:click={()=>rolePopup()}>Promote User</button>
                    {/if}
                {#if $loggedInUser && $loggedInUser.handle != $profileData.handle}
                <button class="btn btn-sm variant-ghost-surface" on:click={()=>{
                    modalStore.trigger({
                        type: 'component',
                        component: {ref: MessageModal},
                        meta: {user: $profileData.handle}
                    })
                }}>
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>
                    <span>Message</span>
                </button>
                {/if}
                {#if $loggedInUser && $loggedInUser.role >= 3}
                    <button class="btn btn-sm variant-ghost-surface" on:click={()=>{
                        modalStore.trigger({
                            type: 'confirm',
                            title: "Are you sure?",
                            body: "This will make this user the creator of the week (or queue them for the future if theres already one)",
                            response: (r)=>{
                                if(r) {
                                    axios.post(`${config.apiEndpoint}/owner/queue-cotw`, {
                                        user: $profileData.handle
                                    }, {
                                        headers: {
                                            Authorization: localStorage.getItem("sessionToken")
                                        }
                                    })
                                }
                            }
                        })
                    }}>
                        <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M5 8.999c0 1.902.765 3.627 2 4.89V21a.998.998 0 0 0 1.447.895L12 20.118l3.553 1.776a.992.992 0 0 0 .972-.043c.295-.183.475-.504.475-.851v-7.11a6.976 6.976 0 0 0 2-4.891C19 5.14 15.86 2 12 2S5 5.14 5 8.999zm7.447 9.106a1 1 0 0 0-.895 0L9 19.382v-4.067c.911.434 1.926.685 3 .685s2.089-.25 3-.685v4.066l-2.553-1.276zM12 4c2.756 0 5 2.242 5 4.999A5.006 5.006 0 0 1 12 14c-2.757 0-5-2.243-5-5.001A5.005 5.005 0 0 1 12 4z"></path></svg></span>
                        <span>Queue COTW</span>
                    </button>
    
                {/if}
                    {#if $loggedInUser && $followedList && $loggedInUser.handle != $profileData.handle}
                    <button class="btn btn-sm {$followedList.includes($profileData.handle) ? "variant-ghost-surface" : "variant-filled"} " on:click={()=>{
                        axios.post(`${config.apiEndpoint}/follow`, {
                            handle: $profileData.handle
                        }, {headers: {Authorization: localStorage.getItem("sessionToken")}}).then(res=>{
                            if(res.data.err) {
                                modalStore.trigger({
                                    type: 'alert',
                                    title: "try again lmao",
                                    body: "u cant follow urself lol"
                                })
                                return;
                            }
                            axios.get(`${config.apiEndpoint}/followed`, {headers: {Authorization: localStorage.getItem("sessionToken")}}).then(res=>{
                                followedList.set(res.data)
                            })
                        })
                    }}>
                    
                        {#if $followedList.includes($profileData.handle)}
                            <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg></span>
                            <span>Followed</span>
                        {:else}
                            <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M12 22a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22zm7-7.414V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v4.586l-1.707 1.707A.996.996 0 0 0 3 17v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-1a.996.996 0 0 0-.293-.707L19 14.586z"></path></svg></span>
                            <span>Follow</span>
                        {/if}
                    </button>
                    {/if}
        
                </div>
                <div class="h-4"></div>
            {/if}

            <div class="card w-full p-4 bg-initial flex gap-2">
                <button class="{tabSet == 0 || tabSet == 2 ? "variant-filled" : "variant-filled-surface"} btn" on:click={()=>{tabSet=0}}>Projects</button>
                {#if $loggedInUser && $loggedInUser.handle == $profileData.handle}
                    <button class="{$profileData.isCurrentUser ? "flex" : "none"} btn {tabSet == 1 ? "variant-filled" : "variant-filled-surface"}" on:click={()=>{tabSet=1}}>Edit profile</button>
                {/if}
            </div>
            <div class="h-8"></div>
            {#if tabSet == 0}
                {#if $bookmarks.length}
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {#each $bookmarks as bookmark, i}
                            <button class="flex gap-2 btn variant-ghost-surface {i == $bookmarks.length - 1 && i % 2 == 0 ? "md:col-span-2" : ""}" on:click={()=>{
                                currBookmark = bookmark.id;
                                tabSet = 2;
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-folder"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                                {bookmark.name}
                            </button>
                        {/each}
                    </div>
                    <div class="h-4"></div>
                    <hr>
                    <div class="h-4"></div>
                {/if}
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-0" use:autoAnimate={{}}>
                    {#each $projects as project, i (project.url)}
                        <ProjectCard project={project} />
                    {/each}
                </div>
            {:else if tabSet == 2}
                <button class="w-full btn variant-ghost-surface" on:click={()=>{tabSet = 0;}}>Back to user projects</button>
                <div class="h-4"></div>
                <hr>
                <div class="h-4"></div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-0" use:autoAnimate={{}}>
                    {#each $bookmarks.find(_=>_.id == currBookmark).projects as project, i (project.url)}
                        <ProjectCard project={project} />
                    {/each}
                </div>
            {:else if tabSet == 1}
                <EditProfile profileData={profileData} user={data.user} />
            {/if}
        </div>
        <div class="hidden lg:block flex-auto"></div>
    </div>
{/if}