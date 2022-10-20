// import { getPokemons } from './api.js'

let offset = 10
let limit = 10
let url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
const pokemonList = document.querySelector('[data-js="pokemon-list"]')
const next = document.querySelector('[data-js="next"]')
const prev = document.querySelector('[data-js="prev"]')

next.addEventListener('click', () => {
  removePokemonsItems()
  offset +=10
  url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  getPokemons()
}) 

prev.addEventListener('click', () => {
  removePokemonsItems()
  offset -=10
  url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  getPokemons()
})

function createPokemonItem(details) {  
  const id = details.id < 10 ? `00${details.id}` : details.id < 100 ? `0${details.id}` : details.id
  
  return `<li class="bg-[#159F6E] flex flex-col rounded-2xl p-3 max-w-[224px]">
    <span class="text-green-800 font-semibold self-end">${id}</span>
    <h3 class="flex justify-between font-semibold">${details.name}</h3>
    <div class="grid grid-cols-2">
      <div class="flex flex-col justify-center">
        ${details.types.map(type => `<span class="bg-[#60e1ca] px-2 py-1 w-fit rounded-2xl mb-1 text-zinc-100 font-bold">${type.type.name}</span>`).join('')}
      </div>
      <img class="w-28 h-28 self-end" src="${details.sprites.other.dream_world.front_default}" alt="${details.name}">
    </div>
  </li>`
}

function removePokemonsItems(){
  pokemonList.innerHTML = ''
}

async function getPokemons(){
  const pokemons = await fetch(url)
    .then(res => res.json())
    .then(data => data)

  offset === 0 ? prev.classList.add('invisible') : prev.classList.remove('invisible')

  pokemons.results.forEach(async pokemon => {
    const details = await fetch(pokemon.url)
      .then(res => res.json())
      .then(data => data)
  
    pokemonList.innerHTML += createPokemonItem(details)
  })
}

getPokemons()