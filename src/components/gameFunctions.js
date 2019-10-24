import cardObjs from './cardObjects.json'
import spaceObjs from './spaceMapping.json'
import { INVALID_MOVE } from 'boardgame.io/core'




function initialState(ctx, state) {

    
    let cardId = 0;
    let cards = [];

    cardObjs.forEach(card => {
        cards.push({
            id: cardId++,
            cardObj: card
        })
    })
    let spaceId = 0;
    let spaces = []
    spaceObjs.forEach(space => {
        spaces.push({
            id: spaceId++,
            spaceObj: space
        })
    })
    //let deckArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    //let deck = ctx.random.Shuffle(deckArray)
    return state || {
        board: {
            deck: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            burn: [],
            boardArray :  [
                90, 91, 92, 93, 94, 95, 96, 97, 98, 99,
                89, 42, 43, 44, 45, 46, 47, 48, 49, 64,
                88, 41, 20, 21, 22, 23, 24, 25, 50, 65,
                87, 41, 20, 6, 7, 8, 9, 25, 50, 65, 
                86, 39, 18, 5, 0, 1, 10, 27, 52, 67,
                85, 38, 17, 4, 3, 2, 11, 28, 53, 68,
                84, 37, 16, 15, 14, 13, 12, 29, 54, 69,
                83, 36, 35, 34, 33, 32, 31, 30, 55, 70,
                82, 63, 62, 61, 60, 59, 58, 57, 56, 71,
                81, 80, 79, 78, 77, 76, 75, 74, 73, 72
              ]
        },
        player_0: {
            hand: []
        },
        player_1: {
            hand: []
        },
        cells: Array(100).fill(null),
        spaces,
        cards,
        
    }
}


const dealCards = (currentState, ctx) => {
    //let players = ["player_0", "player_1"]

    //players.forEach(playerid => {
    for(let i=0; i< ctx.numPlayers; i++){ 
    for(let j = 0; j < 4; j++){
            let playerId = ("player_"+i)
            let boardId="board"
            let currentBoard = currentState[boardId]
            let selectedPlayer = currentState[playerId]
            let deck = currentBoard.deck
            let hand = selectedPlayer.hand
            hand.push(deck.pop());
            let player = {...selectedPlayer, hand};
            let board = {...currentBoard, deck};
            let state = {...currentState, [playerId]: player, [boardId]: board}
        }  
    }
    return currentState

}

function drawCard(currentState, ctx) {
    let {currentPlayer, playerId} = getCurrentPlayer(currentState, ctx);
    if (currentPlayer.hand.length >= 4){
        return INVALID_MOVE;
    }
    let boardId="board"
    let currentBoard = currentState[boardId]
    //add last card from board.deck to currentPlayer hand
    let deckIndex = currentBoard.deck.length - 1; 
    let hand = ImmutableArray.append(currentPlayer.hand, currentBoard.deck[deckIndex]);
    //remove the last card in deck
    let deck = ImmutableArray.removeAt(currentBoard.deck, deckIndex);
    let player = {...currentPlayer, hand};
    let board = {...currentBoard, deck};
    let state = {...currentState, [playerId]: player, [boardId]: board}
    ctx.events.endTurn();
    return state;
    
}

function playCard(currentState, ctx, cardId) {
    let {currentPlayer, playerId} = getCurrentPlayer(currentState, ctx);
    let boardId="board"
    let currentBoard = currentState[boardId]
    //find the card in hand, add hand.card to  burn
    let handIndex = currentPlayer.hand.indexOf(cardId);
    //let id = cardId
    //let cellIndex = currentBoard.cells[cardId]
    //playOnSpace(currentBoard.)
    //let cells = ImmutableArray.append(currentBoard.cells, currentPlayer.hand[handIndex])
    let burn = ImmutableArray.append(currentBoard.burn, currentPlayer.hand[handIndex])
    //remove card from player hand. 
    let hand = ImmutableArray.removeAt(currentPlayer.hand, handIndex)
    //construct and return a new state object with changes.
    let player = {...currentPlayer, hand};
    let board = {...currentBoard, burn};
    let state = {...currentState, [playerId]: player, [boardId]: board};
    ctx.events.setActivePlayers({player: 'play', moveLimit: 1})
    return state;
}

function playOnSpace(G, ctx) {
    let playedCard = G.board.burn[G.board.burn.length-1]
        console.log (playedCard+ "was played")
    if (G.cells[playedCard] != null || G.cells[playedCard] < playedCard) {
        return INVALID_MOVE;
    }
    G.cells[playedCard] = ctx.currentPlayer;
    ctx.events.endTurn();
    //let spaceIndex = ctx.board.spaces
    // if (G.spaceId[spaceId] !== null || G.spaceId ) {
    //     return INVALID_MOVE;
    // }
    // //fill cell with 0 or 1 depending the current player.
    // G.spaceId[spaceId] = ctx.currentPlayer;
}

function clickCell(G, ctx, id) {
    if (G.cells[id] !== null ) {
        return INVALID_MOVE;
    }
    //fill cell with 0 or 1 depending the current player.
    G.cells[id] = ctx.currentPlayer;
    ctx.events.endTurn();
    console.log('post state: '+G.cells[id])
    //console.log('postCTX: '+{ctx})
}

function getCurrentPlayer(state, ctx) {
    let playerId = "player_" + ctx.currentPlayer;
    let currentPlayer = state[playerId];
    return {currentPlayer, playerId};
}

