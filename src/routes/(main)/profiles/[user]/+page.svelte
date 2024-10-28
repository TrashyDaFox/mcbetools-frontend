<script lang="ts">
    import axios from 'axios';
    import { Avatar, ProgressBar } from '@skeletonlabs/skeleton';
    // @ts-ignore
    import Identicon from 'identicon.js';
	import { writable } from 'svelte/store';
	import config from '../../../config.js';
	import { onMount } from 'svelte';
    import { initializeStores, Modal } from '@skeletonlabs/skeleton';
    import { getModalStore } from '@skeletonlabs/skeleton';
	import EditProfile from './EditProfile.svelte';
	import ProjectCard from '../../ProjectCard.svelte';
	import MessageModal from '../../MessageModal.svelte';
			
    initializeStores();
    const modalStore = getModalStore();
    export let data;
    let profileData:any = writable({})
    let profileFinished:any = writable(false);
    let projects = writable([]);
    let mcUsername = writable(null);
    onMount(()=>{

        axios.get(`${config.apiEndpoint}/user-profile/${data.user}`, {
            headers: {
                Authorization: localStorage.getItem('sessionToken')
            }
        }).then(res=>{
            if(!res.data.error) {
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
            }
        })
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
</script>
<Modal />
<div class="container h-full h-full flex p-0 max-w-none">
    {#if $profileFinished}
        <div class="profile-display w-full">
            <div class="lg:p-4 w-full">
                <div class="banner-container flex items-center justify-center w-full relative h-52 lg:h-96 md:h-72">
                    {#if $profileData.bannerURL}
                        <div class="banner w-full h-52 lg:h-96 md:h-72 lg:rounded-lg absolute h-full blur-3xl opacity-80" style={`background:url(${config.apiEndpoint}${$profileData.bannerURL});background-size:cover;background-position:center;`}></div>
                        <div class="banner w-full h-52 lg:h-96 md:h-72 lg:rounded-lg absolute h-full lg:shadow-xl" style={`background:url(${config.apiEndpoint}${$profileData.bannerURL});background-size:cover;background-position:center;opacity:${$opacity}`}></div>
                    {:else}
                        <div class="banner w-full h-52 lg:h-96 md:h-72 lg:rounded-lg absolute h-full blur-3xl opacity-80" style={`background:url(/defaultbanner.png);background-size:cover;background-position:center;`}></div>
                        <div class="banner w-full h-52 lg:h-96 md:h-72 lg:rounded-lg absolute h-full lg: shadow-xl" style={`background:url(/defaultbanner.png);background-size:cover;background-position:center;opacity:${$opacity}`}></div>
                    {/if}
                </div>
    
            </div>
            <div class="h-3"></div>
            <div class="pl-4 flex gap-5">
                <div class="avatar">
                    <Avatar src={$profileData.avatarURL ? `${config.apiEndpoint}${$profileData.avatarURL}` : `data:image/png;base64,${new Identicon(textToHex($profileData.handle)).toString()}`} rounded="rounded-full" width="w-16 md:w-24"/>
                </div>
                <div class="user-info">
                    <div class="flex items-center gap-2">
                        <h1 class="text-4xl font-bold m-0 p-0">{$profileData.displayName}</h1>
                        {#if $profileData.role != 0}
                            <span class="badge variant-soft-primary h-fit">{$profileData.badges.includes("TEAM") ? "TEAM" : $profileData.role == 1 ? "MODERATOR" : $profileData.role == 2 ? "ADMIN" : $profileData.role == 3 ? "CO-OWNER" : $profileData.role == 4 ? "OWNER" : "MODERATOR"}</span>
                        {/if}
                    </div>

                    <p class="opacity-75">@{$profileData.handle}</p>
                    <div class="card bg-surface-500 p-1">
                        {#if $profileData.status}
                        <p>💬 {$profileData.status}</p>
                        {/if}                
                    </div>
                </div>
            </div>
            <div class="h-2"></div>
            <div class="flex gap-2 h-fit">
                {#if $profileData.bio}
                    <div class="ml-24 md:ml-32 w-fit h-fit card px-4 py-1 variant-soft-surface">
                        <p class="opacity-80 text-xl">{$profileData.bio}</p>
                    </div>
                {/if}

                
            </div>
            <!-- <div class="h-10"></div> -->
            <!-- <progress value={50} max={100} class="variant-filled-primary" /> -->
            <!-- <div class="max-w-96 w-full ml-24 md:ml-32">
                <h3 class="h3">Level <b>1</b></h3>
                <p class="opacity-50"><b>XP: </b> 50</p>
                <ProgressBar max={100} value={50} meter="variant-filled-primary" />

            </div> -->
            <div class="h-10"></div>
            <div class="flex items-center justify-center gap-2">
                {#if $profileData.isCurrentUser}
                <button class="btn btn-sm w-full max-w-72 variant-ghost-surface" on:click={()=>{
                    modalStore.trigger({
                        type: 'component',
                        component: {
                            ref: EditProfile
                        },
                        meta: { profileData: profileData, user: data.user }
                    })
                }}>Edit Profile</button>
            {/if}
            <button class="btn btn-sm w-full max-w-72 variant-ghost-surface" on:click={()=>{
                modalStore.trigger({
                    type: 'component',
                    component: {ref: MessageModal},
                    meta: {user: $profileData.handle}
                })
            }}>
                <span><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>
                <span>Message</span>
            </button>
            </div>
            {#if $mcUsername}
            <h3 class="p-4 h3">Connections</h3>
            <div class="px-8">
                <p class="opacity-90 flex gap-2">
                    <img src="https://theme.zdassets.com/theme_assets/2155033/bc270c23058d513de5124ffea6bf9199af7a2370.png" alt="" class="w-6 h-6 object-cover" />
                    <span>IGN: {$mcUsername}</span>
                </p>
    
            </div>
            <div class="h-2"></div>
            {/if}

            {#if $projects.length}
                <div class="h-4"></div>
                <div class="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-5 w-full p-4 gap-4">
                    {#each $projects as project}
                    <ProjectCard project={project} />
                {/each}

                </div>
            {/if}
        </div>
    {/if}
</div>