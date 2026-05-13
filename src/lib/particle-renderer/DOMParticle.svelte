<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { particleTetxures } from "./particleTextures";
    import { ParticleSystem } from "./ParticleSystem";

    export let offX: number = 0;
    export let offY: number = -50;
    export let particleString: string;
    export let viewScale: number = 1.0;
    export let width = 512;
    export let height = 512;
    export let parentClasses = "";

    const indexes = [ 
        "maxParticles", "duration", "lifetime", "lifetimeVar", "emission", "angle", "angleVar", 
        "speed", "speedVar", "posvarX", "posvarY", "gravityX", "gravityY", "accelRad", "accelRadVar", 
        "accelTan", "accelTanVar", "startSize", "startSizeVar", "startSpin", "startSpinVar", 
        "startR", "startRVar", "startG", "startGVar", "startB", "startBVar", "startA", "startAVar", 
        "endSize", "endSizeVar", "endSpin", "endSpinVar", "endR", "endRVar", "endG", "endGVar", 
        "endB", "endBVar", "endA", "endAVar", "fadeIn", "fadeInVar", "fadeOut", "fadeOutVar", 
        "startRad", "startRadVar", "endRad", "endRadVar", "rotSec", "rotSecVar", "mode", "mode2", 
        "additive", "keepSpin", "startRotIsDir", "dynamicRot", "texture", "uniformObjColor", 
        "frictionP", "frictionPVar", "respawn", "respawnVar", "orderSensitive", "keepSize", 
        "keepRad", "syncStartRGB", "syncEndRGB", "frictionS", "frictionSVar", "frictionR", "frictionRVar"
    ];

    const system = new ParticleSystem(indexes);
    
    // Reactive particle state for the DOM
    let activeParticles: any[] = [];
    let animationFrame: number;
    let container: HTMLDivElement;

    // Map texture IDs to URLs for <img> src
    const textureMap = new Map(particleTetxures.map(t => [t.id.toString(), t.url]));

    $: if (particleString) system.parse(particleString);

    function update() {
        let lastTime = performance.now();
        
        function frame(time: number) {
            const dt = (time - lastTime) / 1000;
            lastTime = time;

            system.update(dt, offX, offY);

            // Sync the system particles to our local state for Svelte to render
            // We use a shallow copy or a map to trigger Svelte reactivity
            activeParticles = system.particles.map(p => {
                const age = p.totalLife - p.currentLife;
                let fadeScale = 1.0;
                
                if (system.parsed.fadeIn && age < system.parsed.fadeIn) {
                    fadeScale = age / system.parsed.fadeIn;
                }
                if (system.parsed.fadeOut && p.currentLife < system.parsed.fadeOut) {
                    fadeScale = p.currentLife / system.parsed.fadeOut;
                }

                const rotation = system.parsed.dynamicRot 
                    ? Math.atan2(p.vy, p.vx) * (180 / Math.PI) 
                    : p.spin;

                return {
                    id: p.id || Math.random(), // Ensure your Particle class has a unique ID
                    x: p.x * viewScale,
                    y: -p.y * viewScale,
                    size: p.size * viewScale,
                    rotation,
                    rgba: `rgba(${p.r * 255}, ${p.g * 255}, ${p.b * 255}, ${Math.max(0, p.a * fadeScale)})`,
                    texture: textureMap.get(p.textureId),
                    additive: system.parsed.additive
                };
            });

            animationFrame = requestAnimationFrame(frame);
        }
        animationFrame = requestAnimationFrame(frame);
    }

    onMount(() => {
        update();
    });

    onDestroy(() => {
        if (animationFrame) cancelAnimationFrame(animationFrame);
    });
</script>

<div 
    bind:this={container}
    class="particle-container {parentClasses}" 
    style:width="{width}px" 
    style:height="{height}px"
>
    {#each activeParticles as p (p.id)}
        <div 
            class="particle"
            style:background-color={p.rgba}
            style:--url="url({p.texture})"
            style:mix-blend-mode={system.parsed.additive ? "plus-lighter" : "source-over"}
            style:transform="translate3d({p.x}px, {p.y}px, 0) rotate({p.rotation}deg)"
            style:width="{p.size}px"
            style:height="{p.size}px"
        ></div>
    {/each}
</div>

<style>
    .particle-container {
        position: relative;
        overflow: hidden;
        /* Matches WebGL clearing behavior */
        background: transparent; 
        pointer-events: none;
    }

    .particle {
        position: absolute;
        /* Center the particle on its coordinate */
        /* left: 50% */
        /* top: 50%; */
        margin-left: -1px;
        margin-top: -1px;
        
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        
        /* Ensure smooth movement */
        will-change: transform, opacity;
        pointer-events: none;

        /* We use mask-image if we want the background-color to tint the texture */
        mask-image: var(--url);
        mask-size: contain;
        mask-repeat: no-repeat;
        -webkit-mask-image: var(--url); /* Required for Safari/Chrome */
        -webkit-mask-size: contain; 
    }
</style>