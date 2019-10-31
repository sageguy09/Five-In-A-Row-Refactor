import cardObjs from './cardObjects.json'
import spaceObjs from './spaceMapping.json'
import { INVALID_MOVE } from 'boardgame.io/core'



function initialState(ctx, state) {
    let deckArray = []
    for (let c = 0; c<100; c++){
        deckArray.push(c)
    }
    let deck = ctx.random.Shuffle(deckArray)
    return state || {
        players: {
            0 : {hand: []},
            1 : {hand: []}
          },
        board: {
            //deck: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            burn: [],
            deck,
            playedSpaces: [], 
            lastMove: ''
        },
        
        cells: Array(100).fill(null),
    }
}


const dealCards = (currentState, ctx) => {
    for(let i=0; i< ctx.numPlayers; i++){ 
    for(let j = 0; j < 4; j++){
            let playerId = (i)
            let currentPlayers = currentState.players
            let selectedPlayer = currentState.players[playerId]
            let boardId="board"
            let currentBoard = currentState[boardId]
            let deck = currentBoard.deck
            let hand = selectedPlayer.hand
            hand.push(deck.pop());
            let player = {...selectedPlayer,  hand: hand};
            let playersu = {...currentPlayers,  [playerId]: player}
            let board = {...currentBoard, deck};
            let state = {...currentState, players: playersu, [boardId]: board}
        }  
    }
    return currentState
}

const drawCard = (currentState, ctx) => {

    let playerId = ctx.currentPlayer
    let currentPlayers = currentState.players
    let currentPlayer = currentState.players[playerId]
    if (currentPlayer.hand.length >= 4){
        return INVALID_MOVE;
    }
    let boardId = "board"
    let currentBoard = currentState[boardId]
    let deckIndex = currentBoard.deck.length - 1; 
    let hand = ImmutableArray.append(currentPlayer.hand, currentBoard.deck[deckIndex]);
    let deck = ImmutableArray.removeAt(currentBoard.deck, deckIndex);
    let player = {...currentPlayer, hand: hand}
    let playersu = {...currentPlayers, [playerId]: player }
    //console.log(players)
    let board = {...currentBoard, deck};
    let state = {...currentState,  players: playersu, [boardId]: board}
    ctx.events.endTurn();
    return(state)
}

const playCard = (currentState, ctx, cardId) => {

    let playerId = ctx.currentPlayer
    let currentPlayers = currentState.players
    let currentPlayer = currentState.players[playerId]
    if (currentPlayer.hand.length <= 0){
        return INVALID_MOVE;
    }
    let boardId="board"
    let currentBoard = currentState[boardId]
    //find the card in hand, add hand.card to  burn
    let handIndex = currentPlayer.hand.indexOf(cardId);
    let burn = ImmutableArray.append(currentBoard.burn, currentPlayer.hand[handIndex])
    //remove card from player hand. 
    let hand = ImmutableArray.removeAt(currentPlayer.hand, handIndex)
    //construct and return a new state object with changes.
    let player = {...currentPlayer, hand: hand}
    let playersu = {...currentPlayers, [playerId]: player }
    let board = {...currentBoard, burn};
    let state = {...currentState,  players: playersu, [boardId]: board}
    //set game to play stage for player to play on a space
    ctx.events.setActivePlayers({player: 'play', moveLimit: 1})
    return (state)
}

const playOnSpace = (currentState, ctx, id) => {
    if (currentState.cells[id] !== null ) {
        return INVALID_MOVE;
    }
    //fill cell with 0 or 1 depending the current player.
    currentState.cells[id] = ctx.currentPlayer;
    currentState.board.playedSpaces = ImmutableArray.append(currentState.board.playedSpaces, id)
    return currentState
    //ctx.events.endTurn();
    //console.log('post state: '+G.cells[id])
    //console.log('postCTX: '+{ctx})
}


const ImmutableArray = {
    append(arr, value) {
        return [...arr, value];
    },
    removeAt(arr, index) {
        return [...arr.slice(0, index), ...arr.slice(index + 1)];
    },
};

export {initialState, dealCards, drawCard, playCard, playOnSpace}

