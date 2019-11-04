import React from 'react';
//import { Lobby } from 'boardgame.io/react';
import { default as FirBoard } from './firBoard';
import { default as FirGame } from './firGame';
import { default as Lobby } from './lobby/react'
import '../App.css'

FirGame.minPlayers =2 
FirGame.maxPlayers = 3;
FirGame.debug = true;

const hostname = window.location.hostname;
const url = window.location.protocol+'//'+window.location.hostname+(window.location.port ? ':'+window.location.port: '');
const GAMEPORT = process.env.PORT || 8000
const importedGames = [
    { game: FirGame, board: FirBoard}
];

const LobbyView = () => (
    <div>
        <Lobby
            gameServer={(process.env.NODE_ENV === 'production') ? `${url}` : `${window.location.hostname}:${GAMEPORT}`}
            lobbyServer={(process.env.NODE_ENV === 'production') ? `${url}` : `${window.location.hostname}:${GAMEPORT}`}
            gameComponents={importedGames}
        />
    </div>
);

export default LobbyView;