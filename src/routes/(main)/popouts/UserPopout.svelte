<script lang="ts">
	import { getModalStore } from "@skeletonlabs/skeleton";
	import config from "../../config";
	import { getUserAvatar } from "../AvatarRenderer";
    let modalStore = getModalStore();
    export let user;
</script>
{#if user && $user}
    <div class="w-full h-full card variant-filled-surface p-4">
        {#if $user.bannerURL}
            <div class="banner w-full min-w-96 rounded-lg" style="aspect-ratio: 3/1; background: url({config.apiEndpoint}{$user.bannerURL});background-size:cover;background-position:center;"></div>
        {/if}
        <div class="p-4 pt-8 flex gap-4">
            <div class="avatar rounded-full w-24 h-24" style="background:url({getUserAvatar($user)});background-size:cover;background-position:center;"></div>
            <div class="flex flex-col gap-1">
                <h3 class="h3">{$user.displayName}</h3>
                <span class="opacity-50">@{$user.handle}</span>
                <a class="anchor" data-sveltekit-reload={true} href="/@me" on:click={()=>{
                    modalStore.close()
                }}>
                    Visit my profile
                </a>
            </div>
        </div>
        <div class="px-4 flex gap-4 flex pb-4">
            <a class="btn btn-icon variant-soft-primary w-16 h-16" href="/projects">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
            </a>
            <button class="btn variant-soft-error btn-icon w-16 h-16" on:click={()=>{
                localStorage.removeItem("sessionToken")
                location.pathname = '/'
                location.reload();
            }}>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
</button>
        </div>    
    </div>
{/if}
<!-- im gonna name this new user popout poppi cuz she was unused for so long, might as well name her :3 -->
<!-- <h1 class="h1">{$user.displayName}</h1> -->