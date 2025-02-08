export const getPokemons = async () => {
  try {
    const res = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
    );
    const data = await res.json();

    // שליפת מידע מפורט על כל פוקימון
    const detailedData = await Promise.all(
      data.results.map(async (pokemon) => {
        const pokemonRes = await fetch(pokemon.url);
        return await pokemonRes.json();
      })
    );

    return detailedData;
  } catch (error) {
    console.error("Failed to fetch Pokémon data", error);
  }
};
