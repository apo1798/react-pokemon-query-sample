import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getPokemonInfoById } from '../api/pokemon';

const Pokemon = () => {
  const params = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['pokemon-species', params.id],
    queryFn: () => getPokemonInfoById({ id: params.id }),
  });

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Something went wrong. Pokemon not found...</div>;

  return (
    <div>
      <div style={{ width: '100%' }}>{JSON.stringify(data)}</div>
    </div>
  );
};
export default Pokemon;
