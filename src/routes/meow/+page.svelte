<script>
    // @ts-ignore
    let clickSound;

    // Load the audio file on component mount
    import { onMount } from 'svelte';
    onMount(() => {
        clickSound = new Audio('/meow.mp3'); // Replace with your audio file path
    });

    // @ts-ignore
    async function handleClick(url) {
        // @ts-ignore
        if (clickSound) {
            clickSound.play(); // Play the sound
            await new Promise((resolve) => setTimeout(resolve, 300)); // Delay navigation (300ms for sound)
        }
        window.location.href = '/profiles/fruitkitty'; // Redirect to the new site
    }
</script>

<a on:click={() => handleClick('https://mcbetools.com/profiles/fruitkitty')}
   class="px-4 py-2 bg-primary-500 text-primary-900 shadow-md hover:bg-primary-700 hover:scale-105 transition 2000 ease-in-out"
   style="border-radius: var(--theme-rounded-base); cursor: pointer;">
  meow
</a>
