import { $, component$ } from '@builder.io/qwik';
// import { useContext, useSignal, useStore } from '@builder.io/qwik';
import { DocumentHead, useNavigate } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { usePokemonGame } from '~/hooks/use-pokemon-game';
// import { Link } from '@builder.io/qwik-city';
// import { PokemonGameContext } from '~/context';

export default component$(() => {

  const nav = useNavigate();

  // v1
  // const pokemonId = useSignal<number>(1); // primitivos, booleans, strings....
  // const showBackImage = useSignal<boolean>(false);
  // const revelarImage = useSignal<boolean>(true);

  // v2
  // const pokemonGame = useContext( PokemonGameContext );

  // moved to custom hook (use-pokemon-game)
  // const changePokemonId = $(( value: number ) => {
  //   if  ( (pokemonGame.pokemonId + value <= 0) ) return;

  //   pokemonGame.pokemonId += value;
  // });

  // moved to custom hook (use-pokemon-game)
  // const voltearPokemon = $(() => {
  //   pokemonGame.showBackImage = !pokemonGame.showBackImage;
  // });

  // moved to custom hook (use-pokemon-game)
  // const revelarPokemon = $(() => {
  //   pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible;
  // });

  const {
    pokemonId,
    showBackImage,
    isPokemonVisible,

    nextPokemon,
    prevPokemon,

    toggleFromBack,
    toggleVisible,
  } = usePokemonGame();

  const go2Pokemon = $((id: number) => {
    console.log('Go to pokemon');
    nav(`/pokemon/${ id }`);
  });

  return (
    <>
      <span class="text-2xl">Buscador simple</span>

      <span class="text-9xl">{ pokemonId.value }</span>

      {/* <Link href={`/pokemon/${ pokemonId.value }`}>
        <PokemonImage
          id={ pokemonId.value }
          size = { 200 }
          backImage = { showBackImage.value }
          isVisible = { revelarImage.value }
          />
      </Link> */}

      <div
        onClick$={ () => { go2Pokemon(pokemonId.value) }}>
        <PokemonImage
            id={ pokemonId.value }
            size = { 200 }
            backImage = { showBackImage.value }
            isVisible = { isPokemonVisible.value }
            />
      </div>

      <div class="mt-2">
        <button onClick$={ prevPokemon } class="btn btn-primary mx-2">Anterior</button>
        <button onClick$={ nextPokemon } class="btn btn-primary">Siguiente</button>
        <button onClick$={ toggleFromBack } class="btn btn-primary mx-2">Voltear</button>
        <button onClick$={ toggleVisible } class="btn btn-primary">{ !isPokemonVisible.value ? 'Revelar':'Ocultar'}</button>
      </div>

    </>
  );
});

export const head: DocumentHead = {
  title: 'PokeQwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
