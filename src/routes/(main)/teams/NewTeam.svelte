<script lang="ts">
	import { getToastStore, Toast } from "@skeletonlabs/skeleton";
	import axios from "axios";
	import config from "../../config";
    export let openTeamPage = false;

    let username = "";
    let handle = "";
    let toastStore = getToastStore();
</script>
<Toast />
<div class="card bg-initial p-4">
    <input type="text" class="input" placeholder="Username" bind:value={username}>
    <div class="h-4"></div>
    <input type="text" class="input" placeholder="Handle" bind:value={handle}>
    <div class="h-4"></div>
    <button class="btn w-full variant-filled-primary" on:click={()=>{
        let fd = new FormData();
        fd.append('username', username)
        fd.append('handle', handle)
        axios({
            url: `${config.apiEndpoint}/teams/register`,
            method: 'post',
            data: fd
        }).then(res=>{
            if(!res.data.error) {
                location.href = '/teams'
            } else {
                toastStore.trigger({
                    timeout: 5000,
                    message: res.data.message
                })
            }
        })
    }}>Create team</button>
</div>