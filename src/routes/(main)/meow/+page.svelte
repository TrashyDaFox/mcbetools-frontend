<script>
    // @ts-ignore
    let clickSound;
    import { onMount } from 'svelte';
    onMount(() => {
        clickSound = new Audio('/meow.mp3');
    });

    // @ts-ignore
    async function handleClick(url) {
        // @ts-ignore
        if (clickSound) {
            await clickSound.play();
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
        window.location.href = '/profiles/fruitkitty';
    }
</script>

<a on:click={() => handleClick('https://mcbetools.com/profiles/fruitkitty')}
   class="px-4 py-2 bg-primary-500 text-primary-900 shadow-md hover:bg-primary-700 hover:scale-105 transition 2000 ease-in-out"
   style="border-radius: var(--theme-rounded-base); cursor: pointer;">
  meow
</a>
