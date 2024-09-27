<script>
	import Button from './button.svelte';
</script>

<div class="">
	<div class="flex flex-row w-full">
		<div class="p-10 text-5xl coda flex flex-col items-left center">
			<p class="coda">Storage for your Goods</p>
			<p class="pt-5">Cheap, Safe and Personalized.</p>
			<div class="flex flex-row mt-20">
				<Button />
			</div>
		</div>
		<div class="d3 flex flex-row items-end flex-grow justify-center">
			<img src="boxes.png" alt="boxes" class="" width="600" />
		</div>
	</div>
</div>

<style>
	.d3 {
		height: 700px;
		width: 700px;
	}
	.center {
		position: relative;
		top: 15%;
	}
</style>
