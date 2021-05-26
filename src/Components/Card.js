import React from "react";

const Card = ({ id, name, type }) => {
    //const {id, name, type} = props;
    return (
        <div className="bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5">
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
