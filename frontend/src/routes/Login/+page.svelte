<script>

    import { onMount, createEventDispatcher } from 'svelte';

    export let email = ''; 
    export let password = '';
    let dispatch = createEventDispatcher();


    function handleChange(event) {
    email = event.target.value;
    password = event.target.value
    dispatch('change', { value });
    }

</script>

<div class="w-[100vw] h-[100vh] flex flex-col items-center">
    <div class="bg-[#CBCDA9] h-[20%] w-full"></div>
    <form>

    </form>
</div>
