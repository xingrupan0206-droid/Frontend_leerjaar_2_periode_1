// Link maakt navigatie tussen pagina's mogelijk; useLocation leest gegevens van de vorige pagina.
import { Link, useLocation } from 'react-router-dom'
// useState bewaart het gekozen team terwijl deze pagina geopend is.
import { useState } from 'react'
// Hergebruik de bestaande team-header.
import Header from '../components/Header_TM'
// Deze component haalt Pokémon op en toont ze met een Toevoegen-knop.
import PokemonList from '../components/PokemonList'
// Styling voor de Pokémon toevoegen-pagina.
import '../css/PokemonToevoegen.css'

// Een team kan maximaal zes Pokémon bevatten.
const MAX_TEAM_SIZE = 6

// Pagina waarop de gebruiker Pokémon aan het huidige team kan toevoegen.
function PokemonToevoegen() {
    // Lees de teamgegevens die Team Maken via de route heeft meegestuurd.
    const location = useLocation()

    // Bewaar de Pokémon die al in het team zitten en werk de lijst bij na toevoegen.
    const [teamPokemons, setTeamPokemons] = useState(() =>
        location.state?.teamPokemons || [],
    )

    // Bewaar de teamnaam zodat die ongewijzigd teruggaat naar Team Maken.
    const teamName = location.state?.teamName ?? ''

    // Voeg de aangeklikte Pokémon toe als er nog plek is in het team.
    function addPokemon(pokemon) {
        // Gebruik de huidige state zodat toevoegen met de nieuwste lijst gebeurt.
        setTeamPokemons((currentPokemons) => {
            // Stop met toevoegen zodra het team zes Pokémon bevat.
            if (currentPokemons.length >= MAX_TEAM_SIZE) {
                return currentPokemons
            }

            // Maak een nieuwe array met alle huidige Pokémon en de nieuwe keuze.
            return [...currentPokemons, pokemon]
        })
    }

    // Render de header, Pokémonlijst, teamteller en terugnavigatie.
    return (
        <>
            {/* Bestaande header van de team-pagina's. */}
            <Header />
            <main className="pokemon-add-page">
                {/* Titel en huidige teamgrootte. */}
                <div className="pokemon-add-page__topline">
                    <h1>Pokémon toevoegen</h1>
                    <p>Kies een Pokémon om aan je team toe te voegen.</p>
                    <p className="pokemon-add-page__count">
                        {teamPokemons.length}/{MAX_TEAM_SIZE} Pokémon in je team
                    </p>
                </div>

                {/* Geef de toevoegfunctie en de limietstatus door aan de Pokémonlijst. */}
                <PokemonList
                    onAddPokemon={addPokemon}
                    disabled={teamPokemons.length >= MAX_TEAM_SIZE}
                />

                {/* Navigatie onderaan de pagina. */}
                <nav className="pokemon-add-page__nav" aria-label="Paginanavigatie">
                    {/* Stuur het bijgewerkte team en de teamnaam terug naar Team Maken. */}
                    <Link
                        className="pokemon-card__add pokemon-add-page__back"
                        to="/Teammaken"
                        state={{ teamPokemons, teamName }}
                    >
                        Terug
                    </Link>
                </nav>
            </main>
        </>
    )
}

// Maak deze pagina beschikbaar voor de router.
export default PokemonToevoegen
