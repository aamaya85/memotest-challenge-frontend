"use client";

import { useState, useEffect, createContext } from "react";
import { Howl } from "howler";
import { useQuery } from "@apollo/client";
import { GET_MEMOTEST } from "../lib/queries";

export const GameContext = createContext();

const GameContextComponent = ({ children, id }) => {
    const { loading, error, data: gameData } = useQuery(GET_MEMOTEST, {
        variables: { id },
    });

    const [cards, setCards] = useState([]);
    const [cardsFlipped, setCardsFlipped] = useState([]);
    const matchSound = new Howl({
        src: [
            "https://res.cloudinary.com/dzzlp6dxw/video/upload/v1694029124/memotest/sounds/match_zfmhrm.wav",
        ],
    });

    const flipSound = new Howl({
        src: [
            "https://res.cloudinary.com/dzzlp6dxw/video/upload/v1694029123/memotest/sounds/flip_o8rnt1.wav",
        ],
    });

    const [players, setPlayers] = useState([{ id: "p01", name: "Player", score: 0, fails: 0 }]);
    const [currentPlayer, setCurrentPlayer] = useState();

    useEffect(() => {
        if (!loading && !error && gameData) {
            const _cards = generateCards(gameData.memotest.images);
            setCards(_cards);
            setCurrentPlayer(players[0]);
        }
    }, [loading, error, gameData, id]);

    useEffect(() => {
        if (cardsFlipped.length == 2) {
            if (cardsFlipped[0].matchKey == cardsFlipped[1].matchKey) {
                const cardsUpdated = cards.map((card) => {
                    if (
                        card.id == cardsFlipped[0].id ||
                        card.id == cardsFlipped[1].id
                    ) {
                        return { ...card, matched: true };
                    }
                    return card;
                });
                addMatchToScore();
                setCards(cardsUpdated);
                setCardsFlipped([]);
                setTimeout(() => {
                    matchSound.play();
                }, 350);
            } else {
                addFailToScore();
                nextPlayer();
                setTimeout(() => {
                    const cardsUpdated = cards.map((card) => {
                        if (!card.matched) {
                            return { ...card, flipped: false };
                        }
                        return card;
                    });

                    setCards(cardsUpdated);
                    setCardsFlipped([]);
                }, 1500);
            }
        }
    }, [cardsFlipped]);

    const generateCards = (items) => {
        const duplicatedItems = [...items, ...items];
        const list = duplicatedItems;
        //const list = shuffle(duplicatedItems);
        return list.map((listItem, idx) => {
            return {
                id: idx + 1,
                matchKey: listItem.id,
                image: listItem.url,
                flipped: false,
                matched: false,
            };
        });
    };

    const shuffle = (array) => {
        let currentIndex = array.length,
            randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }
        return array;
    };

    const nextPlayer = () => {
        let nextPlayerIndex =
            players.findIndex((player) => player.id === currentPlayer.id) + 1;
        if (nextPlayerIndex > players.length - 1) nextPlayerIndex = 0;
        setCurrentPlayer(players[nextPlayerIndex]);
    };

    const addMatchToScore = () => {
        const playersUpdated = players.map((player) => {
            if (player.id == currentPlayer.id) {
                return {
                    ...player,
                    score: player.score + 1,
                };
            }
            return player;
        });
        setPlayers(playersUpdated);
    };

    const addFailToScore = () => {
        const playersUpdated = players.map((player) => {
            if (player.id == currentPlayer.id) {
                return {
                    ...player,
                    fails: player.fails + 1,
                };
            }
            return player;
        });
        setPlayers(playersUpdated);
    };

    const setCardFlipped = (id) => {
        if (cardsFlipped.length < 2) {
            const cardsUpdated = cards.map((card) => {
                if (card.id === id) {
                    setCardsFlipped([...cardsFlipped, card]);
                    return {
                        ...card,
                        flipped: !card.flipped,
                    };
                }
                return card;
            });
            setCards(cardsUpdated);
            flipSound.play();
        }
    };

    let data = {
        cards,
        setCardFlipped,
        cardsFlipped,
        players,
        currentPlayer,
    };

    return <GameContext.Provider value={data}>{children}</GameContext.Provider>;
};

export default GameContextComponent;
