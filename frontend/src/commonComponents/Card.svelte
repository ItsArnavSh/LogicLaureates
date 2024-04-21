<script>
    export let thumbnail;
    export let area;
    export let price;
    export let city;

</script>
<div class = "w-[20vw] p-5 border-black border-8">
    <img src = {thumbnail} class = "">
    <div class = "flex flex-col items-center">
        <p>Area:{area} sq m</p>
        <p>Price:{price}</p>
        <p>City:{city} sq m</p>
    </div>
</div>