<script lang="ts">
	import { Avatar, Tab, TabGroup } from "@skeletonlabs/skeleton";
	import axios from "axios";
    // @ts-ignore
	import config from "../../../config";
	import { writable } from "svelte/store";
	import { Carta } from "carta-md";
	import { getUserAvatar } from "../../AvatarRenderer";
	import Comment from "./Comment.svelte";
	import { getContext } from "svelte";

    export let data;
    let tab = 0;
    let readme = writable("");
    //@ts-ignore
    const carta = new Carta({
        theme: 'github-dark'
    });
    axios.get(`${config.apiEndpoint}/readme/${data.url}`).then(res=>{
        carta.render(res.data).then(res=>{
            readme.set(res);
        })
    })
    let latestFile = writable("");
    let comments = writable(null);
    let proj:any = writable(null)
    let user:any = writable(null);
    let commentText = "";
    axios.get(`${config.apiEndpoint}/get-comments/${data.url}`).then(res=>{
        comments.set(res.data.comments)
    })
    let fileChangelog = "";

    // axios.get(`${config.apiEndpoint}/add-view/${data.url}`) // views are tracked in a not dumb way, dont even try spamming this request
    axios.get(`${config.apiEndpoint}/proj/${data.url}`).then(res=>{
        if(!res.data.error) {
            proj.set(res.data.project);
            if(res.data.project && res.data.project.files && res.data.project.files.length) {
                latestFile.set(res.data.project.latestFile)
            }
            latestFile.subscribe((string)=>{
                if($proj && $proj.files && $proj.files.find(_=>_.file == string) && $proj.files.find(_=>_.file == string).changelog) {
                    carta.render($proj.files.find(_=>_.file == string).changelog).then(res=>{
                        fileChangelog = res;
                    })
                }
            })

            axios.get(`${config.apiEndpoint}/id-to-handle/${res.data.project.author}`).then(res=>{
                if(!res.data.error) {
                    axios.get(`${config.apiEndpoint}/user-profile/${res.data.handle}`).then(res=>{
                        if(!res.data.error) {
                            user.set(res.data.userData);
                        }
                    })
                }
            })
        }
    })
    let uiRefresh = false;
    let loggedInUser:any = getContext("loggedInUser");

    // axios.get(`${config.apiEndpoint}/add-view/${data.url}`).then(res=>{})
