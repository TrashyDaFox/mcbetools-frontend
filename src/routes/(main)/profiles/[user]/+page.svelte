

<script lang="ts">
    import axios from 'axios';
    import { Avatar, ProgressBar } from '@skeletonlabs/skeleton';
    // @ts-ignore
    import Identicon from 'identicon.js';
	import { writable } from 'svelte/store';
	import config from '../../../config.js';
	import { getContext, onMount } from 'svelte';
    import { initializeStores, Modal } from '@skeletonlabs/skeleton';
    import { getModalStore, ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	import EditProfile from './EditProfile.svelte'; 
    import PromoteUser from './PromoteUser.svelte';
	import ProjectCard from '../../ProjectCard.svelte';
	import MessageModal from '../../MessageModal.svelte';
	import badges from '../../../badges.js';
    import { Confetti } from "svelte-confetti"
	import { loggedInUser } from '../../loggedInUserStore.js';
    import autoAnimate from '@formkit/auto-animate';
    
    // initializeStores();
    const modalStore = getModalStore();
    export let data;
    let profileData:any = writable({})
    let profileFinished:any = writable(false);
    let projects = writable([]);
    let mcUsername = writable(null);
	let bookmarks = writable([]);
    let followedList = getContext("followedList")
    let followerList = getContext("followerList")
    let extraMetadata = writable(null);
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
    let currentBookmark = 0;
    function getProjects() {
        if(currentBookmark == 0) {
            // return $projects &&;
        } else {
            return $bookmarks[currentBookmark - 1].projects
        }
    }    

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
                axios.get(`${config.apiEndpoint}/mc-username/${res.data.userData.handle}`).then(res=>{
                    if(res.data.gotUsername) {
                        mcUsername.set(res.data.username);
                    }
                })
                profileData.update((val:any)=>res.data.userData);
                profileFinished.update((val:any)=>true);
                axios.get(`${config.apiEndpoint}/profiles/extra-metadata/${res.data.userData.handle}`).then(res=>{
                    extraMetadata.set(res.data)
                })
                axios.get(`${config.apiEndpoint}/get-projects/${res.data.userData.handle}`).then(res=>{
                    if(!res.data.error) {
                        projects.set(res.data.userProjects)
                    }
                })
            }
        })

    }
    let prevData = data.user
    $: {
        if(data.user != prevData) {
            prevData = data.user
            // onMount(()=>{
                nya()
            // })

        }
    }
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
</script>
<svelte:head>
    <meta property="og:title" content='MCBETOOLS - {data.user}'>
    <meta property="og:type" content="website">
