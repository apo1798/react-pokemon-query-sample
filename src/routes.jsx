import { createBrowserRouter } from 'react-router-dom';
import PokemonList from './pages/PokemonList';
import Pokemon from './pages/Pokemon';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PokemonList />,
  },
  {
    path: '/:id',
    element: <Pokemon />,
  },
]);
