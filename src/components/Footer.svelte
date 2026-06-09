<footer>
    <div class="footer-inner">
        <p class="footer-copy">
            Copyright &copy; 2026 — Designed and Created by <strong>Carlos Mur</strong>
        </p>
        <p class="footer-stack">
            Svelte 3 &middot; Svelte Material UI 6 &middot; REST Countries API
        </p>
    </div>
</footer>

<style>
    footer {
        background: linear-gradient(to right, #FC4A1A, #F7B733);
        color: white;
        width: 100%;
        min-height: 90px;
    }

    .footer-inner {
        max-width: 1400px;
        margin: 0 auto;
        padding: 1.25rem 1.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
        text-align: center;
    }

    .footer-copy {
        margin: 0;
        font-size: 0.9rem;
        font-weight: 500;
    }

    .footer-stack {
        margin: 0;
        font-size: 0.78rem;
        opacity: 0.85;
        letter-spacing: 0.02em;
    }
</style>
