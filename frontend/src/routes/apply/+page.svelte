<script>
	import { user, token } from '../../writeables/authWriteables';
	import { goto } from '$app/navigation';
	import { createLand } from '../../services/operations/land';

	let address = '';
	let propertyName = '';
	let access = '';
	let space = '';
	let additionalImages = [];
	let videos = [];
	let propertyPapers = [];
	let city = '';
	let state = '';
	let dailyPrice = 0;
	let weeklyPrice = 0;
	let monthlyPrice = 0;
	let yearlyPrice = 0;
	let thumbnail = [];
	let type = '';
	let description = '';
	let zipCode = '';

	const statesOfIndia = [
		'Andhra Pradesh',
		'Arunachal Pradesh',
		'Assam',
		'Bihar',
		'Chhattisgarh',
		'Goa',
		'Gujarat',
		'Haryana',
		'Himachal Pradesh',
		'Jharkhand',
		'Karnataka',
		'Kerala',
		'Madhya Pradesh',
		'Maharashtra',
		'Manipur',
		'Meghalaya',
		'Mizoram',
		'Nagaland',
		'Odisha',
		'Punjab',
		'Rajasthan',
		'Sikkim',
		'Tamil Nadu',
		'Telangana',
		'Tripura',
		'Uttar Pradesh',
		'Uttarakhand',
		'West Bengal',
		'Andaman and Nicobar Islands',
		'Chandigarh',
		'Dadra and Nagar Haveli',
		'Daman and Diu',
		'Delhi',
		'Lakshadweep',
		'Puducherry'
	];

	function handleSubmit() {
		const data = {
			address,
			space,
			thumbnail,
			zipCode,
			propertyPapers,
			state,
			city,
			type,
			description,
			access,
			propertyName,
			dailyPrice,
			monthlyPrice,
			weeklyPrice,
			yearlyPrice
		};
		console.log(data);
		createLand($token, data);
		goto('/storage-owner-dashboard');
	}

	function accessChange(event) {
		access = event.target.value;
	}

	function handleDocFileChange(event) {
		propertyPapers = event.target.files[0];
	}

	function handleFileChange(event) {
		thumbnail = event.target.files[0];
	}
</script>

