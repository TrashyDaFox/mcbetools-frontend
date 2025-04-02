<script>
	import axios from "axios";
	import config from "../../config";
	import { writable } from "svelte/store";
	import styles from "../../styles";

    let blogPosts = [];
    let blogPostsReactive = writable([])
    axios.get(`${config.apiEndpoint}/blog-posts`).then(async res=>{
        for(const post of res.data) {
            let res = await axios.get(`${config.apiEndpoint}/blog-posts/${post}`)
            blogPosts.push(res.data)
            blogPostsReactive.set(blogPosts)

        }
    })
    function timeAgo(timestamp) {
    const now = new Date();
    let seconds = Math.floor((now - timestamp) / 1000);

    const intervals = [
        { label: 'second', value: 60 },
        { label: 'minute', value: 60 },
        { label: 'hour', value: 24 },
        { label: 'day', value: 30 },
        { label: 'month', value: 12 },
        { label: 'year', value: Infinity }
    ];

    let intervalIndex = 0;

    while (seconds >= intervals[intervalIndex].value && intervalIndex < intervals.length - 1) {
        seconds /= intervals[intervalIndex].value;
        intervalIndex++;
    }

    const rounded = Math.floor(seconds);
    const interval = intervals[intervalIndex];
    const plural = rounded !== 1 ? `${interval.label}s` : interval.label;
    
    return `${rounded} ${plural} ago`;
}
</script>

<div class="p-4 {styles.submissionGrid2}">
    {#if $blogPostsReactive && $blogPostsReactive.length}
        {#each $blogPostsReactive as post}
            {#if post.bannerURL}
                <a href="/blog/{post.url}" class="card card-hover overflow-hidden">
                    <img src={`${config.apiEndpoint}${post.bannerURL}`} class="w-full aspect-video object-cover"/>
                    <div class="card-body p-4">
                        <h3 class="h3 font-bold">{post.title}</h3>
                        <p>{post.shortDescription}</p>
                        <a href="/blog/{post.url}" class="anchor">Read</a>
                        <div class="h-4"></div>
                        <hr>
                        <div class="h-4"></div>
                        <p class="opacity-50">{timeAgo(new Date(post.createdAt))}</p>
                    </div>
                </a>
            {/if}
        {/each}
    {/if}
</div>