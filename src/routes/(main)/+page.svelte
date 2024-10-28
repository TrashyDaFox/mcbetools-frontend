<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import config from '../config';
	import axios from 'axios';
	import ProjectCard from './ProjectCard.svelte';
	import { getUserAvatar } from './AvatarRenderer';
	let redirect = writable('none');
	onMount(() => {
		let searchParams = new URLSearchParams(window.location.search);
		redirect.update((val) =>
			searchParams.has('redirect') ? (searchParams.get('redirect') ?? 'none') : 'none'
		);
	});
	let featuredProjects = writable([]);
	
	let recentProjects = writable([]);
		onMount(()=>{
			axios.get(`${config.apiEndpoint}/get-recent-projects`, {
			headers: {
				Authorization: localStorage.getItem('sessionToken')
			}
		}).then((res) => {
			recentProjects.set(res.data);
		});
			axios.get(`${config.apiEndpoint}/featured-submissions`, {
			headers: {
				Authorization: localStorage.getItem('sessionToken')
			}
		}).then((res) => {
			featuredProjects.set(res.data);
		});
	})
	let creatorOfTheMonth = writable(null);
	axios.get(`${config.apiEndpoint}/creator-of-the-week`).then(res=>{
		axios.get(`${config.apiEndpoint}/user-profile/${res.data}`).then(res=>{
			if(!res.data.error) {
				creatorOfTheMonth.set(res.data.userData);
			}
		})
	})
</script>

<div class="container h-full mx-auto max-w-none">
	<!-- <div style="background:url({$creatorOfTheMonth && $creatorOfTheMonth.bannerURL ? `${config.apiEndpoint}${$creatorOfTheMonth.bannerURL}` : `/defaultbanner.png`});background-size:cover;background-position:center;" class="w-full h-56 rounded-lg"> -->
	<div style="background-image:url({$creatorOfTheMonth && $creatorOfTheMonth.bannerURL ? `${config.apiEndpoint}${$creatorOfTheMonth.bannerURL}` : `/leafbg.png`});background-size:cover;background-position:center;" class="w-full h-56 md:h-72 lg:h-96 rounded-lg">
		<div class="w-full h-full backdrop-blur-md justify-center items-center flex flex-col gap-4 bg-gradient-to-b from-surface-900/0 to-surface-900">
			{#if $creatorOfTheMonth}
				<h2 class="h2 font-bold">Creator of the week</h2>
				<div class="flex gap-4 items-center">
					<img src={getUserAvatar($creatorOfTheMonth)} class="rounded-full w-24 h-24 object-cover" />
					<div class="flex flex-col">
						<h1 class="text-4xl font-bold">{$creatorOfTheMonth.displayName}</h1>
						<a href={`/profiles/${$creatorOfTheMonth.handle}`} class="no-underline hover:underline opacity-75">@{$creatorOfTheMonth.handle}</a>
					</div>
				</div>
			{/if}
		</div>
	</div>
	{#if $redirect == 'accountverify'}
		<div class="h-3"></div>
		<div class="flex w-full justify-center items-center">
			<div class="card w-full h-fit variant-soft-primary p-4 w-fit">
				<h1 class="h3 font-bold">Welcome to {config.productName}</h1>
				<p>Thanks for verifying your account. You can now use your account</p>
				<div class="h-3"></div>
				<a href="/profiles/me" class="btn btn-sm variant-filled-primary">View your profile</a>
			</div>
		</div>
	{/if}
	<div class="div p-4 bg-primary-500/5">
		<div class="flex items-center justify-between my-4">
			<hr class="flex-grow border-t border-surface-300">
			<h3 class="h3 font-bold opacity-80 text-primary-500 px-4">Featured Submissions</h3>
			<hr class="flex-grow border-t border-surface-300">
		</div>
		<div class="h-4"></div>
		<div class="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 w-full gap-4 justify-items-center">
			{#each $featuredProjects as project}
				<ProjectCard project={project} />
			{/each}
		</div>
	</div>

	<div class="div p-4">
		<div class="flex items-center justify-between my-4">
			<hr class="flex-grow border-t border-surface-300">
			<h3 class="h3 font-bold opacity-80 px-4">Recent Submissions</h3>
			<hr class="flex-grow border-t border-surface-300">
		</div>

		<div class="h-4"></div>
		<div class="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 w-full gap-4 justify-items-center">
			{#each $recentProjects as project}
				<ProjectCard project={project} />
			{/each}
		</div>
	</div>
</div>

<style lang="postcss">
</style>
