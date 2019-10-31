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
            boardArray :  [
                90, 91, 92, 93, 94, 95, 96, 97, 98, 99,
                89, 42, 43, 44, 45, 46, 47, 48, 49, 64,
                88, 41, 20, 21, 22, 23, 24, 25, 50, 65,
                87, 40, 19, 6,   7,  8,  9, 26, 51, 66, 
                86, 39, 18, 5,   0,  1, 10, 27, 52, 67,
                85, 38, 17, 4,   3,  2, 11, 28, 53, 68,
                84, 37, 16, 15, 14, 13, 12, 29, 54, 69,
                83, 36, 35, 34, 33, 32, 31, 30, 55, 70,
                82, 63, 62, 61, 60, 59, 58, 57, 56, 71,
                81, 80, 79, 78, 77, 76, 75, 74, 73, 72
              ],
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
            currentBoard.lastMove = 'Cards have been dealt. Waiting on player to make move'
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
    let move = 'drew a card'
    let player = {...currentPlayer, hand: hand}
    let playersu = {...currentPlayers, [playerId]: player }
    //console.log(players)
    let board = {...currentBoard, deck: deck, lastMove: move};
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
    currentState.board.playedSpaces = ImmutableArray.append(currentState.board.playedSpaces, currentState.board.boardArray[id])
    ctx.events.endTurn();
    
    return currentState
    

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

