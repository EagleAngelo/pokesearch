import React from "react";
import "./Card.css";

const Card = ({ id, name, type }) => {
    //const {id, name, type} = props;
    return (
        <div className="pokecard bg-light-green dib br3 pa3 ma2 w-25 h-25 f6 f5-l grow bw2 shadow-5">
            <img
                alt="Pokemon"
                src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}
                //src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`}
                //src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${props.id}.png`}
            />
            <div>
                <h2>{name}</h2>
                <p>{type}</p>
            </div>
        </div>
    );
};

export default Card;
