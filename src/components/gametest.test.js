import {initialState, dealCards, drawCard, playCard, playOnSpace,} from './gameFuncTest'

import { isMainThread } from 'worker_threads';
import { tsExternalModuleReference, exportAllDeclaration } from '@babel/types';

const mockCtx = {
    numPlayers: 2,
    turn: 0,
    currentPlayer: "0",
    currentBoard: "1",
    playOrder: ["0", "1"]
};



let mockState = {
    board: {
        deck: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        burn: [],
        playedSpaces: [],   
    },
    players: {
        0 : {hand: []},
        1 : {hand: []}
      },
        cells: Array(100).fill(null),        
    }
// test('drawing a card', () => {
//     let state_1 = initialState(mockCtx, mockState)
//     expect(state_1.players[0].hand.length).toEqual(0)
//     let state_2 = drawCard(state_1, mockCtx)
//     //console.log(state_2.players[0].hand)
//     expect(state_2.players[0].hand.length).toEqual(1)
// })

// test('playing a card', () => {
//     let state_1 = initialState(mockCtx, mockState)
//     expect(state_1.players[0].hand.length).toEqual(0)
//     let state_2 = drawCard(state_1, mockCtx);
//     expect(state_2.players[0].hand.length).toEqual(1)
//     let state_3 = playCard(state_2, mockCtx, 10)
//     expect(state_3.players[0].hand.length).toEqual(0)
// })

test('dealing initial cards', () => {
    let state_4 = initialState(mockCtx, mockState)
    expect(state_4.players[0].hand.length).toEqual(0)
    let state_5 = dealCards(mockState, mockCtx)    
    expect(state_5.players[0].hand.length).toEqual(4)
    expect(state_5.players[1].hand.length).toEqual(4)
})

test('playing card on space', () => {
    let state_6 = initialState(mockCtx, mockState)
    console.log(state_6.players[0].hand)
    expect(state_6.cells[10]).toEqual(null)
    let state_7 = playOnSpace(mockState, mockCtx, mockState.players[0].hand[1])
    console.log(state_7)
    expect(state_7.cells[mockState.players[0].hand[1]]).toEqual(mockCtx.currentPlayer)
})