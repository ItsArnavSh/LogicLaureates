<script>
  import {preference,question} from "../../writeables/preferences"
	import Button from "../button.svelte";
  import Option from "./sample.svelte"
  import navbar from "../../commonComponents/Navbar.svelte"
	import Navbar from "../../commonComponents/Navbar.svelte";
  import {pendingProperties} from '../../services/operations/land'
  import {token} from '../../writeables/authWriteables'
  let answers,questions;
  preference.subscribe((value)=>{answers = value;})
  question.subscribe((value)=>{questions = value;})
  $:locations = null;
  const fetchProperties = async()=>{
    locations = await pendingProperties($token);
  }
  fetchProperties();
</script>
<style>

</style>
{#if locations === null}
  <p>Loading...</p>
  {:else}
  <Navbar />
  <div class = "flex flex-col items-center w-[100vw]">
    <p class = "caveat text-8xl p-7">
      Admin Dashboard
    </p>
    <div class = "w-[80vw] border-t-4 border-b-4 p-4 text-2xl border-black flex flex-col items-start karla">
      
    </div>
  </div>
  <div class = "flex flex-col items-center mt-10">
  <div class = "w-[80vw]">
    {#each locations as position}
    <Option {...position}/>
    {/each}
  </div>
  </div>
{/if}
