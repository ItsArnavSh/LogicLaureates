<script>
	import { onMount } from 'svelte';
	import Navbar from '../../commonComponents/Navbar.svelte';
	import { token } from '../../writeables/authWriteables';
	import { pendingProperties } from '../../services/operations/land';
	import { fade, fly } from 'svelte/transition';

	let pendingLands = null;
	const fetchLands = async () => {
		pendingLands = await pendingProperties($token);
		console.log(pendingLands);
	};

	onMount(() => {
		fetchLands();
	});
</script>

<div class="min-h-screen bg-[#00244D] text-white">
	<Navbar />
	<div class="container mx-auto px-4 py-8">
		{#if pendingLands === null}
			<div class="flex justify-center items-center h-64">
				<div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
			</div>
		{:else}
			<div class="flex flex-col items-center space-y-8" in:fade={{ duration: 300 }}>
				<h1 class="text-4xl font-bold font-mono">Dashboard</h1>
				<a href="/apply">
					<button
						class="px-6 py-3 bg-[#663300] text-white rounded-md hover:bg-[#8B4513] transition-colors duration-300 shadow-lg text-lg font-semibold"
					>
						Create New Property
					</button>
				</a>
				<h2 class="text-2xl font-semibold mt-8">Pending for Review</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
					{#each pendingLands as pl, i}
						<div
							class="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
							in:fly={{ y: 50, duration: 300, delay: i * 100 }}
						>
							<div class="p-6">
								<h3 class="text-xl font-bold mb-2">{pl.propertyName}</h3>
								<p class="text-gray-300 mb-4">{pl.description}</p>
								<p class="text-lg font-semibold mb-4">Monthly Price: ${pl.monthlyPrice}</p>
								<div class="flex justify-between">
									<button
										class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
									>
										Edit
									</button>
									<button
										class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-300"
									>
										Delete
									</button>
								</div>
							</div>
							<img src={pl.thumbnail} alt={pl.propertyName} class="w-full h-48 object-cover" />
						</div>
					{/each}
				</div>
				<h2 class="text-2xl font-semibold mt-12">Approved Properties</h2>
				<!-- Add approved properties section here when available -->
			</div>
		{/if}
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Coda&family=Roboto+Mono&display=swap');

	:global(body) {
		font-family: 'Coda', sans-serif;
	}

	h1,
	h2 {
		font-family: 'Roboto Mono', monospace;
	}
</style>
