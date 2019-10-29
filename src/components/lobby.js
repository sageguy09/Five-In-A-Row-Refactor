import React from 'react';
import { Lobby } from 'boardgame.io/react';
import { default as FirBoard } from './firBoard';
import { default as FirGame } from './firGame';
import './lobby.css' 

FirGame.minPlayers = FirGame.maxPlayers = 2;
FirGame.debug = true;

const hostname = window.location.hostname;
const url = window.location.protocol+'//'+window.location.hostname+(window.location.port ? ':'+window.location.port: '');
const GAMEPORT = process.env.PORT || 8000
const importedGames = [
    { game: FirGame, board: FirBoard}
];

const LobbyView = () => (
    <div style={{ padding: 50 }}>
        <h1>Lobby</h1>

        <Lobby
            gameServer={(process.env.NODE_ENV === 'production') ? `${url}` : `${window.location.hostname}:${GAMEPORT}`}
            lobbyServer={(process.env.NODE_ENV === 'production') ? `${url}` : `${window.location.hostname}:${GAMEPORT}`}
            gameComponents={importedGames}
        />
    </div>
);

export default LobbyView;