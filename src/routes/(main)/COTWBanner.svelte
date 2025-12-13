<script lang="ts">
    export let backgroundImage = `https://cataas.com/cat`
</script>

<div class="bg-gradient-to-b from-primary-500/30 dark:from-primary-600/5 to-surface-100/0 p-4 rounded-lg overflow-hidden">
    <div style="background-image:url({backgroundImage});background-size:cover;background-position:center;" class="w-full md:h-72 lg:h-96 overflow-hidden shadow-lg rounded-lg overflow-hidden max-h-none">
        <div class="w-full h-full backdrop-blur-md justify-center items-center flex flex-col gap-4 bg-surface-900/50 p-4 md:p-0 overflow-hidden rounded-lg">
            <slot />
        </div>
    </div>
</div>