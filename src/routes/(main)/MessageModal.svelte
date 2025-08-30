<script lang="ts">
	import { Carta, MarkdownEditor } from "carta-md";
    import 'carta-md/default.css';
    import './projects/edit/[url]/description/theme.css'
	import { getModalStore, initializeStores } from "@skeletonlabs/skeleton";
	import axios from "axios";
	import config from "../config";
	import { loggedInUser } from "./loggedInUserStore";
    const carta = new Carta({
        theme: 'github-dark'
    });
    let markdown = "";
    let subject = "";
    let modalStore = getModalStore();
</script>
<style>
    /* :global(.carta-font-code),
  :global(.carta-font-code *) {
    font-family: 'Fira Code', monospace !important;
    font-variant-ligatures: normal !important;
    font-size: 1.1rem !important;
    line-height: 1.5rem !important;
  }
  :global(.carta-theme__default .carta-input),
  :global(.carta-theme__default .carta-renderer) {
    height: 200px !important;
  }
  * {
    outline: 0 !important;
  } */
</style>

{#if $modalStore[0]}
    <div class="card bg-initial p-4 py-8 max-w-none">
        {#if $loggedInUser && $loggedInUser.handle == "admin"}
            <div class="p-4 rounded-container-token variant-ghost-primary">
                <h3 class="h3 font-bold text-primary-500">INFO</h3>
                <p>Admin account can run commands. Please type /help for more info.</p>
                <p>Commands must go in the big text editor, not subject. Subject can remain empty</p>
                <p>This wont send a message to the user</p>
            </div>
            <div class="h-4"></div>
        {/if}
        <input type="text" class="input" placeholder="Subject" bind:value={subject}>
        <div class="h-2"></div>
        <div class="bg-surface-900 max-w-none w-full" style="height: 300px; max-height:300px;">
            <MarkdownEditor carta={carta} theme="mcbetools" mode={"tabs"} bind:value={markdown} />
        </div>
        <div class="h-2"></div>
        <button class="btn btn-sm variant-filled-primary w-full" on:click={()=>{
            let fd = new FormData();
            fd.append("markdown", markdown);
            fd.append("subject", subject);
            fd.append("user", $modalStore[0].meta.user);
            axios({
                method: "POST",
                url: `${config.apiEndpoint}/messages/create-message`,
                data: fd,
                headers: {
                    Authorization: localStorage.getItem('sessionToken')
                }
            }).then(res=>{
                if(res.data.adminAlert) {
                    modalStore.close();
                    modalStore.trigger({
                        type: 'alert',
                        title: res.data.title,
                        body: res.data.body
                    })
                    return;
                }
                if(!res.data.error) {
                    location.pathname = `/messages`;
                }
            })
        }}>Send</button>
    </div>
{/if}