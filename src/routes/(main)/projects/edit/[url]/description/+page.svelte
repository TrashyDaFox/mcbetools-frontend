<svelte:head>
  <!-- Fira font -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap" />
</svelte:head>
<script lang="ts">
    import { Carta, MarkdownEditor } from 'carta-md';
    import 'carta-md/default.css'
    import './theme.css'
	import { onMount } from 'svelte';
	import config from '../../../../../config';
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
    onMount(()=>{
        let addedEvent = false;
        // setInterval(()=>{
        //     if(addedEvent) return;
        //     // @ts-ignore
        //     document.querySelector('textarea').addEventListener('keydown',(e)=>{
        //         console.log(e.key)
        //         // carta.input?.container.focus()
        //         if(e.key.toLowerCase() == "backspace") {
        //             e.preventDefault();
        //             let newReadme = readme.split('')
        //             newReadme.splice(
        //                 carta.input?.getSelection().end == carta.input?.getSelection().start ? carta.input.getSelection().start - 1 : carta.input.getSelection().start,
        //                 carta.input?.getSelection().end == carta.input?.getSelection().start ? 1 : carta.input.getSelection().end - (carta.input.getSelection().start)
        //             )
        //             readme = newReadme.join('')
        //             // @ts-ignore
        //         }
        //     })

        //     addedEvent = true
        // })
        axios.get(`${config.apiEndpoint}/readme/${data.url}`).then(res=>{
            if(res.data) {
                readme = res.data;
                document.querySelector('textarea').value = res.data;
            }
        })
    })
    
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
<ol class="breadcrumb px-8 pt-4">
	<li class="crumb"><a class="anchor" href={`/projects/edit/${data.url}`}>{data.url}</a></li>
	<li class="crumb-separator" aria-hidden="true">&rsaquo;</li>
	<li>Long Description</li>
</ol>
<div class="h-4"></div>
<div class="flex justify-center">
    <div class="flex gap-4 flex-col w-full px-8">
        <MarkdownEditor {carta} bind:value={readme} mode="tabs"/>
        <button class="btn btn-sm variant-soft-primary" on:click={()=>{
            let fd = new FormData();
            fd.append("projectURL", data.url);
            fd.append("readme", readme);
            axios({
                method: "POST",
                url: `${config.apiEndpoint}/update-readme`,
                data: fd,
                headers: {
                    Authorization: localStorage.getItem('sessionToken')
                }
            }).then(res=>{
                if(!res.data.error) {
                    location.pathname = `/projects/edit/${data.url}`
                }
            })
        }}>Update Description</button>
    </div>
</div>