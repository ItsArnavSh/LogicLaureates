<script>
  import {user , token} from '../../writeables/authWriteables'
  import {goto} from '$app/navigation'
  import {createLand} from '../../services/operations/land'
  let address = '';
  let propertyName = '';
  let access = '';
  let space = '';
  let additionalImages = [];
  let videos = [];
  let propertyPapers = [];
  let city = '';
  let state = '';
  let dailyPrice = 0;
  let weeklyPrice = 0;
  let monthlyPrice = 0;
  let yearlyPrice = 0;
  let thumbnail = [];
  let type = '';
  let description = '';
  let zipCode = '';
  const statesOfIndia = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Delhi', 'Lakshadweep', 'Puducherry'
  ];
  console.log($user);
  function handleSubmit() {
    const data = { address, space, thumbnail,  zipCode , propertyPapers ,state ,city, type,description , access , propertyName,dailyPrice,monthlyPrice,weeklyPrice,yearlyPrice};
    console.log(data);
    createLand($token , data);
    goto('/storage-owner-dashboard');

    //data can be sent to backend
  }
  const preferenceOptions = ['Cold Storage', 'Warehouse', 'Normal Room'];

  function handlePreferenceChange(event) {
    type = Array.from(event.target.selectedOptions, option => option.value);
  }

  function accessChange(event){
    access = event.target.value;
  }

  function handleDocFileChange(event){
    propertyPapers = event.target.files[0];
  }
  function handleFileChange(event) {
    thumbnail = event.target.files[0];
  }
</script>
<style>
      .form-control {
    margin-bottom: 1em;
    font-size: 20px;
  }
</style>
{#if $user === null}
  {goto('Login')}
  {:else if $user.accountType !== "Storage Owner"}
  <div class="flex items-center justify-center h-screen w-screen">
    <p class="font-bold">This Route is protected for Storage Owners</p>
  </div>
  {:else}
  <div class = "flex flex-col items-center w-[100vw]">
    <p class = "caveat text-8xl p-7">
        Register Your Property
      </p>
<form on:submit|preventDefault={handleSubmit}>

  <div class="form-control">
    <label for="propName">Enter your Property Name: </label>
    <input id="propName" bind:value={propertyName} required>
  </div>

    <div class="form-control">
        <label for="state">Choose your State: </label>
        <select id="state" bind:value={state} required>
          <option disabled selected value="">Select</option>
          {#each statesOfIndia as stateOption (stateOption)}
            <option>{stateOption}</option>
          {/each}
        </select>
      </div>
      
      <div class="form-control">
        <label for="address">Enter your City: </label>
        <input id="city" bind:value={city} required>
      </div>

      <div class="form-control">

        <select name="" id="" required on:change={accessChange}>
          <option value="" disabled selected>Enter Access Frequency</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>


    <div class="form-control">
      <label for="address">Enter your Complete Address</label>
      <input id="address" bind:value={address} required>
    </div>

  
    <div class="form-control">
      <label for="area">What is the Approximate Area</label>
      <input id="area" bind:value={space} required>
    </div>
  
    <div class="form-control">
      <label for="files">Image of the property</label>
      <input id="files" type="file" multiple on:change={(e) => handleFileChange(e, thumbnail)} required>
    </div>
  
    <div class="form-control">
      <label for="documents">Legal Document for Verification</label>
      <input id="documents" type="file" multiple on:change={(e) => handleDocFileChange(e, propertyPapers)} required>
    </div>
    
    <div class="form-control">
      <label>Storage Type</label>
      <div>
        <input id="shortTerm" type="radio" bind:group={type} value="Warehouse">
        <label for="shortTerm">Warehouse</label>
      </div>
      <div>
        <input id="longTerm" type="radio" bind:group={type} value="Cold Storage">
        <label for="longTerm">Cold Storage</label>
      </div>
      <div>
        <input id="longTerm" type="radio" bind:group={type} value="Normal Room">
        <label for="longTerm">Normal Room</label>
      </div>
    </div>
    <div class="form-control">
      <label for="price">Price (in Rupees per Day)</label>
      <input id="price" type="number" min="0" bind:value={dailyPrice} required>
    </div>
    <div class="form-control">
      <label for="price">Price (in Rupees per Week)</label>
      <input id="price" type="number" min="0" bind:value={weeklyPrice} required>
    </div>
    <div class="form-control">
      <label for="price">Price (in Rupees per Month)</label>
      <input id="price" type="number" min="0" bind:value={monthlyPrice} required>
    </div>


    <div class="form-control">
      <label for="price">Price (in Rupees per Year)</label>
      <input id="price" type="number" min="0" bind:value={yearlyPrice} required>
    </div>

    <div class="form-control">
      <label for="price">Zip Code</label>
      <input id="price" type="number" min="0" bind:value={zipCode} required>
    </div>

    <div class="form-control">
      <label for="additionalInfo">Additional Information</label>
      <textarea id="additionalInfo" bind:value={description}></textarea>
    </div>
    <button type="submit" class = "">Submit</button>
  </form>
</div>
{/if}
