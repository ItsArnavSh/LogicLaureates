<script>
      let address = '';
  let area = '';
  let files = [];
  let documents = [];
  let city = '';
  let state = '';
  let priceDaily = 0;
  let priceWeekly = 0;
  let priceMonthly = 0;
  let priceYearly = 0;
  let preference = '';
  let additionalInfo = '';
  const statesOfIndia = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Delhi', 'Lakshadweep', 'Puducherry'
  ];
  function handleSubmit() {
    const data = { address, area, files, documents ,state ,city, preference,additionalInfo,priceDaily,priceMonthly,priceWeekly,priceYearly};
    console.log(data);
    //data can be sent to backend
  }
  const preferenceOptions = ['Long term storage', 'Short term storage', 'Climate controlled', '24/7 access', 'Drive up access'];

  function handleFileChange(event, target) {
    target.push(...event.target.files);
  }
</script>
<style>
      .form-control {
    margin-bottom: 1em;
    font-size: 20px;
  }
</style>
<div class = "flex flex-col items-center w-[100vw]">
    <p class = "caveat text-8xl p-7">
        Register Your Property
      </p>
<form on:submit|preventDefault={handleSubmit}>
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
      <label for="address">Enter your Complete Address</label>
      <input id="address" bind:value={address} required>
    </div>

  
    <div class="form-control">
      <label for="area">What is the Approximate Area</label>
      <input id="area" bind:value={area} required>
    </div>
  
    <div class="form-control">
      <label for="files">Images/Videos of the property</label>
      <input id="files" type="file" multiple on:change={(e) => handleFileChange(e, files)} required>
    </div>
  
    <div class="form-control">
      <label for="documents">Legal Documents for Verification</label>
      <input id="documents" type="file" multiple on:change={(e) => handleFileChange(e, documents)} required>
    </div>
    
    <div class="form-control">
      <label>Storage Duration</label>
      <div>
        <input id="shortTerm" type="radio" bind:group={preference} value="Short term storage">
        <label for="shortTerm">Short term storage</label>
      </div>
      <div>
        <input id="longTerm" type="radio" bind:group={preference} value="Long term storage">
        <label for="longTerm">Long term storage</label>
      </div>
    </div>
    <div class="form-control">
      <label for="price">Price (in Rupees per Day)</label>
      <input id="price" type="number" min="0" bind:value={priceDaily} required>
    </div>
    <div class="form-control">
      <label for="price">Price (in Rupees per Week)</label>
      <input id="price" type="number" min="0" bind:value={priceWeekly} required>
    </div>
    <div class="form-control">
      <label for="price">Price (in Rupees per Month)</label>
      <input id="price" type="number" min="0" bind:value={priceMonthly} required>
    </div>
    <div class="form-control">
      <label for="price">Price (in Rupees per Year)</label>
      <input id="price" type="number" min="0" bind:value={priceYearly} required>
    </div>
    <div class="form-control">
      <label for="additionalInfo">Additional Information</label>
      <textarea id="additionalInfo" bind:value={additionalInfo}></textarea>
    </div>
    <button type="submit" class = "">Submit</button>
  </form>
</div>