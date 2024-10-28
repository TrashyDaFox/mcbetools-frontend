<script lang="ts">
	import axios from "axios";
	import { writable } from "svelte/store";
	import config from "../../../config";
	import { Avatar } from "@skeletonlabs/skeleton";
	import { getUserAvatar } from "../../AvatarRenderer";
	import { createEventDispatcher, getContext } from "svelte";
    const dispatch = createEventDispatcher();
    export let comment;
    export let url;
    export let marginLeft = 0;
    let commentAuthor = writable(null);
    let replyText = "";
    axios.get(`${config.apiEndpoint}/id-to-handle/${comment.author}`).then(res=>{
        axios.get(`${config.apiEndpoint}/user-profile/${res.data.handle}`).then(res=>{
            commentAuthor.set(res.data.userData);
        })
    })
    let loggedInUser:any = getContext("loggedInUser");
</script>

{#if $commentAuthor}
    <div class="flex gap-4 h-fit py-2" style="margin-left: {marginLeft}px;">
        <img src={getUserAvatar($commentAuthor)} class="rounded-full w-12 h-12" />
        <div class="flex flex-col">
            <p class="text-lg font-bold p-0 m-0">{$commentAuthor.displayName} <span class="opacity-50">( @{$commentAuthor.handle} )</span></p>
            <p class="text-md p-0 m-0">{comment.text}</p>
            <div class="flex gap-4">
                {#if $loggedInUser}
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
                                            // alert('haii')
                                            dispatch("refresh");
                                        })
                    }}>Reply</button>
                {/if}
            </div>
        </div>
    </div>
    {#if comment.replies.length}
        <div class="h-4"></div>
        <hr style="margin-left: {marginLeft + 32}px;">
        <div class="h-4"></div>
        {#each comment.replies as reply}
            <svelte:self comment={reply} marginLeft={marginLeft + 32} url={url} on:refresh={()=>{dispatch("refresh")}}/>
        {/each}
    {/if}
{/if}