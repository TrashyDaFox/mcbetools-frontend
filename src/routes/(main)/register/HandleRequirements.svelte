<script lang="ts">
	import { getModalStore } from "@skeletonlabs/skeleton";

    const modalStore = getModalStore();
</script>
<div class="card p-4 flex flex-col gap-2">
    <h3 class="h3 font-bold">Handle Info</h3>
    <p>A handle is a unique identifier for your user, mostly used in URLs (e.g: https://mcbetools.com/profiles/john)</p>
    <h3 class="h3 font-bold">Character Limits</h3>
    <ul class="list">
        <li>
            <span class="opacity-50">&bullet;</span>
            <span>Lowercase letters</span>
        </li>
        <li>
            <span class="opacity-50">&bullet;</span>
            <span>Numbers</span>
        </li>
        <li>
            <span class="opacity-50">&bullet;</span>
            <span>Periods (.)</span>
        </li>
        <li>
            <span class="opacity-50">&bullet;</span>
            <span>Underscores (_)</span>
        </li>
        <li>
            <span class="opacity-50">&bullet;</span>
            <span>Cant end with a period or underscore</span>
        </li>
        <li>
            <span class="opacity-50">&bullet;</span>
            <span>Max 20 characters</span>
        </li>
        <li>
            <span class="opacity-50">&bullet;</span>
            <span>Min 2 characters</span>
        </li>
    </ul>
    <div class="h-4"></div>
    <hr>
    <div class="h-4"></div>
    <button class="btn variant-filled" on:click={()=>{
        modalStore.close();
    }}>Close UI</button>
</div>