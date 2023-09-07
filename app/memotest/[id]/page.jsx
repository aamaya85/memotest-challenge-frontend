"use client";

import { ApolloProvider } from "@apollo/client";
import BoardContainer from "../../components/board/BoardContainer";
import GameContextComponent from "../../context/GameContext";
import client from "../../lib/apolloClient";

const App = ({ params }) => {
    const { id } = params;
    return (
        <ApolloProvider client={client}>
            <GameContextComponent id={id}>
                <BoardContainer />
            </GameContextComponent>
        </ApolloProvider>
    );
};

export default App;
