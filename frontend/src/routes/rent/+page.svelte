<script>
  import {preference,question} from "../../writeables/preferences"
	import Button from "../button.svelte";
  import Option from "./sampleRent.svelte"
  let answers,questions;
  preference.subscribe((value)=>{answers = value;})
  question.subscribe((value)=>{questions = value;})
  let locations = [
    {state : false,name:"sample1"},
    {state : false,name:"sample2"},
    {state : false,name:"sample3"},
    {state : false,name:"sample4"},
    {state : false,name:"sample5"},
    {state : false,name:"sample6"},
  ];
</script>
<style>

</style>
<div class = "flex flex-col items-center w-[100vw]">
  <p class = "caveat text-8xl p-7">
    Choose your Vault
  </p>
  <div class = "w-[80vw] border-t-4 border-b-4 p-4 text-2xl border-black flex flex-col items-start karla">
    {#each questions as ques,i}
    {#if ques[2]!=undefined}
    {#if ques[1]===0}
    <label >
      <span class = "">{ques[2]}:</span>
      <span class = "">
        <input type="checkbox" bind:checked={ answers[i]} on:change={() => {$preference[i] = answers[i]; preference.set($preference);}}>
      </span>
    </label>
    {:else if ques[1]==2}
      <span class = "">{ques[2]} : {answers[i]}</span>
    {:else}
    <div class = "flex flex-row">
      {ques[2]}:
<input type="text" bind:value={answers[i]} on:input={() => {$preference[i] = answers[i]; preference.set($preference);}} class />
   
    </div>
     {/if}
    {/if}
    {/each}
  </div>
</div>
<div class = "flex flex-col items-center mt-10">
<div class = "w-[80vw]">
  {#each locations as position}
  <Option {...position}/>
  {/each}
</div>
</div>