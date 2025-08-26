<script>
	import { loggedInUser } from "../../routes/(main)/loggedInUserStore";
    import { page } from '$app/stores';
	import { goto } from "$app/navigation";
	import { getDrawerStore } from "@skeletonlabs/skeleton";

    export let requiresLogin = false;
    export let minRole = -100000;
    export let requiresTeamOwner = false;
    export let href = "/";
    export let activeBg = "bg-primary-500/10 text-primary-100";
    export let compact = false;

    let drawerStore = getDrawerStore();
</script>
{#if !requiresLogin || requiresLogin && $loggedInUser && $loggedInUser.role >= minRole && (requiresTeamOwner ? $loggedInUser && $loggedInUser.role == -1 && $loggedInUser.isTeamOwner ? true : false : true)}
    <div class="flex-auto">
        {#if compact}
            <a href={href} class="flex flex-col gap-1 !items-center !justify-center !w-full !h-full {$page.url.pathname == href ? activeBg : ""}" on:click|preventDefault={()=>{
                drawerStore.close();
                goto(href)
            }}>
                <span class="badge w-full flex items-center justify-center">
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> -->
                    <slot name="icon" />
                </span>
                <span class="w-fit !m-0 !p-0"><slot /></span>
            </a>
        {:else}
            <a href={href} class="flex gap-4 !items-center !w-full !h-full {$page.url.pathname == href ? activeBg : ""}" on:click|preventDefault={()=>{
                drawerStore.close();
                goto(href)
            }}>
                <span class="badge">
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> -->
                    <slot name="icon" />
                </span>
                <span class="w-fit !m-0 !p-0"><slot /></span>
            </a>
        {/if}
    </div>
{/if}