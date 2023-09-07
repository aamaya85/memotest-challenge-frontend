import React, { useContext } from "react";
import Card from "./Card";
import { GameContext } from "../../context/GameContext";

const CardContainer = ({ card }) => {
    const { setCardFlipped, cardsFlipped } = useContext(GameContext);

    const handleFlip = (id) => {
        if (!card.flipped && cardsFlipped.length < 2 && !card.matched) {
            setCardFlipped(id);
        }
    };

    return (

            <Card
                id={card.id}
                image={card.image}
                isFlipped={card.flipped}
                matched={card.matched}
                handleOnFlip={() => handleFlip(card.id)}
            />

    );
};

export default CardContainer;
