import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { useRouter } from "next/navigation";
import CardContent from "@mui/material/CardContent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import { GameContext } from "../../context/GameContext";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

const bull = (
    <Box
        component="span"
        sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
        •
    </Box>
);

const Score = ({ visible }) => {
    const [open, setOpen] = useState(false);
    const { players } = useContext(GameContext);
    const [rate, setRate] = useState(0);
    const router = useRouter();

    useEffect(() => {
        rateScore();
        setOpen(visible);
    }, [visible]);

    const handleClose = () => {
        setOpen(!visible);
        router.push("/");
    };

    const rateScore = () => {
        const numberOfPairs = parseInt(players[0].score);
        const retries = parseInt(players[0].fails);
        const rate = retries > 0 ? ((numberOfPairs / retries) * 100).toFixed(2) : numberOfPairs * 100;
        setRate(rate);
    };

    return (
        
            <BootstrapDialog
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Game finished
                </DialogTitle>
                <DialogContent dividers>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Matches {bull} {players[0].score}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Retries {bull} {players[0].fails}
                            </Typography>
                            <Typography variant="h6" component="div">
                                FINAL SCORE: {rate}
                            </Typography>
                        </CardContent>
                    </Card>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        HOME
                    </Button>
                </DialogActions>
            </BootstrapDialog>
    );
};

export default Score;
