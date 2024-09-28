<script>
	import Navbar from '../../commonComponents/Navbar.svelte';
	import { token, user } from '../../writeables/authWriteables';
	import { getPublishedLands } from '../../services/operations/land';
	import { goto } from '$app/navigation';
	import { fade, fly } from 'svelte/transition';

	let lands = null;
	let filteredLands = null;
	let stateFilter = '';
	let cityFilter = '';
	let minPrice = '';
	let maxPrice = '';

	async function fetchLands() {
		lands = await getPublishedLands($token);
		applyFilters();
	}

	function navigateToLandDetails(landId) {
		goto(`/land/${landId}`);
	}

	function applyFilters() {
		filteredLands = lands.filter((land) => {
			return (
				(stateFilter === '' || land.state.toLowerCase().includes(stateFilter.toLowerCase())) &&
				(cityFilter === '' || land.city.toLowerCase().includes(cityFilter.toLowerCase())) &&
				(minPrice === '' || land.monthlyPrice >= parseInt(minPrice)) &&
				(maxPrice === '' || land.monthlyPrice <= parseInt(maxPrice))
			);
		});
	}

	$: if (lands) {
		applyFilters();
	}

	fetchLands();
</script>

<div class="min-h-screen bg-[#00244D] text-white">
	<Navbar />
	<div class="container mx-auto px-4 py-8">
		<div class="flex justify-center space-x-4 mb-8" in:fade={{ duration: 300 }}>
			<a href="/options">
				<button
					class="bg-[#663300] text-white py-2 px-6 rounded-md hover:bg-[#8B4513] transition-colors duration-300 text-lg font-semibold"
				>
					Nearby Locations
				</button>
			</a>
			<a href="/rent">
				<button
					class="bg-[#663300] text-white py-2 px-6 rounded-md hover:bg-[#8B4513] transition-colors duration-300 text-lg font-semibold"
				>
					Find Location Statewise
				</button>
			</a>
		</div>

		<h1 class="text-3xl font-bold mb-6 text-center" in:fade={{ duration: 300 }}>Published Lands</h1>

		<div class="mb-6 bg-white/10 backdrop-blur-md rounded-lg p-4" in:fly={{ y: 50, duration: 500 }}>
			<h2 class="text-xl font-semibold mb-4">Filters</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<div>
					<label for="stateFilter" class="block text-sm font-medium mb-1">State</label>
					<input
						type="text"
						id="stateFilter"
						bind:value={stateFilter}
						on:input={applyFilters}
						class="w-full px-3 py-2 bg-white/20 rounded-md placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
						placeholder="Filter by state"
					/>
				</div>
				<div>
					<label for="cityFilter" class="block text-sm font-medium mb-1">City</label>
					<input
						type="text"
						id="cityFilter"
						bind:value={cityFilter}
						on:input={applyFilters}
						class="w-full px-3 py-2 bg-white/20 rounded-md placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
						placeholder="Filter by city"
					/>
				</div>
				<div>
					<label for="minPrice" class="block text-sm font-medium mb-1">Min Price</label>
					<input
						type="number"
						id="minPrice"
						bind:value={minPrice}
						on:input={applyFilters}
						class="w-full px-3 py-2 bg-white/20 rounded-md placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
						placeholder="Min monthly price"
					/>
				</div>
				<div>
					<label for="maxPrice" class="block text-sm font-medium mb-1">Max Price</label>
					<input
						type="number"
						id="maxPrice"
						bind:value={maxPrice}
						on:input={applyFilters}
						class="w-full px-3 py-2 bg-white/20 rounded-md placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
						placeholder="Max monthly price"
					/>
				</div>
			</div>
		</div>

		{#if lands === null}
			<div class="flex justify-center items-center h-64">
				<div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
			</div>
		{:else if filteredLands && filteredLands.length > 0}
			<div class="overflow-x-auto" in:fly={{ y: 50, duration: 500 }}>
				<table class="w-full bg-white/10 backdrop-blur-md rounded-lg overflow-hidden">
					<thead>
						<tr class="bg-white/20">
							<th class="p-3 text-left">Property Name</th>
							<th class="p-3 text-left">State</th>
							<th class="p-3 text-left">City</th>
							<th class="p-3 text-left">Monthly Price</th>
							<th class="p-3 text-left">Image</th>
						</tr>
					</thead>
					<tbody>
						{#each filteredLands as land, i}
							<tr
								class="hover:bg-white/20 transition-colors duration-200 cursor-pointer"
								on:click={() => navigateToLandDetails(land._id)}
								in:fly={{ y: 50, duration: 300, delay: i * 100 }}
							>
								<td class="p-3">{land.propertyName}</td>
								<td class="p-3">{land.state}</td>
								<td class="p-3">{land.city}</td>
								<td class="p-3">₹{land.monthlyPrice}</td>
								<td class="p-3">
									<img
										src={land.thumbnail}
										alt={land.propertyName}
										class="w-20 h-20 object-cover rounded"
									/>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{:else}
			<p class="text-center text-xl mt-8">No properties found matching your criteria.</p>
		{/if}
	</div>
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
