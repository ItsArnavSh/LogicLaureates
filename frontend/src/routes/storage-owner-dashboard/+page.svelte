<script>
	import { onMount } from 'svelte';
    import Navbar from '../../commonComponents/Navbar.svelte'
    import {token} from '../../writeables/authWriteables'
    import {pendingProperties} from '../../services/operations/land'

    let pendingLands;
    onMount(async()=>{
        pendingLands = await pendingProperties($token);
        console.log(pendingLands);
        //approvedProperties(token);
    })
</script>


<div class="flex gap-12 flex-col items-center">
    <Navbar/>
    <h1 class="font-bold text-3xl font-mono">Dashboard</h1>
    <a href="/apply"><button class="px-6 py-4 bg-black text-white rounded-md hover:scale-95 hover:bg-white hover:text-black transition-all duration-200 shadow-md">Create</button></a>
    <h2>Pending for review</h2>
    <div></div>
    <h2>Approved Properties</h2>
</div>