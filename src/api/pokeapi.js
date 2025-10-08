export const fetchPokemonList = async (limit = 20, offset = 0) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    if (!res.ok) throw new Error('API error');
    const json = await res.json();
    return json; // { results, count, next, previous }
};

export const fetchPokemonDetail = async (urlOrName) => {
    const url = urlOrName.startsWith('http') ? urlOrName : `https://pokeapi.co/api/v2/pokemon/${urlOrName}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('API error');
    return res.json();
};