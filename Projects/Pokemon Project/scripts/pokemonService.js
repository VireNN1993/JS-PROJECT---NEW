export const getPokemons = async () => {
  try {
    // עדכון limit לקבלת יותר פוקימונים
    const res = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
    );
    const data = await res.json();

    // Fetch detailed data for each Pokémon
    const detailedData = await Promise.all(
      data.results.map(async (pokemon) => {
        const pokemonRes = await fetch(pokemon.url);
        return await pokemonRes.json(); // Full details for each Pokémon
      })
    );
    return detailedData;
  } catch (error) {
    console.error("Failed to fetch Pokémon data", error);
  }
};
