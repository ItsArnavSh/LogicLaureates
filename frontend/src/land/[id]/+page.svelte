<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	// Mock function for booking API call
	async function bookProperty(bookingDetails) {
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));
		return { success: true, message: 'Booking successful!' };
	}

	let property = null;
	let startDate = new Date();
	let endDate = new Date();
	let duration = 'Daily';
	let loading = false;

	$: id = $page.url.searchParams.get('id');

	onMount(async () => {
		if (id) {
			await fetchProperty();
		}
	});

	async function fetchProperty() {
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));
		property = {
			id: id,
			propertyName: 'Sample Storage Space',
			description: 'A beautiful storage space for your needs.',
			city: 'Sample City',
			state: 'Sample State',
			space: 100, // in sq meters
			type: 'Normal Room',
			address: '123 Sample Street, Sample City',
			zipCode: '12345',
			access: 'Daily',
			monthlyPrice: '1000',
			yearlyPrice: '10000',
			weeklyPrice: '300',
			dailyPrice: '50',
			thumbnail: 'https://example.com/sample-thumbnail.jpg',
			additionalImages: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
			videos: ['https://example.com/video1.mp4'],
			status: 'Published'
		};
	}

	async function handleBooking() {
		loading = true;
		try {
			const result = await bookProperty({
				propertyId: id,
				startDate,
				endDate,
				duration
			});
			if (result.success) {
				alert('Booking Successful: Your storage space has been booked successfully!');
				goto('/bookings');
			}
		} catch (error) {
			alert('Booking Failed: There was an error processing your booking. Please try again.');
		} finally {
			loading = false;
		}
	}

	function formatPrice(price) {
		return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price);
	}
</script>

{#if !property}
	<div class="flex justify-center items-center h-screen bg-[#00244D]">
		<div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
	</div>
{:else}
	<div class="min-h-screen bg-[#00244D] text-white py-12 px-4 sm:px-6 lg:px-8">
		<div class="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-lg overflow-hidden">
			<div class="p-6">
				<h2 class="text-3xl font-bold mb-2">{property.propertyName}</h2>
				<p class="text-gray-300 mb-4">
					{property.address}, {property.city}, {property.state} - {property.zipCode}
				</p>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
				<div>
					<img
						src={property.thumbnail}
						alt={property.propertyName}
						class="w-full h-64 object-cover rounded-lg mb-4"
					/>
					<div class="grid grid-cols-3 gap-2">
						{#each property.additionalImages.slice(0, 3) as image}
							<img src={image} alt="Additional view" class="w-full h-20 object-cover rounded" />
						{/each}
					</div>
				</div>
				<div class="space-y-4">
					<p><strong>Type:</strong> {property.type}</p>
					<p><strong>Space:</strong> {property.space} sq meters</p>
					<p><strong>Access:</strong> {property.access}</p>
					<div>
						<strong>Pricing:</strong>
						<ul class="list-disc list-inside">
							<li>Daily: {formatPrice(property.dailyPrice)}</li>
							<li>Weekly: {formatPrice(property.weeklyPrice)}</li>
							<li>Monthly: {formatPrice(property.monthlyPrice)}</li>
							<li>Yearly: {formatPrice(property.yearlyPrice)}</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="p-6 space-y-4">
				<div>
					<label for="duration" class="block text-sm font-medium mb-1">Booking Duration</label>
					<select
						id="duration"
						bind:value={duration}
						class="w-full px-3 py-2 bg-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
					>
						<option value="Daily">Daily ({formatPrice(property.dailyPrice)}/day)</option>
						<option value="Weekly">Weekly ({formatPrice(property.weeklyPrice)}/week)</option>
						<option value="Monthly">Monthly ({formatPrice(property.monthlyPrice)}/month)</option>
					</select>
				</div>
				<div>
					<label for="startDate" class="block text-sm font-medium mb-1">Start Date</label>
					<input
						type="date"
						id="startDate"
						bind:value={startDate}
						class="w-full px-3 py-2 bg-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
					/>
				</div>
				<div>
					<label for="endDate" class="block text-sm font-medium mb-1">End Date</label>
					<input
						type="date"
						id="endDate"
						bind:value={endDate}
						class="w-full px-3 py-2 bg-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
					/>
				</div>
			</div>
			<div class="p-6">
				<button
					on:click={handleBooking}
					disabled={loading}
					class="w-full bg-[#663300] hover:bg-[#8B4513] text-white py-2 px-4 rounded-md transition-colors duration-300 disabled:opacity-50"
				>
					{loading ? 'Processing...' : 'Book Now'}
				</button>
			</div>
		</div>
	</div>
{/if}
