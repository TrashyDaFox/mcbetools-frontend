<script lang="ts">
	import axios from "axios";
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import config from "../../../config";
	import ProjectCards from "../../ProjectCards.svelte";
    let projects = writable([])
    onMount(()=>{
        axios.get(`${config.apiEndpoint}/pending-drafts`,{
            headers: {
                Authorization: localStorage.getItem("sessionToken")
            }
        }).then(res=>{
            projects.set(res.data)
        })
    })
</script>
<div class="p-4">
    <ProjectCards projects={$projects} isDraft={true}/>
</div>