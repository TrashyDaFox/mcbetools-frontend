<script lang="ts">
	import config from "../../config";
	import { getUserAvatar } from "../AvatarRenderer";

    export let user;
</script>
{#if user && $user}
    <div class="w-full h-full">
        {#if $user.bannerURL}
            <div class="banner w-full min-w-96 h-56 rounded-lg" style="background: url({config.apiEndpoint}{$user.bannerURL});background-size:cover;background-position:center;"></div>
        {/if}
        <div class="p-4 pt-8 flex gap-4">
            <div class="avatar rounded-full w-24 h-24" style="background:url({getUserAvatar($user)});background-size:cover;background-position:center;"></div>
            <div class="flex flex-col gap-1">
                <h3 class="h3">{$user.displayName}</h3>
                <span class="opacity-50">@{$user.handle}</span>
                <a class="btn btn-sm variant-filled" href="/profiles/me">
                    My Profile
                </a>
            </div>
        </div>
        <div class="px-4 flex gap-4 flex pb-4">
            <a class="btn btn-sm variant-filled w-full" href="/projects">
                View My Projects
            </a>
            <button class="btn btn-sm variant-filled-error w-full" on:click={()=>{
                localStorage.removeItem("sessionToken")
                location.pathname = '/'
                location.reload();
            }}>
                Logout
            </button>
        </div>    
    </div>
{/if}
<!-- <h1 class="h1">{$user.displayName}</h1> -->