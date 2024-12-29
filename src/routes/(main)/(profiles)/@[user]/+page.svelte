<script lang="ts">
    import axios from 'axios';
    import { Avatar, ProgressBar } from '@skeletonlabs/skeleton';
    // @ts-ignore
    import Identicon from 'identicon.js';
	import { writable } from 'svelte/store';
	import config from '../../../config.js';
	import { onMount } from 'svelte';
    import { initializeStores, Modal } from '@skeletonlabs/skeleton';
    import { getModalStore, ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	import EditProfile from './EditProfile.svelte';
	import ProjectCard from '../../ProjectCard.svelte';
	import MessageModal from '../../MessageModal.svelte';
	import badges from '../../../badges.js';
    import { Confetti } from "svelte-confetti"
	import { getUserAvatar } from '../../AvatarRenderer.js';

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
    let tabSet = 0;
</script>
{#if $profileFinished}
    <div class="w-full flex justify-center">
        <div class="w-full md:max-w-4xl">
            {#if $profileData.bannerURL}
                <div class="px-4 pt-4">
                    <div class="w-full h-56 rounded-lg" style="background:url({config.apiEndpoint}{$profileData.bannerURL});background-size:cover;background-position:center"></div>
                </div>
            {/if}
            <div class="p-4 flex gap-2">
                <img src={getUserAvatar($profileData)} alt="" class="object-cover w-16 h-16 rounded-full">
                <div class="flex flex-col">
                    <p class="font-bold h3">{$profileData.displayName}</p>
                    <p class="opacity-50">@{$profileData.handle}</p>
                </div>
            </div>
            <div class="card w-full p-4 bg-initial">
                <button class="{tabSet == 0 ? "variant-filled" : "variant-filled-surface"} btn">Projects</button>
                <button class="{$profileData.isCurrentUser ? "flex" : "none"} btn {tabSet == 1 ? "variant-filled" : "variant-filled-surface"}">Edit profile</button>
            </div>
        </div>
    </div>
{/if}