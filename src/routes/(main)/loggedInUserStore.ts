import { writable } from "svelte/store";

export let loggedInUser = writable(null)
export let featuredProjects = writable([])
export let avatarDecos = writable([])