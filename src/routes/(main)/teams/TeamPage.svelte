<script lang="ts">
	import axios from "axios";
	import { writable } from "svelte/store";
	import config from "../../config";
	import { onMount } from "svelte";
	import { getUserAvatar } from "../AvatarRenderer";
	import { getModalStore, Modal } from "@skeletonlabs/skeleton";
	import NewTeam from "./NewTeam.svelte";
	import { loggedInUser } from "../loggedInUserStore";

    let teams:any = writable([])

    onMount(()=>{
        axios.get(`${config.apiEndpoint}/my-teams`, {
            headers: {
                Authorization: localStorage.getItem("sessionToken")
            }
        }).then(async res=>{
            let teamData = [];
            for(const handle of res.data) {
                let teamUser = await axios.get(`${config.apiEndpoint}/user-profile/${handle}`, {headers: {Authorization: localStorage.getItem("sessionToken")}})
                teamData.push({...teamUser.data.userData, originalHandle: handle})
            }
            teams.set(teamData)
        })
    })
    let modalStore = getModalStore();
</script>
<!-- <Modal /> -->
{#if $loggedInUser}
    <div class="card bg-initial max-w-2xl max-h-96 overflow-auto">
        <div class="p-4 py-8">
        <!-- <span class="text-sm text-warning-500">WARNING: Switching teams will reload the page</span> -->
        <!-- <div class="h-8"></div> -->
         <p class="text-xl opacity-50">Teams</p>
         <div class="h-2"></div>
        <div class="flex flex-col gap-4">
        
        {#each $teams as team}
        <button class="variant-ghost btn-sm !ring-surface-400/50 btn flex gap-1 min-w-[300px]" class:variant-ghost={team.handle != $loggedInUser.handle} class:variant-soft-success={team.handle == $loggedInUser.handle} on:click={(e)=>{
            if(team.handle == $loggedInUser.handle) return;
            e.preventDefault();
            axios.post(`${config.apiEndpoint}/teams/login`, {
                teamHandle: team.originalHandle
            }, {
                headers: {
                    Authorization: localStorage.getItem("sessionToken")
                }
            }).then(res=>{
                if(res.data) {
                    localStorage.setItem("sessionToken", res.data);
                    location.reload();
                }
            })
        }}>
            <img src={getUserAvatar(team)} class="w-10 h-10 object-cover rounded-full" alt="">
            <p class="text-xl">{team.displayName}</p>
            {#if team.originalHandle == "personal" || team.originalHandle == "me"}
                <span class="badge variant-ghost-success">
                    PERSONAL
                </span>
            {/if}
            <div class="flex-auto min-w-16"></div>
            {#if team.handle == $loggedInUser.handle}
            <span class="badge variant-filled-success">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
            {/if}
        </button>


        {/each}
        <button class="btn variant-soft-success" on:click={()=>{
            modalStore.close()
            modalStore.trigger({
                type: 'component',
                component: {
                    ref: NewTeam,
                    props: {openTeamPage: true}
                }
            })
        }}>New Team</button>        
        </div>
        </div>

    </div>
{/if}