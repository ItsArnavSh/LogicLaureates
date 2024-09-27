<script>
	import { token } from '../writeables/authWriteables';
	import { loginTokenApi, logout } from '../services/operations/auth';
	import { onMount } from 'svelte';

	let dashboard = '';

	onMount(() => {
		if ($token) {
			loginTokenApi($token)
				.then((response) => {
					const accountType = response.data.user.accountType;
					console.log(accountType);
					if (accountType === 'Admin') {
						dashboard = '/Admin';
					} else if (accountType === 'Renter') {
						dashboard = '/user-dashboard';
					} else {
						dashboard = '/storage-owner-dashboard';
					}
				})
				.catch((error) => {
					console.error('Error during login:', error);
				});
		}
	});
</script>

<div class="flex space-x-4">
	{#if $token}
		<a href={dashboard}>
			<button
				class="bg-[#663300] text-white py-2 px-6 rounded-md hover:bg-[#8B4513] transition-colors duration-300 text- font-semibold"
			>
				Dashboard
			</button>
		</a>
		<button
			on:click={() => logout()}
			class="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 transition-colors duration-300 text-4xl font-semibold"
		>
			Logout
		</button>
	{:else}
		<a href="Login">
			<button
				class="bg-[#663300] text-white py-2 px-6 rounded-md hover:bg-[#8B4513] transition-colors duration-300 text-4xl"
			>
				Login
			</button>
		</a>
		<a href="/Signup">
			<button
				class="bg-[#663300] text-white py-2 px-6 rounded-md hover:bg-[#8B4513] transition-colors duration-300 text-4xl"
			>
				Get Started
			</button>
		</a>
	{/if}
</div>
