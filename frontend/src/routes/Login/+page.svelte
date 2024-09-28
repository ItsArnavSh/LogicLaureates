<script>
	import { token } from '../../writeables/authWriteables';
	import { loginApi } from '../../services/operations/auth';

	let email = '';
	let password = '';

	function submitHandler() {
		loginApi(email, password);
	}

	$: showPassword = false;
</script>

<div class="min-h-screen bg-[#00264d] flex flex-col items-center justify-center text-white">
	<div class="w-full max-w-md">
		<h1 class="text-5xl font-bold italic mb-8 text-center caveat">Ampl</h1>
		<div class="bg-white/10 backdrop-blur-md rounded-lg p-8 shadow-lg">
			<h2 class="text-3xl font-bold mb-6 text-center">Login</h2>
			<form on:submit|preventDefault={submitHandler} class="space-y-6">
				<div>
					<label for="email" class="block text-sm font-medium mb-2">Email</label>
					<input
						type="email"
						id="email"
						bind:value={email}
						class="w-full px-3 py-2 bg-white/20 rounded-md placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
						placeholder="Enter your email"
					/>
				</div>
				<div>
					<label for="password" class="block text-sm font-medium mb-2">Password</label>
					<input
						id="password"
						type="password"
						bind:value={password}
						class="w-full px-3 py-2 bg-white/20 rounded-md placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
						placeholder="Enter your password"
					/>
				</div>
				<div class="flex items-center justify-between">
					<label class="flex items-center">
						<input type="checkbox" bind:checked={showPassword} class="mr-2" />
						Show password
					</label>
					<a href="/forgot-password" class="text-sm hover:underline">Forgot Password?</a>
				</div>
				<button
					type="submit"
					class="w-full bg-[#663300] text-white py-2 px-4 rounded-md hover:bg-[#8B4513] transition-colors duration-300"
				>
					Login
				</button>
			</form>
		</div>
		<p class="mt-8 text-center">
			Don't have an account?
			<a href="/Signup" class="font-bold hover:underline">Sign up</a>
		</p>
	</div>
</div>
