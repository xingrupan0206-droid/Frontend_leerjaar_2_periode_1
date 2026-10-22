import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header_TB'
import '../css/TeamBekijken.css'

const TEAMS_STORAGE_KEY = 'pokemon-teams'

function TeamBekijken() {
    const [savedTeams, setSavedTeams] = useState([])

    useEffect(() => {
        const teams = JSON.parse(localStorage.getItem(TEAMS_STORAGE_KEY) || '[]')
        setSavedTeams(teams)
    }, [])

    function removeTeam(teamIndex) {
        const updatedTeams = savedTeams.filter((_, index) => index !== teamIndex)

        localStorage.setItem(TEAMS_STORAGE_KEY, JSON.stringify(updatedTeams))
        setSavedTeams(updatedTeams)
    }

    return (
        <>
            <Header title="Team Bekijken" />
            <main className="saved-teams">
                <div className="saved-teams__topline">
                    <h1>Opgeslagen teams</h1>
                    <p>Hier kun je de teams bekijken die je hebt opgeslagen.</p>
                </div>

                <ul className="saved-teams__list">
                    {savedTeams.map((team, index) => (
                        <li className="saved-teams__item" key={`${team.id}-${index}`}>
                            <div className="saved-teams__item-heading">
                                <h2>{team.name}</h2>
                                <button
                                    className="saved-teams__remove-button"
                                    type="button"
                                    onClick={() => removeTeam(index)}
                                >
                                    Verwijderen
                                </button>
                            </div>
                            <ul className="saved-teams__pokemon-list">
                                {team.pokemons.map((pokemon, index) => (
                                    <li
                                        className="saved-teams__pokemon"
                                        key={`${pokemon.name}-${index}`}
                                    >
                                        {pokemon.name}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>

                <nav className="saved-teams__nav" aria-label="Paginanavigatie">
                    <Link className="pokemon-card__add saved-teams__button" to="/TeamMaken">
                        Team maken
                    </Link>
                    <Link className="pokemon-card__add saved-teams__button" to="/">
                        Terug naar Home
                    </Link>
                </nav>
            </main>
        </>
    )
}

export default TeamBekijken
