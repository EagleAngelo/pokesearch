import React from "react";
import Card from "./Card";

const cardList = ({ pokeman }) => {
    /* if (true) {
        throw new Error("nooo");
    } */
    return (
        <div>
            {pokeman.map((x, i) => {
                return (
                    <Card
                        key={pokeman[i].id} //key is jsx
                        id={pokeman[i].id}
                        name={pokeman[i].name}
                        type={pokeman[i].type}
                    />
                );
            })}
        </div>
    );
};

export default cardList;
