<script>
  import { token } from '../writeables/authWriteables';
  import { loginTokenApi  , logout} from '../services/operations/auth';
  import { onMount } from 'svelte';

  let dashboard = '';

  onMount(() => {
    if ($token) {
      loginTokenApi($token)
        .then((response) => {
          // After login, determine which dashboard to redirect to
          const accountType = response.data.accountType;
          if (accountType === 'Admin') {
            dashboard = '/admin-dashboard';
          } else if (accountType === 'Renter') {
            dashboard = '/user-dashboard';
          } else {
            dashboard = '/storage-owner-dashboard';
          }
        })
        .catch((error) => {
          console.error('Error during login:', error);
        });
    }
  });
</script>

<div>
  {#if $token}
    <a href={dashboard}>
      <button class="kalara text-white bg-black rounded-md p-4 m-4 mt-10 text-2xl">Dashboard</button>
    </a>
    <button on:click={() => logout()} class="kalara text-white bg-black rounded-md p-4 m-4 mt-10 text-2xl">Logout</button>
  {:else}
    <a href="Login">
      <button class="kalara text-white bg-black rounded-md p-4 m-4 mt-10 text-2xl">Login</button>
    </a>
    <a href="/Signup">
      <button class="kalara text-white bg-black rounded-md p-4 m-4 mt-10 text-2xl">Get Started</button>
    </a>
  {/if}
</div>
