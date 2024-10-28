<script lang="ts">
    import TeamNotification from "./TeamNotification.svelte"
    let notifs = [
        {
            type: 1,
            teamInvite: "kittyteam",
            teamOwner: "trash"
        }
    ]
</script>
<div class="flex pb-2 items-center justify-center">
    <h1>My notifications</h1>
</div>
<p>Notifications are coming soon</p>
<!-- {#each notifs as notif}
    {#if notif.type == 1}
        <TeamNotification teamNotif={notif} />
    {/if}
{/each} -->