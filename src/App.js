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
        console.log("render");

        if (this.state.pokeman.length === 0) {
            console.log("render - if clause");
            return (
                <div className="tc">
                    <h1 className="f1">Pokemon</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                </div>
            );
        }

        console.log("render - state.pokeman", this.state.pokeman);

        let filterPokemans = this.state.pokeman.filter((pokeman) => {
            return pokeman.name
                .toLowerCase()
                .includes(this.state.field.toLowerCase());
        });

        if (filterPokemans.length === 0) {
            filterPokemans = this.state.pokeman;
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
