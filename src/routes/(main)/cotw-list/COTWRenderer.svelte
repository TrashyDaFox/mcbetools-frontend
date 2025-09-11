<script lang="ts">
	import axios from "axios";
	import config from "../../config";
	import AvatarRenderer from "../AvatarRenderer.svelte";
	import { createEventDispatcher } from "svelte";
	import { loggedInUser } from "../loggedInUserStore";
	// import { writable } from "svelte/store";

    export let handle;
    export let hideRemoveBtn = false;
    // export let subtext = "Mraow";
    let userData = null;
    axios.get(`${config.apiEndpoint}/user-profile/${handle}`).then(res=>{
        if(!res.data.error) {
            userData = res.data.userData;
        }
    })
    const dispatcher = createEventDispatcher();
    function dispatch() {
        dispatcher("remove")
    }
</script>

{#if userData}
    <!-- <h1>hi</h1> -->
    <!-- <div class="p-4 card"></div> -->
    <div class="flex-auto" class:rounded-container-token={userData && userData.bannerURL} class:overflow-hidden={userData && userData.bannerURL} style={userData && userData.bannerURL ? `background-image:url(${config.apiEndpoint}${userData.bannerURL});background-size: cover;background-position:center;` : ``}>
        <div class="w-full h-56 overflow-hidden !relative card p-4 {userData && userData.bannerURL ? "!bg-gradient-to-br from-surface-900/50 to-surface-900/70" : ""}" class:variant-glass-surface={userData && userData.bannerURL} class:placeholder2={userData ? true : false} style="">
            <div class="!relative w-full h-full">
                <!-- <h3 class="fancy-title2 fancy-title3 h3 p-0 m-0 top-0 left-0 !absolute">Newest Creator</h3> -->
                <div class="h-full flex flex-col items-center justify-center w-full">
                    {#if userData}
                        <div class="flex gap-4">
                            <AvatarRenderer profile={userData} width="w-16" />
                            <div class="flex flex-col">
                                <h3 class="text-3xl font-bold" class:text-white={userData && userData.bannerURL}>{userData.displayName}</h3>
                                <a class="opacity-50 no-underline hover:underline text-xl hover:opacity-100" class:text-white={userData && userData.bannerURL} href="/@{userData.handle}">@{userData.handle}</a>
                            </div>
                        </div>
                    {/if}
                    {#if !hideRemoveBtn}
                        <div class="h-4"></div>
                        <div class="flex gap-4">
                            <slot name="subtext">
                            </slot>
                            {#if $loggedInUser && $loggedInUser.role >= 3 && !hideRemoveBtn}
                                <button class="btn variant-filled-error" on:click={dispatch}>Remove</button>
                            {/if}
                        </div>
                    {/if}
                </div>

            </div>
        </div>
    </div>
{/if}