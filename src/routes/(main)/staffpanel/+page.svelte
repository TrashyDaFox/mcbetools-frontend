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
	import config from '../../config';
	import axios from 'axios';
    import { attachment } from '@cartamd/plugin-attachment';
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
        axios.get(`${config.apiEndpoint}/readme/draft-${data.url}`, {
            headers: {
                Authorization: localStorage.getItem("sessionToken")
            }
        }).then(res=>{
            if(res.data) {
                readme = res.data;
                document.querySelector('textarea').value = res.data;
            }
        })
    })
    
</script>
<style lang="text/postcss">
    :global(.carta-font-code),
  :global(.carta-font-code *) {
    font-family: 'Fira Code', monospace !important;
    font-variant-ligatures: normal !important;
    font-size: 1.1rem !important;
    line-height: 1.5rem !important;
  }
  :global(.markdown-body) {
    width: 100% !important;
    max-width: none !important;
    @apply prose;
    @apply prose-invert;
  }
  :global(.meowmeow .carta-editor) {
    @apply bg-surface-900;
    @apply overflow-hidden;
    @apply rounded-container-token;
    /* height: 100% !important; */
    flex: 1 !important;
    max-height: none !important;
    }
    :global(.meowmeow .carta-editor .carta-wrapper) {
        height: 100%;
    }

    :global(.meowmeow .carta-editor .carta-input),
    :global(.meowmeow .carta-editor .carta-container),
    :global(.meowmeow .carta-editor .carta-input-wrapper) {
    height: 100% !important;
    max-height: none !important;
    }
</style>

<div class="w-full h-full relative">
    <div class="sticky top-0 left-0 w-full h-16 p-4 z-50">
        <div class="card flex">
            <div class="flex-auto pl-8">

            </div>
            <div class="p-4">
                
    
            </div>
        </div>
    </div>
    <div class="flex justify-center h-full py-8">
        
        <div class="flex gap-4 flex-col w-full px-4 meowmeow h-f">
    
            <MarkdownEditor {carta} bind:value={readme} mode="tabs" />
    
            
        </div>
    </div>
</div>