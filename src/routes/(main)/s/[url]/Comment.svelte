<script lang="ts">
	import axios from "axios";
	import { writable } from "svelte/store";
	import config from "../../../config";
	import { Avatar, getToastStore } from "@skeletonlabs/skeleton";
	import { getUserAvatar } from "../../AvatarRenderer";
	import { createEventDispatcher, getContext, onMount } from "svelte";
    const dispatch = createEventDispatcher();
    export let comment;
    export let url;
    export let marginLeft = 0;
    export let nestIndex = 0;
    let showReplies = false;
    let commentAuthor = writable(null);
    let replyText = "";
    let toastStore = getToastStore();

    export let isProjectOwner = false;
    $: {
        axios.get(`${config.apiEndpoint}/id-to-handle/${comment.author}`).then(res=>{
            axios.get(`${config.apiEndpoint}/user-profile/${res.data.handle}`).then(res=>{
                commentAuthor.set(res.data.userData);
            })
        })
    }
    onMount(()=>{
        axios.get(`${config.apiEndpoint}/id-to-handle/${comment.author}`).then(res=>{
            axios.get(`${config.apiEndpoint}/user-profile/${res.data.handle}`).then(res=>{
                commentAuthor.set(res.data.userData);
            })
        })

    })
    let loggedInUser:any = getContext("loggedInUser");
</script>
<style>
    .a {
        @apply animate-pulse;
    }
</style>
{#if $commentAuthor}
    <div class="flex gap-4 h-fit py-2" style="margin-left: {marginLeft}px;">
        <img src={getUserAvatar($commentAuthor)} class="rounded-full w-12 h-12" />
        <div class="flex flex-col">
            <p class="text-lg font-bold p-0 m-0">{$commentAuthor.displayName} <a class="opacity-50 hover:opacity-100 hover:text-primary-500 cursor hover:underline" href="/@{$commentAuthor.handle}">( @{$commentAuthor.handle} )</a></p>
            <p class="text-md p-0 m-0">{comment.text}</p>
            <div class="flex gap-4">
                {#if $loggedInUser && nestIndex < 2}
                    <input type="text" class="input h-8" placeholder="Reply Text" bind:value={replyText}>
                    <button class="h-8 anchor hover:bg-primary-500/20 px-4 rounded-lg" on:click={()=>{
                                                            let fd = new FormData();
                                        fd.append("text", replyText);
                                        fd.append("url", url);
                                        fd.append("parent", comment._id);
                                        axios({
                                            method: "POST",
                                            url: `${config.apiEndpoint}/make-comment`,
                                            data: fd,
                                            headers: {
                                                Authorization: localStorage.getItem('sessionToken')
                                            }
                                        }).then(res=>{
                                            if(res.data.error) {
                                                toastStore.trigger({
                                                    background: 'variant-filled-error',
                                                    timeout: 5000,
                                                    message: `Error: ${res.data.message ? res.data.message : "No error message :("}`
                                                })
                                                return;
                                            } else {
                                                toastStore.trigger({
                                                    background: 'variant-filled-success',
                                                    timeout: 5000,
                                                    message: `Posted reply!`
                                                })
                                                dispatch("refresh");

                                            }
                                            // alert('haii')
                                        })
                    }}>Reply</button>
                    {#if $loggedInUser && ($loggedInUser.role >= 1 || comment.author == $loggedInUser._id || isProjectOwner)}
                        <button class="h-8 anchor hover:bg-error-500/20 px-4 rounded-lg !text-error-500" on:click={()=>{
                            axios.post(`${config.apiEndpoint}/delete-comment`, {comment: comment._id, url}).then(res=>{
                                toastStore.trigger({
                                    background: res.data && res.data.error ? 'variant-filled-error' : 'variant-filled-success',
                                    message: res.data && res.data.error ? 'Failed to delete comment' : 'Deleted comment!',
                                    timeout: 5000
                                })
                                dispatch('refresh')
                            })
                        }}>Delete</button>

                    {/if}
                {/if}
            </div>
            {#if nestIndex < 2 && comment.replies.length}
                <button class="h-8 anchor hover:bg-primary-500/20 px-4 rounded-lg flex items-center " on:click={()=>{
                    showReplies = !showReplies;
                }}>
                    <span class="badge">
                        {#if showReplies}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"/></svg>
                        {:else}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"/></svg>
                        {/if}
                    </span>
                    <span>Show {comment.replies.length} {comment.replies.length == 1 ? "reply" : 'replies'}</span>
                </button>
            {/if}
        </div>
    </div>
    {#if comment.replies.length && nestIndex < 2}
        {#if showReplies}
            <div class="h-4"></div>
            <hr style="margin-left: {marginLeft + 42}px;">
            <div class="h-4"></div>
            {#each comment.replies as reply}
                <svelte:self comment={reply} nestIndex={nestIndex + 1} marginLeft={marginLeft + 32} url={url} on:refresh={()=>{dispatch("refresh")}}/>
            {/each}
        {/if}
    {/if}
{:else}
    <div class="flex gap-4 h-fit py-2 a" style="margin-left: {marginLeft}px;">
        <div class="placeholder-circle w-12"></div>
        <div class="flex flex-col gap-2">
            <div class="placeholder w-48"></div>
            <div class="placeholder w-64"></div>
        </div>
    </div>
{/if}