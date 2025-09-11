<script lang="ts">
	import { getModalStore } from "@skeletonlabs/skeleton";
	import axios from "axios";
	import config from "../../config";
	import { loggedInUser } from "../loggedInUserStore";

    let modalStore = getModalStore();

    let message = $modalStore[0].meta.message;
</script>
<div class="w-modal card p-4 flex flex-col gap-4">
    {#if $modalStore[0]}
        <button class="btn variant-soft-error flex gap-2" on:click={(e)=>{
            axios.post(`${config.apiEndpoint}/delete-message`, {
                messageID: message._id
            }, {
            headers: {
                Authorization: localStorage.getItem("sessionToken")
            }
            }).then(res=>{
                location.reload();
            })
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            Delete
        </button>
        {#if !message.archived && message.type == 0}
            <button class="btn variant-soft-warning flex gap-2" on:click={(e)=>{
                axios.post(`${config.apiEndpoint}/archive-message`, {
                    messageID: message._id
                }, {
                headers: {
                    Authorization: localStorage.getItem("sessionToken")
                }
                }).then(res=>{
                    location.reload();
                })
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-archive-icon lucide-archive"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>
                Archive
            </button>
        {/if}
        {#if !message.archived && message.author != $loggedInUser._id}
            <button class="btn variant-soft-primary flex gap-2" on:click={(e)=>{
                axios.post(`${config.apiEndpoint}/${message.read ? "unread" : "read"}-message`, {
                    messageID: message._id
                }, {
                headers: {
                    Authorization: localStorage.getItem("sessionToken")
                }
                }).then(res=>{
                    location.reload();
                })
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open-icon lucide-book-open"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>
                {message.read ? "Unread" : "Read"} Message
            </button>
        {/if}
    {/if}
</div>
