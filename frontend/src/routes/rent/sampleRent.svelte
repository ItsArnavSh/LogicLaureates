<script>
    export let state = false;
    export let name;
    let size = {width: '20vw', height: '30vh'};
  
    function toggleSize() {
        if(!state){
            state = !state;
            size = {width: '80vw', height: '200vh'};
            let exp = document.getElementsByClassName(name)[0];
            exp.style.position = "absolute";
            exp.style.zIndex = "100";
            exp.style.top = "4%";
            exp.style.left = "10%";
        }
    }

    function shrink(){
        state = !state;
        size = {width: '20vw', height: '30vh'};
        let exp = document.getElementsByClassName(name)[0];
        exp.style.position = "relative";
        exp.style.zIndex = "0";
        exp.style.top = "auto";
        exp.style.left = "auto";
    }
</script>
  
<style>
  .pos
  {
    transition-duration: 100ms;
    background-color: white;
    position: relative;
  }
</style>
  
<button on:click={toggleSize} on:dblclick={shrink}>
  <div class="border border-black pos rounded-md {name}" style="height: {size.height}; width: {size.width};">
    {#if state}
    <p>Double Click to Shrink</p>
    Hello
    {:else}
    Hello Again
    {/if}
  </div>
</button>