</svelte:head>
<!-- <Modal /> -->
<div class="container h-full h-full flex p-0 max-w-none relative">
    {#if $profileFinished}
        <div class="profile-display w-full">

            <div class="lg:p-4 w-full">
                <div class="banner-container flex items-center justify-center w-full relative h-52 lg:h-[50vh] md:h-72">
                    {#if $profileData.bannerURL}
                        <!-- <div class="banner w-full aspect-video lg:h-[50vh] md:h-72 lg:rounded-lg absolute h-full blur-3xl opacity-80" style={`background:url(${config.apiEndpoint}${$profileData.bannerURL});background-size:cover;background-position:center;`}></div> -->
                        <div class="banner w-full aspect-video lg:h-[50vh] md:h-72 lg:rounded-lg absolute h-full lg:shadow-xl" style={`background:url(${config.apiEndpoint}${$profileData.bannerURL});background-size:cover;background-position:center;opacity:${$opacity}`}></div>
                    {:else}
                        <!-- <div class="banner w-full h-52 lg:h-[50vh] md:h-72 lg:rounded-lg absolute h-full blur-3xl opacity-80" style={`background:url(/defaultbanner.png);background-size:cover;background-position:center;`}></div> -->
                        <div class="banner w-full h-52 lg:h-[50vh] md:h-72 lg:rounded-lg absolute h-full lg: shadow-xl" style={`background:url(/defaultbanner.png);background-size:cover;background-position:center;opacity:${$opacity}`}></div>
                    {/if}
                </div>
    
            </div>
            <div class="h-3"></div>
            <div class="pl-4 flex gap-5">
                <div class="avatar">
                    <div class="c relative">
                        <Avatar src={$profileData.avatarURL ? `${config.apiEndpoint}${$profileData.avatarURL}` : `data:image/png;base64,${new Identicon(textToHex($profileData.handle)).toString()}`} rounded="rounded-full" width="w-16 md:w-24"/>
                        <!-- {#if $profileData && $profileData.handle == "hazel"}
                            <div class="c absolute top-1/2 left-1/2 -z-10">
                                <div style="
                                position: fixed;
                                top: -50px;
                                left: 0;
                                height: 100vh;
                                width: 100vw;
                                display: flex;
                                justify-content: center;
                                overflow: hidden;
                                pointer-events: none;z-index:300;">
                                <Confetti x={[-5, 5]} y={[0, 0.1]} delay={[500, 2000]} infinite duration=10000 amount=500 fallDistance="200vh" colorArray={["#ffbe0b", "#fb5607", "#ff006e", "#8338ec", "#3a86ff"]} />
                            </div> -->
                            <!-- <Confetti x={[-0.5, 0.5]} y={[-0.5, 0.5]} infinite   /> -->

                        <!-- </div> -->
                        <!-- {/if} -->
    
                    </div>
                </div>
                <div class="user-info">
                    <div class="flex gap-2">
                        <h1 class="m-0 p-0 flex gap-4 items-center">
                            <span class="text-4xl font-bold">{$profileData.displayName}</span>
                            {#if $profileData.role != 0 && $profileData.handle != "hazel"}
                            <div class="h-full flex items-center justify-center">
                                <span class="badge variant-soft-primary">{$profileData.badges.includes("TEAM") ? "TEAM" : $profileData.role == 1 ? "MODERATOR" : $profileData.role == 2 ? "ADMIN" : $profileData.role == 3 ? "CO-OWNER" : $profileData.role == 4 ? "OWNER" : "MODERATOR"}</span>

                            </div>
                            {/if}
    
                            {#if $profileData.handle == "hazel" && badges.CATGIRL}
                            <div class="a">
                                <img src="https://cdn3.emoji.gg/emojis/84765-birthdaygift.gif" alt="" class="w-12 h-12 object-cover absolute">

                            </div>

                            {/if}
                            {#if $profileData.badges.includes("DEV")}
                                <div class="h-full w-8">
                                    <img src="https://cdn3.emoji.gg/emojis/3958-computer.gif" alt="" class="w-8 h-8 object-cover absolute">
                                </div>
                            {/if}
                            {#if $profileData.badges.includes("SUPPORTER_TIER3")}
                                <div class="h-full w-8">
                                    <img src="https://cdn3.emoji.gg/emojis/10173-pinkpixelheart.gif" alt="" class="w-8 h-8 object-cover absolute">
                                </div>
                            {/if}
                            {#if $profileData.badges.includes("SUPPORTER_TIER2")}
                                <div class="h-full w-8">
                                    <img src="https://cdn3.emoji.gg/emojis/7814-lightpurplespinningpixelheart.gif" alt="" class="w-8 h-8 object-cover absolute">
                                </div>
                            {/if}
                            {#if $profileData.badges.includes("SUPPORTER_TIER1")}
                                <div class="h-full w-8">
                                    <img src="https://cdn3.emoji.gg/emojis/3140-redspinningpixelheart.gif" alt="" class="w-8 h-8 object-cover absolute">
                                </div>
                            {/if}
                            {#if $profileData.badges.includes("BETA_USER")}
                                <div class="h-full w-8">
                                    <img src="https://cdn3.emoji.gg/emojis/1168-green-diamond.png" alt="" class="w-8 h-8 object-cover absolute">
                                </div>
                            {/if}
                        </h1>
                    </div>

                    <p class="opacity-75">@{$profileData.handle}</p>
                    {#if $profileData.status}
                        <div class="card bg-surface-500 p-1">
                            <p>💬 {$profileData.status}</p>
                        </div>
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
            <div class="h-2"></div>
            <div class="flex gap-2 h-fit">
                {#if $profileData.bio}
                    <div class="ml-24 md:ml-32 w-fit h-fit card px-4 py-1 variant-soft-surface">
                        <p class="opacity-80 text-xl">{$profileData.bio}</p>
                    </div>
                {/if}

                
            </div>
            {#if $profileData && $profileData.handle == "hazel"}
                <p class="ml24 md:ml-32">🎉🎉🎉 Happy early birthday pookie :3 <span class="opacity-50">from <a href="/profiles/luna" class="anchor font-bold">@luna</a></span> 🎉🎉🎉</p>
            {/if}
            <!-- <div class="h-10"></div> -->
            <!-- <progress value={50} max={100} class="variant-filled-primary" /> -->
            <!-- <div class="max-w-96 w-full ml-24 md:ml-32">
                <h3 class="h3">Level <b>1</b></h3>
                <p class="opacity-50"><b>XP: </b> 50</p>
                <ProgressBar max={100} value={50} meter="variant-filled-primary" />

            </div> -->
            <div class="h-10"></div>
            <div class="flex items-center justify-center gap-2">
                {#if $loggedInUser && $profileData.handle == $loggedInUser.handle}
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
            {#if $loggedInUser && $loggedInUser.role > 3 && $profileData && $profileData.role < 4}
                <button class="btn btn-sm w-full max-w-72 variant-ghost-surface" on:click={()=>rolePopup()}>Promote User</button>
            {/if}
            {#if $loggedInUser && $loggedInUser.handle != $profileData.handle}
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
            {/if}
            {#if $loggedInUser && $loggedInUser.role >= 3}
                <button class="btn btn-sm w-full max-w-72 variant-ghost-surface" on:click={()=>{
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
            <button class="btn btn-sm w-full max-w-72 {$followedList.includes($profileData.handle) ? "variant-ghost-surface" : "variant-filled"} " on:click={()=>{
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
            <!-- {#if $mcUsername}
            <h3 class="p-4 h3">Connections</h3>
            <div class="px-8">
                <p class="opacity-90 flex gap-2">
                    <img src="https://theme.zdassets.com/theme_assets/2155033/bc270c23058d513de5124ffea6bf9199af7a2370.png" alt="" class="w-6 h-6 object-cover" />
                    <span>IGN: {$mcUsername}</span>
                </p>
    
            </div>
            <div class="h-2"></div>
            {/if} -->`
            <div class="h-2"></div>
            <div class="p-4">
                <div class="p-4 card flex gap-4">
                    <button class="chip {currentBookmark == 0 ? "variant-filled" : "variant-soft-surface"}" on:click={()=>{currentBookmark = 0}}>My Projects</button>
                    {#each $bookmarks as bookmark, i}
                        <button class="chip {currentBookmark == i + 1 ? "variant-filled" : "variant-soft-surface"}" on:click={()=>{currentBookmark = i + 1}}>{bookmark.name}</button>

                    {/each}
                </div>
    
            </div>
            <div class="h-2"></div>
            {#if currentBookmark == 0 ? $projects.length : $bookmarks[currentBookmark - 1].projects.length}
                <div class="h-4"></div>
                <div class="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-5 w-full p-4 gap-4">
                    {#each currentBookmark == 0 ? $projects : $bookmarks[currentBookmark - 1].projects as project, i (project.url)}
                    <ProjectCard project={project} />
                {/each}

                </div>
            {:else}
                <p class="opacity-50 p-4">Theres no projects in this folder.</p>
            {/if}
        </div>
    {/if}
</div>