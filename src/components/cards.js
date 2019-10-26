import {initialState, drawCard, dealCards, playCard} from './gameFunctions'
import cardObjs from './cardObjects.json'
import { isMainThread } from 'worker_threads';
import { PluginPlayer } from 'boardgame.io/core'
const mockCtx = {
    numPlayers: 2,
    turn: 0,
    currentPlayer: "0",
    currentBoard: "1",
    playOrder: ["0", "1"]
};
let cardId = 0;
let mockCards = [];
cardObjs.forEach(card => {
    mockCards.push({
        id: cardId++,
        cardObj: card
    })
})


let mockState = {
    board: {
        deck: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        burn: [],
        boardArray :  [
            90, 91, 92, 93, 94, 95, 96, 97, 98, 99,
            89, 42, 43, 44, 45, 46, 47, 48, 49, 64,
            88, 41, 20, 21, 22, 23, 24, 25, 50, 65,
            87, 41, 20, 21, 22, 23, 24, 25, 50, 65, 
            86, 39, 18, 5, 0, 1, 10, 27, 52, 67,
            85, 38, 17, 4, 3, 2, 11, 28, 53, 68,
            84, 37, 16, 15, 14, 13, 12, 29, 54, 69,
            83, 36, 35, 34, 33, 32, 31, 30, 55, 70,
            82, 63, 62, 61, 60, 59, 58, 57, 56, 71,
            81, 80, 79, 78, 77, 76, 75, 74, 73, 72
          ]
    },
    players: {
        '0': {
            hand: []
        },
        '1': {
            hand: []
        },
        cells: Array(100).fill(null),
        spaces,
        cards,
        
    }
    // cells: Array(100).fill(null),
    // cards: mockCards
}
//Error: An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.


test('dealing a card', () => {
    let state_1 = initialState(mockCtx, mockState);
    //console.log(state_1)
    let state_2 = dealCards(state_1, mockCtx)
    console.log(state_2)
    //expect(state_1.board.deck.length).toEqual(10);
    //console.log(state_2)
    //console.log(state_2)
    //expect(state_2.player_0.hand).toEqual([10,9,8,7])
})
/*
test('drawing a card', () => {
    let state_One = initialState(mockCtx, mockState);
    let state_Two = drawCard(state_One, mockCtx);
    //initial  board.deck expectation
    expect(state_One.board.deck).toEqual([1, 2, 3, 4, 5]);
    //post drawCard(state_One) board.deck expectation 
    expect(state_Two.board.deck).toEqual([1, 2, 3, 4]);
    //initial player_0.hand expectation
    //console.log(state_One.player_0.hand)
    expect(state_One.player_0.hand).toEqual([]);
    // post drawCard(state_One) player_0.hand
    expect(state_Two.player_0.hand).toEqual([5]);
})

test('playing a card', () => {
    let state_1 = initialState(mockCtx, mockState);
    console.log(state_1.cards.length)
    let state_2 = drawCard(state_1, mockCtx);
    let state_3 = playCard(state_2, mockCtx, 5);
    //initial board.burn expectation
    expect(state_2.board.burn).toEqual([]);
    //initial player_0.hand expectation
    expect(state_2.player_0.hand).toEqual([5]);
    //post playCard board.burn expectation
    expect(state_3.board.burn).toEqual([5])
    //post playCard player_0.hand expectation
    expect(state_3.player_0.hand).toEqual([])

})

*/


/*
let state_One = initialState();
let state_Two = drawCard(state_One);
console.log('state_One', state_One)
console.log('state_Two', state_Two)
*/
export {initialState, drawCard}




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