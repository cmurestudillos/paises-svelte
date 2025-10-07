<script>
	import { onMount } from 'svelte';
	import 'bootstrap/dist/css/bootstrap.min.css';
	import Header from './components/Header.svelte';
	import Footer from './components/Footer.svelte';
	
	let allCountries = [];
	let countriesData = [];
	let loading = true;
	let error = null;
	let searchTerm = '';
	let selectedContinent = 'all';
	let continents = [];
  
	onMount(async () => {
		try {
			const response = await fetch('https://countries-api-service.vercel.app/api/countries');
			const result = await response.json();
			
			if (result.success) {
				allCountries = result.data;
				countriesData = result.data;
				
				// Extraer continentes únicos
				const continentSet = new Set();
				result.data.forEach(country => {
					if (country.continents) {
						country.continents.forEach(continent => continentSet.add(continent));
					}
				});
				continents = Array.from(continentSet).sort();
			}
			loading = false;
		} catch (err) {
			error = err.message;
			loading = false;
		}
	});

	// Función reactiva para filtrar países
	$: {
		countriesData = allCountries.filter(country => {
			// Filtro por búsqueda
			const matchesSearch = country.name.common
				.toLowerCase()
				.includes(searchTerm.toLowerCase());
			
			// Filtro por continente
			const matchesContinent = selectedContinent === 'all' || 
				(country.continents && country.continents.includes(selectedContinent));
			
			return matchesSearch && matchesContinent;
		});
	}

	function clearFilters() {
		searchTerm = '';
		selectedContinent = 'all';
	}
</script>

<Header title="Países del Mundo" />

