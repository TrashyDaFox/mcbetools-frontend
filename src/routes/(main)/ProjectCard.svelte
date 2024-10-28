<script lang="ts">
	import { getContext } from "svelte";
	import config from "../config";
	import axios from "axios";
	import { writable } from "svelte/store";
    import { initializeStores, Modal } from '@skeletonlabs/skeleton';
    import { getModalStore } from '@skeletonlabs/skeleton';
	import { getUserAvatar } from "./AvatarRenderer";
	import { loggedInUser } from "./loggedInUserStore";
			
    initializeStores();
    const modalStore = getModalStore();
    export let project:any;
    export let edit:any = false;
    let project2 = writable(project)
    let uploader = writable(null);
    axios.get(`${config.apiEndpoint}/id-to-handle/${project.author}`).then(res=>{
        axios.get(`${config.apiEndpoint}/user-profile/${res.data.handle}`).then(res=>{
            uploader.set(res.data.userData);
        })
    })
    function formatNumber(num) {
    if (num >= 1e9) {
        return (num / 1e9).toFixed(1) + 'B';  // For billions
    } else if (num >= 1e6) {
        return (num / 1e6).toFixed(1) + 'M';  // For millions
    } else if (num >= 1e3) {
        return (num / 1e3).toFixed(1) + 'K';  // For thousands
    } else {
        return num.toString();  // For numbers less than 1000
    }
}
</script>
<Modal />
<a href={edit ? null : `/s/${$project2.url}`} class="mt-4 card variant-glass-surface card-hover md:w-fit rounded-lg overflow-hidden w-96 sm:w-full flex flex-col">
    <div class="banner w-full">
        <img
            src={$project2.bannerURL
                ? `${config.apiEndpoint}${$project2.bannerURL}`
                : `/defaultbanner.png`}
            style="object-fit:cover;width:100%;aspect-ratio:16/9;"
        />
    </div>

    <section class="p-4 flex-auto">
        <h3 class="h3 font-bold flex gap-2 items-center">
            {$project2.title}
            {#if $loggedInUser && $loggedInUser.role > 3}
                <button class="btn btn-icon variant-soft-tertiary w-8 h-8" on:click={(e)=>{
                    e.preventDefault();
                    axios.post(`${config.apiEndpoint}/projects/feature`, {
                        project: $project2.url
                    }, {
                        headers: {
                            Authorization: localStorage.getItem("sessionToken")
                        }
                    })
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" class="fill-tertiary-500"><path d="M480-269 314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Z"/></svg>
                </button>
            {/if}
        </h3>
        <div class="border-solid border-b border-surface-200/10 w-full h-3"></div>
        <div class="h-2"></div>
        <p class="opacity-75 max-w-96">{$project2.shortDescription}</p>
        <p class="opacity-50 italic text-sm">{$project2.files.length} file(s)</p>
        <div class="h-4"></div>
        {#if $project2 && $project2.tags && $project2.tags.length}
            <div class="flex gap-2 flex-wrap">
                {#each $project2.tags as tag}
                    <span class="badge variant-filled-primary">{tag}</span>
                {/each}
            </div>
        {:else}
            <p class="opacity-30">No tags</p>
        {/if}
        <div class="h-2"></div>

    </section>
    <div class="py-2 px-4">
        {#if $project2 && $project2.views >= 0}
            <div class="flex gap-3 opacity-50">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-296q85 0 144.5-59.5T684-500q0-85-59.5-144.5T480-704q-85 0-144.5 59.5T276-500q0 85 59.5 144.5T480-296Zm-.12-94Q434-390 402-422.12q-32-32.12-32-78T402.12-578q32.12-32 78-32T558-577.88q32 32.12 32 78T557.88-422q-32.12 32-78 32Zm.12 220q-144 0-264.5-76.5T29-451q-6-11-9-23.42-3-12.43-3-25.5 0-13.08 3-25.58 3-12.5 9-23.5 66-128 186.5-204.5T480-830q144 0 264.5 76.5T931-549q6 11 9 23.42 3 12.43 3 25.5 0 13.08-3 25.58-3 12.5-9 23.5-66 128-186.5 204.5T480-170Zm0-330Zm0 224q115 0 211.87-60.58T840-500q-51.26-102.84-148.13-163.42Q595-724 480-724t-211.87 60.58Q171.26-602.84 120-500q51.26 102.84 148.13 163.42Q365-276 480-276Z"/></svg>
                <span class="font-bold">{formatNumber($project2.views) ? formatNumber($project2.views) : "0"}</span>
            </div>
        {/if}
    </div>
    <div class="actions p-4">
        {#if $uploader}
            <div class="h-2"></div>
            <div class="flex cursor-default w-full items-center gap-1" on:click={(e)=>{
                e.preventDefault();
            }}>
                <img src={getUserAvatar($uploader)} class="w-8 h-8 object-cover rounded-full"/>
                <a href={`/profiles/${$uploader.handle}`} on:click={(e)=>{
                    location.pathname = `/profiles/${$uploader.handle}`
                }} class="text-xl hover:underline p-0 m-0 no-underline opacity-50 italic">@{$uploader.handle}</a>
            </div>
            <div class="h-2"></div>
        {/if}

        {#if $loggedInUser && $loggedInUser.role >= 1 && !edit}
        {#if $project2.verified}
            <button class="btn btn-sm variant-soft-primary w-full" on:click={(e)=>{
                e.preventDefault()
                let fd = new FormData();
                fd.append("url", $project2.url);
                axios({
                    method: "POST",
                    url: `${config.apiEndpoint}/mod/deny`,
                    data: fd,
                    headers: {
                        Authorization: localStorage.getItem('sessionToken')
                    }
                }).then(res=>{
                    if(!res.data.error) {
                        project2.set(res.data.project);
                    }
                })
            }}>Unverify</button>
        {:else}
            <button class="btn btn-sm variant-soft-primary w-full" on:click={(e)=>{
                e.preventDefault();
                let fd = new FormData();
                fd.append("url", $project2.url);
                axios({
                    method: "POST",
                    url: `${config.apiEndpoint}/mod/accept`,
                    data: fd,
                    headers: {
                        Authorization: localStorage.getItem('sessionToken')
                    }
                }).then(res=>{
                    if(!res.data.error) {
                        project2.set(res.data.project);
                    }
                })
            }}>Verify</button>
        {/if}
        {#if $loggedInUser && $loggedInUser.role >= 3}
            <div class="h-4"></div>
            <button class="btn btn-sm variant-soft-error w-full" on:click={(e)=>{
                e.preventDefault();
                
                const modal = {
                    type: 'confirm',
                    // Data
                    title: 'Please Confirm',
                    body: 'Are you sure you wish to proceed?',
                    // TRUE if confirm pressed, FALSE if cancel pressed
                    // @ts-ignore
                    response: (r) => {
                        if(r) {
                            let fd = new FormData();
                fd.append("url", $project2.url);
                axios({
                    method: "POST",
                    url: `${config.apiEndpoint}/mod/delete`,
                    data: fd,
                    headers: {
                        Authorization: localStorage.getItem('sessionToken')
                    }
                }).then(res=>{
                    if(!res.data.error) {
                        project2.set(res.data.project);
                    }
                })

                        }
                    },
                };
                // @ts-ignore
                modalStore.trigger(modal);

            }}>Delete</button>
        {/if}
    {/if}
    {#if edit || ($loggedInUser && $loggedInUser.role && $loggedInUser.role >= 3)}
        <div class="h-4"></div>
        <a class="btn btn-sm w-full variant-soft-tertiary" href={`/projects/edit/${project.url}`}>
            Edit
        </a>
    {/if}
    </div>
    <!-- <div class="px-4 pb-4 flex">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" class="fill-primary-500"><path d="M480-269 314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Z"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" class="fill-primary-500/25"><path d="M480-269 314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Z"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" class="fill-primary-500/25"><path d="M480-269 314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Z"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" class="fill-primary-500/25"><path d="M480-269 314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Z"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" class="fill-primary-500/25"><path d="M480-269 314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Z"/></svg>
    </div> -->
</a>