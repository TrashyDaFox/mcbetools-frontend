<script lang="ts">
	import { getModalStore } from "@skeletonlabs/skeleton";

    let modalStore = getModalStore();

    let value2;
</script>

{#if $modalStore[0]}
    <div class="card bg-initial p-4">
        <input type="text" placeholder="Folder Name" bind:value={value2} class="input w-full min-w-48">
        <div class="h-4"></div>
        <hr>
        <div class="h-4"></div>
        <p class="italic opacity-50">Used folder names:</p>
        <div class="h-2"></div>
        <div class="flex flex-col gap-4 max-w-96 overflow-y-auto">
            {#each $modalStore[0].meta.folderList as folder}
                <button class="btn btn-sm variant-soft-primary" on:click={()=>{
                    value2 = folder;
                }}>{folder}</button>
            {/each}
        </div>
        <div class="h-4"></div>
        <hr>
        <div class="h-4"></div>
        <button class="btn btn-sm w-full variant-soft-success" on:click={()=>{
            $modalStore[0].response(value2)
            modalStore.close()
        }}>Set Folder</button>
    </div>
{/if}