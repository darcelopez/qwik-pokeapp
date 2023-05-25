import { component$, useContext } from "@builder.io/qwik";
// import { useLocation} from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PokemonImage } from '~/components/pokemons/pokemon-image';
// import { PokemonGameContext } from '../../../context/pokemon/pokemon-game.context';
import { usePokemonGame } from "~/hooks/use-pokemon-game";

export const usePokemonId = routeLoader$<number>(( { params, redirect } ) => {
    const id = Number(params.id);
    if ((isNaN(id)) || (id<=0) || (id>1000)) {
        redirect(301, '/');
    }

    return id;
});

export default component$(() => {

    // const location = useLocation();
    const pokemonId = usePokemonId();

    // Se sustituye por el uso del hook(usePokemonGame)
    // const pokemonGame = useContext( PokemonGameContext );

    const { isPokemonVisible, showBackImage, toggleFromBack, toggleVisible } = usePokemonGame();

    return (
        <>
            {/* <span class="text-5xl">Pokemon: {location.params.id} </span> */}
            <span class="text-5xl">Pokemon: {pokemonId} </span> 

            <PokemonImage
                // id={ location.params.id }
                id = { pokemonId.value }
                size={ 200 }
                isVisible={ isPokemonVisible.value }
                backImage={ showBackImage.value }
            />

            <div class="div mt-2">
               <button onClick$={ toggleFromBack } class="btn btn-primary mr-2">Voltear</button>
               <button onClick$={ toggleVisible } class="btn btn-primary">Revelar</button>
            </div>
        </>
    )
});