</script>
<svelte:head>
    <title>MCBETools - {data.data.title}</title>
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="description" content={data.data.shortDescription} />
    <meta name="og:description" content={data.data.shortDescription} />
    <meta name="og:title" content="MCBETools - {data.data.title}" />
    {#if data.data.bannerURL}
        <meta property="og:image" content={`${config.apiEndpoint}${data.data.bannerURL}`} />
    {/if}
</svelte:head>
{#if $proj}
    <div class="thing w-full h-full hidden lg:block">
        <!-- <div class="container2 flex h-full w-full justify-center" style={`background:url(${config.apiEndpoint}${$proj.bannerURL});background-size:cover;background-position:center;background-attachment:fixed;`}>
            <div class="overlay bg-gradient-to-b from-surface-900/75 to-surface-900/75 w-full backdrop-blur-3xl"> -->
    {#if $proj.bannerURL}
        <div class="p-4 relative">
            <div class="w-full h-96 rounded-lg" style="background:url({config.apiEndpoint}{$proj.bannerURL});background-size:cover;background-position:center;">
                <div class="flex justify-end items-start flex-col h-full bg-gradient-to-bl from-surface-900/0 to-surface-900 p-4">
                    <h3 class="h2 font-bold">{$proj.title}</h3>
                    <p class="opacity-50 text-lg">{$proj.shortDescription}</p>    
                </div>
            </div>
            <!-- <div class="w-full h-96 rounded-lg absolute top-0 blur-3xl -z-10" style="background:url({config.apiEndpoint}{$proj.bannerURL});background-size:cover;background-position:center;"></div> -->
        </div>
    {/if}
    <div class="px-4 pt-4">
        <div class="card bg-initial w-full h-16 flex gap-2 items-center justify-center">
            <button class="btn btn-sm {tab == 0 ? "variant-filled" : "variant-soft"}" on:click={()=>{tab = 0}}>Info</button>
            <button class="btn btn-sm {tab == 1 ? "variant-filled" : "variant-soft"}" on:click={()=>{tab = 1}}>Comments</button>
            <!-- <button class="btn btn-sm {tab == 2 ? "variant-filled" : "variant-soft"}" on:click={()=>{tab = 2}}>Gallery</button>
            <button class="btn btn-sm {tab == 3 ? "variant-filled" : "variant-soft"}" on:click={()=>{tab = 3}}>Forums</button> -->
        </div>
    </div>
    {#if tab == 1}
        {#if $loggedInUser}
        <div class="px-4 pt-4">
            <div class="card w-full bg-initial p-4 flex gap-4">
                    <input type="text" class="input flex-1" placeholder="Comment Text" bind:value={commentText}>
                    <button class="btn variant-filled" on:click={()=>{
                                                            let fd = new FormData();
                                        fd.append("text", commentText);
                                        fd.append("url", data.url);
                                        axios({
                                            method: "POST",
                                            url: `${config.apiEndpoint}/make-comment`,
                                            data: fd,
                                            headers: {
                                                Authorization: localStorage.getItem('sessionToken')
                                            }
                                        }).then(res=>{
                                            axios.get(`${config.apiEndpoint}/get-comments/${data.url}`).then(res=>{
                                    comments.set(res.data.comments)
                                })

                                        })
                    }}>Post</button>
            </div>
        </div>
        {/if}
        {#if $comments}
            <div class="px-4 {!$loggedInUser ? "py-4" : "py-4"}">
                <div class="w-full bg-initial p-4 card min-h-16">
                    {#each $comments as comment}
                        <Comment comment={comment} url={data.url} on:refresh={()=>{
                            axios.get(`${config.apiEndpoint}/get-comments/${data.url}`).then(res=>{
                                comments.set(res.data.comments)
                            })
                        }}/>
                    {/each}
                </div>
            </div>
        {/if}
    {/if}
    {#if tab == 0}
        <div class="flex p-4 gap-4 h-fit">
            <div class="cards flex-1">
                <div class="layout w-full h-full flex flex-col">
                    <div class="prose prose-invert max-w-full bg-initial card p-4 h-fit">
                        <!-- <button class="variant-soft-error btn btn-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"/></svg>
                        </button> -->
                        {@html $readme}
                    </div>
                    <div class="h-8"></div>
                    <div class="prose prose-invert max-w-full bg-initial card p-4 h-fit">
                        <h3 class="h3 font-bold">Changelog</h3>
                        <hr />
                        <!-- <button class="variant-soft-error btn btn-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"/></svg>
                        </button> -->
                        {@html fileChangelog}
                    </div>    
        
                </div>
            </div>
            <div class="cards flex-col w-96">
                <div class="sidebar card bg-initial p-4 w-full h-fit">
                    <h3 class="h3 font-bold flex gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="currentColor"><path d="M480-269 314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Z"/></svg>    
                        Project Owner
                    </h3>
                    <div class="h-2"></div>
                    <hr />
                    <div class="h-2"></div>
                    {#if $user}
                        <div class="h-2"></div>
                        <div class="flex gap-4 p-0 items-center">
                            <Avatar src={getUserAvatar($user)} width="w-16" class="m-0 p-0 w-12" />
                            <div class="flex flex-col justify-center">
                                <p class="text-2xl font-bold m-0">{$user.displayName}</p>
                                <a href={`/profiles/${$user.handle}`} class="opacity-50 underline m-0">@{$user.handle}</a>
                            </div>
                            <button class="btn btn-sm variant-filled h-fit">Follow</button>
                        </div>
                        {#if $user.bio}
                            <div class="h-4"></div>
                            <p class="opacity-50">{$user.bio}</p>
                        {/if}
                    {/if}
                </div>
                <div class="h-4"></div>
                <div class="sidebar card bg-initial p-4 w-full">
                    <h3 class="h3 font-bold flex gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="currentColor"><path d="M856-390 570-104q-12 12-27 18t-30 6q-15 0-30-6t-27-18L103-457q-11-11-17-25.5T80-513v-287q0-33 23.5-56.5T160-880h287q16 0 31 6.5t26 17.5l352 353q12 12 17.5 27t5.5 30q0 15-5.5 29.5T856-390ZM260-640q25 0 42.5-17.5T320-700q0-25-17.5-42.5T260-760q-25 0-42.5 17.5T200-700q0 25 17.5 42.5T260-640Z"/></svg>
                        Tags
                    </h3>
                    <div class="h-2"></div>
                    <hr />
                    <div class="h-2"></div>
                    <div class="flex gap-2">
                        {#each $proj.tags as tag}
                        <span class="badge variant-filled">{tag}</span>
                        {/each}
                    </div>
                </div>
                <div class="h-4"></div>
                <div class="sidebar card bg-initial p-4 w-full">
                    <h3 class="font-bold h3 flex gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="currentColor"><path d="M480-337q-8 0-15-2.5t-13-8.5L308-492q-12-12-11.5-28t11.5-28q12-12 28.5-12.5T365-549l75 75v-286q0-17 11.5-28.5T480-800q17 0 28.5 11.5T520-760v286l75-75q12-12 28.5-11.5T652-548q11 12 11.5 28T652-492L508-348q-6 6-13 8.5t-15 2.5ZM240-160q-33 0-56.5-23.5T160-240v-80q0-17 11.5-28.5T200-360q17 0 28.5 11.5T240-320v80h480v-80q0-17 11.5-28.5T760-360q17 0 28.5 11.5T800-320v80q0 33-23.5 56.5T720-160H240Z"/></svg>
                        Downloads
                    </h3>
                    <div class="h-2"></div>
                    <hr />
                    <div class="h-2"></div>
                    <ul class="list">
                        {#each $proj.files.reverse() as file}
                            <div class="card variant-filled-surface p-4">
                                <p>{file.title}</p>
                                <div class="h-2"></div>
                                <button class="btn btn-sm variant-filled" on:click={()=>{
                                                            let fileTitle = $proj.files.find(_=>_.file == file.file).title;
                            let fileExt = file.file.split('.')[file.file.split('.').length - 1];
                            let fileName = `${fileTitle}.${fileExt}`;

                            fetch(`${config.apiEndpoint}/uploads/${file.file}`)
                                .then(response => response.blob())
                                .then(blob => {
                                    const blobUrl = URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.href = blobUrl;
                                    a.download = fileName; // Use custom filename here
                                    document.body.appendChild(a);
                                    a.click();
                                    a.remove();
                                    URL.revokeObjectURL(blobUrl);
                                })
                                .catch(error => console.error('File download error:', error));


                                }}>Download</button>
                            </div>
                        {/each}
                    </ul>
                </div>
            </div>
        </div>
    {/if}
<!-- </div>
</div> -->
</div>

{/if}
<div class="thing w-full h-full block lg:hidden">
    {#if tab === 0}
    {#if $proj}
    <div class="container2 flex h-full w-full justify-center" style={`background:url(${config.apiEndpoint}${$proj.bannerURL});background-size:cover;background-position:center;background-attachment:fixed;`}>
        <div class="overlay bg-gradient-to-b from-surface-700 to-surface-900/50 w-full flex justify-center backdrop-blur-sm h-full max-w-none">

        <article class="prose prose-invert px-12 w-full min-w-lg max-w-3xl bg-surface-900">
                <TabGroup>
                    <Tab name="tab1" value={0} bind:group={tab}>Overview</Tab>
                    <Tab name="tab2" value={1} bind:group={tab}>Comments</Tab>
                    <!-- <Tab name="tab3" value={2} bind:group={tab}>Files</Tab> -->
                </TabGroup>
                <div class="h-6"></div>
                <h3 class="h3 font-bold p-0 m-0">{$proj.title}</h3>
                {#if $user}
                    <div class="h-2"></div>
                    <div class="flex gap-4 p-0">
                        <Avatar src={getUserAvatar($user)} width="w-16" class="m-0 p-0 w-12" />
                        <div class="flex flex-col justify-center">
                            <p class="text-2xl font-bold m-0">{$user.displayName}</p>
                            <a href={`/profiles/${$user.handle}`} class="opacity-50 underline m-0">@{$user.handle}</a>
                        </div>
                    </div>
                {/if}
                <p class="opacity-50 text-white">{$proj.shortDescription}</p>
                <div class="w-full bg-surface-500" style="height:1px;"></div>
                {@html $readme}
                <div class="h-4"></div>
                {#if $proj.files && $proj.files.length}

                    <p class="opacity-80 text-md p-0 m-0">Select your version</p>
                    <select class="select" value={$latestFile} on:change={(e)=>{
                        latestFile.set(e.target.value)
                    }}>
                        {#each $proj.files.reverse() as file}
                            <option value={file.file}>{file.title}</option>
                        {/each}
                    </select>
                    <div class="h-2"></div> 
                    <button class="btn btn-sm w-full variant-ringed-primary hover:variant-filled-primary text-white" on:click={()=>{
                        let fileTitle = $proj.files.find(_=>_.file == $latestFile).title;
                        let fileExt = $latestFile.split('.')[$latestFile.split('.').length - 1];
                        let fileName = `${fileTitle}.${fileExt}`;

                        // fetch(`${config.apiEndpoint}/uploads/${$latestFile}`).then(res=>res.blob()).then(res=>{
                        //     let blobUrl = URL.createObjectURL(res);
                        //     let a = document.createElement('a');
                        //     a.href = blobUrl;
                        //     a.download = fileName;
                        //     a.click();

                        // })
                        // const blobUrl = `${config.apiEndpoint}/uploads/${$latestFile}`;
                        // const a = document.createElement('a');
                        // a.href = blobUrl;
                        // a.download = fileName; // Set your custom filename here
                        // document.body.appendChild(a); // Append to DOM for Firefox compatibility
                        // a.click();
                        // a.remove(); // Clean up the DOM
                        fetch(`${config.apiEndpoint}/uploads/${$latestFile}`)
                            .then(response => response.blob())
                            .then(blob => {
                                const blobUrl = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = blobUrl;
                                a.download = fileName; // Use custom filename here
                                document.body.appendChild(a);
                                a.click();
                                a.remove();
                                URL.revokeObjectURL(blobUrl);
                            })
                            .catch(error => console.error('File download error:', error));


                    }}>
                        Download {$proj.files.find(_=>_.file == $latestFile).title}
                    </button>

                {/if}
                <div class="h-6"></div>
        </article>
    </div>
    </div>
    {/if}
    {:else if tab === 1}
        {#if $proj}
            <div class="container2 flex w-full h-full justify-center" style={`background:url(${config.apiEndpoint}${$proj.bannerURL});background-size:cover;background-position:center;background-attachment:fixed;`}>
                <div class="h-full overlay bg-gradient-to-b from-surface-700 to-surface-900/50 w-full flex justify-center backdrop-blur-sm">
                    <div class="min-w-lg max-w-3xl px-12 w-full bg-surface-900 h-full">
                        <TabGroup>
                            <Tab name="tab1" value={0} bind:group={tab}>Overview</Tab>
                            <Tab name="tab2" value={1} bind:group={tab}>Comments</Tab>
                            <Tab name="tab3" value={2} bind:group={tab}>Files</Tab>
                        </TabGroup>
                        <div class="comment-area">
                            <div class="h-4"></div>
                            <div class="flex gap-4 p-4">
                                <input type="text" class="input w-3xl" placeholder="Type a comment..." bind:value={commentText} />
                                <button class="btn variant-filled-primary text-black" on:click={()=>{
                                    let fd = new FormData();
                                    fd.append("text", commentText);
                                    fd.append("url", data.url);
                                    axios({
                                        method: "POST",
                                        url: `${config.apiEndpoint}/make-comment`,
                                        data: fd,
                                        headers: {
                                            Authorization: localStorage.getItem('sessionToken')
                                        }
                                    }).then(res=>{
                                        axios.get(`${config.apiEndpoint}/get-comments/${data.url}`).then(res=>{
                                comments.set(res.data.comments)
                            })

                                    })
                                }}>Send</button>
                            </div>
                        </div>
                        <div class="h-6"></div>
                        {#if $comments}
                            {#each $comments as comment}
                                <div class="h-2"></div>
                                <Comment comment={comment} url={data.url} on:refresh={()=>{
                                    axios.get(`${config.apiEndpoint}/get-comments/${data.url}`).then(res=>{
                                        comments.set(res.data.comments)
                                    })
                                }}/>
                            {/each}
                        {/if}
                    </div>
                </div>
            </div>

        {/if}
    {:else if tab === 2}
    (tab panel 3 contents)
{/if}

</div>
<style lang="postcss" global>
    .prose {
        --tw-prose-headings: #fff;
    }
    .prose {
        margin: 0 !important;
    }
    .prose h1 {
        @apply h1 font-bold;
    }
    .prose h6 {
        @apply h6 text-white opacity-50;
    }
    .prose h5 {
        @apply h5 text-white opacity-50;
    }
    .prose * {
        @apply text-white;
        color: white !important;
    }
    :gloal(.prose img) {
        border-radius: var(--theme-rounded-base) !important;
    }
    :gloal(.prose a) {
        color: rgb(var(--color-primary-500)) !important;
    }
    .prose button {
        color: white !important;
    }
    .prose button:hover {
        color: black !important;
    }
    .prose button.text-black {
        color: black !important;
    }
</style>