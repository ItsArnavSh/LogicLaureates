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
        <div class="flex w-[80vw] justify-evenly ">
            {#each pendingLands as pl ,i}
                <div class="  border-black border-4 m-2 shadow-md hover:scale-95 w-[20vw]">
                    <div class = "flex flex-col items-center p-4">
                        <h1 class = "text-xl"><b>{pl.propertyName}</b></h1>
                        <p class = "text-xl">{pl.description}</p>
                        <p class = "text-xl">Monthly Price: {pl.monthlyPrice}</p>
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
