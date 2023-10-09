import { useQueries, useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

import { getPokemons, getPokemonInfoByUrl } from '../api/pokemon';

const PokemonList = () => {
  const [params] = useSearchParams();

  const page = Number(params.get('page')) || 0;
  const limit = Number(params.get('limit')) || 10;
  const offset = page * limit;

  const { data: pokemons } = useQuery({
    queryKey: ['pokemon-species', offset, limit],
    queryFn: () => getPokemons({ offset: offset, limit }),
  });

  console.log(pokemons);
  const pokemonInfoQuery = useQueries({
    queries: (pokemons?.results ?? []).map((item) => ({
      queryKey: ['pokemon-species', item.url.split('/').at(-2)],
      queryFn: () =>
        getPokemonInfoByUrl({
          url: item.url,
        }),
    })),
  });

  const isReady =
    pokemons &&
    pokemonInfoQuery.every(
      (query) => !query.isLoading && !query.isError && query.data
    );

  if (!isReady) return <div>Loading</div>;

  const pokemonInfos = pokemonInfoQuery.map((query) => query.data);

  return (
    <>
      <ul>
        {pokemonInfos.map((info) => (
          <li key={info.id}>
            <Link to={`/${info.id}`}>{info.name}</Link>
          </li>
        ))}
      </ul>
      <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {Array.from({ length: Math.ceil(pokemons.count / Number(limit)) }).map(
          (_, i) => (
            <Link
              to={{ pathname: '/', search: `page=${i}&limit=${limit}` }}
              key={i}
              style={{ textDecoration: Number(page) === i ? 'none' : '' }}
            >
              {i}
            </Link>
          )
        )}
      </ul>
    </>
  );
};
export default PokemonList;
