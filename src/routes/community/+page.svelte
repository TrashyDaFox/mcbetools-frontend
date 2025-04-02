<!-- <style>
    .movey {
        position: relative;
        animation: up-down 3s ease-in-out infinite;
    }
    .up {
        transform: translateY(-20px);

    }
        @keyframes up-down {
      0% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-20px);
      }
      100% {
        transform: translateY(0);
      }
    }
</style>

<div class="w-full h-full flex items-center justify-center flex-col gap-2 bg-gradient-to-b from-transparent to-sky-300/20 relative">
    <img src="/comming_soon_community.png" alt="" class="w-96 h-auto object-cover up">
    <img src="/community_image.png" alt="" class="h-56 w-auto object-cover movey">
    <img src="/community_particles.png" alt="" class="h-full aspect-square absolute right-0 bottom-0 -z-10" style="image-rendering:pixelated;image-rendering:crisp-edges;">
</div> -->
<script lang="ts">
</script>
<style lang="text/postcss">
@import url("https://fonts.googleapis.com/css2?family=Funnel+Sans:ital,wght@0,300..800;1,300..800&display=swap");
@keyframes hero-gradient-animation {
    0% {
        --x-0: 5%;
        --y-0: 1%;
        --s-start-0: 4.468465798662832%;
        --s-end-0: 36.70555825598397%;
        --c-0: hsla(33.915441176470594, 76%, 61%, 1);
        --s-start-1: 16%;
        --s-end-1: 53%;
        --c-1: hsla(348.9795918367347, 100%, 80%, 1);
        --y-1: 81%;
        --x-1: 7%;
        --x-2: 11%;
        --y-2: 29%;
        --s-start-2: 8%;
        --s-end-2: 74%;
        --c-2: hsla(352, 97%, 75%, 1);
        --x-3: 39%;
        --s-start-3: 6%;
        --s-end-3: 68%;
        --y-3: 52%;
        --c-3: hsla(343.83233532934133, 100%, 67%, 1);
        --c-4: hsla(313, 98%, 70%, 1);
        --y-4: 50%;
        --s-start-4: 2%;
        --s-end-4: 85%;
        --x-4: 90%;
    }

    100% {
        --x-0: 23%;
        --y-0: 47%;
        --s-start-0: 9;
        --s-end-0: 62;
        --c-0: hsla(348.9795918367347, 100%, 80%, 1);
        --s-start-1: 9;
        --s-end-1: 62;
        --c-1: hsla(323, 0%, 100%, 1);
        --y-1: 62%;
        --x-1: 41%;
        --x-2: 15%;
        --y-2: 44%;
        --s-start-2: 9;
        --s-end-2: 62;
        --c-2: hsla(352, 97%, 75%, 1);
        --x-3: 21%;
        --s-start-3: 9;
        --s-end-3: 62;
        --y-3: 85%;
        --c-3: hsla(343.83233532934133, 100%, 67%, 1);
        --c-4: hsla(313, 98%, 70%, 1);
        --y-4: 24%;
        --s-start-4: 9;
        --s-end-4: 62;
        --x-4: 5%;
    }
}

@property --x-0 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 5%
}

@property --y-0 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 1%
}

@property --s-start-0 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 4.468465798662832%
}

@property --s-end-0 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 36.70555825598397%
}

@property --c-0 {
    syntax: '<color>';
    inherits: false;
    initial-value: hsla(33.915441176470594, 76%, 61%, 1)
}

@property --s-start-1 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 16%
}

@property --s-end-1 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 53%
}

@property --c-1 {
    syntax: '<color>';
    inherits: false;
    initial-value: hsla(348.9795918367347, 100%, 80%, 1)
}

@property --y-1 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 81%
}

@property --x-1 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 7%
}

@property --x-2 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 11%
}

@property --y-2 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 29%
}

@property --s-start-2 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 8%
}

@property --s-end-2 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 74%
}

@property --c-2 {
    syntax: '<color>';
    inherits: false;
    initial-value: hsla(352, 97%, 75%, 1)
}

@property --x-3 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 39%
}

@property --s-start-3 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 6%
}

@property --s-end-3 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 68%
}

@property --y-3 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 52%
}

@property --c-3 {
    syntax: '<color>';
    inherits: false;
    initial-value: hsla(343.83233532934133, 100%, 67%, 1)
}

@property --c-4 {
    syntax: '<color>';
    inherits: false;
    initial-value: hsla(313, 98%, 70%, 1)
}

@property --y-4 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 50%
}

@property --s-start-4 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 2%
}

@property --s-end-4 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 85%
}

@property --x-4 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 90%
}

