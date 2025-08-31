<script lang="ts">
	import { getModalStore, getToastStore, ListBox, ListBoxItem } from "@skeletonlabs/skeleton";
	import axios from "axios";
	import config from "../config";

    let modalStore = getModalStore();
    let sel = "unfeature"
	export let parent: SvelteComponent;
    let toastStore = getToastStore();
</script>
{#if $modalStore[0]}
    <div class="card bg-initial p-4 py-8 min-w-24 w-modal max-w-xl">
        <h3 class="h3 font-bold pb-8 fancy-title2">Feature {$modalStore[0].meta.project}</h3>
        <ListBox>
            <ListBoxItem bind:group={sel} active="variant-filled-error" value="unfeature">Unfeature</ListBoxItem>
            <ListBoxItem bind:group={sel} active="variant-filled-warning" value="featured">Featured</ListBoxItem>
            <ListBoxItem bind:group={sel} active="variant-filled-primary" value="legendary">Legendary</ListBoxItem>
            <ListBoxItem bind:group={sel} active="variant-filled-success" value="mythic">Mythic</ListBoxItem>
        </ListBox>

        <footer class="modal-footer pt-4 flex items-center justify-end gap-4">
            <button class="btn variant-ghost-surface" on:click={()=>{
                modalStore.close(); 
            }}>Cancel</button>
            <button class="btn variant-filled" on:click={()=>{
                axios.post(`${config.apiEndpoint}/projects/feature/${sel}`, {
                    project: $modalStore[0].meta.project
                }, {
                    headers: {
                        Authorization: localStorage.getItem("sessionToken")
                    }
                }).then(res=>{
                    modalStore.close();
                    toastStore.trigger({
                        message: `${res.data}`,
                        background: `variant-filled-success`
                    })
                }).catch(res=>{
                    modalStore.close();
                    toastStore.trigger({
                        message: `An error occurred`,
                        background: `variant-filled-error`
                    })
                })
            }}>Feature</button>
        </footer>
    </div>
{/if}