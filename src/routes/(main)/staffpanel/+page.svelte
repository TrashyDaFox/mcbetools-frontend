<script lang="ts">
    import { Carta, MarkdownEditor } from 'carta-md';
    import 'carta-md/default.css'
    import '../projects/edit/[url]/description/theme.css'
	import { onMount } from 'svelte';
	import config from '../../config';
	import axios from 'axios';
    import { attachment } from '@cartamd/plugin-attachment';
    export let data;
//@ts-ignore
    const carta = new Carta({
        theme: 'github-dark',
        extensions: [
			attachment({
				async upload(file) {
                    let fd = new FormData();
                    fd.append('file', file, file.name);
                    let response = await axios({
                        method: "POST",
                        url: `${config.apiEndpoint}/upload`,
                        data: fd
                    })
                    return `${config.apiEndpoint}${response.data}`;
				}
			})
		]
    });
    let readme = "";
</script>

<style>
    :global(.carta-font-code),
  :global(.carta-font-code *) {
    font-family: 'Fira Code', monospace !important;
    font-variant-ligatures: normal !important;
    font-size: 1.1rem !important;
    line-height: 1.5rem !important;
  }
</style>
<div class="h-4"></div>
<div class="flex justify-center">
    <div class="flex gap-4 flex-col w-full px-8">
        <MarkdownEditor {carta} bind:value={readme} mode="tabs"/>
        <button class="btn btn-sm variant-soft-primary" on:click={()=>{
            let fd = new FormData();
            fd.append("md", readme);
            axios({
                method: "POST",
                url: `${config.apiEndpoint}/post-announcement`,
                data: fd,
                headers: {
                    Authorization: localStorage.getItem('sessionToken')
                }
            }).then(res=>{
                
            })
        }}>Post</button>
    </div>
</div>