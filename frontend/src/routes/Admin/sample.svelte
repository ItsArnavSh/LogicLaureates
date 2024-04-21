<script>
    export let state;
    export let propertyName;
    export let propertyPapers;
    export let monthlyPrice;
    export let access;
    export let thumbnail;
    export let _id;
    import {token} from '../../writeables/authWriteables'
    import {storageApproval} from '../../services/operations/admin'
    
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

    async function rejetcApprove(response){
      await storageApproval(response , _id , $token);

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
  
<button on:dblclick={shrink}>
  <div class="border border-black pos rounded-md {name}" style="height: {size.height}; width: {size.width};">
    {#if state}
    <p>Double Click to Shrink</p>
    
    {:else}
    <div>
      <h1>{propertyName}</h1>
      <img src={thumbnail} alt="">
    </div>
      <div>
        <div>
          <h1>{propertyName}</h1>
          <p>{state}</p>
          <p>Monthly Price: {monthlyPrice}</p>
          <p>Access: {access}</p>
          <div>
            <button on:click={()=>rejetcApprove(1)}>Approve</button>
            <button on:click={()=>rejetcApprove(0)}>Reject</button>
          </div>
        </div>
          <div>
            <h2>Legal Document:</h2>
            <img src={propertyPapers} alt="">
          </div>
      </div>

    {/if}
  </div>
</button>