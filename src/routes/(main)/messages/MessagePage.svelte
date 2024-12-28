<script lang="ts">
        import { Carta } from "carta-md";
	import { getUserAvatar } from "../AvatarRenderer";
	import { writable } from "svelte/store";
	import axios from "axios";
	import config from "../../config";
	import { getModalStore, initializeStores, Modal } from "@skeletonlabs/skeleton";
	import ReplyModal from "../ReplyModal.svelte";
        export let deserect;
        const modalStore = getModalStore();
        const carta = new Carta({
            theme: 'github-dark'
        });

        let originalMessage = "";
        carta.render(deserect.markdown).then(res=>{
            originalMessage = res;
        })

        let replies = writable([]);
        function nya() {
            axios.get(`${config.apiEndpoint}/replies/${deserect._id}`, {
                headers: {
                    Authorization: localStorage.getItem("sessionToken")
                }
            }).then(async res=>{
                let messages = res.data.messages;
                for(const message of messages) {
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
<Modal />
<div class="p-4">
    <div class="card w-full p-4">
        <div class="flex gap-4 items-center pb-4">
            <img src={getUserAvatar(deserect.user)} class="w-8 h-8 rounded-lg" alt="">
            <p>{deserect.user.displayName}</p>
        </div>
        {@html originalMessage}
        <div class="h-2"></div>
        <hr>
        <div class="h-2"></div>
        <button class="btn variant-filled-primary btn-sm" on:click={()=>{
            modalStore.trigger({
                type: 'component',
                component: {ref: ReplyModal},
                meta: {
                    id: deserect._id
                },
                response(r) {
                    
                },
            })
        }}>Reply</button>
        <div class="h-2"></div>
        <p class="opacity-50 italic">{$replies.length} {$replies.length == 1 ? "reply" : "replies"}</p>
        <div class="h-2"></div>
    </div>
    <div class="h-8"></div>
    <div class="pl-6 border-solid py-2 border-l border-surface-500">
        {#each $replies as reply}
            <div class="card w-full p-4">
                <div class="flex gap-4 items-center pb-4">
                    <img src={getUserAvatar(reply.user)} class="w-8 h-8 rounded-lg" alt="">
                    <p>{reply.user.displayName}</p>
                </div>
                {@html reply.html}
            </div>
    
        {/each}
    </div>
</div>