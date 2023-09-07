'use client'

import React, { useState } from "react";
import Menu from "./components/menu/Menu";
import { Container, Box, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { ApolloProvider } from "@apollo/client";
import client from "./lib/apolloClient";


const page = () => {
    
    return (
        <ApolloProvider client={client}>
            <Container sx={{ boxShadow: 4 }}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        ></IconButton>
                        <Typography variant="h5">Memotest Game</Typography>
                    </Toolbar>
                </AppBar>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        mx: "auto",
                        mb: 0,
                        width: 300,
                        height: 300,
                    }}
                >
                    <Menu />
                </Box>
            </Container>
        </ApolloProvider>
    );
};

export default page;
