import { component$, useTask$, useOnDocument, $, useContext } from '@builder.io/qwik';
// import { useStore, useVisibleTask$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';

import { getSmallPokemons } from "~/helpers/get-pokemons";
// import type { SmallPokemon } from "~/interfaces";
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonListContext } from '~/context';

// interface PokemonPageState {
//   currentPage: number;
//   pokemons: SmallPokemon[];
//   isLoading: boolean;
// }

export default component$(() => {

    // useStore<PokemonPageState>({
    //   currentPage: 0,
    //   isLoading: false,
    //   pokemons: []
    // });

    const pokemonState = useContext( PokemonListContext );


    // useVisibleTask ... solo se ejecuta del lado del cliente
    // useTask ... Se ejecuta una vez en lado del servidor para adelantar data
    useTask$(async({ track }) => {
      track( () => pokemonState.currentPage );

      pokemonState.isLoading = true;

      const pokemons = await getSmallPokemons( pokemonState.currentPage * 10, 30);
      // pokemonState.pokemons = pokemons;
      // Para agregar en ve de sustituir
      pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];

      pokemonState.isLoading = false;

    });

    useOnDocument('scroll', $((event) => {
      console.log('Scroll ', event);
      const maxScroll = document.body.scrollHeight;
      const currentScroll = window.scrollY + window.innerHeight;
      if (((currentScroll + 200) >= maxScroll) && (!pokemonState.isLoading)) {
        pokemonState.isLoading = true;
        pokemonState.currentPage++;
      }
    }));
    return (
      <>
        <div class="flex flex-col">
          <span class="my-5 text-5xl">Status</span>
          <span class="">Pagina actual: { pokemonState.currentPage }</span>
          <span class="">Is loading: { pokemonState.isLoading==true?'Si':'No' }</span>
        </div>
  
        <div class="mt-10">
          <button 
            onClick$={() => pokemonState.currentPage--}
            class="btn btn-primary mr-2">
            Anteriores
          </button>
          <button 
            onClick$={() => pokemonState.currentPage++}
            class="btn btn-primary mr-2">
            Siguientes
          </button>
        </div>
  
        <div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid=cols-7 mt-5">
          {
            pokemonState.pokemons.map( pokemon =>  (
              <div key={ pokemon.id } class="m-5 flex flex-col justify-center items-center">
                 <PokemonImage
                  id={ pokemon.id }
                  size = { 100 }
                  />
                <spa class="capitalize"> { pokemon.name } </spa>
              </div>
            ))
          }
  
        </div>
      </>
      )
});

export const head: DocumentHead = {
    title: 'Client list',
    meta: [
      {
        name: 'description',
        content: 'Qwik site Client list',
      },
    ],
  };