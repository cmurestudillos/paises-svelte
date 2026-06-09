<script>
	import { onMount } from 'svelte';
	import Card, { Content } from '@smui/card';
	import Textfield from '@smui/textfield';
	import Select, { Option } from '@smui/select';
	import Button, { Label } from '@smui/button';
	import CircularProgress from '@smui/circular-progress';
	import Header from './components/Header.svelte';
	import Footer from './components/Footer.svelte';

	let allCountries = [];
	let countriesData = [];
	let loading = true;
	let error = null;
	let searchTerm = '';
	let selectedRegion = '';
	let regiones = [];

	const formatPoblacion = (pop) => {
		if (pop >= 1_000_000_000) return (pop / 1_000_000_000).toFixed(1) + 'B';
		if (pop >= 1_000_000) return (pop / 1_000_000).toFixed(1) + 'M';
		if (pop >= 1_000) return Math.round(pop / 1_000) + 'K';
		return pop.toString();
	};

	onMount(async () => {
		try {
			const response = await fetch('https://countries-api-service.vercel.app/api/countries');
			const result = await response.json();
			const data = result.data ?? result;
			if (Array.isArray(data)) {
				allCountries = data;
				countriesData = data;
				regiones = [...new Set(data.map(c => c.region).filter(Boolean))].sort();
			}
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	});

	$: {
		const q = searchTerm.toLowerCase();
		countriesData = allCountries.filter(country => {
			const matchSearch = !searchTerm ||
				country.name.common.toLowerCase().includes(q) ||
				country.name.official.toLowerCase().includes(q) ||
				(country.capital?.[0] && country.capital[0].toLowerCase().includes(q));
			const matchRegion = !selectedRegion || country.region === selectedRegion;
			return matchSearch && matchRegion;
		});
	}

	function clearFilters() {
		searchTerm = '';
		selectedRegion = '';
	}
</script>

<Header />

<main class="main-container">
	{#if loading}
		<div class="loading-center">
			<CircularProgress style="height:56px;width:56px;" indeterminate />
			<p>Cargando países...</p>
		</div>
	{:else if error}
		<div class="error-container">
			<span class="material-icons error-icon">error_outline</span>
			<p>Error al cargar los datos: {error}</p>
		</div>
	{:else}
		<div class="filtros-bar">
			<div class="filtro-search">
				<Textfield
					bind:value={searchTerm}
					label="Buscar país o capital..."
					variant="outlined"
					style="width: 100%;" />
			</div>
			<div class="filtro-region">
				<Select
					bind:value={selectedRegion}
					label="Región"
					variant="outlined"
					style="width: 100%;">
					<Option value="">Todas las regiones</Option>
					{#each regiones as region}
						<Option value={region}>{region}</Option>
					{/each}
				</Select>
			</div>
			<Button
				on:click={clearFilters}
				variant="outlined"
				disabled={!searchTerm && !selectedRegion}>
				<Label>Limpiar</Label>
			</Button>
			<span class="resultado-contador">
				<strong>{countriesData.length}</strong> / {allCountries.length} países
			</span>
		</div>

		{#if countriesData.length === 0}
			<div class="no-resultados">
				<span class="material-icons" style="font-size:3rem;color:#FC4A1A;">search_off</span>
				<h3>No se encontraron países</h3>
				<p>Intenta con otros términos o cambia los filtros.</p>
				<Button on:click={clearFilters} variant="raised">
					<Label>Limpiar filtros</Label>
				</Button>
			</div>
		{:else}
			<div class="paises-grid">
				{#each countriesData as country (country.cca3)}
					<Card class="country-card">
						<div class="card-media">
							<img
								src={country.flags?.svg}
								alt={country.flags?.alt || country.name.common}
								class="flag-img"
								loading="lazy" />
						</div>
						<Content class="card-body-content">
							<h3 class="country-name">{country.name.common}</h3>
							<p class="country-official">{country.name.official}</p>
							<div class="pais-badges">
								{#if country.capital?.length}
									<span class="badge badge-capital">{country.capital[0]}</span>
								{/if}
								<span class="badge badge-pop">{formatPoblacion(country.population)}</span>
								<span class="badge badge-region">{country.region}</span>
								<span class="badge badge-code">{country.cca3}</span>
							</div>
						</Content>
					</Card>
				{/each}
			</div>
		{/if}
	{/if}
</main>

<Footer />

<style>
	.main-container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 88px 1.5rem 2rem;
	}

	/* Loading */
	.loading-center {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		padding: 5rem 2rem;
		color: #FC4A1A;
	}

	.loading-center p {
		margin: 0;
		font-size: 0.95rem;
		color: #666;
	}

	/* Error */
	.error-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		padding: 4rem 2rem;
		color: #d32f2f;
		text-align: center;
	}

	.error-icon {
		font-size: 2.5rem !important;
	}

	/* Filtros */
	.filtros-bar {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem 1.25rem;
		background: #ffffff;
		border: 1px solid rgba(252, 74, 26, 0.15);
		border-radius: 12px;
		box-shadow: 0 2px 12px rgba(252, 74, 26, 0.08);
		margin-bottom: 1.75rem;
	}

	.filtro-search {
		flex: 1 1 240px;
		min-width: 200px;
	}

	.filtro-region {
		min-width: 180px;
	}

	.resultado-contador {
		margin-left: auto;
		font-size: 0.82rem;
		color: #666;
		white-space: nowrap;
	}

	.resultado-contador strong {
		color: #FC4A1A;
		font-weight: 600;
	}

	/* Grid */
	.paises-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(265px, 1fr));
		gap: 1.25rem;
		align-items: start;
	}

	/* Cards — usando :global porque SMUI inyecta el elemento */
	:global(.country-card) {
		height: 100% !important;
		border-radius: 12px !important;
		overflow: hidden !important;
		transition: transform 0.25s ease, box-shadow 0.25s ease !important;
		border: 1px solid rgba(0, 0, 0, 0.08) !important;
	}

	:global(.country-card:hover) {
		transform: translateY(-5px) !important;
		box-shadow: 0 16px 40px rgba(252, 74, 26, 0.18) !important;
	}

	.card-media {
		line-height: 0;
		overflow: hidden;
	}

	.flag-img {
		width: 100%;
		height: 155px;
		object-fit: cover;
		display: block;
		transition: transform 0.3s ease;
	}

	:global(.country-card:hover) .flag-img {
		transform: scale(1.04);
	}

	:global(.card-body-content) {
		padding: 0.9rem !important;
	}

	.country-name {
		font-size: 1rem;
		font-weight: 600;
		margin: 0 0 0.2rem;
		color: #1a1a1a;
		line-height: 1.4;
	}

	.country-official {
		font-size: 0.72rem;
		color: #888;
		margin: 0 0 0.75rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		line-height: 1.4;
	}

	.pais-badges {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
	}

	.badge {
		display: inline-flex;
		align-items: center;
		padding: 0.25rem 0.6rem;
		border-radius: 999px;
		font-size: 0.68rem;
		font-weight: 500;
		line-height: 1;
		white-space: nowrap;
	}

	.badge-capital {
		background: rgba(5, 150, 105, 0.1);
		color: #059669;
		border: 1px solid rgba(5, 150, 105, 0.25);
	}

	.badge-pop {
		background: rgba(252, 74, 26, 0.1);
		color: #c23300;
		border: 1px solid rgba(252, 74, 26, 0.25);
	}

	.badge-region {
		background: rgba(247, 183, 51, 0.15);
		color: #b45309;
		border: 1px solid rgba(247, 183, 51, 0.35);
	}

	.badge-code {
		background: rgba(0, 0, 0, 0.05);
		color: #666;
		border: 1px solid rgba(0, 0, 0, 0.1);
		letter-spacing: 0.06em;
		font-family: 'Consolas', monospace;
	}

	/* Sin resultados */
	.no-resultados {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		padding: 4rem 2rem;
		text-align: center;
		color: #666;
	}

	.no-resultados h3 {
		margin: 0;
		color: #333;
	}

	.no-resultados p { margin: 0; }

	/* Responsive */
	@media (max-width: 640px) {
		.filtros-bar {
			flex-direction: column;
			align-items: stretch;
		}

		.resultado-contador {
			text-align: center;
			margin-left: 0;
		}

		.paises-grid {
			grid-template-columns: 1fr;
		}
	}
</style>