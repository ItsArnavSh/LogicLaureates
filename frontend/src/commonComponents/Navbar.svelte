<script>
	import { user } from '../writeables/authWriteables';
</script>

<div class="flex justify-between py-4 px-6 border-b-2 shadow-md border-b-black items-center w-full">
	<h1 class="font-bold font-Karla">Welcome {$user.firstName} {$user.lastName}</h1>
	<a href="/" class="caveat text-4xl flex-grow text-center">Ampl</a>
	<a href="/Profile"><img class="rounded-full w-6" src={$user.profileImage} alt="profileImage" /></a
	>
</div>
