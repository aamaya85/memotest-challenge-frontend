"use client";

import React, { useState, useContext, useEffect } from "react";
import { GameContext } from "../../context/GameContext";
import Board from "./Board";
import Score from "../score/Score";
import Loading from "./../loading/Loading";
import { Container, Box } from "@mui/material";
import { Direction } from "@mui/material";

const BoardContainer = () => {
    const { cards, players, waiting } = useContext(GameContext);
    const [scoreVisible, setScoreVisible] = useState(false);

    useEffect(() => {
        const allMatched = cards.every((card) => card.matched);
        if (allMatched && !scoreVisible) {
            setScoreVisible(true);
        } else if (!allMatched && scoreVisible) {
            setScoreVisible(false);
        }
    }, [cards, scoreVisible]);

    return (

            <Loading visible={false}>
                <Box
                    sx={{
                        width: "50%",
                        display: "flex",
                        boxShadow: 2,
                        borderRadius: 10,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundImage: `url("https://www.pixel4k.com/wp-content/uploads/2022/02/spider-man-across-the-spider-verse-part-one-4k_1644787250.jpg")`,
                        alignItems: "center",
                        mx: "auto",
                        flexDirection: "column",
                        flexGrow: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        height: "90vh", // Esto establecerá la altura al 100% de la pantalla
                      }
                    }
                >
                    <Board cardList={cards} players={players} />
                </Box>
                <Score visible={scoreVisible} />
            </Loading>

    );
};

export default BoardContainer;
