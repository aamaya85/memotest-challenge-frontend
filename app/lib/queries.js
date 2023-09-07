import { gql } from "@apollo/client";

export const GET_MEMOTEST = gql`
    query GET_MEMOTEST($id: ID!) {
        memotest(id: $id) {
            images {
                id
                url
            }
        }
    }
`;

export const GET_MEMOTESTS = gql`
    query {
        memotests {
            id
            name
        }
    }
`;

export const START_GAME = gql`
    mutation START_GAME($id: ID!) {
        createGameSession(memotest_id: $id) {
            id
            memotest_id
            retries
            number_of_pairs
            state
        }
    }
`;
