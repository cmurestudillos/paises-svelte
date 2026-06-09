<nav>
    <div class="nav-inner">
        <a href="/" class="nav-brand">
            <img src="/assets/img/logo.png" width="44" height="44" alt="Países" />
            <span>Países del Mundo</span>
        </a>
    </div>
</nav>

<style>
    nav {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 1000;
        background: linear-gradient(to right, #FC4A1A, #F7B733);
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
    }

    .nav-inner {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0.65rem 1.5rem;
        display: flex;
        align-items: center;
    }

    .nav-brand {
        display: flex;
        align-items: center;
        gap: 0.65rem;
        text-decoration: none;
        color: #ffffff;
    }

    .nav-brand img {
        border-radius: 8px;
        object-fit: contain;
    }

    .nav-brand span {
        font-size: 1.15rem;
        font-weight: 700;
        letter-spacing: 0.01em;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }
</style>