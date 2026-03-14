<script lang="ts">
        import { Carta } from "carta-md";
	import { getUserAvatar } from "../AvatarRenderer";
	import { writable } from "svelte/store";
	import axios from "axios";
	import config from "../../config";
	import { getModalStore, initializeStores, Modal } from "@skeletonlabs/skeleton";
	import ReplyModal from "../ReplyModal.svelte";
	import AvatarRenderer from "../AvatarRenderer.svelte";
	import { userCache } from "../cache";
	import MessageOptions from "./MessageOptions.svelte";
    import DOMPurify from 'isomorphic-dompurify';
	import { loggedInUser, msgCount } from "../loggedInUserStore";
        export let deserect;
        const modalStore = getModalStore();
        const carta = new Carta({
            sanitizer: DOMPurify.sanitize,
            theme: 'github-dark'
        });

        let originalMessage = "";
        carta.render(deserect.markdown).then(res=>{
            originalMessage = res;
        })
        if(deserect.to == $loggedInUser._id) {
            axios.post(`${config.apiEndpoint}/read-message`, {messageID: deserect._id}, {
                headers: {
                    Authorization: localStorage.getItem('sessionToken')
                }
            }).then(()=>{
                axios.get(`${config.apiEndpoint}/unread-message-count`, {
                    headers: {Authorization: localStorage.getItem('sessionToken')}
                }).then(res=>{
                    msgCount.set(res.data && res.data.count ? res.data.count : 0)
                })
            })
        }
        let replies = writable([]);
        function nya() {
            axios.get(`${config.apiEndpoint}/replies/${deserect._id}`, {
                headers: {
                    Authorization: localStorage.getItem("sessionToken")
                }
            }).then(async res=>{
                let messages = res.data.messages;
                for(const message of messages) {
                    if(message.author != $loggedInUser._id) {
                        axios.post(`${config.apiEndpoint}/read-message`, {messageID: message._id}, {
                headers: {
                    Authorization: localStorage.getItem('sessionToken')
                }
            }).then(()=>{
                axios.get(`${config.apiEndpoint}/unread-message-count`, {
                    headers: {Authorization: localStorage.getItem('sessionToken')}
                }).then(res=>{
                    msgCount.set(res.data && res.data.count ? res.data.count : 0)
                })
            })
                    }
                    let handle = await axios.get(`${config.apiEndpoint}/id-to-handle/${message.author}`);
                    let profile = await axios.get(`${config.apiEndpoint}/user-profile/${handle.data.handle}`);
                    message.user = profile.data.userData;
                    message.html = await carta.render(message.markdown)
                }
                replies.set(messages)
            })
        }

        nya();
</script>
<!-- <Modal /> -->
<div class="p-4">
    <div class="card w-full p-4">
        <div class="flex gap-4 items-center pb-4">
            <!-- <img src={getUserAvatar(reply.user)} class="w-8 h-8 rounded-lg" alt=""> -->
            <!-- <a>{reply.user.displayName}</a> -->
             <AvatarRenderer profile={deserect.user} />
             <div class="flex flex-col">
                <p>{deserect.user.displayName}</p>
                <a class="text-white/50 hover:text-white hover:underline italic" href="/@{deserect.user.handle}">@{deserect.user.handle}</a>
             </div>
        </div>
        {@html originalMessage}
        <div class="h-2"></div>
        <hr>
        <div class="h-2"></div>
        <div class="flex gap-4">
            {#if !deserect.archived}
                <button class="btn variant-filled-primary btn-sm" on:click={()=>{
                    modalStore.trigger({
                        type: 'component',
                        component: {ref: ReplyModal},
                        meta: {
                            id: deserect._id
                        },
                        response(r) {
                            nya()
                        },
                    })
                }}>Reply</button>
            {/if}
            <button class="btn btn-sm variant-soft-primary" on:click={()=>{
                modalStore.trigger({
                    type: 'component',
                    component: {ref: MessageOptions},
                    meta: {message: deserect}
                })
            }}>
                Options
            </button>
        </div>
        <div class="h-2"></div>
        <p class="opacity-50 italic">{$replies.length} {$replies.length == 1 ? "reply" : "replies"} | {deserect.read ? "READ" : "UNREAD"}</p>
        <div class="h-2"></div>
    </div>
    <div class="h-8"></div>
    <div class="flex flex-col gap-8">
        {#if $replies.length}
            <div class="pl-6 border-solid py-2 border-l border-surface-500 flex flex-col gap-4">
                {#each $replies as reply}
                    <div class="card w-full p-4" class:variant-soft-primary={reply.author != $loggedInUser._id && !reply.read}>
                        <div class="flex gap-4 items-center pb-4">
                            <!-- <img src={getUserAvatar(reply.user)} class="w-8 h-8 rounded-lg" alt=""> -->
                            <!-- <a>{reply.user.displayName}</a> -->
                             <AvatarRenderer profile={reply.user} />
                             <div class="flex flex-col">
                                <p>{reply.user.displayName}</p>
                                <a class="text-white/50 hover:text-white hover:underline italic" href="/@{reply.user.handle}">@{reply.user.handle}</a>
                             </div>
                        </div>
                        {@html reply.html}
                        <div class="h-2"></div>
                        <span class="opacity-50 italic">{reply.read ? "READ" : "NOT READ"}</span>
                        <div class="h-4"></div>
                        <button class="btn btn-sm variant-soft-primary" on:click={()=>{
                            modalStore.trigger({
                                type: 'component',
                                component: {ref: MessageOptions},
                                meta: {message: reply}
                            })
                        }}>Options</button>
                    </div>
            
                {/each}
            </div>
        {/if}

    </div>
</div>