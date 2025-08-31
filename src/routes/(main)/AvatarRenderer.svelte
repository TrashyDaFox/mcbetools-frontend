<script lang="ts">
	import config from "../config";
	import { getUserAvatar } from "./AvatarRenderer";
	import { avatarDecos } from "./loggedInUserStore";

    export let profile;
    export let width = "w-10";
</script>

<div class="relative {width} aspect-square overflow-visible">
    <img src={getUserAvatar(profile)} alt="" class="w-full h-full rounded-full object-cover aspect-square">
    {#if profile.deco1 && $avatarDecos && $avatarDecos.find(_=>_.id == profile.deco1)}
        <img src={`${config.apiEndpoint}${$avatarDecos.find(_=>_.id == profile.deco1).path}`} class="w-full h-full top-0 left-0 absolute aspect-square scale-[120%] object-cover" alt="">
    {/if}
</div>