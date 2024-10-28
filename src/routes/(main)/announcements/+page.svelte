<script lang="ts">
	import axios from "axios";
	import { writable } from "svelte/store";
	import config from "../../config";
    import { Carta } from "carta-md";
	import { getUserAvatar } from "../AvatarRenderer";
	import { Avatar } from "@skeletonlabs/skeleton";

    const carta = new Carta({
        theme: 'github-dark'
    });
    let announcements:any = writable([]);

    axios.get(`${config.apiEndpoint}/announcements`).then(res=>{
        for(const announcement of res.data) {
            axios.get(`${config.apiEndpoint}/id-to-handle/${announcement.author}`).then(res=>{
                axios.get(`${config.apiEndpoint}/user-profile/${res.data.handle}`).then(async res=>{
                    announcements.set([{author: res.data.userData, text: (await carta.render(announcement.markdown)), madeAt: announcement.madeAt}, ...$announcements])
                })
            })
        }
    })
</script>
<div class="w-full h-full flex-col flex gap-4 items-center justify-center">
    {#each $announcements as announcement}
    <div class="p-4 w-full">
        <hr />
        <div class="w-full">
            <div class="flex gap-4 items-center">
                <Avatar src={getUserAvatar(announcement.author)} width="w-8" rounded="rounded-full" />
                <h1 class="text-xl">{announcement.author.displayName}</h1>
            </div>
            <article class="prose prose-invert max-w-none">
                {@html announcement.text}
            </article>
        </div>
    </div>
{/each}
<hr />

</div>

<style lang="postcss" global>
    .prose {
        --tw-prose-headings: #fff;
    }
    :global(.prose img) {
        max-width: 24rem !important;
    }
    .prose {
        margin: 0 !important;
    }
    .prose h1 {
        @apply h1 font-bold;
    }
    .prose h6 {
        @apply h6 text-white opacity-50;
    }
    .prose h5 {
        @apply h5 text-white opacity-50;
    }
    .prose * {
        @apply text-white;
        color: white !important;
    }
    .prose button {
        color: white !important;
    }
    .prose button:hover {
        color: black !important;
    }
    .prose button.text-black {
        color: black !important;
    }
</style>