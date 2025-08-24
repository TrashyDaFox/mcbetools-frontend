<script lang="ts">
	import { createEventDispatcher, getContext, onDestroy, onMount } from "svelte";
	import config from "../config";
	import axios from "axios";
	import { writable } from "svelte/store";
    import { initializeStores, Modal } from '@skeletonlabs/skeleton';
    import { getModalStore } from '@skeletonlabs/skeleton';
	import { getUserAvatar } from "./AvatarRenderer";
	import { featuredProjects, loggedInUser } from "./loggedInUserStore";
    let CUTOFF = 120;
    const dispatcher = createEventDispatcher();
    let showWholeDesc = writable(false)
	// import { Modal, getModalStore } from '@skeletonlabs/skeleton';
    import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';
	import TagView from "./TagView.svelte";
	import badges from "../badges";
	import TagRenderer from "./TagRenderer.svelte";
    export let isBookmarkView:boolean = false;
    export let isDraft:boolean = false;
    // export let isDraft:boolean = false;
    // initializeStores();
    const modalStore = getModalStore();
    export let project:any;
    export let f1 = false;
    export let edit:any = false;
    let project2 = writable(project)
    // const timer = setInterval(()=>{
    //     project2.set(project)
    // },1000)
    // onDestroy(()=>{
    //     clearInterval(timer)
    // })
    function timeAgo(date) {
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, value] of Object.entries(intervals)) {
    const amount = Math.floor(seconds / value);
    if (amount >= 1) {
      return `${amount} ${unit}${amount > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}
    let uploader = writable(null);
    $: {
        axios.get(`${config.apiEndpoint}/id-to-handle/${project.author}`).then(res=>{
            axios.get(`${config.apiEndpoint}/user-profile/${res.data.handle}`).then(res=>{
                uploader.set(res.data.userData);
            })
        })
    }
    onMount(()=>{
        axios.get(`${config.apiEndpoint}/id-to-handle/${project.author}`).then(res=>{
            axios.get(`${config.apiEndpoint}/user-profile/${res.data.handle}`).then(res=>{
                uploader.set(res.data.userData);
            })
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
export let extraClasses = "";
export let extraStyles = "";
let bannerLoaded = false;
</script>
<style>
    /* The element with the cut-out effect */
.cutout-element {
  /* position: relative; */
  /* background: white; Background of the element */
  /* padding: 20px; */
  /* clip-path: circle(50% at center); Create a circular cut-out area */
  /* mask: radial-gradient(circle, rgba(255, 255, 255, 1) 30%, rgba(255, 255, 255, 0) 50%); */
    /* Apply a mask with a transparent border to create the cut-out effect */
    /* position: relative; */
  /* background-color: white; */
  /* padding: 20px; */
  /* z-index: 1; */
  /* Mask using a linear gradient for rectangular shape */
  /* mask-image: linear-gradient(white 20px, transparent 20px), 
              linear-gradient(90deg, white 20px, transparent 20px);
  mask-size: 100% 100%;
  mask-repeat: no-repeat;
  -webkit-mask-image: linear-gradient(white 20px, transparent 20px),
                       linear-gradient(90deg, white 20px, transparent 20px);
  -webkit-mask-size: 100% 100%;
  -webkit-mask-repeat: no-repeat; */
}

/* Adding the border with pseudo-element */
/* .cutout-element::before { */
  /* content: ""; */
  /* position: absolute; */
  /* top: -10px; left: -10px;  Adjust based on the border thickness */
  /* right: -10px; bottom: -10px; Adjust based on the border thickness */
  /* border: 3px solid #333; Border around the cut-out element */
  /* background: white; */
  /* z-index: 0; */
  /* border-radius: 50%; Optional: Use if you want the border to be rounded */
/* } */
</style>
<!-- <a data-sveltekit-reload={true} id={project.url} key={project.url} href={edit ? null : `/s/${isDraft ? "draft-" : ""}${project.url}`} class="{extraClasses} {f1 ? "!flex-auto " : ""}{$featuredProjects.find(_=>_.url == project.url) && !f1 ? `outline outline-primary-500/50 outline-1 mt-4 card bg-gradient-to-br from-primary-800/30 to-surface-800/20 card-hover md:w-fit rounded-lg overflow-hidden${!f1 ? " w-96 sm:w-full " : " "}flex flex-col` : `mt-4 card bg-gradient-to-br from-surface-800 to-surface-700 card-hover md:w-fit rounded-lg overflow-hidden${!f1 ? " w-96 sm:w-full " : " "}flex flex-col`} {!f1 ? "min-w-full" : ""} {project.specialTags.includes('WOMEN_ONLY') ? "!border-primary-500 !border-2 !border-dashed !bg-gradient-to-br from-primary-900/70 to-primary-500/10 !rounded-3xl" : ""}" style={extraStyles} data-theme={project.specialTags && project.specialTags.includes('WOMEN_ONLY') ? "cherry" : ""}> -->
<a data-sveltekit-reload={true} id={project.url} key={project.url} href={edit ? null : `/s/${isDraft ? "draft-" : ""}${project.url}`} class="{extraClasses} {f1 ? "!flex-auto " : ""}{`mt-4 card bg-initial to-surface-700 card-hover md:w-fit rounded-lg overflow-hidden${!f1 ? " w-96 sm:w-full " : " "}flex flex-col`} {!f1 ? "min-w-full" : ""} {project.specialTags.includes('WOMEN_ONLY') ? "!border-primary-500 !border-2 !border-dashed !bg-gradient-to-br from-primary-900/70 to-primary-500/10 !rounded-3xl" : ""} max-w-0" style={extraStyles} data-theme={project.specialTags && project.specialTags.includes('WOMEN_ONLY') ? "cherry" : ""}>
    {#if project.deprecated}
        <div class="variant-filled-warning shadow-xl w-full flex items-center justify-center p-1 shadow-xl font-bold">
            Deprecated
        </div>
    {/if}
    <div class="banner w-full relative" class:grayscale={project.deprecated}>
        <img
            src={project.bannerURL
                ? `${config.apiEndpoint}${project.bannerURL}`
                : `/defaultbanner.png`}
            loading="lazy"
            style="object-fit:cover;width:100%;"
            class="{bannerLoaded ? "" : ""} bg-surface-500 aspect-video"
            on:load={()=>{
                bannerLoaded = true;
            }}
        />

        {#if project.avatarURL}
            <img src={`${config.apiEndpoint}${project.avatarURL}`} loading="lazy" class="cutout-element w-16 h-16 rounded-3xl absolute -bottom-8 left-4 object-cover border-8 border-surface-800" />
        {:else}
        <div class="w-16 h-16 rounded-3xl absolute -bottom-8 left-4 object-cover border-8 border-surface-800 bg-surface-500 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" style="fill: currentColor;"><path d="m21.406 6.086-9-4a1.001 1.001 0 0 0-.813 0l-9 4c-.02.009-.034.024-.054.035-.028.014-.058.023-.084.04-.022.015-.039.034-.06.05a.87.87 0 0 0-.19.194c-.02.028-.041.053-.059.081a1.119 1.119 0 0 0-.076.165c-.009.027-.023.052-.031.079A1.013 1.013 0 0 0 2 7v10c0 .396.232.753.594.914l9 4c.13.058.268.086.406.086a.997.997 0 0 0 .402-.096l.004.01 9-4A.999.999 0 0 0 22 17V7a.999.999 0 0 0-.594-.914zM12 4.095 18.538 7 12 9.905l-1.308-.581L5.463 7 12 4.095zM4 16.351V8.539l7 3.111v7.811l-7-3.11zm9 3.11V11.65l7-3.111v7.812l-7 3.11z"></path></svg>
        </div>
        {/if}
    </div>
    <div class="h-4"></div>
    <section class="p-4 flex-auto min-w-0 w-full">

        <h3 class="h3 font-bold flex gap-2 items-center">
            {project.title}
            {#if project.specialTags && project.specialTags.includes('WOMEN_ONLY')}
                <img src={badges.FEMALE.icon} loading="lazy" alt="" class="w-8 h-8">
            {/if}
            {#if $loggedInUser && $loggedInUser.role > 3}
                <button class="btn btn-icon variant-soft-tertiary w-8 h-8" on:click={(e)=>{
                    e.preventDefault();
                    axios.post(`${config.apiEndpoint}/projects/feature`, {
                        project: project.url
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
            {#if project && project.pending}
                <span class="badge variant-ghost-warning">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414z"></path></svg>
                    <span>Pending</span>
                </span>
            {/if}
        </h3>
        <div class="border-solid border-b border-surface-200/10 w-full h-3"></div>
        <div class="h-2"></div>
        <!-- <p class={$showWholeDesc ? "block w-full whitespace-normal break-words" : "overflow-hidden text-ellipsis w-full max-w-full min-w-0"}> -->
        <p class="block w-full whitespace-normal break-words">
            {$showWholeDesc ? project.shortDescription : project.shortDescription.length > CUTOFF ? project.shortDescription.slice(0, CUTOFF) + "..." : project.shortDescription}
        </p>
        {#if project.shortDescription.length > CUTOFF}
            <a class="anchor" on:click={(e)=>{
                e.preventDefault();
                showWholeDesc.set(!$showWholeDesc);
            }}>{$showWholeDesc ? "Read Less" : "Read More"}</a>
        {/if}
        
        <div class="h-1"></div>

    </section>
    <div class="py-2 px-4">
        <!-- {#if project && project.files && project.files.length} -->
        <p class="opacity-50 italic text-sm">Updated {timeAgo(new Date(project.updatedAt))}</p>
        <div class="h-2"></div>
        <hr>
        <div class="h-2"></div>
        <!-- {/if} -->
        {#if project && project.tags && project.tags.length}
            <div class="flex gap-2 relative overflow-hidden max-w-full">
                {#if project.specialTags.includes('WOMEN_ONLY')}
                    <span class="badge variant-filled{project.specialTags.includes('WOMEN_ONLY') ? "-primary" : ""}">GIRL EXCLUSIVE</span>
                {/if}
                {#each project.tags.slice(0, 3) as tag}
                    <!-- <span class="badge variant-filled{project.specialTags.includes('WOMEN_ONLY') ? "-primary" : ""}">{tag}</span> -->
                    <TagRenderer tag={tag} />
                {/each}
                {#if project.tags.length > 3}
                    <a class="cursor-pointer text-surface-300 underline"><span class="text-surface-300" on:click={(e)=>{
                        e.preventDefault()
                        modalStore.trigger({
                            type: 'component',
                            component: {
                                ref: TagView
                            },
                            meta: {tags: project.tags}
                        })
                    }}>+{project.tags.length - 3}</span></a>
                {/if}
            </div>
            <div class="h-4"></div>
        {/if}
        {#if project}
            <div class="flex gap-3 opacity-50">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-296q85 0 144.5-59.5T684-500q0-85-59.5-144.5T480-704q-85 0-144.5 59.5T276-500q0 85 59.5 144.5T480-296Zm-.12-94Q434-390 402-422.12q-32-32.12-32-78T402.12-578q32.12-32 78-32T558-577.88q32 32.12 32 78T557.88-422q-32.12 32-78 32Zm.12 220q-144 0-264.5-76.5T29-451q-6-11-9-23.42-3-12.43-3-25.5 0-13.08 3-25.58 3-12.5 9-23.5 66-128 186.5-204.5T480-830q144 0 264.5 76.5T931-549q6 11 9 23.42 3 12.43 3 25.5 0 13.08-3 25.58-3 12.5-9 23.5-66 128-186.5 204.5T480-170Zm0-330Zm0 224q115 0 211.87-60.58T840-500q-51.26-102.84-148.13-163.42Q595-724 480-724t-211.87 60.58Q171.26-602.84 120-500q51.26 102.84 148.13 163.42Q365-276 480-276Z"/></svg>
                <span class="font-bold">{project.views >= 0 ? formatNumber(project.views) ? formatNumber(project.views) : "0" : "0"}</span>
            </div>
        {/if}
    </div>
    <div class="actions px-4 pt-1 pb-4">
        {#if $uploader}
            <div class="h-2"></div>
            <div class="flex cursor-default w-full items-center gap-1" on:click={(e)=>{
                e.preventDefault();
            }}>
                <img src={getUserAvatar($uploader)} loading="lazy" class="w-8 h-8 object-cover rounded-full"/>
                <a href={`/profiles/${$uploader.handle}`} on:click={(e)=>{
                    location.pathname = `/profiles/${$uploader.handle}`
                }} class="text-xl hover:underline p-0 m-0 no-underline opacity-50 italic">@{$uploader.handle}</a>
                {#if $uploader.badges.includes('FEMALE')}
                    <img src="/5ffcd5b6446cc.gif" alt="" class="w-8 h-8">
                {/if}
            </div>
            <div class="h-2"></div>
        {/if}
        {#if project.pending && $loggedInUser && $loggedInUser.role >= 1}
        <div class="flex gap-2">
            <button class="variant-filled-primary btn" on:click={(e)=>{
                e.preventDefault()
                axios.post(`${config.apiEndpoint}/mod/accept-draft`, {
                    project: project.url
                }, {
                    headers: {
                        Authorization: localStorage.getItem("sessionToken")
                    }
                }).then(res=>{
                })
                project.pending = false;
                dispatcher("modfeedback")
            }}>Accept</button>
            <button class="variant-filled-error btn" on:click={(e)=>{
                e.preventDefault()
                const modal = {
                        type: 'prompt',
                        // Data
                        title: 'Enter Reason',
                        body: 'Give detailed feedback to the user about why the project was denied',
                        // Populates the input value and attributes
                        value: '',
                        valueAttr: { type: 'text', minlength: 20, maxlength: 1000, required: true },
                        // Returns the updated response value
                        response: (r) => {
                            axios.post(`${config.apiEndpoint}/mod/deny-draft`, {
                                project: project.url,
                                reason: r
                            }, {
                                headers: {
                                    Authorization: localStorage.getItem("sessionToken")
                                }
                            }).then(res=>{
                            })
                            project.pending = false;
                            dispatcher("modfeedback")
                        }
                    };
                    modalStore.trigger(modal);
            }}>
                Deny
            </button>
        </div>
        <div class="h-4"></div>
        {/if}
<div class="flex  gap-2">
        {#if $loggedInUser && $loggedInUser.role >= 1 && !edit}
        {#if project.verified}
            <button class="btn btn-icon variant-soft-primary w-10 h-10" on:click={(e)=>{
                e.preventDefault()
                let fd = new FormData();
                fd.append("url", project.url);
                axios({
                    method: "POST",
                    url: `${config.apiEndpoint}/mod/deny`,
                    data: fd,
                    headers: {
                        Authorization: localStorage.getItem('sessionToken')
                    }
                }).then(res=>{
                    if(!res.data.error) {
                        project = res.data.project
                    }
                })
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M12 2C9.243 2 7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zm6 10 .002 8H6v-8h12zm-9-2V7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9z"></path></svg>
        </button>
        {:else}
            <button class="btn btn-icon variant-ringed-primary w-10 h-10" on:click={(e)=>{
                e.preventDefault();
                let fd = new FormData();
                fd.append("url", project.url);
                axios({
                    method: "POST",
                    url: `${config.apiEndpoint}/mod/accept`,
                    data: fd,
                    headers: {
                        Authorization: localStorage.getItem('sessionToken')
                    }
                }).then(res=>{
                    if(!res.data.error) {
                        project = res.data.project;
                    }
                })
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M17 8V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2H9V7c0-1.654 1.346-3 3-3s3 1.346 3 3v1h2zm1 4 .002 8H6v-8h12z"></path></svg>    
            </button>
        {/if}
        {#if $loggedInUser && $loggedInUser.role >= 4}

            <button class="btn btn-icon variant-soft-error w-10 h-10" on:click={(e)=>{
                e.preventDefault();
                
                const modal = {
            type: 'prompt',

            title: 'Enter URL',
            body: `Enter this project's URL to delete it!`,

            value: '',
            valueAttr: { type: 'text', minlength: 1, maxlength: 100, required: true },
            response: (r) => {
                if (r === project.url) {
                    console.log('URL matched, sending delete request...');
                    axios.post(`${config.apiEndpoint}/mod/delete`, {
                        url: project.url,
                    }, {
                        headers: {
                            Authorization: localStorage.getItem("sessionToken")
                        }
                    }).then(res => {
                        console.log('Project deleted successfully:', res.data);
                    }).catch(error => {
                        console.error('Error deleting project:', error.response ? error.response.data : error.message);
                    });
                } else {
                    console.error('Entered URL does not match project URL');
                }
            }
        };
                    modalStore.trigger(modal);

            }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>
        </button>
        {/if}
    {/if}
    {#if edit && $loggedInUser }
            <button class="btn btn-icon variant-soft-error w-10 h-10" on:click={(e)=>{
                e.preventDefault();
                
                const modal = {
            type: 'prompt',
            title: 'Enter URL',
            body: `Enter this project's URL to delete it!`,
            value: '',
            valueAttr: { type: 'text', minlength: 1, maxlength: 100, required: true },
            response: (r) => {
                if (r === project.url) {
                    console.log('URL matched, sending delete request...');
                    axios.post(`${config.apiEndpoint}/mod/delete`, {
                        url: project.url,
                    }, {
                        headers: {
                            Authorization: localStorage.getItem("sessionToken")
                        }
                    }).then(res => {
                        console.log('Project deleted successfully:', res.data);
                    }).catch(error => {
                        console.error('Error deleting project:', error.response ? error.response.data : error.message);
                    });
                } else {
                    console.error('Entered URL does not match project URL');
                }
            }
        };
                // @ts-ignore
                modalStore.trigger(modal);

            }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>
        </button>
        {/if}
    
    {#if edit || ($loggedInUser && $loggedInUser.role && $loggedInUser.role >= 3)}
        <!-- <div class="h-4"></div> -->
        <a class="btn btn-icon h-10 w-10 variant-soft-tertiary" href={`/projects/edit/${project.url}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M4 21a1 1 0 0 0 .24 0l4-1a1 1 0 0 0 .47-.26L21 7.41a2 2 0 0 0 0-2.82L19.42 3a2 2 0 0 0-2.83 0L4.3 15.29a1.06 1.06 0 0 0-.27.47l-1 4A1 1 0 0 0 3.76 21 1 1 0 0 0 4 21zM18 4.41 19.59 6 18 7.59 16.42 6zM5.91 16.51 15 7.41 16.59 9l-9.1 9.1-2.11.52z"></path></svg>
        </a>
    {/if}
    <slot />
</div>
{#if isBookmarkView}
    <div class="pt-4">
        <button class="btn btn-icon variant-filled-primary" on:click={(e)=>{
            e.preventDefault();
            dispatcher("left")
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        </button>
        <button class="btn btn-icon variant-filled-primary" on:click={(e)=>{
            e.preventDefault();
            dispatcher("right")
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>
        <button class="btn btn-icon variant-filled-error" on:click={(e)=>{
            e.preventDefault();
            dispatcher("remove")
        }}>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus-circle"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
        </button>
    </div>
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