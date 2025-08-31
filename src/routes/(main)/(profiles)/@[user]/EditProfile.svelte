<script lang="ts">
    
    import { getModalStore, getToastStore, initializeStores, Modal, ProgressRadial, SlideToggle, Toast } from '@skeletonlabs/skeleton';
    import { Avatar } from '@skeletonlabs/skeleton';
        import axios from 'axios';
        // @ts-ignore
        import Identicon from 'identicon.js';
        import config from '../../../config';
	import LinksList from '../../LinksList.svelte';
	import Cropper from '../../Cropper.svelte';
	import { createEventDispatcher } from 'svelte';
	import EditBadgesUser from './EditBadgesUser.svelte';
	import { loggedInUser } from '../../loggedInUserStore';
    // import * as PronounsJS from 'pronouns'
    import Pronouny from '$lib/pronounsLib.ts'
	import { pronounsList } from '../../../pronouns';
	import MessageModal from '../../MessageModal.svelte';
	import ProfileModal from '../../ProfileModal.svelte';
	import { writable } from 'svelte/store';
	import EditDeco from './EditDeco.svelte';
	import { getUserAvatar } from '../../AvatarRenderer';
	// import { validatePronoun } from '../../../pronouns';
    // const modalStore = getModalStore();
    export let profileData;
    let avatarDecos = writable([]);
    axios.get(`${config.apiEndpoint}/avatar-decos`).then(res=>{
        avatarDecos.set(res.data);
    });
    let bio = $profileData.bio ? $profileData.bio : "";
    let status = $profileData.status ? $profileData.status : "";
    let pronouns = $profileData.pronouns ? $profileData.pronouns : "";
    let invalidPronouns = false;
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
        let changingPronouns = false;
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
        const p = new Pronouny({
            failQuietly: false,
            deepSearch: true,
            useRandom: false,
            fallbackPronoun: "they"
            // Will default to failing quietly into "they".
            // failQuietly: true,

            // Will default to only querying the first subject
            // pronoun to limit scope. Set to "true" to force
            // recursive search.
            // deepSearch: false,

            // Will default to using random pronouns in arrays.
            // Set to false to force using 0 index.
            // useRandom: true,

            // Will default to using "they" as a fallback pronoun.
            // fallbackPronoun: "they",
        });
        const pronounSets = pronounsList.map(entry =>
            p.new(
                {
                subject: entry.pronoun_subject,
                object: entry.pronoun_object,
                possessive: entry.possessive_pronoun,
                psAdjective: entry.possessive_determiner,
                reflexive: entry.reflexive,
                },
                true // true/false instead of hardcoding
            )
        );
        for(const set of pronounSets) p.add(set)
        let setPronouns = false;
        function validatePronouns() {
            // if() return true;
            // console.log(p.identify(pronouns))
            // return;
            let split = pronouns.split('/').map(_=>_.trim().toLowerCase())
            let valid = pronouns.trim().length == 0 || split.every((_:string)=>p.identify(_) != "")
            invalidPronouns = !valid
            setPronouns = false;
        }
        function changePronouns() {
            // return;
            changingPronouns = true;
            let formData = new FormData();
            formData.append('pronouns', pronouns);
            axios({
                method: "post",
                url: `${config.apiEndpoint}/update-pronouns`,
                data: formData,
                headers: {
                    Authorization: localStorage.getItem('sessionToken')
                }
            }).then(res=>{
                changingPronouns = false;
                if(!res.data.error) {
                    setPronouns = true;
                    axios.get(`${config.apiEndpoint}/user-profile/${user}`, {
                        headers: {
                            Authorization: localStorage.getItem('sessionToken')
                        }
                    }).then(res=>{
                        if(!res.data.error) {
                            pronouns = res.data.userData.pronouns;
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
                <div class="banner shadow-xl w-full min-w-96 rounded-lg rounded-container-token overflow-hidden" style={`aspect-ratio:3/1;background-image:url(${config.apiEndpoint}${$profileData.bannerURL});background-size:cover;background-position:center;`}>
                    <div class="h-full w-full flex bg-surface-500/20 backdrop-blur-sm opacity-0 hover:opacity-100 ease transition-all transition-[1000ms] cursor-pointer flex items-center justify-center" on:click={updateBanner}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;" class="w-32 h-32"><path d="M18.944 11.112C18.507 7.67 15.56 5 12 5 9.244 5 6.85 6.611 5.757 9.15 3.609 9.792 2 11.82 2 14c0 2.757 2.243 5 5 5h11c2.206 0 4-1.794 4-4a4.01 4.01 0 0 0-3.056-3.888zM13 14v3h-2v-3H8l4-5 4 5h-3z"></path></svg>
                    </div>
                </div>
            {:else}
                <div class="banner shadow-xl w-full min-w-96 rounded-container-token overflow-hidden" style={`aspect-ratio:3/1;background-image:url(/defaultbanner.png);background-size:cover;background-position:center;`}>
                    <div class="h-full w-full flex bg-surface-500/20 backdrop-blur-sm opacity-0 hover:opacity-100 ease transition-all transition-[1000ms] cursor-pointer flex items-center justify-center" on:click={updateBanner}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;" class="w-32 h-32"><path d="M18.944 11.112C18.507 7.67 15.56 5 12 5 9.244 5 6.85 6.611 5.757 9.15 3.609 9.792 2 11.82 2 14c0 2.757 2.243 5 5 5h11c2.206 0 4-1.794 4-4a4.01 4.01 0 0 0-3.056-3.888zM13 14v3h-2v-3H8l4-5 4 5h-3z"></path></svg>
                    </div>
                </div>
            {/if}
            <div class="h-2"></div>
        </div>
        <div class="flex gap-5 items-center">
            <div class="relative w-16 h-16" style="overflow:visible !important;">
                <img src={getUserAvatar($profileData)} class="w-16 h-16 rounded-full object-cover"/>
                {#if $avatarDecos && $avatarDecos.find(_=>_.id == $profileData.deco1)}
                    <img src={`${config.apiEndpoint}${$avatarDecos.find(_=>_.id == $profileData.deco1).path}`} class="w-16 h-16 scale-[120%] object-cover absolute top-0 left-0" alt="">
                {/if}
            </div>
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
            <button class="btn btn-sm variant-soft-success h-8" on:click={()=>{
                modalStore.trigger({
                    component: {ref: EditDeco},
                    type: 'component',
                    meta: {profileData: $profileData, avatarDecos: $avatarDecos},
                    response(r) {
                        let b = $profileData;
                        b.deco1 = r;
                        profileData.set(b)
                    }
                })
            }}>Edit Deco</button>
            <button class="variant-soft-warning btn btn-sm flex gap-2 items-center" on:click={()=>{
                modalStore.trigger({
                    type: 'component',
                    component: {ref: EditBadgesUser},
                    meta: {badges: $loggedInUser.badges ?? []},
                    response(r) {
                        if(r) {
                            let a = $loggedInUser;
                            a.badges = r;
                            let b = $profileData;
                            b.badges = r;
                            loggedInUser.set(a)
                            profileData.set(b)

                        }
                    }
                })
            }}>Edit Display Badges <span class="badge variant-filled-warning">NEW</span></button>
        </div>
        <div class="h-4"></div>
        
        <div class="bg-surface-100/20" style="height: 1px;margin-top:4px;margin-bottom:4px;"></div>
        <div class="h-4"></div>
        Bio
        <div class="h-4"></div>
        <textarea name="" id="" class="textarea w-full resize-none h-24" placeholder="bio" bind:value={bio} on:change={updateBio} />
        <!-- <div class="h-4"></div> -->
    
        <!-- <div class="bg-surface-100/10" style="height: 1px;margin-top:4px;margin-bottom:4px;"></div> -->
        <div class="relative">
            <div class="h-4"></div>
            <div class="text">Status</div>
            <div class="h-4"></div>
            {#if changingStatus}
                <div class="absolute right-4 bottom-1">
                    <ProgressRadial value={undefined} width="w-8"/>
                </div>
            {/if}
            <input class="input w-full" placeholder="Status" bind:value={status} on:change={changeStatus} />
        
        </div>
        <!-- <div class="h-4"></div> -->
        <div class="relative">
            <div class="h-4"></div>
            <div class="text">Pronouns</div>
            <div class="h-4"></div>
            <!-- {#if changingStatus}
                <div class="absolute right-4 bottom-1">
                    <ProgressRadial value={undefined} width="w-8"/>
                </div>
            {/if} -->
            <input class="input w-full" placeholder="Pronouns" bind:value={pronouns} on:change={changePronouns} on:input={validatePronouns} class:input-error={invalidPronouns} class:input-success={!invalidPronouns && setPronouns}/>
        </div>
        
        <div class="relative">
            <div class="h-4"></div>
            <div class="text">Display Name</div>
            <div class="h-4"></div>
            <input class="input w-full" placeholder="display name" bind:value={displayName} on:change={updateDisplayName} />
        
        </div>

        <div class="h-4"></div>
        <div class="bg-surface-100/10" style="height: 1px;margin-top:4px;margin-bottom:4px;"></div>
        
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
        <div class="h-4"></div>
        <!-- <div class="flex gap-4 items-center"> -->
            <!-- <SlideToggle name="slider-large" size="sm" active="bg-primary-500" background="bg-surface-400"></SlideToggle> -->
        <!-- </div> -->
        <div class="h-4"></div>
        <div class="flex gap-4">
            <button class="variant-soft-primary btn btn-sm" on:click={()=>{
                modalStore.trigger({
                    type: 'component',
                    component: { ref: MessageModal, props: {subject: "Request Handle Change", markdown: "Hello, i would like to request a handle change to @newhandle.\n\nReplace this text with the reason for this request"} },
                    meta: {user: "admin"}
                })
            }}>Request Handle Change</button>    
            <button class="variant-soft-success btn btn-sm" on:click={()=>{
                modalStore.trigger({
                    type: 'component',
                    component: { ref: ProfileModal },
                    meta: { profile: $profileData }
                })
            }}>View Mini Profile</button>
        </div>
    </div>