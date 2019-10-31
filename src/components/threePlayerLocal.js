import React from 'react';
import { Client } from 'boardgame.io/react';
import  FirGame  from './firGame';
import FirBoard  from './firBoard';
const App = Client({
    game: FirGame,
    board: FirBoard,
    debug: false,
    numPlayers: 3,
    multiplayer: {local: true}
})


const TwoPlayerMulti = () => (
    <div>
        <h1>Five In A Row Local Multiplayer</h1>
        <div className="run">
            <h4>Player 1</h4>
            <App gameID="multi" playerID="0" />

            
        </div>
        <div className="run">
            <h4>Player 2</h4>
            <App gameID="multi" playerID="1" />
            
        </div>
        <div className="run">
            <h4>Player 3</h4>
            <App gameID="multi" playerID="2" />
            
        </div>
    </div>
);

export default TwoPlayerMulti;