import './style.css'
import heroImg from './assets/hero.png'
import typescriptLogo from './assets/typescript.svg'
import viteLogo from './assets/vite.svg'
import { setupCounter } from './counter.ts'

import types from './bases/types.ts';
import objects, { pokemons} from './bases/objects.ts';
import clases, { Pokemon } from './bases/clases.ts';
import { PokemonDecorator } from './bases/decorators.ts';


const pokemonCard = async (pokemon: Pokemon | PokemonDecorator): Promise<string> => (`
<section id="spacer">
    <p>${pokemon.name} - ${pokemon.type}</p>
    <img width="100" height="100" src="${await pokemon.getImage()}" alt="${pokemon.name}">
    <p>${pokemon.scream()}</p>
    <p>${pokemon.speak()}</p>
</section>`);

const bulbasaur = new Pokemon(1, 'Bulbasaur', 'grass');
const bulbasaurCard = await pokemonCard(bulbasaur);

const pikachu = new PokemonDecorator(25, 'Pikachu', 'electric');

const { charmander, squirtle } = clases();

document.querySelector<HTMLDivElement>('#app')!.innerHTML = types({ heroImg, typescriptLogo, viteLogo }) + `
<div class="ticks"></div>
<section id="spacer">
    <p>PokemonIDs: ${objects().join(', ')}</p>
    <p>Pokemon: ${charmander.name} - ${charmander.type}</p>

    <p>Pokemons: ${pokemons}</p>
    <p>Pokemons mapped: ${pokemons.map((pokemon) => pokemon.name).join(', ')}</p>
</section>

<div class="ticks"></div>
${await pokemonCard(charmander)}
<div class="ticks"></div>
${bulbasaurCard}
<div class="ticks"></div>
${await pokemonCard(squirtle)}
<div class="ticks"></div>
${await pokemonCard(pikachu)}
`;

objects();
setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)