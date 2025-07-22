<script lang="ts">
	export let amt = 0;
	export let devMode = false;

	const milestones = [
        1,
		10, 25, 50, 100, 150, 200, 250
	];

	let milestoneClass = '';
	let editing = false;
	let inputValue = amt;

	function getMilestoneClass(value: number): string {
		for (let i = milestones.length - 1; i >= 0; i--) {
			if (value >= milestones[i]) {
				return `milestone-${milestones[i]}`;
			}
		}
		return '';
	}

	$: milestoneClass = getMilestoneClass(amt);

	function startEdit() {
		if (devMode) {
			inputValue = amt;
			editing = true;
		}
	}

	function finishEdit() {
		const parsed = parseInt(inputValue as any);
		if (!isNaN(parsed)) {
			amt = parsed;
		}
		editing = false;
	}

	// Softer particle config per milestone, pastel colors, fewer particles
	const particleSettings = {
		'10': { color: 'rgba(102, 204, 255, 0.4)', count: 5, size: 3 },
		'25': { color: 'rgba(153, 255, 153, 0.4)', count: 6, size: 3 },
		'50': { color: 'rgba(255, 204, 102, 0.4)', count: 7, size: 3.5 },
		'100': { color: 'rgba(255, 102, 102, 0.45)', count: 8, size: 4 },
		'250': { color: 'rgba(255, 153, 204, 0.45)', count: 9, size: 4 },
		'500': { color: 'rgba(204, 153, 255, 0.5)', count: 10, size: 4 },
		'1000': { color: 'rgba(255, 221, 85, 0.5)', count: 11, size: 4.5 },
		'2500': { color: 'rgba(85, 255, 221, 0.5)', count: 12, size: 4.5 },
		'5000': { color: 'rgba(221, 85, 255, 0.55)', count: 13, size: 5 },
		'10000': { color: 'rgba(255, 170, 85, 0.55)', count: 14, size: 5 },
		'25000': { color: 'rgba(85, 170, 255, 0.55)', count: 15, size: 5 },
		'50000': { color: 'rgba(170, 85, 255, 0.6)', count: 16, size: 5.5 },
		'100000': { color: 'rgba(255, 170, 238, 0.6)', count: 17, size: 6 }
	};

	type Particle = {
		x: number;
		y: number;
		size: number;
		alpha: number;
		color: string;
		vy: number;
	};

	let particles: Particle[] = [];
	let imgSrc = `/creatorpoints/${getMilestoneClass(amt).replace('milestone-', '')}.webp`;

	// turn [r,g,b] into pastel
	function pastelify([r, g, b]: number[]) {
		return [
			Math.round((r + 255) / 1.3),
			Math.round((g + 255) / 1.3),
			Math.round((b + 255) / 1.3)
		];
	}
	let imgEl: HTMLImageElement;
	let canvasEl: HTMLCanvasElement;

	let bgColor = '#eee'; // default fallback
	let textColor = '#222';
	function processColor() {
		const ctx = canvasEl.getContext('2d');
		if (!ctx) return;

		canvasEl.width = imgEl.naturalWidth;
		canvasEl.height = imgEl.naturalHeight;
		ctx.drawImage(imgEl, 0, 0);

		const data = ctx.getImageData(0, 0, canvasEl.width, canvasEl.height).data;

		const colorCount = new Map<string, number>();
		for (let i = 0; i < data.length; i += 4) {
			const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
			if (a < 128) continue; // skip transparent
			const key = `${r},${g},${b}`;
			colorCount.set(key, (colorCount.get(key) || 0) + 1);
		}

		let topColor = '255,255,255', max = 0;
		for (const [key, count] of colorCount.entries()) {
			if (count > max) {
				max = count;
				topColor = key;
			}
		}

		const baseRGB = topColor.split(',').map(n => parseInt(n));
		const pastelRGB = pastelify(baseRGB);
		bgColor = `rgb(${pastelRGB.join(',')})`;
		textColor = `rgb(${baseRGB.join(',')})`; // darker text always looks good on pastel
	}
    function createParticles() {
		particles = [];
		const key = milestoneClass.replace('milestone-', '');
		const config = particleSettings[key];
		if (!config) return;

		for (let i = 0; i < config.count; i++) {
			particles.push({
				x: Math.random() * 100,
				y: 100 + Math.random() * 20,
				size: config.size * (0.8 + Math.random() * 0.4),
				alpha: 0.3 + Math.random() * 0.3,
				color: config.color,
				vy: 0.1 + Math.random() * 0.15
			});
		}
	}

	function animateParticles() {
		for (const p of particles) {
			p.y -= p.vy;
			p.alpha -= 0.004;
			if (p.alpha <= 0 || p.y < -10) {
				p.x = Math.random() * 100;
				p.y = 100 + Math.random() * 20;
				p.alpha = 0.3 + Math.random() * 0.3;
				p.vy = 0.1 + Math.random() * 0.15;
			}
		}
	}

	import { onMount, onDestroy } from 'svelte';

	// let interval;

	// onMount(() => {
	// 	createParticles();
	// 	interval = setInterval(() => {
	// 		animateParticles();
	// 	}, 50);
	// });

	// onDestroy(() => {
	// 	clearInterval(interval);
	// });

// `	$: if (milestoneClass) {
// 		createParticles();
// 	} else {
// 		particles = [];
// 	}`
</script>

<style>
    .dev-input {
        color: black;
    }

    .creatorpoint-badge {
        padding-left: 10px;
        min-width: 100px;
        padding-right: 10px;
    }
</style>

{#if editing}
	<input
		class="dev-input"
		type="number"
		bind:value={inputValue}
		on:blur={finishEdit}
		on:keydown={(e) => e.key === 'Enter' && finishEdit()}
		autofocus
	/>
{:else}
<span
	class="badge creatorpoint-badge {devMode ? 'dev' : ''} !font-bold text-lg variant-filled-surface flex gap-[6px]"
	style="background: {bgColor}; color: {textColor};"
	on:click={() => devMode && alert('dev click')}>

	<img
		bind:this={imgEl}
		src={imgSrc}
		alt=""
		class="object-cover w-8 h-8"
		style="image-rendering: pixelated;"
		on:load={processColor}
	/>

	{amt}

	<!-- hidden canvas -->
	<canvas bind:this={canvasEl} class="hidden" />
</span>
{/if}
