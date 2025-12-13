<script>
	import styles from "../../styles";

</script>
<div class="p-4">
    <div class="flex w-full items-center justify-center gap-1 flex-col">
        <h1 class="h3 fancy-title2">MCBETools Credits</h1>
        <p>People who helped contribute to the MCBETools codebase will go here!</p>

    </div>
    <div class="h-4"></div>
    <div class={styles.submissionGrid}>
        <div class="card overflow-hidden bg-initial p-4 flex flex-col gap-4 w-full items-center justify-center">
            <div class="variant-glass-surface card p-4 w-fit">
                <img src="/CreditsImages/Ashy.png" alt="" class="w-32 h-48 object-cover">
            </div>
            <div class="flex gap-1 flex-col">
                <a href="/@trashy" class="text-xl font-bold text-primary-500">Ashy</a>
                <p>Main developer & maintainer</p>
            </div>
        </div>
        {#if Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) == 1}
            <div class="card overflow-hidden bg-initial p-4 flex flex-col gap-4 w-full items-center justify-center">
                <div class="variant-glass-surface card p-4 w-fit">
                    <img src="/CreditsImages/Fcar.png" alt="" class="w-32 h-48 object-cover">
                </div>
                <div class="flex gap-1 flex-col">
                    <a href="/@kai" class="text-xl font-bold text-primary-500">fcar</a>
                    <p>BAR affiliation & Community Manager</p>
                </div>
            </div>
        {/if}
        <div class="card overflow-hidden bg-initial p-4 flex flex-col gap-4 w-full items-center justify-center">
            <div class="variant-glass-surface card p-4 w-fit">
                <img src="/CreditsImages/Tiny.png" alt="" class="w-32 h-48 object-cover">
            </div>
            <div class="flex gap-1 flex-col">
                <a href="/@tiny" class="text-xl font-bold text-primary-500">Tiny</a>
                <p>... a person?!</p>
            </div>
        </div>

<!-- woodle1045 -->

        <div class="card overflow-hidden bg-initial p-4 flex flex-col gap-4 w-full items-center justify-center">
            <div class="variant-glass-surface card p-4 w-fit">
                <img src="/CreditsImages/Holly.png" alt="" class="w-32 h-48 object-cover">
            </div>
            <div class="flex gap-1 flex-col">
                <a href="/@holly" class="text-xl font-bold text-primary-500">HollyDaSilly</a>
                <p>Profile Badge Artist</p>
            </div>
        </div>

    </div>
</div>