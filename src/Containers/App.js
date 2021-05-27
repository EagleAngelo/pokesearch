//import { render } from "@testing-library/react";
import React, { Component } from "react";
import CardList from "../Components/CardList";
//import { pokeman } from "./pokemanList";
import SearchBox from "../Components/Searchbox";
import "./App.css";
import Scroll from "../Components/Scroll";
import ErrorBoundary from "../Components/ErrorBoundary";

class App extends Component {
    constructor() {
        super();
        this.state = {
            pokeman: [],
            field: "",
        };
    }

    componentDidMount() {
        console.log("componentDidMount - fetching Data");

        const pokemonLimit = 151; //hardcoded because why not

        fetch("https://pokeapi.co/api/v2/pokemon?limit=" + pokemonLimit)
            .then((response) => {
                return response.json();
            })
            .then((pokeData) => {
                this.fetchPokeData(pokeData, pokemonLimit);

                console.log(
                    "componentDidMount - state.pokeman",
                    this.state.pokeman
                );
            });
    }

    fetchPokeData = (pokemonData, pokemonLimit) => {
        let allthepokemons = [];
        pokemonData.results.forEach((pokemon) => {
            fetch(pokemon.url)
                .then((response) => response.json())
                .then((fullPokemon) => {
                    allthepokemons.push(fullPokemon);
                    if (allthepokemons.length === pokemonLimit) {
                        allthepokemons.sort((a, b) => (a.id > b.id ? 1 : -1));
                        this.setState({ pokeman: allthepokemons });
                    }
                });
        });
    };

    onSearchChange = (event) => {
        this.setState({ field: event.target.value });
        console.log(event.target.value);
    };

    render() {
        const { pokeman, field } = this.state;

        console.log("render - state.pokeman", pokeman);

        let filterPokemans = pokeman.filter((pokeman) => {
            return pokeman.name.toLowerCase().includes(field.toLowerCase());
        });

        console.log("render - filter", filterPokemans);

        if (!pokeman.length) {
            return (
                <div className="tc">
                    <h1 className="f1">Loading Pokemans</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                </div>
            );
        } else {
            return (
                <div className="tc">
                    <h1 className="f1">Pokemon</h1>
                    <SearchBox searchChange={this.onSearchChange} />

                    <Scroll>
                        <ErrorBoundary>
                            <CardList pokeman={filterPokemans} />
                        </ErrorBoundary>
                    </Scroll>
                </div>
            );
        }
    }
}

export default App;
