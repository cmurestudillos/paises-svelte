<script>
    export let title;
</script>

<nav class="navbar navbar-expand-lg bg-custom">
    <div class="container-fluid">
        <img 
            class="navbar-brand" 
            src="../../../assets/img/logo.png" 
            width="64" 
            height="64" 
            alt="Países" 
            title="Países"
        >
        <div class="mx-auto">
            <h3 class="text-white mb-0">{title}</h3>
        </div>
    </div>
</nav>    

<style>
    nav {
        padding: 0.5rem;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 1000;
        background: linear-gradient(to right, rgb(252, 74, 26), rgb(247, 183, 51));
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
</style>