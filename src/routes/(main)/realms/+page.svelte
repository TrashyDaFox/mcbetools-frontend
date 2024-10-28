<!-- <div class="p-4">
    <button class="btn btn-sm variant-soft-primary">
        Add A Realm
    </button>
</div> -->
<script lang="ts">
  let featureEnabled = false;
</script>
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
{#if featureEnabled}
  <h1>nuh uh bitch</h1>
{:else}
  <div class="w-full h-full flex items-center justify-center flex-col bg-gradient-to-b from-transparent to-pink-700/40 relative">
      <img src="/coming_soon_realms2.png" alt="" class="w-96 h-auto object-cover up">
      <img src="/realmsportal.png" alt="" class="h-56 w-auto object-cover movey">
      <img src="/realms_particles.png" alt="" class="h-full aspect-square absolute right-0 bottom-0 -z-10" style="image-rendering:pixelated;image-rendering:crisp-edges;">
  </div>
{/if}