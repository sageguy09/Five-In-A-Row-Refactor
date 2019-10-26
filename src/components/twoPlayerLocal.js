import React from 'react';
import { Client } from 'boardgame.io/react';
import  FirGame  from './firGame';
import FirBoard  from './firBoard';
const App = Client({
    game: FirGame,
    board: FirBoard,
    debug: false,
    multiplayer: {local: true}
})


const TwoPlayerMulti = () => (
    <div>
        <h1>Five In A Row Local Multiplayer</h1>
        <div className="run">
            <App gameId="multi" playerID="0" />
            &lt;App playerID=&quot;0&quot;/&gt;
        </div>
        <div className="run">
            <App gameId="multi" playerID="1" />
            &lt;App playerID=&quot;1&quot;/&gt;
        </div>
    </div>
);

export default TwoPlayerMulti;