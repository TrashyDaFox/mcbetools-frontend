<script lang="ts">
	import axios from "axios";
	import { loggedInUser } from "../../loggedInUserStore";
	import config from "../../../config";
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import { getUserAvatar } from "../../AvatarRenderer";

    let addUser = "";

    let teamMembers = writable([]);

    onMount(()=>{
        axios.get(`${config.apiEndpoint}/teams/get-members`, {
            headers: {
                Authorization: localStorage.getItem("sessionToken")
            }
        }).then(async res=>{
            let newTeamMembers = [];
            let members = res.data;
            for(const member of members) {
                try {
                    let profileData = await axios.get(`${config.apiEndpoint}/user-profile/${member}`);
                    if(!profileData.data.error) {
                        newTeamMembers.push(profileData.data.userData);
                    }
                } catch {}
            }
            teamMembers.set(newTeamMembers)
        })
    })
</script>

<div class="p-4">
    {#if $loggedInUser && $loggedInUser.isTeamOwner}
        <div class="flex gap-4 pb-4">
            <input type="text" class="input" placeholder="Add a user by handle" bind:value={addUser}>
            <button class="btn variant-soft-primary" on:click={(e)=>{
                axios.post(`${config.apiEndpoint}/teams/add-member/${addUser}`, {}, {
                    headers: {
                        Authorization: localStorage.getItem("sessionToken")
                    }
                }).then(res=>{
                    location.reload();
                })
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
        </div>
        <div class="card bg-initial p-4 flex gap-4 flex-col">
            {#each $teamMembers as member, i}
                <div class="card card-hover variant-filled-surface flex gap-4 p-2 items-center">
                    <img src={getUserAvatar(member)} class="w-12 h-12 object-cover rounded-full" />
                    <a href="/@{member.handle}" class="anchor">{member.displayName}</a>
                    <div class="flex-auto"></div>
                    {#if i > 0}
                        <button class="btn variant-soft-error" on:click={()=>{
                            axios.post(`${config.apiEndpoint}/teams/remove-member/${member.handle}`, {}, {
                                headers: {
                                    Authorization: localStorage.getItem("sessionToken")
                                }
                            }).then(res=>{
                                location.reload();
                            })
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                        </button>
                    {/if}
                </div>
            {/each}
        </div>
    {/if}
</div>