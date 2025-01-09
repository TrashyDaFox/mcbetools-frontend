<script context="module" lang="ts">
    import { page } from '$app/stores';
</script>
<div class="p-4">
    <div class="variant-ghost-error p-4 flex-col flex gap-2 card">
        <h1 class="h3 font-bold">Error {$page.status}</h1>
        <p>{$page.error.message}</p>
    </div>
</div>