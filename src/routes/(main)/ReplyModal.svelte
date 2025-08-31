<script lang="ts">
	import { Carta, MarkdownEditor } from "carta-md";
    import 'carta-md/default.css';
    import './projects/edit/[url]/description/theme.css'
	import { getModalStore, initializeStores } from "@skeletonlabs/skeleton";
	import axios from "axios";
	import config from "../config";
    const carta = new Carta({
        theme: 'github-dark'
    });
    let markdown = "";
    let subject = "";
    let modalStore = getModalStore();
</script>
<style>
    :global(.carta-font-code),
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
  }
</style>

{#if $modalStore[0]}
    <div class="card bg-initial p-4 py-8 max-w-none w-96 w-modal">
        <div class="bg-surface-900 max-w-none w-full max-h-screen min-h-[320px]">
            <MarkdownEditor carta={carta} mode={"tabs"} bind:value={markdown} theme="mcbetools"/>
        </div>
        <div class="h-2"></div>
        <button class="btn btn-sm variant-filled-primary w-full" on:click={()=>{
            axios.post(`${config.apiEndpoint}/reply-to-message`, {
                messageID: $modalStore[0].meta.id,
                markdown
            }, {
                headers: {
                    Authorization: localStorage.getItem("sessionToken")
                }
            }).then(res=>{
                $modalStore[0].response(true)
                modalStore.close()
            })
            // let fd = new FormData();
            // fd.append("markdown", markdown);
            // fd.append("subject", subject);
            // fd.append("user", $modalStore[0].meta.user);
            // axios({
            //     method: "POST",
            //     url: `${config.apiEndpoint}/reply-to-message`,
            //     data: {

            //     },
            //     headers: {
            //         Authorization: localStorage.getItem('sessionToken')
            //     }
            // }).then(res=>{
            //     if(!res.data.error) {
            //         location.pathname = `/messages`;
            //     }
            // })
        }}>Send</button>
    </div>
{/if}