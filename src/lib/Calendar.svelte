<script>
	import { createEventDispatcher } from 'svelte';

	export let year = new Date().getFullYear();
	export let month = new Date().getMonth(); // 0-11
	export let selected = null; // Date | null
	export let minDate = null; // Date | null
	export let maxDate = null; // Date | null
    export let showPickButton = false;

	const dispatch = createEventDispatcher();
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	const week = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
	const today = new Date();

	const isSame = (a, b) =>
		a &&
		b &&
		a.getFullYear() === b.getFullYear() &&
		a.getMonth() === b.getMonth() &&
		a.getDate() === b.getDate();

	$: first = new Date(year, month, 1);
	$: daysInMonth = new Date(year, month + 1, 0).getDate();
	$: pad = first.getDay(); // leading blanks
	$: cells = [
		...Array.from({ length: pad }, () => null),
		...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1))
	];

	function prevMonth() {
		if (month === 0) {
			month = 11;
			year -= 1;
		} else {
			month -= 1;
		}
	}
	function nextMonth() {
		if (month === 11) {
			month = 0;
			year += 1;
		} else {
			month += 1;
		}
	}
	const stripTime = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

	const isDisabled = (d) => {
		if (!d) return true;
		if (minDate && d < stripTime(minDate)) return true;
		if (maxDate && d > stripTime(maxDate)) return true;
		return false;
	};
	function pick(d) {
		if (isDisabled(d)) return;
		selected = d;
		dispatch('change', { date: d });
	}

	function finish(d) {
		dispatch('pick', { date: d });
	}
</script>

<div class="w-full max-w-sm select-none card bg-initial p-4">
	<!-- header -->
	<div class="flex items-center justify-between mb-2">
		<button class="btn btn-icon variant-soft-primary" on:click={prevMonth} aria-label="Previous month">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6" /></svg
			>
		</button>

		<div class="text-sm font-medium">{monthNames[month]} {year}</div>

		<button class="btn btn-icon variant-soft-primary" on:click={nextMonth} aria-label="Next month">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6" /></svg
			>
		</button>
	</div>

	<!-- weekday row -->
	<div class="grid grid-cols-7 text-white/50 mb-1">
		{#each week as d}
			<div class="h-7 flex items-center justify-center">{d}</div>
		{/each}
	</div>

	<!-- days -->
	<div class="grid grid-cols-7 gap-1">
		{#each cells as d, i}
			{#if d === null}
				<div class="h-8"></div>
			{:else}
				<button
					class="h-8 rounded text-sm hover:variant-soft-primary
                   flex items-center justify-center
                   {isSame(d, selected) ? 'variant-filled-primary' : ''}
                   {isSame(d, today) && !isSame(d, selected) ? 'variant-soft-primary' : ''}"
					class:variant-soft-surface={isDisabled(d)}
					class:opacity-50={isDisabled(d)}
					aria-label={`Select ${d.toDateString()}`}
					disabled={isDisabled(d)}
					on:click={() => pick(d)}
				>
					{d.getDate()}
				</button>
			{/if}
		{/each}
	</div>
    {#if showPickButton}
        <div class="p-4 w-full items-end flex justify-end">
            {#if selected}
                <button
                    class="variant-filled-primary btn btn-sm"
                    on:click={() => {
                        finish(selected);
                    }}
                >
                    Pick
                </button>
            {:else}
                <button class="variant-soft-primary btn btn-sm" disabled="disabled">Pick</button>
            {/if}
        </div>
    {/if}
</div>
