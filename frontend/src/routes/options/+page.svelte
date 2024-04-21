<script>
import {question} from '../../writeables/preferences.js';
import {preference} from '../../writeables/preferences.js';
let questions;
let answers;
let state=0;
question.subscribe((value) => {
    questions = value;
  });
  preference.subscribe((value)=>{answers = value;})
let i=0;
function choice() {
  $preference[i] = true;
  preference.set($preference);
  nextOne();
}
function mcq()
{
  $preference[i] = state;
  preference.set($preference);
  nextOne();
}
function nextOne()
{
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
<style>

</style>
<div class = " flex items-center justify-center h-[100vh] w-[100vw]">
<div class = "flex flex-col h-[50vh] border border-black border-8 w-[80vw] rounded-md text-center">
<p class = "text-5xl outfit p-10">{questions[i][0]}</p>
{#if i+1<questions.length}
{#if questions[i][1]==0}
<button on:click={choice} class = "kalara text-white bg-black rounded-md  p-4 m-4 mt-10 text-2xl">Yes</button>
<button on:click={nextOne} class = "kalara text-white bg-black rounded-md  p-4 m-4 mt-10 text-2xl">Skip</button>
{:else if questions[i][1]==1}
<form on:submit|preventDefault={handleSubmit}>
    <input bind:value={inputValue} type="text" placeholder="Enter something" class = "kalara text-white bg-black rounded-md  p-4 m-4 mt-10 text-2xl">
    <button type="submit">Submit</button>
  </form>
  {:else if questions[i][1]==2}
  <form>
  <div class="form-control h-[50px]">
    <label for="state" class = "karla"></label>
    <select id="state" bind:value={state} required>
      <option disabled selected value="" class = "text-xl w-10">Select</option>
      {#each questions[i][3] as stateOption (stateOption)}
        <option class = "kalra">{stateOption}</option>
      {/each}
    </select>
  </div>
  { #if state!=undefined}
      <button type="submit" class = "kalara text-white bg-black rounded-md p-4 m-4 mt-10 text-2xl" on:click={state==0?"":mcq}>Continue</button>
      {/if}
    </form>
{/if}
{:else}
<a href = "../rent"><button class = "kalara text-white bg-black rounded-md pl-10 pr-10 p-4 m-4 mt-10 text-2xl">GO</button></a>
{/if}
<p>(You can edit these later)</p>
</div>
</div>