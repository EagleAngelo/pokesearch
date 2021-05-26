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

        fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
            .then((response) => {
                return response.json();
            })
            .then((pokeData) => {
                const pokeArray = this.fetchPokeData(pokeData);
                this.setState({ pokeman: pokeArray });

                console.log(
                    "componentDidMount - state.pokeman",
                    this.state.pokeman
                );
            });
    }

    fetchPokeData = (pokemonData) => {
        let allthepokemons = [];
        pokemonData.results.forEach((pokemon) => {
            fetch(pokemon.url)
                .then((response) => response.json())
                .then((fullPokemon) => {
                    //this.setState({ pokeman: allthepokemons }); //uncommenting this line makes it work, however, it sets the state and triggers render 151 times
                    allthepokemons.push(fullPokemon);
                });
        });

        return allthepokemons;
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