.banner {
    --x-0: 5%;
    --y-0: 1%;
    --c-0: hsla(33.915441176470594, 76%, 61%, 1);
    --c-1: hsla(348.9795918367347, 100%, 80%, 1);
    --y-1: 81%;
    --x-1: 7%;
    --x-2: 11%;
    --y-2: 29%;
    --c-2: hsla(352, 97%, 75%, 1);
    --x-3: 39%;
    --y-3: 52%;
    --c-3: hsla(343.83233532934133, 100%, 67%, 1);
    --c-4: hsla(313, 98%, 70%, 1);
    --y-4: 50%;
    --x-4: 90%;
    ;
    background-color: hsla(346.28728529986205, 100%, 91%, 1);
    background-image: radial-gradient(circle at var(--x-0) var(--y-0), var(--c-0) var(--s-start-0), transparent var(--s-end-0)), radial-gradient(circle at var(--x-1) var(--y-1), var(--c-1) var(--s-start-1), transparent var(--s-end-1)), radial-gradient(circle at var(--x-2) var(--y-2), var(--c-2) var(--s-start-2), transparent var(--s-end-2)), radial-gradient(circle at var(--x-3) var(--y-3), var(--c-3) var(--s-start-3), transparent var(--s-end-3)), radial-gradient(circle at var(--x-4) var(--y-4), var(--c-4) var(--s-start-4), transparent var(--s-end-4));
    animation: hero-gradient-animation 15s linear infinite alternate;
    background-blend-mode: normal, normal, normal, normal, normal;
}

.banner2 {
    --x-0: 5%;
    --y-0: 1%;
    --c-0: hsla(33.915441176470594, 76%, 61%, 1);
    --c-1: hsla(348.9795918367347, 100%, 80%, 1);
    --y-1: 81%;
    --x-1: 7%;
    --x-2: 11%;
    --y-2: 29%;
    --c-2: hsla(352, 97%, 75%, 1);
    --x-3: 39%;
    --y-3: 52%;
    --c-3: hsla(343.83233532934133, 100%, 67%, 1);
    --c-4: hsla(313, 98%, 70%, 1);
    --y-4: 50%;
    --x-4: 90%;
    ;
    background-color: hsla(346.28728529986205, 100%, 91%, 1);
    background-image: radial-gradient(circle at var(--x-0) var(--y-0), var(--c-0) var(--s-start-0), transparent var(--s-end-0)), radial-gradient(circle at var(--x-1) var(--y-1), var(--c-1) var(--s-start-1), transparent var(--s-end-1)), radial-gradient(circle at var(--x-2) var(--y-2), var(--c-2) var(--s-start-2), transparent var(--s-end-2)), radial-gradient(circle at var(--x-3) var(--y-3), var(--c-3) var(--s-start-3), transparent var(--s-end-3)), radial-gradient(circle at var(--x-4) var(--y-4), var(--c-4) var(--s-start-4), transparent var(--s-end-4));
    animation: hero-gradient-animation 15s linear infinite alternate;
    background-blend-mode: normal, normal, normal, normal, normal;
    opacity: 1.0;
    filter: blur(250px);
}
</style>

<div class="p-4 relative overflow-hidden h-full">
  <div class="w-full h-96 rounded-container-token banner">
    <div class="w-full h-full bg-gradient-to-b from-surface-900/0 to-surface-900 shadow-xl flex flex-col gap-4 items-center justify-center">
      <h1 class="text-white h1 text-7xl" style="font-family:'Funnel Sans', sans-serif;font-weight:800;">MCBETOOLS COMMUNITY</h1>
      <p style="font-family: 'Funnel Sans', sans-serif;" class="text-2xl text-white">Interact with the community of MCBETools! Forums, community events, and much more planned!</p>
    </div>
  </div>
  <div class="h-8"></div>
  <div class="banner2 w-96 h-96 rounded-full absolute -bottom-[30%] left-1/2 -translate-x-1/2 -z-10"></div>
  <div class="w-full items-center justify-center flex flex-wrap gap-12 md:gap-16">
    <a href="/community/forums" class="card card-hover w-56 variant-glass-surface aspect-square flex items-center justify-center flex-col gap-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
      <span class="text-xl">Forums</span>
    </a>
    <a href="" class="card card-hover variant-glass-surface aspect-square w-56 flex items-center justify-center flex-col gap-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      <span class="text-xl">Events</span>
    </a>
    <a href="" class="card card-hover variant-glass-surface aspect-square w-56 flex items-center justify-center flex-col gap-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-hexagon"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
      <span class="text-xl">Lorem, ipsum.</span>
    </a>
  </div>
</div>
<!-- <div class="p-4">
  <div class="card bg-initial w-full p-4">
    <div class="profile flex gap-4">
      <img src="/leafbg.png" class="w-12 h-12 object-cover rounded-full" alt="">
      <div class="flex flex-col">
        <p>Example user</p>
        <p class="opacity-50">@example</p>
      </div>
    </div>
    <div class="h-2"></div>
    <p class="opacity-50">#channel</p>
    <div class="py-3"></div>
    <hr />
    <div class="h-4"></div>
    <h3 class="h3 font-bold">Title</h3>
    <p>Skibidi toilet is my spirit animal</p>
    <div class="h-4"></div>
    <div class="flex gap-4">
      <button class="chip variant-soft flex gap-2 hover:variant-filled" on:click={()=>{}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M4 18h2v4.081L11.101 18H16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2z"></path><path d="M20 2H8c-1.103 0-2 .897-2 2h12c1.103 0 2 .897 2 2v8c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2z"></path></svg>
        Comment
      </button>
      <button class="chip variant-soft flex gap-2 hover:variant-filled" on:click={()=>{}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M4 21h1V8H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2zM20 8h-7l1.122-3.368A2 2 0 0 0 12.225 2H12L7 7.438V21h11l3.912-8.596L22 12v-2a2 2 0 0 0-2-2z"></path></svg>
        Like
      </button>
    </div>
  </div>
</div> -->