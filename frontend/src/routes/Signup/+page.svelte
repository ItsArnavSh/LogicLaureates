<script>
	import { sendOtp, signup } from '../../services/operations/auth';

	let email = '';
	let password = '';
	let confirmPassword = '';
	let firstName = '';
	let lastName = '';
	let accountType = '';
	let otp = '';

	function accountChange() {
		accountType = document.getElementById('accountType').value;
	}

	function otpHandler() {
		console.log(email);
		sendOtp(email);
	}

	function submitHandler() {
		signup({
			email,
			password,
			confirmPassword,
			firstName,
			lastName,
			accountType,
			otp
		});
	}
</script>

<div class="min-h-screen bg-[#00264d] flex flex-col items-center justify-center text-white py-12">
	<div class="w-full max-w-md">
		<h1 class="text-5xl font-bold italic mb-8 text-center caveat">Ampl</h1>
		<div class="bg-white/10 backdrop-blur-md rounded-lg p-8 shadow-lg">
			<h2 class="text-3xl font-bold mb-6 text-center">Sign Up</h2>
			<form on:submit|preventDefault={submitHandler} class="space-y-4">
				<div>
					<label for="accountType" class="block text-sm font-medium mb-2">Account Type</label>
					<select
						name="accountType"
						id="accountType"
						on:change={accountChange}
						class="w-full px-3 py-2 bg-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
					>
						<option value="" disabled selected>Select Account Type</option>
						<option value="Storage Owner">Storage Owner</option>
						<option value="Renter">User</option>
						<option value="Admin">Admin</option>
					</select>
				</div>
				<div class="flex gap-4">
					<div class="flex-1">
						<label for="firstName" class="block text-sm font-medium mb-2">First Name</label>
						<input
							type="text"
							id="firstName"
							bind:value={firstName}
							placeholder="First Name"
							class="w-full px-3 py-2 bg-white/20 rounded-md placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
						/>
					</div>
					<div class="flex-1">
						<label for="lastName" class="block text-sm font-medium mb-2">Last Name</label>
						<input
							type="text"
							id="lastName"
							bind:value={lastName}
							placeholder="Last Name"
							class="w-full px-3 py-2 bg-white/20 rounded-md placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
						/>
					</div>
				</div>
				<div>
					<label for="email" class="block text-sm font-medium mb-2">Email</label>
					<input
						type="email"
						id="email"
						bind:value={email}
						placeholder="Email"
						class="w-full px-3 py-2 bg-white/20 rounded-md placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
					/>
				</div>
				<div class="flex gap-4">
					<div class="flex-1">
						<label for="otp" class="block text-sm font-medium mb-2">OTP</label>
						<input
							type="text"
							id="otp"
							bind:value={otp}
							placeholder="OTP"
							class="w-full px-3 py-2 bg-white/20 rounded-md placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
						/>
					</div>
					<div class="flex items-end">
						<button
							on:click={otpHandler}
							type="button"
							class="bg-[#663300] text-white py-2 px-4 rounded-md hover:bg-[#8B4513] transition-colors duration-300"
							>Send OTP</button
						>
					</div>
				</div>
				<div>
					<label for="password" class="block text-sm font-medium mb-2">Password</label>
					<input
						type="password"
						id="password"
						bind:value={password}
						placeholder="Password"
						class="w-full px-3 py-2 bg-white/20 rounded-md placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
					/>
				</div>
				<div>
					<label for="confirmPassword" class="block text-sm font-medium mb-2"
						>Confirm Password</label
					>
					<input
						type="password"
						id="confirmPassword"
						bind:value={confirmPassword}
						placeholder="Confirm Password"
						class="w-full px-3 py-2 bg-white/20 rounded-md placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
					/>
				</div>
				<button
					type="submit"
					class="w-full bg-[#663300] text-white py-2 px-4 rounded-md hover:bg-[#8B4513] transition-colors duration-300 mt-6"
					>Sign Up</button
				>
			</form>
		</div>
		<p class="mt-8 text-center">
			Already have an account?
			<a href="/Login" class="font-bold hover:underline">Log in</a>
		</p>
	</div>
</div>
