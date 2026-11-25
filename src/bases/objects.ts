import { 
    log, 
    type PokemonType // import del type
} from '../utils/index.ts';

interface IPokemon {
    id: number;
    name: string;
    type: PokemonType;
}

export const charmander: IPokemon = {
    id: 3,
    name: 'Charmander',
    type: 'fire',
}

const bulbasaur: IPokemon = {
    id: 2,
    name: 'Bulbasaur',
    type: 'grass',
}

export const pokemons: IPokemon[] = [];
pokemons.push(charmander, bulbasaur);


export default (() => {
    const pokemonIds: number[] = [1, 20, 30, 34, 66 ];

    log(pokemonIds);
    log(charmander);
    log(pokemons);

    return pokemonIds;
});