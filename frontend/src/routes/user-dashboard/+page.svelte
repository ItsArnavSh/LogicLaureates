<style>

</style>
<script>
import Navbar from "../../commonComponents/Navbar.svelte"
import {token} from '../../writeables/authWriteables'
import {getPublishedLands} from '../../services/operations/land'

$:lands = null;

async function fetchLands(){
    lands = await getPublishedLands($token);
    console.log(lands);
}

fetchLands();

</script>
<Navbar />
<div class = "w-[100vw] flex flex-col items-center justify-center w-full">
    <div class = "flex flex-row p-5 items-center">
        <div class = "p-4">
            <a href = "/options"><button class = "kalara text-white bg-black rounded-md p-4 m-4 mt-10 text-2xl">Nearby Locations</button></a>
        </div>
        <div class = "p-4">
            <a href = "/rent"><button class = "kalara text-white bg-black rounded-md p-4 m-4 mt-10 text-2xl">Find Location Statewise</button></a>
        </div>

    </div>
    <h1 class="font-bold text-2xl mb-4">Published Lands:</h1>
    <!-- {#foreach} -->
    {#if lands === null}
        <p>Loading...</p>
        {:else}
        <div class="flex justify-evenly flex-wrap">
            {#each lands as land , i}
                <div class="flex gap-4 m-4 border-black border-3 justify-center items-center">
                    <div class="flex flex-col jusitify-evenly w-full m-1">
                        <div class = "">{land.propertyName}</div>
                        <div>State: {land.state}</div>
                        <div>City: {land.city}</div>
                        <div>Monthly Price: {land.monthlyPrice}</div>
                        <button class = "kalara text-white bg-black rounded-md p-2 m-1 mt-10 text-xl">Buy</button>
                    </div>
                    <div>
                        <img src={land.thumbnail} class="w-[200px]" alt="">
                    </div>
                </div>
            {/each}
        </div>
    {/if}

</div>