<style>
    .ampl
    {
        font-size: 200px;
        position:fixed;
        top:30%;
        left:40%;
        padding:10px
    }
    .main
    {
        height:200vh; /* Make the main div scrollable */
        position:relative;
    }
    .navbar
    {
        position:fixed;
        opacity: 0;
        left:65%;
        top:8%;
        font-size:25px;
        transition-duration: 500ms;
    }
    .content
    {
        opacity : 0%;
        position:fixed;
        top:35%;
        left:10%;
        transition-duration: 1000ms;
    }
</style>
<script>
    import Intro from "./intro.svelte";
    import { onMount } from 'svelte';
    let ampl
    let navbar
    let content
    let value = 0
    onMount(() => {
    window.addEventListener('scroll',() => {
        value = window.scrollY;
        console.log(value);
        if(ampl){
            if(value<600){
                navbar.style.opacity = 0
                content.style.opacity = 0;
        ampl.style.top = `${320-value * 0.5}px`;
        ampl.style.left = `${700-value * 0.9}px`;
    
    }
    else{
        ampl.style.top =  `${0}`;
        ampl.style.left = `${5}%`;
        navbar.style.opacity=50;
        content.style.opacity = 100;
    }
    ampl.style.fontSize = `${200 - value * 0.1}px`;
    }
        
    })
});
</script>
<div class = "main">
    <div>
        <h1 class = "caveat ampl" bind:this={ampl}>Ampl</h1>
    </div>
    <nav class = "navbar karla" bind:this={navbar}>
    <p class = "space-x-5">
        <a href = "./rent">Rent</a>
        
        <a href = ./apply>Apply</a>
        
        <a href = ./about>About</a>
    </p>

    </nav>
    <div class = "content w-full" bind:this={content}>
        <Intro />
    </div>
</div>