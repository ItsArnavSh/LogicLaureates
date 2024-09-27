<script>
	import Intro from './intro.svelte';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	let ampl;
	let navbar;
	let content;
	let value = 0;
	let showNavbar = false;
	let showContent = false;

	onMount(() => {
		window.addEventListener('scroll', () => {
			value = window.scrollY;
			if (ampl) {
				if (value < 600) {
					showNavbar = false;
					showContent = false;
					ampl.style.top = `${320 - value * 0.5}px`;
					ampl.style.left = `${50 - value * 0.075}%`;
				} else {
					ampl.style.top = '0px';
					ampl.style.left = '5%';
					showNavbar = true;
					showContent = true;
				}
				ampl.style.fontSize = `${200 - value * 0.1}px`;
			}
		});
	});
</script>

<div class="min-h-[200vh] bg-[#00244D] relative overflow-x-hidden">
	<h1
		bind:this={ampl}
		class="fixed text-[200px] text-white font-bold italic transition-all duration-500 ease-in-out z-50"
		style="top: 320px; left: 50%;"
	>
		Ampl
	</h1>

	{#if showNavbar}
		<nav
			bind:this={navbar}
			class="fixed top-0 left-0 w-full bg-white/10 backdrop-blur-md py-4 z-40 transition-all duration-500 ease-in-out"
			transition:fade={{ duration: 300 }}
		>
			<div class="container mx-auto">
				<ul class="flex justify-end items-center space-x-8">
					<li>
						<a
							href="./options"
							class="text-white hover:text-[#663300] transition-colors duration-300 text-lg font-semibold"
							>Rent</a
						>
					</li>
					<li>
						<a
							href="./apply"
							class="text-white hover:text-[#663300] transition-colors duration-300 text-lg font-semibold"
							>Apply</a
						>
					</li>
					<li>
						<a
							href="./about"
							class="text-white hover:text-[#663300] transition-colors duration-300 text-lg font-semibold"
							>About</a
						>
					</li>
				</ul>
			</div>
		</nav>
	{/if}

	{#if showContent}
		<div
			bind:this={content}
			class="fixed bottom-0 right-0 w-full transition-all duration-300 ease-in-out"
			transition:fly={{ y: 100, duration: 500 }}
		>
			<Intro />
		</div>
	{/if}
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Coda&display=swap');

	:global(body) {
		margin: 0;
		padding: 0;
		font-family: 'Coda', sans-serif;
	}

	h1 {
		font-family: 'Caveat', cursive;
	}
</style>
