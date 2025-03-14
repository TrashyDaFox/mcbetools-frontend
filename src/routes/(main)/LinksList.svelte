<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';
	let reg = /^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)(:\d+)?(\/[^\s]*)?$/;
	export let linksInitial: any[] = [];
	export let links = writable(linksInitial);
	let currLink = '';
	let currDisplayName = '';
	let draggedIndex = null;

	function onDragStart(event, index) {
		draggedIndex = index;
		event.dataTransfer.effectAllowed = 'move';
	}
	let changed = false;
	function onDragOver(event) {
		event.preventDefault(); // Allow drop
	}

	function onDrop(event, index) {
		event.preventDefault();
		if (draggedIndex !== null && draggedIndex !== index) {
			let temp = [...linksInitial];
			let [movedItem] = temp.splice(draggedIndex, 1);
			temp.splice(index, 0, movedItem);
			linksInitial = temp;
			links.set(linksInitial);
		}
		draggedIndex = null;
	}
	const dispatcher = createEventDispatcher();
	links.subscribe((e) => {
		dispatcher('change', { links: linksInitial });
	});
</script>

<div class="card p-4 flex gap-4 flex-col">
	{#if !$links.length}
		<span class="opacity-50 italic">(no links yet)</span>
	{:else}
		<div class="links flex gap-4 flex-wrap">
			{#each $links as link, index (link.url)}
				<span
					class="chip variant-filled text-xl"
					draggable="true"
					on:dragstart={(e) => onDragStart(e, index)}
					on:dragover={onDragOver}
					on:drop={(e) => onDrop(e, index)}
					on:contextmenu={() => {
						linksInitial.splice(index, 1);
						links.set(linksInitial);
					}}
				>
					{link.text} ({link.url})
				</span>
			{/each}
		</div>
	{/if}
	<hr />
	<div class="input-area">
		<div class="flex gap-4">
			<input
				type="text"
				class="input"
				placeholder="Link"
				bind:value={currLink}
				on:keydown={() => {
					changed = true;
				}}
			/>
			<input type="text" class="input" placeholder="Display Name" bind:value={currDisplayName} />
			<button
				class="btn variant-filled-primary"
				on:click={() => {
					linksInitial.push({
						text: currDisplayName,
						url: currLink
					});
					links.set(linksInitial);
					console.log(linksInitial);
					console.log($links);
				}}>Add</button
			>
		</div>
		{#if !reg.test(currLink) && changed}
			<p class="text-error-500 text-2xl">This link is not valid</p>
		{/if}
	</div>
</div>
