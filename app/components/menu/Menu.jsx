"use client";

import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from '@apollo/client';
import { GET_MEMOTESTS, START_GAME } from "@/app/lib/queries";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GamesIcon from '@mui/icons-material/Games';
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const Menu = () => {
    const { loading, error, data } = useQuery(GET_MEMOTESTS);
    const [startGameMutation, { data: startGameData, loading: startGameLoading, error: startGameError }] = useMutation(START_GAME);
    const [gameList, setGameList] = useState([]);
    const router = useRouter()
    
    const handleStartGame = async (id) => {
        try {
            const { data } = await startGameMutation({
                variables: { id },
            });
            const path = `/memotest/${data.createGameSession.memotest_id}`;
            router.push(path)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!loading && !error && data) {
            setGameList(data.memotests);
        }
    }, [loading, error, data]);

    return (
        <List
            sx={{ width: "100%", bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Select the game
                </ListSubheader>
            }
        >
            {gameList.map((game) => {
                return (
                    <Button key={game.id} onClick={() => handleStartGame(game.id)}>
                        <ListItemButton sx={{ boxShadow: 1 }}>
                            <ListItemIcon>
                                <GamesIcon />
                            </ListItemIcon>
                            <ListItemText primary={(game.name).toUpperCase()} />
                        </ListItemButton>
                    </Button>
                )
            })}
        </List>
    );
};

export default Menu;
