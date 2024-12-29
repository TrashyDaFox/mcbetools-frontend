<script lang="ts">
	import { getModalStore, initializeStores, ListBox, ListBoxItem } from "@skeletonlabs/skeleton";
	import axios from "axios";
	import config from "../config";
	import { writable } from "svelte/store";
    let markdown = "";
    let subject = "";
    let bookmarkSelected = "";
    let modalStore = getModalStore();
    let bookmarks = writable([]);
    axios.get(`${config.apiEndpoint}/api/bookmarks/me`, {
        headers: {
            Authorization: localStorage.getItem("sessionToken")
        }
    }).then(res=>{
        if(!res.data.error) bookmarks.set(res.data.folders);
    })
</script>

{#if $modalStore[0]}
<div class="card bg-initial p-4 max-w-none w-96">
    {#if $bookmarks.length}

<!-- <ListBox>
	<ListBoxItem bind:group={valueSingle} name="medium" value="books">Books</ListBoxItem>
	<ListBoxItem bind:group={valueSingle} name="medium" value="movies">Movies</ListBoxItem>
	<ListBoxItem bind:group={valueSingle} name="medium" value="tv">TV</ListBoxItem>
</ListBox>
			 -->

        <ListBox>
            {#each $bookmarks.filter(_=>{
                if(_.projectUrls.includes($modalStore[0].meta.projectID)) return false;

                return true;
            }) as bookmark}
                <ListBoxItem bind:group={bookmarkSelected} name="a" value={bookmark.id}>{bookmark.name}</ListBoxItem>
            {/each}
        </ListBox>
        <div class="h-4"></div>
        <hr>
        <div class="h-4"></div>
        <button class="btn variant-filled-primary w-full" disabled={bookmarkSelected ? false : true} on:click={()=>{
            axios.post(`${config.apiEndpoint}/api/bookmarks/folder/${bookmarkSelected}/add-project/${$modalStore[0].meta.projectID}`, {}, {
                headers: {
                    Authorization: localStorage.getItem("sessionToken")
                }
            }).then(res=>{
                location.pathname = '/bookmarks'
                modalStore.close();
            })
        }}>Add</button>
    {:else}
        <p>You dont have any folders. Go to <a href="/bookmarks" class="anchor">this page</a> to create one.</p>
    {/if}
</div>
    <!-- <div class="card bg-initial p-4 py-8 max-w-none w-96">
        <div class="bg-surface-900 max-w-none w-full">
            <MarkdownEditor carta={carta} mode={"tabs"} bind:value={markdown} />
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
    </div> -->
{/if}