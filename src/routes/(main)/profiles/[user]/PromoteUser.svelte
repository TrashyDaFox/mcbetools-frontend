<script lang="ts">
	import type { SvelteComponent } from 'svelte';
    import config from '../../../config';
	import { ListBox, ListBoxItem, getModalStore } from '@skeletonlabs/skeleton';

    import axios from 'axios';
	import { loggedInUser } from '../../loggedInUserStore';

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
        {#if role == 4 || role == 5}
            <div class="p-4 variant-ghost-warning rounded-container-token">
                <h3 class="h3 font-bold text-warning-500">WARNING</h3>
                <p>Selecting owner or owner with admin account access can be very dangerous!</p>
            </div>
        {/if}
		<ListBox class="variant-ghost-surface p-4 max-h-[400px] overflow-y-auto" active="variant-filled-primary">
			<ListBoxItem bind:group={role} name="Default" value=0>
                <p>Demote (member)</p>
                <p class="opacity-50">Has only basic permissions</p>
            </ListBoxItem>
			<ListBoxItem bind:group={role} name="Mod" value=1>
                <p>Moderator</p>
                <p class="opacity-50">Can review projects and delete comments</p>

            </ListBoxItem>
			<ListBoxItem bind:group={role} name="Admin" value=2>
                <p>Admin</p>
                <p class="opacity-50">Can edit others projects if needed, and can do most things</p>
            </ListBoxItem>
			<ListBoxItem bind:group={role} name="Co-Owner" value=3>
                <p>Owner</p>
                <p class="opacity-50">Can delete others projects, can curate their lists, can feature projects</p>
            </ListBoxItem>
            {#if $loggedInUser && $loggedInUser.handle == "admin"}
    			<ListBoxItem bind:group={role} name="Owner" value=4 rounded="rounded-token variant-soft-success" active="!variant-filled-success">
                    <p>Owner (without admin account permissions)</p>
                    <p class="opacity-50">Full permissions outside of admin account. Can queue creator of the week and promote users. Cannot promote to admin</p>
                </ListBoxItem>
    			<ListBoxItem bind:group={role} name="Owner" value=5 rounded="rounded-token variant-soft-error" active="!variant-filled-error">
                    <p>Owner with admin account permissions</p>
                    <p class="opacity-50">Same as owner, but can use admin account. Meaning they can give others admin account access, and owner.</p>
                    <p class="opacity-50">Can also run commands in the message user dialog to do things like change handles</p>
                </ListBoxItem>
            {/if}
		</ListBox>
		<footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn variant-filled-primary" on:click={onFormSubmit}>Promote User</button>
    </footer>
	</div>
{/if}