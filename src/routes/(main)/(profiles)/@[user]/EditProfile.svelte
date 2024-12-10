<script lang="ts">
    
import { getModalStore } from '@skeletonlabs/skeleton';
import { Avatar } from '@skeletonlabs/skeleton';
	import axios from 'axios';
    // @ts-ignore
    import Identicon from 'identicon.js';
	import config from '../../../config';
const modalStore = getModalStore();
const profileData = $modalStore[0].meta.profileData;
let bio = $profileData.bio ? $profileData.bio : "";
let status = $profileData.status ? $profileData.status : "";
const user = $modalStore[0].meta.user;
function textToHex(text: string) {
        let hex = text.split('').map(_=>{
            return _.charCodeAt(0).toString(16)
        }).join('')
        if(hex.length < 15) {
            return `5cedaf0abc4a5a9efd0126a9${hex}`
        } else {
            return `${hex}`
        }
    }
</script>

<div class="card bg-initial p-4 py-8">
    <div class="w-full h-fit">
        {#if $profileData.bannerURL}
            <div class="banner w-full h-52 min-w-96 rounded-lg" style={`background-image:url(${config.apiEndpoint}${$profileData.bannerURL});background-size:cover;background-position:center;`}></div>
        {:else}
            <div class="banner w-full h-52 min-w-96 rounded-lg" style={`background-image:url(/defaultbanner.png);background-size:cover;background-position:center;`}></div>
        {/if}
        <div class="h-2"></div>
        <button class="btn btn-sm w-full variant-soft-primary" on:click={()=>{
            var fileInput = document.createElement('input');
            fileInput.type = "file";
            fileInput.onchange = function() {
                if(fileInput.files && fileInput.files.length && fileInput.files[0]) {
                    let formData = new FormData();
                    formData.append('banner', fileInput.files[0], fileInput.files[0].name);
                    axios({
                        method: "post",
                        url: `${config.apiEndpoint}/update-banner`,
                        data: formData,
                        headers: {
                            Authorization: localStorage.getItem('sessionToken')
                        }
                    }).then(res=>{
                        if(!res.data.error) {
                            axios.get(`${config.apiEndpoint}/user-profile/${user}`, {
                                headers: {
                                    Authorization: localStorage.getItem('sessionToken')
                                }
                            }).then(res=>{
                                if(!res.data.error) {
                                    // @ts-ignore
                                    profileData.update((val)=>res.data.userData);
                                }
                            })
                        }
                    })
                }
            }
            fileInput.click();
        }}>Update Banner</button>
        <div class="h-6"></div>
    </div>
    <div class="flex gap-5 items-center">
        <Avatar src={$profileData.avatarURL ? `${config.apiEndpoint}${$profileData.avatarURL}` : `data:image/png;base64,${new Identicon(textToHex($profileData.handle)).toString()}`} width="w-16" rounded="rounded-full"/>
        <button class="btn btn-sm variant-soft-primary h-8" on:click={()=>{
            var fileInput = document.createElement('input');
            fileInput.type = "file";
            fileInput.onchange = function() {
                if(fileInput.files && fileInput.files.length && fileInput.files[0]) {
                    let formData = new FormData();
                    formData.append('avatar', fileInput.files[0], fileInput.files[0].name);
                    axios({
                        method: "post",
                        url: `${config.apiEndpoint}/update-avatar`,
                        data: formData,
                        headers: {
                            Authorization: localStorage.getItem('sessionToken')
                        }
                    }).then(res=>{
                        if(!res.data.error) {
                            axios.get(`${config.apiEndpoint}/user-profile/${user}`, {
                                headers: {
                                    Authorization: localStorage.getItem('sessionToken')
                                }
                            }).then(res=>{
                                if(!res.data.error) {
                                    // @ts-ignore
                                    profileData.update((val)=>res.data.userData);
                                }
                            })
                        }
                    })
                }
            }
            fileInput.click();
        }}>Update Profile Picture</button>

    </div>
    <div class="bg-surface-100/10" style="height: 1px;margin-top:4px;margin-bottom:4px;"></div>
    <textarea name="" id="" class="textarea w-full resize-none h-24" placeholder="bio" bind:value={bio} />
    <div class="h-4"></div>
    <button class="btn btn-sm variant-soft-primary w-full" on:click={()=>{
        let formData = new FormData();
        formData.append('bio', bio);
        axios({
            method: "post",
            url: `${config.apiEndpoint}/update-bio`,
            data: formData,
            headers: {
                Authorization: localStorage.getItem('sessionToken')
            }
        }).then(res=>{
            if(!res.data.error) {
                axios.get(`${config.apiEndpoint}/user-profile/${user}`, {
                    headers: {
                        Authorization: localStorage.getItem('sessionToken')
                    }
                }).then(res=>{
                    if(!res.data.error) {
                        bio = res.data.userData.bio
                        // @ts-ignore
                        profileData.update((val)=>res.data.userData);
                    }
                })
            }
        })
    }}>Update Bio</button>

    <div class="bg-surface-100/10" style="height: 1px;margin-top:4px;margin-bottom:4px;"></div>
    <input class="input w-full h-24" placeholder="status" bind:value={status} />
    <div class="h-4"></div>
    <button class="btn btn-sm variant-soft-primary w-full" on:click={()=>{
        let formData = new FormData();
        formData.append('status', status);
        axios({
            method: "post",
            url: `${config.apiEndpoint}/update-status`,
            data: formData,
            headers: {
                Authorization: localStorage.getItem('sessionToken')
            }
        }).then(res=>{
            if(!res.data.error) {
                axios.get(`${config.apiEndpoint}/user-profile/${user}`, {
                    headers: {
                        Authorization: localStorage.getItem('sessionToken')
                    }
                }).then(res=>{
                    if(!res.data.error) {
                        status = res.data.userData.status;
                        // @ts-ignore
                        profileData.update((val)=>res.data.userData);
                    }
                })
            }
        })
    }}>Update Status</button>
</div>