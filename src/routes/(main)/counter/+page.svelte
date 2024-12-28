<script lang="ts">
    import { onMount } from 'svelte';
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    import { getModalStore } from '@skeletonlabs/skeleton';

    let count = 0;
    let animatedCount = tweened(0, { duration: 400, easing: cubicOut });

    const modalStore = getModalStore();
    onMount(() => {
        document.body.setAttribute('data-theme', 'default');
    });

    const modal = {
        type: 'confirm',
        // Data
        title: 'ARE YOU SURE?',
        body: `Are you sure you want to be this stupid to click so many times?`,
        response: (r) => {
            if(r === true) return alert('Are you really sure?');
            document.location.href = '/';
        }
    };

    // Reactive statement to update animatedCount
    $: animatedCount.set(count);

    let doClickPlus = () => {
        count += 1;
        if (count === 10) {
            modalStore.trigger(modal);
        }
        if (count === 100) {
            modalStore.trigger(modal);
        }
        if (count === 200) {
            modalStore.trigger(modal);
        }
        if (count === 300) {
            modalStore.trigger(modal);
        }
        if (count === 400) {
            modalStore.trigger(modal);
        }
        if (count === 500) {
            modalStore.trigger(modal);
        }
        if (count === 600) {
            modalStore.trigger(modal);
        }
        if (count === 700) {
            modalStore.trigger(modal);
        }
        if (count === 800) {
            modalStore.trigger(modal);
        }
        if (count === 900) {
            modalStore.trigger(modal);
        }
        if (count === 1000) {
            modalStore.trigger(modal);
        }
    };
    function modulo(n, m) {
        return ((n % m) + m) % m;
    }

    let doClickMinus = () => {
        if (count > 0) {
            count -= 1;
        }
    };
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-surface-500 text-white">
    <div class="flex items-center">
        <button class="px-6 py-3 text-lg text-white bg-primary-500 hover:scale-105 active:scale-110 transition 200 ease-in-out" on:click={doClickMinus}>-</button>
        <h1 class="mx-4 text-9xl font-bold text-primary-100" style="transform: scale({1 + (modulo($animatedCount, 1) * 0.2)}); transition: transform 0.4s cubic-out;">{Math.floor($animatedCount)}</h1>
        <button class="px-6 py-3 text-lg text-white bg-primary-500 hover:scale-105 active:scale-110 transition 200 ease-in-out" on:click={doClickPlus}>+</button>
    </div>
</div>