<script lang="ts">
	import axios from 'axios';
	import { writable } from 'svelte/store';
	import config from '../../../../config';
	import {
		getModalStore,
		initializeStores,
		Modal,
		TabGroup,
		Tab,
		getToastStore,
		Toast
	} from '@skeletonlabs/skeleton';
	import AddFile from './AddFile.svelte';
	import { onMount } from 'svelte';
	import NewJoinMethod from './NewJoinMethod.svelte';
	import LinksList from '../../../LinksList.svelte';
	import { loggedInUser } from '../../../loggedInUserStore';
	// initializeStores();
	const modalStore = getModalStore();
	const toastStore = getToastStore();
	export let data;
	let tabSet = 0;
	let project: any = writable({});
	let shortDescription = '';
	let title = '';
	onMount(() => {
		axios
			.get(`${config.apiEndpoint}/get-project-by-url/draft-${data.url}`, {
				headers: {
					Authorization: localStorage.getItem('sessionToken')
				}
			})
			.then((res) => {
				if (!res.data.error) {
					project.set(res.data.project);
					shortDescription = res.data.project.shortDescription;
					title = res.data.project.title;
				}
			});
	});
	let thingEnabledFlag = true;
</script>

<svelte:head>
	<!-- Fira font -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap"
	/>
