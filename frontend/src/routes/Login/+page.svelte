<script>
    import {token} from '../../writeables/authWriteables';
    import {loginApi} from '../../services/operations/auth'
    
    if(token){
        // loginTokenApi(token);
    }


    let email = '';
    let password = '';

    function submitHandler(){
        loginApi(email , password);
    }
 
</script>

<div class="w-[100vw] h-[100vh] flex flex-col items-center gap-9">
    <div class="bg-[#CBCDA9] h-[20%] w-full"></div>
    <p class=" ml-auto mr-20">Create an account?  <a href="/signnup" class="font-bold underline">Signup</a></p>
    <h1 class="font-bold text-8xl">Login</h1>
    <form class="flex flex-col w-full items-center gap-7" on:submit|preventDefault={submitHandler}>
        <input type="email" id="email" placeholder="Email" bind:value={email} class="bg-[#CBCDA9] w-[30%] h-[50px] placeholder:font-bold placeholder:pl-4 placeholder:text-2xl" />
        <input type="password" id="password" placeholder="Password" bind:value={password} class="bg-[#CBCDA9] w-[30%] h-[50px] placeholder:font-bold placeholder:pl-4 placeholder:text-2xl"  />
        <div class="flex justify-between w-[30%] items-center">
            <button type="submit" class="bg-[#CBCDA9]  py-4 px-8 font-bold text-2xl">Login</button>
            <a href="/forgot-password" class="font-bold underline">Forgot Password?</a>
        </div>
    </form>
</div>
