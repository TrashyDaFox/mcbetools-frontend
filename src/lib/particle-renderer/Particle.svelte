<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { particleTetxures } from "./particleTextures";
    import { ParticleSystem } from "./ParticleSystem";

    export let offX: number = 0;
    export let offY: number = -50;
    export let particleString: string;
    export let viewScale: number = 1.0;

    let canvas: HTMLCanvasElement;
    let gl: WebGLRenderingContext;
    let program: WebGLProgram;
    let animationFrame: number;
    let quadBuffer: WebGLBuffer;

    const TEXTURE_CACHE = new Map<string, WebGLTexture>();
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
    
    let positionLoc: number, offsetLoc: number, scaleLoc: number, colorLoc: number, rotationLoc: number;

    const VS_SOURCE = `
        attribute vec2 a_quadPos;
        attribute vec2 a_offset;
        attribute float a_scale;
        attribute vec4 a_color;
        attribute float a_rotation;

        varying vec4 v_color;
        varying vec2 v_texCoord;

        uniform vec2 u_resolution;
        uniform float u_viewScale;

        void main() {
            float c = cos(a_rotation);
            float s = sin(a_rotation);
            mat2 rot = mat2(c, s, -s, c);
            
            // Apply both individual particle scale and global view scale
            vec2 pos = (rot * a_quadPos) * a_scale * u_viewScale;
            vec2 screenPos = ((pos + (a_offset * u_viewScale)) / u_resolution) * 2.0;
            
            gl_Position = vec4(screenPos, 0.0, 1.0);
            v_color = a_color;
            v_texCoord = a_quadPos + 0.5;
        }
    `;

    const FS_SOURCE = `
        precision mediump float;
        varying vec4 v_color;
        varying vec2 v_texCoord;
        uniform sampler2D u_texture;

        void main() {
            vec4 texColor = texture2D(u_texture, v_texCoord);
            gl_FragColor = texColor * v_color;
        }
    `;

    $: if (particleString) system.parse(particleString);

    async function initWebGL() {
        gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false });
        
        const vs = gl.createShader(gl.VERTEX_SHADER)!;
        gl.shaderSource(vs, VS_SOURCE);
        gl.compileShader(vs);

        const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
        gl.shaderSource(fs, FS_SOURCE);
        gl.compileShader(fs);

        program = gl.createProgram()!;
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);

        positionLoc = gl.getAttribLocation(program, "a_quadPos");
        offsetLoc = gl.getAttribLocation(program, "a_offset");
        scaleLoc = gl.getAttribLocation(program, "a_scale");
        colorLoc = gl.getAttribLocation(program, "a_color");
        rotationLoc = gl.getAttribLocation(program, "a_rotation");
    }

    async function loadTextures() {
        for (const t of particleTetxures) { 
            const img = new Image();
            img.src = t.url; 
            await img.decode();
            
            const tex = gl.createTexture()!;
            gl.bindTexture(gl.TEXTURE_2D, tex);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            TEXTURE_CACHE.set(t.id.toString(), tex); 
        }
    }

    function draw() {
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, system.parsed.additive ? gl.ONE : gl.ONE_MINUS_SRC_ALPHA);

        gl.useProgram(program);
        gl.uniform2f(gl.getUniformLocation(program, "u_resolution"), canvas.width, canvas.height);
        gl.uniform1f(gl.getUniformLocation(program, "u_viewScale"), viewScale);

        for (const p of system.particles) {
            const age = p.totalLife - p.currentLife;
            let fadeScale = 1.0;
            if (system.parsed.fadeIn && age < system.parsed.fadeIn) fadeScale = age / system.parsed.fadeIn;
            if (system.parsed.fadeOut && p.currentLife < system.parsed.fadeOut) fadeScale = p.currentLife / system.parsed.fadeOut;
            
            const tex = TEXTURE_CACHE.get(p.textureId);
            if (!tex) continue;

            gl.bindTexture(gl.TEXTURE_2D, tex);
            gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
            gl.enableVertexAttribArray(positionLoc);
            gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

            gl.vertexAttrib2f(offsetLoc, p.x, p.y);
            gl.vertexAttrib1f(scaleLoc, p.size);
            gl.vertexAttrib4f(colorLoc, p.r, p.g, p.b, Math.max(0, p.a * fadeScale));
            
            const rotation = system.parsed.dynamicRot ? Math.atan2(p.vy, p.vx) : (p.spin * Math.PI) / 180;
            gl.vertexAttrib1f(rotationLoc, rotation);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }
    }
    let ro: ResizeObserver;

    function resize() {
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        gl.viewport(0, 0, canvas.width, canvas.height);
    }
    onMount(async () => {
        function resizeCanvas() {
            const rect = canvas.getBoundingClientRect();

            canvas.width = rect.width;
            canvas.height = rect.height;

            gl.viewport(0, 0, canvas.width, canvas.height);
        }
        await initWebGL();
        await loadTextures();

        quadBuffer = gl.createBuffer()!;
        gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5]), gl.STATIC_DRAW);

        let lastTime = performance.now();
        function frame(time: number) {
            const dt = (time - lastTime) / 1000;
            lastTime = time;

            system.update(dt, offX, offY);
            draw();

            animationFrame = requestAnimationFrame(frame);
        }
        animationFrame = requestAnimationFrame(frame);
        ro = new ResizeObserver(() => {
            resize();
        });
    });

    onDestroy(() => {
        cancelAnimationFrame(animationFrame);
        TEXTURE_CACHE.forEach(tex => gl.deleteTexture(tex));
    });
    export let parentClasses = ";"
    export let width = 512;
    export let height = 512;
</script>

<canvas bind:this={canvas} width={width} height={height} class="c {parentClasses}"></canvas>

<style>
    .c {
        /* width: 100vw; */
        /* height: 100vh; */
        display: block;
    }
</style>