<div class="min-h-screen bg-[#00244D] text-white py-12">
	{#if $user === null}
		{goto('Login')}
	{:else if $user.accountType !== 'Storage Owner'}
		<div class="flex items-center justify-center h-screen">
			<p class="text-2xl font-bold">This Route is protected for Storage Owners</p>
		</div>
	{:else}
		<div class="container mx-auto px-4">
			<h1 class="text-5xl font-bold italic mb-12 text-center">Register Your Property</h1>
			<form
				on:submit|preventDefault={handleSubmit}
				class="bg-white/10 backdrop-blur-md rounded-lg p-8 shadow-lg max-w-2xl mx-auto"
			>
				<div class="space-y-6">
					<div>
						<label for="propName" class="block text-sm font-medium mb-2">Property Name</label>
						<input
							id="propName"
							bind:value={propertyName}
							required
							class="w-full px-3 py-2 bg-white/20 rounded-md placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
						/>
					</div>

					<div>
						<label for="state" class="block text-sm font-medium mb-2">State</label>
						<select
							id="state"
							bind:value={state}
							required
							class="w-full px-3 py-2 bg-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
						>
							<option disabled selected value="">Select State</option>
							{#each statesOfIndia as stateOption}
								<option>{stateOption}</option>
							{/each}
						</select>
					</div>

					<div>
						<label for="city" class="block text-sm font-medium mb-2">City</label>
						<input
							id="city"
							bind:value={city}
							required
							class="w-full px-3 py-2 bg-white/20 rounded-md placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
						/>
					</div>

					<div>
						<label for="access" class="block text-sm font-medium mb-2">Access Frequency</label>
						<select
							id="access"
							required
							on:change={accessChange}
							class="w-full px-3 py-2 bg-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
						>
							<option value="" disabled selected>Select Access Frequency</option>
							<option value="Daily">Daily</option>
							<option value="Weekly">Weekly</option>
							<option value="Monthly">Monthly</option>
							<option value="Yearly">Yearly</option>
						</select>
					</div>

					<div>
						<label for="address" class="block text-sm font-medium mb-2">Complete Address</label>
						<textarea
							id="address"
							bind:value={address}
							required
							class="w-full px-3 py-2 bg-white/20 rounded-md placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 h-24"
						></textarea>
					</div>

					<div>
						<label for="area" class="block text-sm font-medium mb-2">Approximate Area</label>
						<input
							id="area"
							bind:value={space}
							required
							class="w-full px-3 py-2 bg-white/20 rounded-md placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
						/>
					</div>

					<div>
						<label for="files" class="block text-sm font-medium mb-2">Property Image</label>
						<input
							id="files"
							type="file"
							on:change={handleFileChange}
							required
							class="w-full px-3 py-2 bg-white/20 rounded-md text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#663300] file:text-white hover:file:bg-[#8B4513]"
						/>
					</div>

					<div>
						<label for="documents" class="block text-sm font-medium mb-2"
							>Legal Document for Verification</label
						>
						<input
							id="documents"
							type="file"
							on:change={handleDocFileChange}
							required
							class="w-full px-3 py-2 bg-white/20 rounded-md text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#663300] file:text-white hover:file:bg-[#8B4513]"
						/>
					</div>

					<div>
						<label class="block text-sm font-medium mb-2">Storage Type</label>
						<div class="space-y-2">
							<label class="inline-flex items-center">
								<input
									type="radio"
									bind:group={type}
									value="Warehouse"
									class="form-radio text-[#663300]"
								/>
								<span class="ml-2">Warehouse</span>
							</label>
							<label class="inline-flex items-center">
								<input
									type="radio"
									bind:group={type}
									value="Cold Storage"
									class="form-radio text-[#663300]"
								/>
								<span class="ml-2">Cold Storage</span>
							</label>
							<label class="inline-flex items-center">
								<input
									type="radio"
									bind:group={type}
									value="Normal Room"
									class="form-radio text-[#663300]"
								/>
								<span class="ml-2">Normal Room</span>
							</label>
						</div>
					</div>

					<div>
						<label for="dailyPrice" class="block text-sm font-medium mb-2"
							>Price (Rupees per Day)</label
						>
						<input
							id="dailyPrice"
							type="number"
							min="0"
							bind:value={dailyPrice}
							required
							class="w-full px-3 py-2 bg-white/20 rounded-md placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
						/>
					</div>

					<div>
						<label for="weeklyPrice" class="block text-sm font-medium mb-2"
							>Price (Rupees per Week)</label
						>
						<input
							id="weeklyPrice"
							type="number"
							min="0"
							bind:value={weeklyPrice}
							required
							class="w-full px-3 py-2 bg-white/20 rounded-md placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
						/>
					</div>

					<div>
						<label for="monthlyPrice" class="block text-sm font-medium mb-2"
							>Price (Rupees per Month)</label
						>
						<input
							id="monthlyPrice"
							type="number"
							min="0"
							bind:value={monthlyPrice}
							required
							class="w-full px-3 py-2 bg-white/20 rounded-md placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
						/>
					</div>

					<div>
						<label for="yearlyPrice" class="block text-sm font-medium mb-2"
							>Price (Rupees per Year)</label
						>
						<input
							id="yearlyPrice"
							type="number"
							min="0"
							bind:value={yearlyPrice}
							required
							class="w-full px-3 py-2 bg-white/20 rounded-md placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
						/>
					</div>

					<div>
						<label for="zipCode" class="block text-sm font-medium mb-2">Zip Code</label>
						<input
							id="zipCode"
							type="number"
							min="0"
							bind:value={zipCode}
							required
							class="w-full px-3 py-2 bg-white/20 rounded-md placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
						/>
					</div>

					<div>
						<label for="additionalInfo" class="block text-sm font-medium mb-2"
							>Additional Information</label
						>
						<textarea
							id="additionalInfo"
							bind:value={description}
							class="w-full px-3 py-2 bg-white/20 rounded-md placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 h-24"
						></textarea>
					</div>

					<button
						type="submit"
						class="w-full bg-[#663300] text-white py-2 px-4 rounded-md hover:bg-[#8B4513] transition-colors duration-300 text-lg font-semibold"
					>
						Submit
					</button>
				</div>
			</form>
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
