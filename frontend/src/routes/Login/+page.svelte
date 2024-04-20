<script>
    
    let email = '';
    let password = '';

</script>

<div class="w-[100vw] h-[100vh] flex flex-col items-center">
    <div class="bg-[#CBCDA9] h-[20%] w-full"></div>
    <form>
        <label for="email">Email</label>
        <input type="email" id="email" bind:value={email} />
        <label for="password">Password</label>
        <input type="password" id="password" bind:value={password} />
    </form>
</div>
