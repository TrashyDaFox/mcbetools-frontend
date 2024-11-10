<script lang="ts">
	import { getContext } from "svelte";
	import config from "../config";
	import axios from "axios";
	import { writable } from "svelte/store";
    import { initializeStores, Modal } from '@skeletonlabs/skeleton';
    import { getModalStore } from '@skeletonlabs/skeleton';
	import { getUserAvatar } from "./AvatarRenderer";
	import { featuredProjects, loggedInUser } from "./loggedInUserStore";
	// import { Modal, getModalStore } from '@skeletonlabs/skeleton';
    import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';
	import TagView from "./TagView.svelte";

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
// let featured = false;


</script>
<Modal />
<a href={edit ? null : `/s/${$project2.url}`} class={$featuredProjects.find(_=>_.url == $project2.url) ? "outline outline-primary-500/50 outline-1 mt-4 card bg-gradient-to-br from-primary-800/30 to-surface-800/20 card-hover md:w-fit rounded-lg overflow-hidden w-96 sm:w-full flex flex-col" : "mt-4 card bg-gradient-to-br from-surface-800 to-surface-700 card-hover md:w-fit rounded-lg overflow-hidden w-96 sm:w-full flex flex-col"}>
    <div class="banner w-full relative">
        <img
            src={$project2.bannerURL
                ? `${config.apiEndpoint}${$project2.bannerURL}`
                : `/defaultbanner.png`}
            style="object-fit:cover;width:100%;aspect-ratio:16/9;"
        />
        {#if $project2.avatarURL}
            <img src={`${config.apiEndpoint}${$project2.avatarURL}`} class="w-16 h-16 rounded-3xl absolute -bottom-8 left-4 object-cover border-8 border-surface-800" />
        {:else}
        <div class="w-16 h-16 rounded-3xl absolute -bottom-8 left-4 object-cover border-8 border-surface-800 bg-surface-500 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" style="fill: currentColor;"><path d="m21.406 6.086-9-4a1.001 1.001 0 0 0-.813 0l-9 4c-.02.009-.034.024-.054.035-.028.014-.058.023-.084.04-.022.015-.039.034-.06.05a.87.87 0 0 0-.19.194c-.02.028-.041.053-.059.081a1.119 1.119 0 0 0-.076.165c-.009.027-.023.052-.031.079A1.013 1.013 0 0 0 2 7v10c0 .396.232.753.594.914l9 4c.13.058.268.086.406.086a.997.997 0 0 0 .402-.096l.004.01 9-4A.999.999 0 0 0 22 17V7a.999.999 0 0 0-.594-.914zM12 4.095 18.538 7 12 9.905l-1.308-.581L5.463 7 12 4.095zM4 16.351V8.539l7 3.111v7.811l-7-3.11zm9 3.11V11.65l7-3.111v7.812l-7 3.11z"></path></svg>
        </div>
        {/if}
    </div>
    <div class="h-4"></div>
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
                    }).then(res=>{
                        axios.get(`${config.apiEndpoint}/featured-submissions`, {
                            headers: {
                                Authorization: localStorage.getItem('sessionToken')
                            }
                        }).then((res) => {
                            // if(res.data.find(_=>_.url == project.url)) featured = true;
                            featuredProjects.set(res.data);
                        });
                        // featured = !featured;
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
        {#if $project2 && $project2.tags && $project2.tags.length}
            <div class="h-4"></div>
            <div class="flex gap-2 relative overflow-hidden max-w-full">
                {#each $project2.tags.slice(0, 3) as tag}
                    <span class="badge variant-filled">{tag}</span>
                {/each}
                {#if $project2.tags.length > 3}
                    <a class="cursor-pointer text-surface-300 underline"><span class="text-surface-300" on:click={(e)=>{
                        e.preventDefault()
                        modalStore.trigger({
                            type: 'component',
                            component: {
                                ref: TagView
                            },
                            meta: {tags: $project2.tags}
                        })
                    }}>+{$project2.tags.length - 3}</span></a>
                {/if}
            </div>
        {/if}
        <div class="h-1"></div>

    </section>
    <!-- <div class="py-2 px-4"> -->
        <!-- {#if $project2 && $project2.views >= 0} -->
            <!-- <div class="flex gap-3 opacity-50">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-296q85 0 144.5-59.5T684-500q0-85-59.5-144.5T480-704q-85 0-144.5 59.5T276-500q0 85 59.5 144.5T480-296Zm-.12-94Q434-390 402-422.12q-32-32.12-32-78T402.12-578q32.12-32 78-32T558-577.88q32 32.12 32 78T557.88-422q-32.12 32-78 32Zm.12 220q-144 0-264.5-76.5T29-451q-6-11-9-23.42-3-12.43-3-25.5 0-13.08 3-25.58 3-12.5 9-23.5 66-128 186.5-204.5T480-830q144 0 264.5 76.5T931-549q6 11 9 23.42 3 12.43 3 25.5 0 13.08-3 25.58-3 12.5-9 23.5-66 128-186.5 204.5T480-170Zm0-330Zm0 224q115 0 211.87-60.58T840-500q-51.26-102.84-148.13-163.42Q595-724 480-724t-211.87 60.58Q171.26-602.84 120-500q51.26 102.84 148.13 163.42Q365-276 480-276Z"/></svg>
                <span class="font-bold">{formatNumber($project2.views) ? formatNumber($project2.views) : "0"}</span>
            </div> -->
        <!-- {/if} -->
    <!-- </div> -->
    <div class="actions px-4 pt-1 pb-4">
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
<div class="flex  gap-2">
        {#if $loggedInUser && $loggedInUser.role >= 1 && !edit}
        {#if $project2.verified}
            <button class="btn btn-icon variant-soft-primary w-10 h-10" on:click={(e)=>{
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
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M12 2C9.243 2 7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zm6 10 .002 8H6v-8h12zm-9-2V7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9z"></path></svg>
        </button>
        {:else}
            <button class="btn btn-icon variant-ringed-primary w-10 h-10" on:click={(e)=>{
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
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M17 8V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2H9V7c0-1.654 1.346-3 3-3s3 1.346 3 3v1h2zm1 4 .002 8H6v-8h12z"></path></svg>    
            </button>
        {/if}
        {#if $loggedInUser && $loggedInUser.role >= 4}
            <!-- <div class="h-4"></div> -->
            <button class="btn btn-icon variant-soft-error w-10 h-10" on:click={(e)=>{
                e.preventDefault();
                
                const modal = {
                    type: 'confirm',
                    // Data
                    title: 'ARE YOU SURE U FUCKING DUMBASS?',
                    body: `Are you sure you want to delete ${project.title}? THIS CANT BE UNDONE`,
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

            }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>
        </button>
        {/if}
    {/if}
    {#if edit || ($loggedInUser && $loggedInUser.role && $loggedInUser.role >= 3)}
        <!-- <div class="h-4"></div> -->
        <a class="btn btn-icon h-10 w-10 variant-soft-tertiary" href={`/projects/edit/${project.url}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M4 21a1 1 0 0 0 .24 0l4-1a1 1 0 0 0 .47-.26L21 7.41a2 2 0 0 0 0-2.82L19.42 3a2 2 0 0 0-2.83 0L4.3 15.29a1.06 1.06 0 0 0-.27.47l-1 4A1 1 0 0 0 3.76 21 1 1 0 0 0 4 21zM18 4.41 19.59 6 18 7.59 16.42 6zM5.91 16.51 15 7.41 16.59 9l-9.1 9.1-2.11.52z"></path></svg>
        </a>
    {/if}
</div>
    </div>
    <!-- <div class="px-4 pb-4 flex">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" class="fill-primary-500"><path d="M480-269 314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Z"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" class="fill-primary-500/25"><path d="M480-269 314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Z"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" class="fill-primary-500/25"><path d="M480-269 314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Z"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" class="fill-primary-500/25"><path d="M480-269 314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Z"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" class="fill-primary-500/25"><path d="M480-269 314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Z"/></svg>
    </div> -->
</a>