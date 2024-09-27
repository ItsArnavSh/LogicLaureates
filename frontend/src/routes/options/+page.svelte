<script>
	import { question } from '../../writeables/preferences.js';
	import { preference } from '../../writeables/preferences.js';

	let questions;
	let answers;
	let state = 0;

	question.subscribe((value) => {
		questions = value;
	});

	preference.subscribe((value) => {
		answers = value;
	});

	let i = 0;

	function choice() {
		$preference[i] = true;
		preference.set($preference);
		nextOne();
	}

	function mcq() {
		$preference[i] = state;
		preference.set($preference);
		nextOne();
	}

	function nextOne() {
		i++;
		console.log(answers);
	}

	let inputValue = '';

	function handleSubmit() {
		$preference[i] = inputValue;
		preference.set($preference);
		console.log(inputValue);
		nextOne();
	}
</script>

<div class="min-h-screen bg-[#00264d] flex items-center justify-center text-white">
	<div class="w-full max-w-2xl">
		<h1 class="text-5xl font-bold italic mb-8 text-center">Ampl</h1>
		<div class="bg-white/10 backdrop-blur-md rounded-lg p-8 shadow-lg">
			<h2 class="text-3xl font-bold mb-6 text-center">{questions[i][0]}</h2>

			{#if i + 1 < questions.length}
				{#if questions[i][1] == 0}
					<div class="flex justify-center space-x-4">
						<button
							on:click={choice}
							class="bg-[#663300] text-white py-2 px-6 rounded-md hover:bg-[#8B4513] transition-colors duration-300 text-xl"
						>
							Yes
						</button>
						<button
							on:click={nextOne}
							class="bg-gray-600 text-white py-2 px-6 rounded-md hover:bg-gray-700 transition-colors duration-300 text-xl"
						>
							Skip
						</button>
					</div>
				{:else if questions[i][1] == 1}
					<form on:submit|preventDefault={handleSubmit} class="flex flex-col items-center">
						<input
							bind:value={inputValue}
							type="text"
							placeholder="Enter your answer"
							class="w-full px-3 py-2 bg-white/20 rounded-md placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 mb-4 text-xl"
						/>
						<button
							type="submit"
							class="bg-[#663300] text-white py-2 px-6 rounded-md hover:bg-[#8B4513] transition-colors duration-300 text-xl"
						>
							Submit
						</button>
					</form>
				{:else if questions[i][1] == 2}
					<form class="flex flex-col items-center">
						<select
							bind:value={state}
							required
							class="w-full px-3 py-2 bg-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 mb-4 text-xl"
						>
							<option disabled selected value="">Select an option</option>
							{#each questions[i][3] as stateOption}
								<option>{stateOption}</option>
							{/each}
						</select>
						{#if state != undefined && state != 0}
							<button
								type="submit"
								on:click={mcq}
								class="bg-[#663300] text-white py-2 px-6 rounded-md hover:bg-[#8B4513] transition-colors duration-300 text-xl"
							>
								Continue
							</button>
						{/if}
					</form>
				{/if}
			{:else}
				<div class="flex justify-center">
					<a href="../rent">
						<button
							class="bg-[#663300] text-white py-2 px-10 rounded-md hover:bg-[#8B4513] transition-colors duration-300 text-xl"
						>
							GO
						</button>
					</a>
				</div>
			{/if}

			<p class="mt-4 text-center text-sm text-white/70">(You can edit these later)</p>
		</div>
	</div>
</div>
