<script>
    import {sendOtp , signup} from '../../services/operations/auth'

    let email = '';
    let password = '';
    let confirmPassword = '';
    let firstName = '';
    let lastName = '';
    let accountType = '';
    let otp = '';

    function accountChange(){
        accountType = document.getElementById('accountType').value;
    }
    function otpHandler(){
        console.log(email);
        sendOtp(email);
    }
 
    function submitHandler(){


        signup({
            email,
            password,
            confirmPassword,
            firstName,
            lastName,
            accountType,
            otp
        });
    }

</script>

<div class="w-[100vw] h-full flex flex-col items-center gap-9 overflow-x-hidden">
    <div class="bg-[#CBCDA9] h-[20%] w-full overflow-x-hidden"></div>
    <a href="/Login" class=" ml-auto mr-20 font-bold underline">Already have an acccount?</a>
    <h1 class="font-bold text-8xl">Signup</h1>
    <form class="flex flex-col w-full items-center gap-7 overflow-x-hidden" on:submit|preventDefault={submitHandler}>
        <select name="accountType" id="accountType" class="bg-[#CBCDA9] w-[30%] h-[50px] font-bold pl-4 text-2xl " on:change={accountChange} >
            <option value="" disabled selected class="">Select Account Type</option>
            <option value="Storage Owner" class="font-bold pl-4 text-2xl">Storage Owner</option>
            <option value="Renter" class="font-bold pl-4 text-2xl">User</option>
            <option value="Admin" class="font-bold pl-4 text-2xl">Admin</option>
        </select>
        <input type="text" id="firstName" placeholder="First Name" bind:value={firstName} class="bg-[#CBCDA9] w-[30%] h-[50px] placeholder:font-bold placeholder:pl-4 placeholder:text-2xl"  />
        <input type="text" id="lastName" placeholder="Last Name" bind:value={lastName} class="bg-[#CBCDA9] w-[30%] h-[50px] placeholder:font-bold placeholder:pl-4 placeholder:text-2xl"  />
        <input type="email" id="email" placeholder="Email" bind:value={email} class="bg-[#CBCDA9] w-[30%] h-[50px] placeholder:font-bold placeholder:pl-4 placeholder:text-2xl" />
        <div class="flex justify-between w-[30%]">
            <input type='text' id="otp" placeholder="OTP" bind:value={otp} class="bg-[#CBCDA9] w-[50%] h-[50px] placeholder:font-bold placeholder:pl-4 placeholder:text-2xl" />
            <button on:click={otpHandler} class="bg-[#CBCDA9]  py-2 px-4 font-bold text-2xl hover:scale-95 transition-all duration-200">Send OTP</button>
        </div>
        <input type="password" id="password" placeholder="Password" bind:value={password} class="bg-[#CBCDA9] w-[30%] h-[50px] placeholder:font-bold placeholder:pl-4 placeholder:text-2xl"  />
        <input type="password" id="confirmPassword" placeholder="Confirm Password" bind:value={confirmPassword} class="bg-[#CBCDA9] w-[30%] h-[50px] placeholder:font-bold placeholder:pl-4 placeholder:text-2xl"  />
        <button type="submit" class="bg-[#CBCDA9]  py-4 px-8 font-bold text-2xl hover:scale-95 transition-all duration-200">Signup</button>
    </form>
</div>
