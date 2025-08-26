<script lang="ts">
    
    import { getModalStore, getToastStore, initializeStores, Modal, ProgressRadial, Toast } from '@skeletonlabs/skeleton';
    import { Avatar } from '@skeletonlabs/skeleton';
        import axios from 'axios';
        // @ts-ignore
        import Identicon from 'identicon.js';
        import config from '../../../config';
	import LinksList from '../../LinksList.svelte';
	import Cropper from '../../Cropper.svelte';
	import { createEventDispatcher } from 'svelte';
    // const modalStore = getModalStore();
    export let profileData;
    let bio = $profileData.bio ? $profileData.bio : "";
    let status = $profileData.status ? $profileData.status : "";
    const dispatch = createEventDispatcher()
    // initializeStores()
    const modalStore = getModalStore();

    function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // Read file as Base64 URL
    reader.onload = () => resolve(reader.result); // Resolve with Base64 data
    reader.onerror = (error) => reject(error); // Reject on error
  });
}
function dataURLtoFile(dataUrl, filename) {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1]; // Extract MIME type
  const bstr = atob(arr[1]); // Decode Base64
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

    let toastStore = getToastStore();
    export let user;
    let displayName = $profileData.displayName ? $profileData.displayName : "";
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
        function updateDisplayName() {
            axios.post(`${config.apiEndpoint}/profiles/change-display-name`, {
                displayName: displayName
            }, {
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
        function updateBanner() {
            var fileInput = document.createElement('input');
                fileInput.type = "file";
                fileInput.onchange = async function() {
                    if(fileInput.files && fileInput.files.length && fileInput.files[0]) {
                        let file = fileInput.files[0];
                        let base64 = await getBase64(file)
                        console.log(base64)
                        modalStore.trigger({
                            type: 'component',
                            component: {ref: Cropper, props: {image: base64, aspect: 3 / 1, cropShape: "square"}},
                            response(r) {
                                let file2 = dataURLtoFile(r, file.name)
                                                        let formData = new FormData();
                        formData.append('banner', file2, file.name);
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
                                        dispatch("update")
                                        // @ts-ignore
                                        profileData.update((val)=>res.data.userData);
                                    }
                                })
                            }
                        })
                    // }

                            }
                        })
                    }
                }
                fileInput.click();

            return;
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
    
        }
        let changingStatus = false;
        function changeStatus() {
            changingStatus = true;
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
                changingStatus = false;
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
    
        }
        function updateBio() {
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
        }
    </script>
    <Toast />
    <!-- <Modal regionBackdrop="!fixed !top-0 !left-0 !z-100"/> -->
    <div class="card variant-filled-surface p-4">
        <div class="w-full h-fit">
            {#if $profileData.bannerURL}
                <div class="banner w-full min-w-96 rounded-lg" style={`aspect-ratio:3/1;background-image:url(${config.apiEndpoint}${$profileData.bannerURL});background-size:cover;background-position:center;`}>
                    <div class="h-full w-full flex bg-surface-500/20 backdrop-blur-sm opacity-0 hover:opacity-100 ease transition-all transition-[1000ms] cursor-pointer flex items-center justify-center" on:click={updateBanner}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;" class="w-32 h-32"><path d="M18.944 11.112C18.507 7.67 15.56 5 12 5 9.244 5 6.85 6.611 5.757 9.15 3.609 9.792 2 11.82 2 14c0 2.757 2.243 5 5 5h11c2.206 0 4-1.794 4-4a4.01 4.01 0 0 0-3.056-3.888zM13 14v3h-2v-3H8l4-5 4 5h-3z"></path></svg>
                    </div>
                </div>
            {:else}
                <div class="banner w-full min-w-96 rounded-container-token overflow-hidden" style={`aspect-ratio:3/1;background-image:url(/defaultbanner.png);background-size:cover;background-position:center;`}>
                    <div class="h-full w-full flex bg-surface-500/20 backdrop-blur-sm opacity-0 hover:opacity-100 ease transition-all transition-[1000ms] cursor-pointer flex items-center justify-center" on:click={updateBanner}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;" class="w-32 h-32"><path d="M18.944 11.112C18.507 7.67 15.56 5 12 5 9.244 5 6.85 6.611 5.757 9.15 3.609 9.792 2 11.82 2 14c0 2.757 2.243 5 5 5h11c2.206 0 4-1.794 4-4a4.01 4.01 0 0 0-3.056-3.888zM13 14v3h-2v-3H8l4-5 4 5h-3z"></path></svg>
                    </div>
                </div>
            {/if}
            <div class="h-2"></div>
        </div>
        <div class="flex gap-5 items-center">
            <Avatar src={$profileData.avatarURL ? `${config.apiEndpoint}${$profileData.avatarURL}` : `data:image/png;base64,${new Identicon(textToHex($profileData.handle)).toString()}`} width="w-16" rounded="rounded-full"/>
            <button class="btn btn-sm variant-soft-primary h-8" on:click={()=>{
                var fileInput = document.createElement('input');
                fileInput.type = "file";
                fileInput.onchange = async function() {
                    if(fileInput.files && fileInput.files.length && fileInput.files[0]) {
                        let file = fileInput.files[0];
                        let base64 = await getBase64(file)
                        console.log(base64)
                        modalStore.trigger({
                            type: 'component',
                            component: {ref: Cropper, props: {image: base64}},
                            response(r) {
                                let file2 = dataURLtoFile(r, file.name)
                                                        let formData = new FormData();
                        formData.append('avatar', file2, file.name);
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
                                        dispatch("update")
                                        // @ts-ignore
                                        
                                        profileData.update((val)=>res.data.userData);
                                    }
                                })
                            }
                        })
                    // }

                            }
                        })
                    }
                }
                fileInput.click();
            }}>Update Profile Picture</button>
    
        </div>
        <div class="h-4"></div>
        
        <div class="bg-surface-100/20" style="height: 1px;margin-top:4px;margin-bottom:4px;"></div>
        <div class="h-4"></div>
        Bio
        <div class="h-4"></div>
        <textarea name="" id="" class="textarea w-full resize-none h-24" placeholder="bio" bind:value={bio} on:change={updateBio} />
        <div class="h-4"></div>
    
        <div class="bg-surface-100/10" style="height: 1px;margin-top:4px;margin-bottom:4px;"></div>
        <div class="relative">
            <div class="h-4"></div>
            <div class="text">Status</div>
            <div class="h-4"></div>
            {#if changingStatus}
                <div class="absolute right-4 bottom-1">
                    <ProgressRadial value={undefined} width="w-8"/>
                </div>
            {/if}
            <input class="input w-full" placeholder="status" bind:value={status} on:change={changeStatus} />
        
        </div>
        <div class="h-4"></div>
        <div class="bg-surface-100/10" style="height: 1px;margin-top:4px;margin-bottom:4px;"></div>
        
        <div class="relative">
            <div class="h-4"></div>
            <div class="text">Display Name</div>
            <div class="h-4"></div>
            <input class="input w-full" placeholder="display name" bind:value={displayName} on:change={updateDisplayName} />
        
        </div>
        
        <div class="h-4"></div>
        <LinksList linksInitial={$profileData.links && $profileData.links.length ? $profileData.links : []} on:change={(e)=>{
            axios.post(`${config.apiEndpoint}/set-user-links`, {
                list: e.detail.links
            }, {
                headers: {
                    Authorization: localStorage.getItem("sessionToken")
                }
            }).then(res=>{
                toastStore.trigger({
                    message: "Updated links!",
                    timeout: 1000
                })
            })
        }}/>
    </div>