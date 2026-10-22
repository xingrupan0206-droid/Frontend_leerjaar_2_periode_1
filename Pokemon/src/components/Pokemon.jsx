function Pokemon({ url, name }) {
    const pokemonId = url?.split('/').filter(Boolean).pop()

    if (!pokemonId) {
        return <div className="pokemon-card__image-placeholder" aria-hidden="true" />
    }

    return (
        <img
            className="pokemon-card__image"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
            alt={name}
            loading="lazy"
        />
    )
}

export default Pokemon
