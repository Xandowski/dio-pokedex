import { pokeAPI } from './api.js'

let offset = 0

const pokemonList = document.querySelector('[data-js="pokemon-list"]')
const next = document.querySelector('[data-js="next"]')
const prev = document.querySelector('[data-js="prev"]')

next.addEventListener('click', () => {
  offset+=10
  removePokemonsItems()
  offset >= 10 ? prev.classList.remove('hidden') : prev.classList.add('hidden')
  loadPokemonItens(offset)
}) 

prev.addEventListener('click', () => {
  offset-=10
  removePokemonsItems()
  loadPokemonItens(offset)
})

function createPokemonItem(pokemon) {
  const id = pokemon.id < 10 ? `00${pokemon.id}` : pokemon.id < 100 ? `0${pokemon.id}` : pokemon.id

  return `<li class="bg-${pokemon.types[0].type.name}-500 flex flex-col rounded-2xl p-3 max-w-[224px]">
    <span class="text-${pokemon.types[0].type.name}-800 font-semibold self-end capitalize">${id}</span>
    <h3 class="flex justify-between font-semibold">${pokemon.name}</h3>
    <div class="grid grid-cols-2">
      <div class="flex flex-col justify-center">
        ${pokemon.types.map(type => `<span class="bg-${type.type.name}-300 px-2 py-1 w-fit rounded-2xl mb-1 text-zinc-100 font-bold">${type.type.name}</span>`).join('')}
      </div>
      <img class="w-28 h-28 self-end" src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
    </div>
  </li>`
}

function removePokemonsItems(){
  pokemonList.innerHTML = ''
}

function loadPokemonItens(offset) {
  offset > 10 ? prev.classList.remove('hidden') : prev.classList.add('hidden')
  pokeAPI.getPokemons(offset).then((pokemons = []) => {
    const html = pokemons.map(createPokemonItem).join('')
    pokemonList.innerHTML += html
    
  })
}

loadPokemonItens(offset)

function createPokemonDetails(pokemon) {
  const id = pokemon.id < 10 ? `00${pokemon.id}` : pokemon.id < 100 ? `0${pokemon.id}` : pokemon.id

  return `<div class="flex flex-col items-center">
    <img class="w-28 h-28" src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
    <h3 class="font-semibold">${pokemon.name}</h3>
    <span class="text-${pokemon.types[0].type.name}-800 font-semibold">${id}</span>
    <div class="grid grid-cols-2">
      <div class="flex flex-col justify-center">
        ${pokemon.types.map(type => `<span class="bg-${pokemon.types[0].type.name}-300 px-2 py-1 w-fit rounded-2xl mb-1 text-zinc-100 font-bold">${type.type.name}</span>`).join('')}
      </div>
    </div>
  </div>`
}