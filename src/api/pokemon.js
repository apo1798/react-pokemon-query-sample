import axios from 'axios';

export const getPokemons = ({ offset, limit }) =>
  axios({
    url: `https://pokeapi.co/api/v2/pokemon-species`,
    params: { offset, limit },
  }).then((r) => r.data);

export const getPokemonInfoByUrl = ({ url }) =>
  axios({
    url,
  }).then((r) => r.data);

export const getPokemonInfoById = ({ id }) =>
  axios({
    url: `https://pokeapi.co/api/v2/pokemon-species/${id}/`,
  }).then((r) => r.data);
