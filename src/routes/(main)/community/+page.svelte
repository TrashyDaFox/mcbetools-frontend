<style>
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
</div>