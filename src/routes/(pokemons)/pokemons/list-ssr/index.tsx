import { $, component$, useComputed$, useSignal, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { DocumentHead, routeLoader$, Link, useLocation } from '@builder.io/qwik-city';
import type { PokemonListResponse } from "~/interfaces/pokemon-list.response";
// import { BasicPokemonInfo } from '../../../interfaces/pokemon-list.response';
import { SmallPokemon } from "~/interfaces";
import { getSmallPokemons } from "~/helpers/get-pokemons";
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { Modal } from "~/components/shared";
import { getFunFactAboutPokemon } from "~/helpers/get-chat-gpt-response";
// import { useNavigate } from '@builder.io/qwik-city';


// export const usePokemonList = routeLoader$<BasicPokemonInfo[]>(async({ query, redirect, pathname }) => {

//   const offset = Number( query.get('offset') || 0);
//   if ((isNaN(offset) || (offset < 0))) {
//     redirect(301, pathname)
//   }

//   const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${ offset }`);
//   const data = await resp.json() as PokemonListResponse;
//   return data.results;
// });
// const nav = useNavigate();


export const usePokemonList = routeLoader$<SmallPokemon[]>(async({ query, redirect, pathname }) => {
    const offset = Number( query.get('offset') || 0);
    if ((isNaN(offset) || (offset < 0))) {
      redirect(301, pathname)
    }
    return await getSmallPokemons(offset);
});

export default component$(() => {
    const pokemons = usePokemonList();
    const location = useLocation();

    const modalVisible = useSignal(false);
    const modalPokemon = useStore({
      id: '',
      name:''
    });


    const chatGPTPokemonFact = useSignal('');
    

    // Modal functions
    const showModal = $(( id: string, name:string ) => {
      modalPokemon.id = id;
      modalPokemon.name = name;
      modalVisible.value = true
    })
    const closeModal = $(() => {
      modalVisible.value = false
    })

    // TODO Probar async
    useVisibleTask$(({ track }) => {
      track(() => modalPokemon.name);

      chatGPTPokemonFact.value = '';

      if (modalPokemon.name.length > 0) {
        getFunFactAboutPokemon( modalPokemon.name )
        .then( resp => chatGPTPokemonFact.value = resp);
      }
      
    });

    const currentOffset = useComputed$<number>(() => {
      // const offString = location.url.searchParams.get('offset');
      // return offString;
      const offString = new URLSearchParams( location.url.search);
      return Number(offString.get('offset')) || 0;
    });

    // const go2Pokemon = $(( id: string) => {
    //   console.log('Go to pokemon');
    //   nav(`/pokemon/${ id }`);
    // });

    return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text5xl">Status</span>
        <span class="">Offset: { currentOffset }</span>
        <span class="">Is loading: { location.isNavigating?'Si':'No' }</span>
      </div>

      <div class="mt-10">
        <Link 
          href={ `/pokemons/list-ssr/?offset=${ currentOffset.value - 10 }`}
          class="btn btn-primary mr-2">
          Anteriores
        </Link>
        <Link 
          href={ `/pokemons/list-ssr/?offset=${ currentOffset.value + 10 }`}
          class="btn btn-primary mr-2">
          Siguientes
        </Link>
      </div>

      <div class="grid grid-cols-6 mt-5">
        {
          pokemons.value.map( pokemon =>  (
            <div 
              key={ pokemon.name } 
              onClick$={() => showModal(pokemon.id, pokemon.name) }
              class="m-5 flex flex-col justify-center items-center">
               <PokemonImage
                id={ pokemon.id }
                size = { 100 }
                />
              <spa class="capitalize"> { pokemon.name } </spa>
            </div>
          ))
        }

      </div>

      <Modal 
        persistent
        size='sm'
        showModal={ modalVisible.value }
        closeFn = { closeModal }>
        <div q:slot='title'>{ modalPokemon.name }</div>
        <div q:slot='content' class="flex flex-col justify-center items-center">
          <PokemonImage
              id={ modalPokemon.id }
              size = { 200 }
              />
          <span>
            {
              chatGPTPokemonFact.value ===''
              ? 'Preguntando a ChatGPT'
              : chatGPTPokemonFact
            }
            
          </span>
        </div>

      </Modal>
      

      
    </>
    )
});

export const head: DocumentHead = {
    title: 'SSR list',
    meta: [
      {
        name: 'description',
        content: 'Qwik site SSR list',
      },
    ],
  };