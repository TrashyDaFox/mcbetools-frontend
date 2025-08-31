<script>
	import { getModalStore, LightSwitch } from "@skeletonlabs/skeleton";
	import config from "../config";
	import { getUserAvatar } from "./AvatarRenderer";
	import { goto } from "$app/navigation";

    let modalStore = getModalStore();

    let profile = $modalStore[0].meta.profile;

    let roles = ["Member", "Moderator", "Admin", "Co Owner", "Owner"]
</script>

{#if $modalStore[0]}
    <div class="p-4 py-8 card bg-initial max-w-lg w-full flex gap-4 flex-col max-h-screen overflow-y-auto">
        <img src="{config.apiEndpoint}{profile.bannerURL}" style="aspect-ratio: 3 / 1;" alt="" class="w-full object-cover rounded-token">
        <div class="flex gap-4">
            <img src={getUserAvatar(profile)} class="w-16 h-16 rounded-full object-cover" alt="">
            <div class="flex flex-col">
                <p class="font-bold text-lg flex gap-4">
                    {profile.displayName}
                    {#if profile.role > 0}
                        <span class="badge variant-soft-primary">
                            {roles[profile.role] || "Unknown Role"}
                        </span>
                    {/if}
                </p>
                <span class="flex gap-2">
                    <a class="opacity-50 no-underline hover:underline hover:opacity-100" on:click|preventDefault={(e)=>{
                        e.preventDefault()
                        modalStore.close();
                        goto(`/@${profile.handle}`)
                    }} href="/@{profile.handle}">@{profile.handle}</a>
                    {#if profile.pronouns}
                        <p>&bullet;</p>
                        <p class="text-primary-500">{profile.pronouns}</p>
                    {/if}
                </span>
            </div>
        </div>
        <!-- {#if profile.status}
            <div class="card p-2 w-full variant-filled-surface">
                <h3 class="text-xl fancy-title2">Status</h3>
                <p>{profile.status}</p>
            </div>
        {/if} -->

        {#if profile.bio}
            <div class="card p-2 w-full variant-filled-surface">
                <h3 class="text-xl fancy-title2">Bio</h3>
                <p>{profile.bio}</p>
            </div>
        {/if}

        <a href="/@{profile.handle}" on:click|preventDefault={(e)=>{
            e.preventDefault()
            modalStore.close();
            goto(`/@${profile.handle}`)
        }} class="btn w-full variant-soft-primary">View Full Profile</a>
    </div>
{/if}