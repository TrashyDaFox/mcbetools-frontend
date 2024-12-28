<script>
    import { onMount } from 'svelte';
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';

    let count = 0;
    let animatedCount = tweened(0, { duration: 400, easing: cubicOut });

    onMount(() => {
        document.body.setAttribute('data-theme', 'default');
    });

   // @ts-ignore
     $: animatedCount.set(count);

    let doClickPlus = () => {
        count += 1;
    }

    let doClickMinus = () => {
        if (count > 0) {
            count -= 1;
        }
    }
    
    // @ts-ignore
    function modulo(n, m) {
        return ((n % m) + m) % m;
    }
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-surface-500 text-white">
    <div class="flex items-center">
        <button class="px-6 py-3 text-lg text-white bg-primary-500 hover:scale-105 active:scale-110 transition 200 ease-in-out" on:click={doClickMinus}>-</button>
        <h1 class="mx-4 text-9xl font-bold text-primary-100" style="transform: scale({1 + (modulo($animatedCount, 1) * 0.2)}); transition: transform 0.4s cubic-out;">{Math.floor($animatedCount)}</h1>
        <button class="px-6 py-3 text-lg text-white bg-primary-500 hover:scale-105 active:scale-110 transition 200 ease-in-out" on:click={doClickPlus}>+</button>
    </div>
</div>