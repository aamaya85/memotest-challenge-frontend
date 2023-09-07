import React from "react";
import CardContainer from "../card/CardContainer";
import { Grid } from "@mui/material";

const Board = ({ cardList, players }) => {
    return (
        <Grid container columnSpacing={1} rowSpacing={4}>
            {cardList.map((card, idx) => {
                return (
                    <Grid item key={idx} xs={6}>
                        <CardContainer card={card} />
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default Board;
