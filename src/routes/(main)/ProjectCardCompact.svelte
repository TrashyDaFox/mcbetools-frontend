<script lang="ts">
	import { createEventDispatcher, getContext, onDestroy, onMount } from "svelte";
	import config from "../config";
	import axios from "axios";
	import { writable } from "svelte/store";
    import { initializeStores, Modal } from '@skeletonlabs/skeleton';
    import { getModalStore } from '@skeletonlabs/skeleton';
	import { getUserAvatar } from "./AvatarRenderer";
	import { featuredProjects, loggedInUser } from "./loggedInUserStore";

    const dispatcher = createEventDispatcher();
	// import { Modal, getModalStore } from '@skeletonlabs/skeleton';
    import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';
	import TagView from "./TagView.svelte";
    export let isBookmarkView:boolean = false;
    export let isDraft:boolean = false;
    // export let isDraft:boolean = false;
    initializeStores();
    const modalStore = getModalStore();
    export let project:any;
    export let edit:any = false;
    let project2 = writable(project)
    // const timer = setInterval(()=>{
    //     project2.set(project)
    // },1000)
    // onDestroy(()=>{
    //     clearInterval(timer)
    // })
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
<Modal />
<a id={project.url} key={project.url} href={edit ? null : `/s/${isDraft ? "draft-" : ""}${project.url}`} class="overflow-hidden card card-hover flex gap-4" style={project.bannerURL ? `background-image:url(${project.bannerURL ? `${config.apiEndpoint}${project.bannerURL}` : `/defaultbanner.png`});background-size:cover;background-position:center;` : ""}>
    <div class="w-full h-full backdrop-blur-lg bg-gradient-to-br from-surface-900 to-surface-900/50 flex gap-4 p-2 overflow-hidden">
        {#if project.avatarURL}
            <img src={`${config.apiEndpoint}${project.avatarURL}`} class="w-16 h-16 rounded-3xl object-cover border-8 border-surface-800" />
        {:else}
            <div class="w-16 h-16 rounded-3xl object-cover border-8 border-surface-800 bg-primary-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" style="fill: currentColor;"><path d="m21.406 6.086-9-4a1.001 1.001 0 0 0-.813 0l-9 4c-.02.009-.034.024-.054.035-.028.014-.058.023-.084.04-.022.015-.039.034-.06.05a.87.87 0 0 0-.19.194c-.02.028-.041.053-.059.081a1.119 1.119 0 0 0-.076.165c-.009.027-.023.052-.031.079A1.013 1.013 0 0 0 2 7v10c0 .396.232.753.594.914l9 4c.13.058.268.086.406.086a.997.997 0 0 0 .402-.096l.004.01 9-4A.999.999 0 0 0 22 17V7a.999.999 0 0 0-.594-.914zM12 4.095 18.538 7 12 9.905l-1.308-.581L5.463 7 12 4.095zM4 16.351V8.539l7 3.111v7.811l-7-3.11zm9 3.11V11.65l7-3.111v7.812l-7 3.11z"></path></svg>
            </div>
        {/if}
        <div class="flex-auto flex flex-col gap-2">
            <div class="flex gap-4">
                <p class="text-lg font-bold">{project.title}</p>
                <p>&bullet;</p>
                {#if $uploader}
                    <p class="opacity-50 italic">By {$uploader.displayName} (@{$uploader.handle})</p>
                {/if}
            </div>
            <p>{project.shortDescription} <span class="badge variant-filled">({project.files.length} {project.files.length == 1 ? "file" : "files"})</span></p>
        </div>
    </div>
    
</a>