</svelte:head>
<Toast />
<!-- <Modal /> -->
{#if thingEnabledFlag}
	<TabGroup>
		<Tab bind:group={tabSet} name="tab1" value={0}>
			<span>Display</span>
		</Tab>
		{#if $project && !$project.isServer}
			<Tab bind:group={tabSet} name="tab2" value={1}>Files</Tab>
		{/if}
		{#if $project && $project.isServer}
			<Tab bind:group={tabSet} name="tab2" value={3}>Join Methods</Tab>
		{/if}
		<Tab bind:group={tabSet} name="tab3" value={2}>Gallery</Tab>
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			<div class="p-4">
				{#if tabSet == 3}
					<div class="p-4">
						<button
							class="btn variant-filled-primary"
							on:click={() => {
								modalStore.trigger({
									type: 'component',
									component: { ref: NewJoinMethod },
									meta: { project: data.url }
								});
							}}>Add Join Method</button
						>
						<div class="h-4"></div>
						<div class="flex flex-col gap-4">
							{#if $project && $project.joinMethods}
								{#each $project.joinMethods as joinMethod}
									{#if joinMethod.type == 'server'}
										<div class="card p-4">
											<h3 class="h3 font-bold">{joinMethod.label}</h3>
											<p>IP: {joinMethod.details.ip}</p>
											<p>Port: {joinMethod.details.port}</p>
											<button class="variant-soft-error btn">Delete</button>
										</div>
									{/if}
									{#if joinMethod.type == 'realm'}
										<div class="card p-4">
											<h3 class="h3 font-bold">{joinMethod.label}</h3>
											<p>Realm Code: {joinMethod.details.realmCode}</p>
											<button class="variant-soft-error btn">Delete</button>
										</div>
									{/if}
								{/each}
							{/if}
						</div>
					</div>
				{/if}
				{#if tabSet == 2}
					<button class="btn variant-filled-primary" on:click={()=>{
						
					}}>Add Image</button>
				{/if}
				{#if tabSet === 0}
				{#if $project && $project.title}
					<div class="flex gap-4 card p-4 items-center">
							<h1 class="h3 font-bold uppercase">{$project.title}</h1>
							<button
							class="{$project.pending ? "variant-filled-error" : "variant-filled-success"} btn"
							on:click={() => {
								axios
									.post(
										`${config.apiEndpoint}/project/submit-for-review`,
										{
											project: $project.url
										},
										{
											headers: {
												Authorization: localStorage.getItem('sessionToken')
											}
										}
									)
									.then((res) => {
										location.reload();
									});
							}}>{$project.pending ? 'Unsubmit' : 'Submit'}</button
						>
					</div>
					<div class="h-4"></div>
				{/if}
				{#if $project.pending}
					<div class="p-8 card variant-ghost-warning">This project is pending review</div>
					<div class="h-8"></div>
				{/if}
				{#if $project.adminFeedback}
					<div class="p-8 card variant-ghost-error flex-col flex gap-4">
						<h3 class="h3 font-bold">Denied</h3>
						<span>Feedback from admins: {$project.adminFeedback}</span>
					</div>
					<div class="h-8"></div>
				{/if}

					<div class="card p-4">

						<h3 class="h3 font-bold">Display</h3>
						<p class="opacity-50">Recommended image sizes: Banner: 1920x1080, Profile Picture: 512x512</p>
						<div class="mt-4 ml-2 flex gap-4">
							<div
							class="w-56 h-56 rounded-full overflow-hidden"
							style={`background:url(${$project && $project.avatarURL ? `${config.apiEndpoint}${$project.avatarURL}` : `/leafbg.png`});background-size:cover;background-position:center;`}
						>
							<div
								class="overlay w-full h-full bg-surface-500/50 backdrop-blur-sm opacity-0 hover:opacity-100 cursor-pointer transition-all flex items-center justify-center flex-col"
								on:click={() => {
									let fileInput = document.createElement('input');
									fileInput.type = 'file';
									fileInput.onchange = () => {
										if (!fileInput.files || !fileInput.files.length) return;
										let fd = new FormData();
										fd.append('avatar', fileInput.files[0], fileInput.files[0].name);
										fd.append('projectURL', data.url);
										axios({
											method: 'POST',
											url: `${config.apiEndpoint}/project/update-avatar`,
											data: fd,
											headers: {
												Authorization: localStorage.getItem('sessionToken')
											}
										}).then((res) => {
											if (!res.data.error) {
												location.pathname = `/projects`;
											}
										});
									};
									fileInput.click();
								}}
							>
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
									class="feather feather-upload w-32 h-32"
									><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline
										points="17 8 12 3 7 8"
									/><line x1="12" y1="3" x2="12" y2="15" /></svg
								>
								<p class="font-bold text-xl">Upload image</p>
							</div>
						</div>
	
							<div
								class="aspect-video h-56 rounded-lg overflow-hidden"
								style={`background:url(${$project && $project.bannerURL ? `${config.apiEndpoint}${$project.bannerURL}` : `/leafbg.png`});background-size:cover;background-position:center;`}
							>
								<div
									class="overlay w-full h-full bg-surface-500/50 backdrop-blur-sm opacity-0 hover:opacity-100 cursor-pointer transition-all flex items-center justify-center flex-col"
									on:click={() => {
										let fileInput = document.createElement('input');
										fileInput.type = 'file';
										fileInput.onchange = () => {
											if (!fileInput.files || !fileInput.files.length) return;
											let fd = new FormData();
											fd.append('banner', fileInput.files[0], fileInput.files[0].name);
											fd.append('projectURL', data.url);
											axios({
												method: 'POST',
												url: `${config.apiEndpoint}/project/update-banner`,
												data: fd,
												headers: {
													Authorization: localStorage.getItem('sessionToken')
												}
											}).then((res) => {
												if (!res.data.error) {
													location.pathname = `/projects`;
												}
											});
										};
										fileInput.click();
									}}
								>
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
										class="feather feather-upload w-32 h-32"
										><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline
											points="17 8 12 3 7 8"
										/><line x1="12" y1="3" x2="12" y2="15" /></svg
									>
									<p class="font-bold text-xl">Upload image</p>
								</div>
															<div
									class="w-56 h-56 rounded-full overflow-hidden"
									style={`background:url(${$project && $project.avatarURL ? `${config.apiEndpoint}${$project.avatarURL}` : `/leafbg.png`});background-size:cover;background-position:center;`}
								>
									<div
										class="overlay w-full h-full bg-surface-500/50 backdrop-blur-sm opacity-0 hover:opacity-100 cursor-pointer transition-all flex items-center justify-center flex-col"
										on:click={() => {
											let fileInput = document.createElement('input');
											fileInput.type = 'file';
											fileInput.onchange = () => {
												if (!fileInput.files || !fileInput.files.length) return;
												let fd = new FormData();
												fd.append('avatar', fileInput.files[0], fileInput.files[0].name);
												fd.append('projectURL', data.url);
												axios({
													method: 'POST',
													url: `${config.apiEndpoint}/project/update-avatar`,
													data: fd,
													headers: {
														Authorization: localStorage.getItem('sessionToken')
													}
												}).then((res) => {
													if (!res.data.error) {
														location.pathname = `/projects`;
													}
												});
											};
											fileInput.click();
										}}
									>
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
											class="feather feather-upload w-32 h-32"
											><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline
												points="17 8 12 3 7 8"
											/><line x1="12" y1="3" x2="12" y2="15" /></svg
										>
										<p class="font-bold text-xl">Upload image</p>
									</div>
								</div>
							</div>
	
						</div>
						<div class="mt-4 ml-2">
							<div class="h-4"></div>
							<p>Short Description</p>
							<div class="flex gap-2 w-full">
								<input
									type="text"
									class="input"
									placeholder="Short Description"
									bind:value={shortDescription}
								/>
								<button
									class="btn variant-soft-primary w-56"
									on:click={() => {
										let fd = new FormData();
										fd.append('description', shortDescription);
										fd.append('projectURL', data.url);
										axios({
											method: 'POST',
											url: `${config.apiEndpoint}/project/update-short-description`,
											data: fd,
											headers: {
												Authorization: localStorage.getItem('sessionToken')
											}
										}).then((res) => {
											if (!res.data.error) {
												location.pathname = `/projects`;
											}
										});
									}}
								>
									Update
								</button>
							</div>
							<div class="h-4"></div>
							<p>Title</p>
							<div class="flex gap-2 w-full">
								<input type="text" class="input w-full" placeholder="Title" bind:value={title} />
								<button
									class="btn variant-soft-primary w-56"
									on:click={() => {
										let fd = new FormData();
										fd.append('title', title);
										fd.append('projectURL', data.url);
										axios({
											method: 'POST',
											url: `${config.apiEndpoint}/project/update-title`,
											data: fd,
											headers: {
												Authorization: localStorage.getItem('sessionToken')
											}
										}).then((res) => {
											if (!res.data.error) {
												location.pathname = `/projects`;
											}
										});
									}}
								>
									Update
								</button>
							</div>
						</div>
	
						<div class="h-8"></div>
						<div class="ml-2 flex gap-4">
							<a href={`/projects/edit/${$project.url}/description`} class="btn variant-filled-surface"
								>Edit Long Description</a
							>
							<a href={`/s/draft-${$project.url}`} class="btn variant-filled-surface"
							>Preview</a
						>
						</div>
	
					</div>
					<div class="h-8"></div>
					<h3 class="h3 font-bold">Tags</h3>
					<div class="h-2"></div>
					<hr />
					<div class="h-8"></div>
					<div class="px-4 pb-4">
						<div class="w-full h-full card p-4">
							<div class="flex gap-2 flex-wrap">
								{#if $project && $project.tags}
									{#each data.tags.split(',') as a}
										<button
											class="chip {$project.tags && $project.tags.includes(a)
												? 'variant-filled'
												: 'bg-white/10 text-white/70'} font-bold"
											on:click={() => {
												if (!$project) return;
												let projectTags = $project.tags ? $project.tags : [];
												let newTags = data.tags.split(',').filter((_) => {
													if (_ == a && projectTags.includes(_)) return false;
													if (_ != a && !projectTags.includes(_)) return false;

													return true;
												});
												axios
													.post(
														`${config.apiEndpoint}/project/update-tags`,
														{
															project: data.url,
															tags: newTags.join(',')
														},
														{
															headers: {
																Authorization: localStorage.getItem('sessionToken')
															}
														}
													)
													.then((res) => {
														location.reload();
													});
											}}>{a}</button
										>
									{/each}
								{/if}
							</div>
						</div>
						<div class="h-8"></div>
						<h3 class="h3 font-bold">Links</h3>
						<div class="h-2"></div>
						<hr />
						<div class="h-8"></div>
                        {#if $project.url}
						<LinksList
							linksInitial={$project.links && $project.links.length ? $project.links : []}
							on:change={(e) => {
								axios
									.post(
										`${config.apiEndpoint}/set-project-links`,
										{
											list: e.detail.links,
											projectURL: data.url
										},
										{
											headers: {
												Authorization: localStorage.getItem('sessionToken')
											}
										}
									)
									.then((res) => {
										toastStore.trigger({
											message: 'Updated links!',
											timeout: 1000
										});
									});
							}}
						/>

                        {/if}
						<div class="h-4"></div>
						{#if $loggedInUser && $loggedInUser.role >= 4}
							<div class="p-4">
								<button class="w-full btn variant-filled" on:click={()=>{
									axios.post(`${config.apiEndpoint}/toggle-thingy`, {projectURL: $project.url}, {
										headers: {
											Authorization: localStorage.getItem("sessionToken")
										}
									}).then(()=>{
										location.reload()
									})
								}}>
									{#if $project.publishedAsBlogPost}
										Unpublish as blog post
									{:else}
										Publish as blog post
									{/if}
								</button>

							</div>
						{/if}
						{#if $loggedInUser && $loggedInUser.badges.includes('FEMALE')}
							<div class="h-4"></div>
							<div class="card variant-soft-primary p-8 flex items-center gap-4" data-theme="cherry">
								<input type="checkbox" class="rounded-full checkbox w-10 h-10" checked={$project.specialTags && $project.specialTags.includes('WOMEN_ONLY')} on:change={(e)=>{
									axios.post(`${config.apiEndpoint}/toggle-female-only`, {project: $project.url}, {
										headers: {
											Authorization: localStorage.getItem("sessionToken")
										}
									}).then(res=>{
										location.reload();
									})
								}}>
								<div class="flex-col">
									<p>Girls only?</p>
									<p class="opacity-50">Allow this project to only be viewed by other girls &gt;:3</p>
								</div>
							</div>
						{/if}
					</div>
				{:else if tabSet === 1}
					<button
						class="btn btn-sm variant-soft-primary"
						on:click={() => {
							modalStore.trigger({
								type: 'component',
								meta: { url: data.url },
								component: { ref: AddFile }
							});
						}}>Add file</button
					>

					<dl class="list-dl">
						{#if $project && $project.files}
							{#each $project.files.reverse() as file}
								<div>
									<span class="badge bg-primary-500/30 rounded-full h-8 w-8">
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
											class="feather feather-file"
											><path
												d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
											/><polyline points="13 2 13 9 20 9" /></svg
										>
									</span>
									<span class="flex-auto">
										<dt>{file.title}</dt>
										<dd>{file.verified ? 'Verified' : 'Not Verified'}</dd>
									</span>
									<button
										class="btn btn-sm variant-soft-error"
										on:click={() => {
											axios
												.post(
													`${config.apiEndpoint}/submission/delete-file`,
													{
														project: $project.url,
														fileID: file.id
													},
													{
														headers: {
															Authorization: localStorage.getItem('sessionToken')
														}
													}
												)
												.then((res) => {
													axios
														.get(`${config.apiEndpoint}/get-project-by-url/${data.url}`)
														.then((res) => {
															if (!res.data.error) {
																project.set(res.data.project);
																shortDescription = res.data.project.shortDescription;
															}
														});
												});
										}}
									>
										Delete
									</button>
								</div>
							{/each}
						{/if}
						<!-- ... -->
					</dl>
				{/if}
			</div>
		</svelte:fragment>
	</TabGroup>
{:else}
	<div class="p-4">
		<h2 class="h2">Editing project: <span class="font-bold">{$project.title}</span></h2>
		<div class="h-4"></div>
		<button
			class="btn btn-sm variant-soft-primary"
			on:click={() => {
				location.pathname = `/projects/edit/${data.url}/description`;
			}}>Edit description</button
		>
		<button
			class="btn btn-sm variant-soft-tertiary"
			on:click={() => {
				modalStore.trigger({
					type: 'component',
					meta: { url: data.url },
					component: { ref: AddFile }
				});
			}}>Add Download</button
		>
		<button
			class="btn btn-sm variant-soft-secondary"
			on:click={() => {
				let fileInput = document.createElement('input');
				fileInput.type = 'file';
				fileInput.onchange = () => {
					if (!fileInput.files || !fileInput.files.length) return;
					let fd = new FormData();
					fd.append('banner', fileInput.files[0], fileInput.files[0].name);
					fd.append('projectURL', data.url);
					axios({
						method: 'POST',
						url: `${config.apiEndpoint}/project/update-banner`,
						data: fd,
						headers: {
							Authorization: localStorage.getItem('sessionToken')
						}
					}).then((res) => {
						if (!res.data.error) {
							location.pathname = `/projects`;
						}
					});
				};
				fileInput.click();
			}}>Set banner</button
		>
		<button
			class="btn btn-sm variant-soft-primary"
			on:click={() => {
				const modal = {
					type: 'prompt',
					// Data
					title: 'Enter Short Description',
					body: 'Enter a short description for your project',
					// Populates the input value and attributes
					value: $project && $project.shortDescription ? $project.shortDescription : '',
					valueAttr: { type: 'text', minlength: 3, maxlength: 150, required: true },
					// Returns the updated response value
					response: (r) => {
						if (!r) return;
						let fd = new FormData();
						fd.append('description', r);
						fd.append('projectURL', data.url);
						axios({
							method: 'POST',
							url: `${config.apiEndpoint}/project/update-short-description`,
							data: fd,
							headers: {
								Authorization: localStorage.getItem('sessionToken')
							}
						}).then((res) => {
							if (!res.data.error) {
								location.pathname = `/projects`;
							}
						});
					}
				};
				modalStore.trigger(modal);
			}}>Update short description</button
		>
		<div class="h-4"></div>
		<div class="bg-initial card w-fit py-4 px-6">
			<h5 class="h5 font-bold">NOTE</h5>
			<p>
				This page is still a work in progress. If you have any suggestions please message <a
					href="/profiles/luna"
					class="anchor">@luna</a
				>.
			</p>
		</div>
	</div>
{/if}
