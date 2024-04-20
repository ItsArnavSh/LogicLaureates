<script>
    export let locations = ['', 'Location 2', 'Location 3']; // replace with your actual locations
    export let selectedLocations = {};
    let dropdownOpen = false;
    $:{console.log("Checked",selectedLocations);}
  </script>
  
  <div class="dropdown">
    <button class="dropbtn" on:click={() => dropdownOpen = !dropdownOpen}>Filter</button>
    <div class="dropdown-content" class:show={dropdownOpen}>
      {#each locations as location}
        <label>
          <input type="checkbox" bind:checked={selectedLocations[location]}>
          {location}
        </label>
      {/each}
    </div>
  </div>
  
  <style>
    .dropdown {
      position: relative;
      display: inline-block;
    }
  
    .dropdown-content {
      display: none;
      position: absolute;
      min-width: 160px;
      z-index: 1;
    }
  
    .dropdown-content label {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
    }
  
    .dropdown-content.show {
      display: block;
    }
  </style>