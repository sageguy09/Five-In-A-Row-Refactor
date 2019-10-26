import React from 'react';
import { Client } from 'boardgame.io/react';
import  FirGame  from './firGame';
import FirBoard  from './firBoard';
const hostname = window.location.hostname;
const FirClient = Client({
    game: FirGame,
    board: FirBoard,
    debug: false,
    multiplayer: {server: `${hostname}:8000`}
})



// const ServerMultiplayer  = () => (
//     <div>
//         <h1>Five In A Row Local Multiplayer</h1>
//         <div className="run">
//             <FirClient gameId="multi" playerID="0" />
//             &lt;App playerID=&quot;0&quot;/&gt;
//         </div>
//     </div>
// );


class App extends React.Component {
    state = { playerID: null};

    render() {
    if (this.state.playerID === null) {
        return (
            <div>
                <p>Play as</p>
                <button onClick={() => this.setState({ playerID: "0"})}>
                    Player 0
                </button>
                <button onClick={() => this.setState({ playerID: "1"})}>
                    Player 1
                </button>
            </div>
        )
    }
    return (
        <div>
            <h1>Five In A Row Server Multiplayer</h1>
            <div className="run">
                <FirClient playerID={this.state.playerID} />
                {/* &lt;App playerID=&quot;{this.state.playerID}&quot;/&gt; */}
            </div>
        </div>
        )
    };
}

export default App;