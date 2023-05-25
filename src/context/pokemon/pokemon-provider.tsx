import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { PokemonGameContext, type PokemonGameState } from "./pokemon-game.context";
import { PokemonListContext, type PokemonListState } from "./pokemon-list.context";


export const PokemonProvider = component$(() => {

    const pokemonGame = useStore<PokemonGameState>({
        pokemonId: 4,
        isPokemonVisible: true,
        showBackImage: false,
    });

    const pokemonList = useStore<PokemonListState>({
        currentPage: 0,
        isLoading: false,
        pokemons: []
    });

    useContextProvider( PokemonGameContext, pokemonGame );
    useContextProvider( PokemonListContext, pokemonList );


    useVisibleTask$(() => {
        // console.log('Primer visible task');
        // Leer del local storage
        if (localStorage.getItem('pokemon-game')) {
            // const data = JSON.parse(localStorage.getItem('pokemon-game')!);
            // pokemonGame=data; // no se recomienda porque pierde propiedades

            // destructurando y asignando valores default
            const {
                isPokemonVisible = true,
                pokemonId = 10,
                showBackImage = false
            } = JSON.parse(localStorage.getItem('pokemon-game')!) as PokemonGameState;
            pokemonGame.isPokemonVisible = isPokemonVisible;
            pokemonGame.pokemonId = pokemonId;
            pokemonGame.showBackImage = showBackImage;
        }
    });
    useVisibleTask$(( { track }) => {
        // console.log('Segundo visible task');
        track( () => [ pokemonGame.isPokemonVisible, pokemonGame.pokemonId, pokemonGame.showBackImage ]);

        localStorage.setItem('pokemon-game', JSON.stringify(pokemonGame));
    });

    return <Slot />
});
