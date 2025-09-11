<script>
	import axios from 'axios';
	import { writable } from 'svelte/store';
	import config from '../../config';
	import { onMount } from 'svelte';
    import { ProgressRadial } from '@skeletonlabs/skeleton';

	let documents = writable(null);

	onMount(() => {
		axios.get(`${config.apiEndpoint}/flags/get`).then((res) => {
			if (res.data.success == false) document.location.href = '/';
			documents.set(res.data.flags);
		});
	});

	async function getUserFromID(id) {
		let handle = null;
		let userData = null;
		await axios.get(`${config.apiEndpoint}/id-to-handle/${id}`).then((res) => {
			if (res.data.error) return null;
			handle = res.data.handle;
		});
		await axios.get(`${config.apiEndpoint}/user-profile/${handle}`).then((res) => {
			if (res.data.error) return null;
			userData = res.data.userData;
		});
		return userData;
	}

	function removeFlag(id) {
		axios({
			method: 'POST',
			url: `${config.apiEndpoint}/flags/delete`,
			data: { id }
		})
			.then((res) => {
				documents.update((docs) => docs.filter((doc) => doc._id !== id));
			})
			.catch((error) => {
				console.error('Error removing flag:', error);
			});
	}
</script>

<div class="container mx-auto p-4">
	{#if $documents && $documents.length > 0}
		<ul class="list-none p-0 grid grid-cols-2 lg:grid-cols-3 gap-4">
			{#each $documents as document}
				<li class="document-item p-4 card">
					<div class="document-week text-primary">
						Content: {document.content}
					</div>
					{#await getUserFromID(`${document.user}`) then user}
						<div class="document-creator text-secondary">
							<a href="/@{user?.handle || 'me'}" class="anchor"
								>User: {user?.handle || 'Unknown'}</a
							>
						</div>
					{:catch error}
						<div class="document-creator text-secondary">User: Error loading user</div>
					{/await}
					<div class="document-week text-primary">
						Type: {document.type}
					</div>
                    <div class="document-week text-primary">
                        Violation: {document.violation}
                    </div>
					<button class="btn variant-filled-primary" on:click={() => removeFlag(document._id)}
						>Remove Flag</button
					>
				</li>
			{/each}
		</ul>
	{:else if $documents && $documents.length == 0}
		<div class="w-full h-full flex items-center justify-center flex-col py-32">
			<h1 class="h1 font-bold fancy-title2 pb-2">Nothing here!!! :3</h1>
			<h3 class="h3 max-w-[calc(100vw-30px)] text-center">There are no AI flags, everyones being a good girl today! :3</h3>
		</div>
	{:else}
		<ProgressRadial />
	{/if}
</div>
