<script lang="ts">
	import type { SvelteComponent } from 'svelte';
    import config from '../../../config';
	import { ListBox, ListBoxItem, getModalStore } from '@skeletonlabs/skeleton';

    import axios from 'axios';

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	// Local
	let role = 0;
	const modalStore = getModalStore();

	function onFormSubmit(): void {
        if ($modalStore[0].response) $modalStore[0].response(role);
        console.log($modalStore[0].meta.handle);
        let handle = $modalStore[0].meta.handle;
        console.log(role);
        console.log(localStorage.getItem('sessionToken'));
        axios.post(`${config.apiEndpoint}/account/promote`, {
            role: role,
            handle: handle
        }, {
            headers: {
                Authorization: localStorage.getItem('sessionToken')
            }
        })
            .then(res => {
                modalStore.close()
            })
            .catch((error) => {
                console.error(error);
            });
	}

	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
</script>

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
		<article>{$modalStore[0].body ?? '(body missing)'}</article>
		<ListBox class="border border-surface-500 p-4 rounded-container-token">
			<ListBoxItem bind:group={role} name="Default" value=0>Demote</ListBoxItem>
			<ListBoxItem bind:group={role} name="Mod" value=1>Moderator</ListBoxItem>
			<ListBoxItem bind:group={role} name="Admin" value=2>Admin</ListBoxItem>
			<ListBoxItem bind:group={role} name="Co-Owner" value=3>Co-Owner</ListBoxItem>
		</ListBox>
		<footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Promote User</button>
    </footer>
	</div>
{/if}