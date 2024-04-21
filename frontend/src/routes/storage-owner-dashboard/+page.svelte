<script>
	import { onMount } from 'svelte';
    import Navbar from '../../commonComponents/Navbar.svelte'
    import {token} from '../../writeables/authWriteables'
    import {pendingProperties} from '../../services/operations/land'

    $:pendingLands = null;
    const fetchLands = async()=>{
        pendingLands = await pendingProperties($token);
        console.log(pendingLands);
    }

    fetchLands();
</script>

{#if pendingLands === null}
    <div>Loading...</div>
    {:else}
    <div class="flex gap-12 flex-col items-center w-full">
        <Navbar/>
        <h1 class="font-bold text-3xl font-mono">Dashboard</h1>
        <a href="/apply"><button class="px-6 py-4 bg-black text-white rounded-md hover:scale-95 hover:bg-white hover:text-black transition-all duration-200 shadow-md">Create</button></a>
        <h2>Pending for review</h2>
        <div class="flex w-[500px] justify-evenly">
            {#each pendingLands as pl ,i}
                <div class=" border-2 border-black shadow-md hover:scale-95">
                    <div>
                        <h1>{pl.propertyName}</h1>
                        <p>{pl.description}</p>
                        <p>Monthly Price: {pl.monthlyPrice}</p>
                        <div class="flex justify-between w-full">
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>
                    </div>
                    <div>
                        <img src={pl.thumbnail} alt="">
                    </div>
                </div>
            {/each}
        </div>
        
        <h2>Approved Properties</h2>
    </div>
{/if}
