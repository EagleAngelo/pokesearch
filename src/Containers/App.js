//import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import CardList from "../Components/CardList";
//import { pokeman } from "./pokemanList";
import SearchBox from "../Components/Searchbox";
import "./App.css";
import Scroll from "../Components/Scroll";
import ErrorBoundary from "../Components/ErrorBoundary";

function App() {
    const [pokeman, setPokeman] = useState([]);
    const [field, setField] = useState("");
    const [pokemonLimit, setPokemonLimit] = useState(151);

    useEffect(() => {
        fetchFullList();
    }, []);

    const fetchFullList = () => {
        if (pokeman.length < pokemonLimit) {
            console.log("componentDidMount - fetching Data");
            fetch("https://pokeapi.co/api/v2/pokemon?limit=" + pokemonLimit)
                .then((response) => {
                    return response.json();
                })
                .then((pokeData) => {
                    fetchPokeData(pokeData, pokemonLimit);

                    console.log("componentDidMount - state.pokeman", pokeman);
                });
        }
    };

    const fetchPokeData = (pokemonData, pokemonLimit) => {
        let allthepokemons = [];
        pokemonData.results.forEach((pokemon) => {
            fetch(pokemon.url)
                .then((response) => response.json())
                .then((fullPokemon) => {
                    allthepokemons.push(fullPokemon);
                    if (allthepokemons.length === pokemonLimit) {
                        allthepokemons.sort((a, b) => (a.id > b.id ? 1 : -1));
                        setPokeman(allthepokemons);
                    }
                });
        });
    };

    const onSearchChange = (event) => {
        setField(event.target.value);

        console.log(event.target.value);
    };

    //const { pokeman, field } = this.state;

    console.log("render - state.pokeman", pokeman);

    let filterPokemans = pokeman.filter((pokeman) => {
        return pokeman.name.toLowerCase().includes(field.toLowerCase());
    });

    console.log("render - filter", filterPokemans);

    if (!pokeman.length) {
        return (
            <div className="tc">
                <h1 className="f1">Loading Pokemans</h1>
                <SearchBox searchChange={onSearchChange} />
            </div>
        );
    } else {
        return (
            <div className="tc">
                <h1 className="f1">Pokemon</h1>
                <SearchBox searchChange={onSearchChange} />

                <Scroll>
                    <ErrorBoundary>
                        <CardList pokeman={filterPokemans} />
                    </ErrorBoundary>
                </Scroll>
            </div>
        );
    }
}

export default App;