<main>
	{#if loading}
		<div class="container text-center mt-5">
			<div class="spinner-border text-primary" role="status">
				<span class="visually-hidden">Cargando...</span>
			</div>
		</div>
	{:else if error}
		<div class="container mt-5">
			<div class="alert alert-danger" role="alert">
				Error al cargar los datos: {error}
			</div>
		</div>
	{:else}
		<!-- Barra de búsqueda y filtros -->
		<div class="container mb-4">
			<div class="filters-container">
				<div class="row g-3">
					<div class="col-md-6">
						<div class="input-group">
							<span class="input-group-text">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
									<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
								</svg>
							</span>
							<input 
								type="text" 
								class="form-control" 
								placeholder="Buscar país..."
								bind:value={searchTerm}
							>
							{#if searchTerm}
								<button 
									class="btn btn-outline-secondary" 
									type="button"
									on:click={() => searchTerm = ''}
								>
									✕
								</button>
							{/if}
						</div>
					</div>
					
					<div class="col-md-4">
						<select 
							class="form-select" 
							bind:value={selectedContinent}
						>
							<option value="all">🌍 Todos los continentes</option>
							{#each continents as continent}
								<option value={continent}>{continent}</option>
							{/each}
						</select>
					</div>
					
					<div class="col-md-2">
						<button 
							class="btn btn-outline-danger w-100" 
							on:click={clearFilters}
							disabled={searchTerm === '' && selectedContinent === 'all'}
						>
							Limpiar
						</button>
					</div>
				</div>
				
				<!-- Contador de resultados -->
				<div class="mt-3">
					<span class="badge bg-info">
						{countriesData.length} {countriesData.length === 1 ? 'país encontrado' : 'países encontrados'}
					</span>
				</div>
			</div>
		</div>

		<!-- Lista de países -->
		{#if countriesData.length > 0}
			{#each countriesData as country, index}
			<div class="container border-bottom country-item">
				<div class="accordion w-75 float-start">
					<div>
						<input type="checkbox" id={`section${index}`} class="accordion__input">
						<label for={`section${index}`} class="accordion__label">
							{country.flag} {country.name.common}
						</label>
						<div class="accordion__content">
							<div class="row g-2">
								<div class="col-md-6">
									<strong>🏛️ Capital: </strong>
									<span class="badge text-bg-success">
										{country.capital && country.capital[0] ? country.capital[0] : 'N/A'}
									</span>
								</div>
								<div class="col-md-6">
									<strong>👥 Población: </strong>
									<span class="badge text-bg-primary">
										{country.population.toLocaleString('es-ES')}
									</span>
								</div>
								<div class="col-md-6">
									<strong>🗺️ Región: </strong>
									<span class="badge text-bg-info">
										{country.region}
									</span>
								</div>
								<div class="col-md-6">
									<strong>📍 Subregión: </strong>
									<span class="badge text-bg-warning">
										{country.subregion || 'N/A'}
									</span>
								</div>
								<div class="col-md-6">
									<strong>🌍 Continente: </strong>
									<span class="badge text-bg-secondary">
										{country.continents ? country.continents.join(', ') : 'N/A'}
									</span>
								</div>
								<div class="col-md-6">
									<strong>💬 Idiomas: </strong>
									<span class="badge text-bg-dark">
										{country.languages ? Object.values(country.languages).join(', ') : 'N/A'}
									</span>
								</div>
								{#if country.currencies}
									<div class="col-12">
										<strong>💰 Moneda: </strong>
										{#each Object.entries(country.currencies) as [code, currency]}
											<span class="badge text-bg-success me-1">
												{currency.name} ({currency.symbol})
											</span>
										{/each}
									</div>
								{/if}
							</div>
						</div>
					</div>
				</div>					
				<img 
					class="float-end rounded-circle shadow border" 
					src={country.flags.svg} 
					alt={`Bandera de ${country.name.common}`}
					loading="lazy"
				>
			</div>
			{/each}
		{:else}
			<div class="container text-center mt-5">
				<div class="alert alert-warning" role="alert">
					<h5>😕 No se encontraron países</h5>
					<p>Intenta con otros términos de búsqueda o cambia los filtros.</p>
					<button class="btn btn-primary" on:click={clearFilters}>
						Limpiar filtros
					</button>
				</div>
			</div>
		{/if}
	{/if}
</main>

<Footer />

<style>
	main {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		padding: 1rem;
		margin-top: 5rem;
		margin-bottom: 5rem;
	}

	.filters-container {
		background: white;
		padding: 1.5rem;
		border-radius: 15px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}

	.country-item {
		animation: fadeIn 0.3s ease-in;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	img {
		width: 75px;
		height: 75px;
		margin-bottom: 1rem;
		object-fit: cover;
		transition: transform 0.2s;
	}

	img:hover {
		transform: scale(1.1);
	}

	.accordion {
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
		border-radius: 15px;
		overflow: hidden;
		background: linear-gradient(to right, rgb(252, 74, 26), rgb(247, 183, 51));
		margin-bottom: 1rem;
		transition: transform 0.2s;
	}

	.accordion:hover {
		transform: translateX(5px);
	}

	.accordion__label, .accordion__content {
		padding: 14px 20px;
	}

	.accordion__label {
		display: block;
		color: white;
		font-weight: bold;
		cursor: pointer;
		position: relative;
		transition: background-color 0.1s;
	}

	.accordion__label:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}

	.accordion__content {
		background: white;
		line-height: 1.6;
		font-size: 0.85em;
		display: none;
	}

	.accordion__input {
		display: none;
	}

	.accordion__input:checked ~ .accordion__content {
		display: block;
	}

	.container {
		max-width: 100%;
	}

	.input-group-text {
		background-color: #f8f9fa;
		border-right: none;
	}

	.form-control:focus {
		border-color: rgb(252, 74, 26);
		box-shadow: 0 0 0 0.2rem rgba(252, 74, 26, 0.25);
	}

	.form-select:focus {
		border-color: rgb(247, 183, 51);
		box-shadow: 0 0 0 0.2rem rgba(247, 183, 51, 0.25);
	}
</style>