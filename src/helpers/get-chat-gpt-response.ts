

import { Configuration, OpenAIApi } from "openai";
import { config } from "process";
import { head } from '../routes/(pokemons)/pokemons/list-ssr/index';

const configuration = new Configuration({
    apiKey: import.meta.env.PUBLIC_OPEN_AI_KEY,
});

const openai =  new OpenAIApi(configuration);

export const getFunFactAboutPokemon = async(pokemonName: string):Promise<string> => {

    // Usar una key valida para openai
    // delete configuration.baseOptions.headers['User-Agent'];
    // const response = await openai.createCompletion({
    //     model: 'text-davinci-003',
    //     prompt: `Dime datos interesantes del pokemon ${ pokemonName }`,
    //     temperature: 0.7,
    //     max_tokens: 60,
    //     top_p: 1,
    //     frequency_penalty: 0,
    //     presence_penalty: 0
    // });
    // console.log(response);
    // return response.data.choices[0].text || `No se encontro nada sobre el pokemon ${}, lo siento`;
    let response = 'Texto de prueba de respuesta de OpenAI';

    return response;

}
