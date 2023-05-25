import { component$, Slot, useStyles$ } from '@builder.io/qwik';
// import { useContextProvider, useStore } from '@builder.io/qwik';

// import Navbar from '~/components/shared/navbar/navbar';

import styles from './styles.css?inline';
// import { PokemonProvider } from '~/context/pokemon/pokemon-provider';
// import { PokemonGameContext, PokemonListContext } from '~/context';
// import type { PokemonGameState, PokemonListState } from '~/context';

export default component$(() => {
  useStyles$(styles);

  // const pokemonGame = useStore<PokemonGameState>({
  //   pokemonId: 4,
  //   isPokemonVisible: true,
  //   showBackImage: false,
  // });
  // useContextProvider( PokemonGameContext, pokemonGame );


  // const pokemonList = useStore<PokemonListState>({
  //   currentPage: 1,
  //   isLoading: false,
  //   pokemons: []
  // });
  // useContextProvider( PokemonListContext, pokemonList );

  return (
   <Slot />
  );
});
