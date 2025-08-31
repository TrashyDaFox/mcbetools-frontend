<script lang="ts">
	import { getModalStore, ListBox, ListBoxItem } from "@skeletonlabs/skeleton";
	import badges from "../../../badges";
	import axios from "axios";
	import config from "../../../config";
	import { getUserAvatar } from "../../AvatarRenderer";
	import { writable } from "svelte/store";

    const modalStore = getModalStore()

    let profileData = writable($modalStore[0]?.meta.profileData ?? {});
    let avatarDecos = $modalStore[0]?.meta.avatarDecos ?? [];

    // $: badgesCurrent {

    // }
    let curr = $profileData && $profileData.deco1 ? $profileData.deco1 : 0;
</script>

{#if profileData && $profileData}
    <div class="p-4 py-8 card bg-initial flex flex-col w-modal">
        <ListBox class="variant-ghost-surface p-4 max-h-[400px] overflow-y-auto" active="variant-soft-primary">
            <ListBoxItem name="a" value={0} bind:group={curr}>
                <div class="flex gap-4 items-center">
                    <div class="relative w-16 h-16">
                        <img src={getUserAvatar($profileData)} class="w-16 h-16 object-cover rounded-full" alt="">
                    </div>
                    <p class="text-xl">No Avatar Deco</p>
                </div>
            </ListBoxItem>
            {#each avatarDecos as deco}
                <ListBoxItem name="a" value={deco.id} bind:group={curr}>
                    <div class="flex gap-4 items-center pr-8">
                        <div class="relative w-16 h-16">
                            <img src={getUserAvatar($profileData)} class="w-16 h-16 object-cover rounded-full" alt="">
                            <img src={`${config.apiEndpoint}${deco.path}`} class="w-16 scale-[120%] aspect-square object-cover absolute -top-1/2 -left-1/2 translate-x-1/2 translate-y-1/2" alt="">
                        </div>
                        <p class="text-xl">{deco.name}</p>
                    </div>
                </ListBoxItem>
            {/each}
        </ListBox>
        <div class="h-4"></div>
        <button class="w-full btn variant-filled-primary" on:click={(e)=>{
            axios.post(`${config.apiEndpoint}/use-deco1/${curr}`, {}, {headers: {Authorization: localStorage.getItem("sessionToken")}}).then(res=>{
                axios.get(`${config.apiEndpoint}/user-profile/${$profileData.handle}`, {headers: {Authorization: localStorage.getItem('sessionToken')}}).then(res=>{
                    if(!res.data.error) {
                        profileData.set(res.data.userData);
                        $modalStore[0].response(curr)
                    }
                    modalStore.close();
                })
            })
        }}>Use</button>
    </div>
{/if}