const getPlayers = (ctx) => {
    let players = [];
     ctx.playOrder.forEach(function (playerId){
        players.push("player_"+playerId)
    })
    return players
}

const ImmutableArray = {
    append(arr, value) {
        return [...arr, value];
    },
    removeAt(arr, index) {
        return [...arr.slice(0, index), ...arr.slice(index + 1)];
    },
};

//create function onTurnStart that will check the players turn to ensure they 
//have enough cards to to playCard




//checkCards[]
export {initialState, dealCards, drawCard, playCard, playOnSpace, clickCell}




/*
class cardObjcts extends React.Component {
    state = { cards: [] }

    componentDidMount   () {
        this.getAll()
    }

    getAll = () => {
        fetch('api/fir/cards')
        .then(res => res.json())
        .then((res) => {
            console.log('from getALL: ' + res)
            this.setState({ users: res})
        })
    }
render()
return  (this.state.cardObjcts)
}*/




/*
const dealInitialCards = (currentState, ctx) => { 
    let {currentPlayer, playerId} = getCurrentPlayer(currentState, ctx);
    let boardId="board"
    let currentBoard = currentState[boardId]
    console.log(currentBoard)
    //let selectedPlayer = currentState[playerId]
    // let deck = currentBoard.deck
    
    for(let j = 0; j < 4; j++){
            //let playerId = ("player_"+i)
            let slice = deck.slice(j)
            hand.push(slice);
        }
        // let slice = deck.slice (0, 4)
        // let hand = slice
        let player = {...currentPlayer, hand};
        let board = {...currentBoard, deck};
        let state = {...currentState, [playerId]: player, [boardId]: board}
        console.log(state)
        return state
}*/






/*
function getCurrentBoard(state, "board") {
    let boardId =  ctx.currentBoard;
    let currentBoard = state[boardId];
    return {currentBoard, boardId};
}*/

/*
function initialState1() {
    return {
        cards: ["one", "two", "three", "four", "five", "six"],
        player_0: {
            deck: [0, 1, 2, 3],
            hand: [],
            field: []
        },
        player_1: {
            deck: [4, 5, 6, 7],
            hand: [],
            field: []
        }
    };
}

function drawCard1(currentState) {
    // TODO: we'll need a way to know which is the current player 
    // at some point.
    // but for now let's assume it's player 0.
    let playerID = "player_0";
    let currentPlayer = currentState[playerID];
    // Add the last card in the player's deck to their hand.
    let deckIndex = currentPlayer.deck.length - 1;
    let hand = [...currentPlayer.hand, currentPlayer.deck[deckIndex]];
    // Remove the last card in the deck.
    let deck = currentPlayer.deck.slice(0, deckIndex);
    // Construct and return a new state object with our changes.
    let player = { ...currentPlayer, hand, deck };
    let state = { ...currentState, [playerID]: player };
    return state;
}

let state_0 = initialState1();
let state_1 = drawCard1(state_0);
console.log('state_0', state_0);
console.log('state_1', state_1);
*/



/*
function drawCard(currentState) {
    let playerId= "player_0";
    let boardId= "board"
    let currentPlayer = currentState[playerId];
    let currentBoard = currentState[boardId]
    //add last card from board.deck to currentPlayer hand
    let deckIndex = currentBoard.deck.length - 1; 
    let hand = [...currentPlayer.hand, currentBoard.deck[deckIndex]];
    //remove the last card in deck
    let deck = currentBoard.deck.slice(0, deckIndex);
    let player = {...currentPlayer, hand};
    let board = {...currentBoard, deck};
    let state = {...currentState, [playerId]: player, [boardId]: board}
    return state;
}

function playCard(currentState, ctx, cardId) {
    let playerId = "player_0"; 
    let boardId="board"
    let currentPlayer = currentState[playerId];
    let currentBoard = currentState[boardId]
    //find the card in hand and add to burn
    let handIndex = currentPlayer.hand.indexOf(cardId);
    let lastPlayed = [...currentBoard.lastPlayed, currentPlayer.hand[handIndex]];
    //remove card from player hand. 
    let hand = [...currentPlayer.hand.slice(0, handIndex), ...currentPlayer.hand.slice(handIndex+1)];
    //construct and return a new state object with changes.
    let player = {...currentPlayer, hand};
    let board = {...currentBoard, lastPlayed};
    let state = {...currentState, [playerId]: player, [boardId]: board};
    return state;
}


function constructStateForPlayer(currentState, playerId, playerState) {
    let newPlayerState = Object.assign({}, currentState[playerId], playerState);
    return {...currentState, [playerId]: newPlayerState};
}

function constructStateForBoard(currentState, boardId, boardState) {
    let newBoardState = Object.assign({}, currentState[boardId], boardState);
    return {...currentState, [boardId]: newBoardState};
}



build a  function for this where you are combinng these together to see if you 
can build a constructor for state from the passed values
let player = {...currentPlayer, hand};
    let board = {...currentBoard, lastPlayed};
    let state = {...currentState, [playerId]: player, [boardId]: board};
    return state;
    function constructState(currentState)
    */


/*
old test scripts
let state_One = initialState();
let state_Two = drawCard(state_One);
console.log('state_One', state_One)
console.log('state_Two', state_Two)
*/

    /*
    //called above initial state
    const getAllCards = () => {
    return fetch('api/fir/cards')
        .then(res => res.json())
    }
    //called initial state
    const cardObjs = [];
    getAllCards()
        .then(res => res.json())
        .then((data) => {
            cardObjs = data
        })*/