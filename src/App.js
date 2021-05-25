//import { render } from "@testing-library/react";
import React, { Component } from "react";
import CardList from "./CardList";
//import { pokeman } from "./pokemanList";
import SearchBox from "./Searchbox";
import "./App.css";

class App extends Component {
    constructor() {
        super();
        this.state = {
            pokeman: [],
            field: "",
        };
    }

    fetchPokeData = (pokemonData) => {
        let allthepokemons = [];
        pokemonData.results.forEach(async (pokemon) => {
            await fetch(pokemon.url)
                .then((response) => response.json())
                .then((fullPokemon) => {
                    //console.log(fullPokemon);
                    allthepokemons.push(fullPokemon);
                });
        });
        return allthepokemons;
    };

    async componentDidMount() {
        console.log("Page done. Loading pokemons.");

        let pokeArray = [];

        await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
            .then((response) => {
                return response.json();
            })
            .then((pokeData) => {
                pokeArray = this.fetchPokeData(pokeData);
            });

        console.log("componentDidMount - pokearray contents", pokeArray);
        console.log("componentDidMount - state.pokeman 1", this.state.pokeman);
        this.setState({ pokeman: pokeArray });
        console.log("componentDidMount - state.pokeman 2", this.state.pokeman);
    }

    onSearchChange = (event) => {
        this.setState({ field: event.target.value });
        console.log(event.target.value);
    };

    render() {
        console.log("render - state.pokeman", this.state.pokeman);

        let filterPokemans = this.state.pokeman.filter((pokeman) => {
            return pokeman.name
                .toLowerCase()
                .includes(this.state.field.toLowerCase());
        });

        if (filterPokemans.length === 0) {
            filterPokemans = this.state.pokeman;
            //console.log("filter", this.state.pokeman);
        }

        console.log("render - filter", filterPokemans);

        return (
            <div className="tc">
                <h1 className="f1">Pokemon</h1>
                <SearchBox searchChange={this.onSearchChange} />
                <CardList pokeman={filterPokemans} />
            </div>
        );
    }
}

export default App;
