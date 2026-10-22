import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Header from '../components/Header_TM'
import PokemonDetails from '../components/PokemonDetails'
import '../css/TeamMaken.css'

const TEAMS_STORAGE_KEY = 'pokemon-teams'
const MAX_TEAM_SIZE = 6

function TeamMaken() {
    const location = useLocation()
    const [teamName, setTeamName] = useState(() => location.state?.teamName ?? '')
    const [teamPokemons, setTeamPokemons] = useState(() =>
        location.state?.teamPokemons || [],
    )
    const [pokemonToView, setPokemonToView] = useState(null)
    const [message, setMessage] = useState(() =>
        location.state?.addedPokemonName
            ? `${location.state.addedPokemonName} is toegevoegd aan je team.`
            : '',
    )

    function removePokemon(pokemonIndex, pokemonName) {
        setTeamPokemons((currentPokemons) =>
            currentPokemons.filter((_, index) => index !== pokemonIndex),
        )
        setMessage(`${pokemonName} is uit je team verwijderd.`)
    }

    function saveTeam(event) {
        event.preventDefault()
        const trimmedName = teamName.trim()
        const currentTeams = JSON.parse(localStorage.getItem(TEAMS_STORAGE_KEY) || '[]')

        const updatedTeams = [
            ...currentTeams,
            {
                id: Date.now(),
                name: trimmedName,
                pokemons: teamPokemons,
            },
        ]
        localStorage.setItem(TEAMS_STORAGE_KEY, JSON.stringify(updatedTeams))
        setTeamName('')
        setTeamPokemons([])
        setMessage(trimmedName ? `Team "${trimmedName}" is opgeslagen.` : 'Team is opgeslagen.')
    }

    return (
        <>
            <Header />
            <main className="team-maker">
                <div className="team-maker__topline">
                    <h1>Maak je Pokémon-team</h1>
                    <p>Kies Pokémon, geef je team een naam en sla het op voor later.</p>
                </div>

                <form className="team-maker__form" onSubmit={saveTeam}>
                    <label className="team-maker__label" htmlFor="team-name">
                        Teamnaam
                    </label>
                    <div className="team-maker__save-row">
                        <input
                            id="team-name"
                            className="team-maker__input"
                            type="text"
                            value={teamName}
                            onChange={(event) => setTeamName(event.target.value)}
                            placeholder="Bijvoorbeeld: Mijn avontuur"
                        />
                        <button
                            className="team-maker__save-button"
                            type="submit"
                        >
                            Team opslaan
                        </button>
                    </div>
                </form>

                <section className="team-maker__section" aria-labelledby="selected-team-heading">
                    <div className="team-maker__section-heading">
                        <h2 id="selected-team-heading">Jouw team</h2>
                        <span>{teamPokemons.length}/{MAX_TEAM_SIZE} Pokémon</span>
                    </div>
                    {teamPokemons.length === 0 ? (
                        <p className="team-maker__empty">Je hebt nog geen Pokémon toegevoegd.</p>
                    ) : (
                        <ul className="team-maker__selected-list">
                            {teamPokemons.map((pokemon, index) => (
                                <li
                                    className="team-maker__selected-item"
                                    key={`${pokemon.name}-${index}`}
                                >
                                    <span>{pokemon.name}</span>
                                    <div className="team-maker__pokemon-actions">
                                        <button
                                            className="team-maker__view-button"
                                            type="button"
                                            onClick={() => setPokemonToView(pokemon)}
                                        >
                                            Bekijken
                                        </button>
                                        <button
                                            className="team-maker__remove-button"
                                            type="button"
                                            onClick={() => removePokemon(index, pokemon.name)}
                                            aria-label={`${pokemon.name} verwijderen`}
                                        >
                                            Verwijderen
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

                {message && <p className="team-maker__message" role="status">{message}</p>}

                <nav className="team-maker__nav" aria-label="Paginanavigatie">
                    <Link
                        className="pokemon-card__add team-maker__nav-button"
                        to="/PokemonToevoegen"
                        state={{ teamPokemons, teamName }}
                    >
                        Pokémon toevoegen
                    </Link>
                    <Link className="pokemon-card__add team-maker__nav-button" to="/">
                        Terug naar Home
                    </Link>
                </nav>
            </main>
            {pokemonToView && (
                <PokemonDetails
                    pokemon={pokemonToView}
                    onClose={() => setPokemonToView(null)}
                />
            )}
        </>
    )
}

export default TeamMaken
