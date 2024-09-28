<script>
	import { preference, question } from '../../writeables/preferences';
	import Button from '../button.svelte';
	import Option from './sample.svelte';
	import Navbar from '../../commonComponents/Navbar.svelte';
	import { pendingProperties } from '../../services/operations/land';
	import { token } from '../../writeables/authWriteables';
	import { fade, fly } from 'svelte/transition';

	let answers, questions;
	preference.subscribe((value) => {
		answers = value;
	});
	question.subscribe((value) => {
		questions = value;
	});

	let locations = null;
	const fetchProperties = async () => {
		locations = await pendingProperties($token);
	};
	fetchProperties();
</script>

<div class="min-h-screen bg-[#00244D] text-white">
	{#if locations === null}
		<div class="flex justify-center items-center">
			<div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
		</div>
	{:else}
		<Navbar />
		<div class="container mx-auto px-4 py-8">
			<h1 class="text-5xl font-bold italic mb-12 text-center" in:fade={{ duration: 300 }}>
				Admin Dashboard
			</h1>
			<div
				class="bg-white/10 backdrop-blur-md rounded-lg p-8 shadow-lg mb-10"
				in:fly={{ y: 50, duration: 500 }}
			>
				<h2 class="text-2xl font-semibold mb-4">Dashboard Overview</h2>
				<div class="text-lg space-y-2">
					<p>Total Pending Properties: {locations.length}</p>
					<!-- Add more dashboard stats here -->
				</div>
			</div>
			<div class="space-y-6">
				{#each locations as position, i}
					<div in:fly={{ y: 50, duration: 300, delay: i * 100 }}>
						<Option {...position} />
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Coda&family=Caveat:wght@700&display=swap');

	:global(body) {
		font-family: 'Coda', sans-serif;
	}

	h1 {
		font-family: 'Caveat', cursive;
	}
</style>
