import { Client } from 'boardgame.io/react';
import { INVALID_MOVE, TurnOrder } from 'boardgame.io/core';
import {initialState, drawCard, dealCards, playCard, playOnSpace } from './gameFunctions'
import firBoard from './gameBoard';
import App from '../App';


function IsVictory(cells) {
    const positions = [
        [0, 1, 2, 3, 4],
        [1, 2, 3, 4, 5],
        [2, 3, 4, 5, 6],
        [3, 4, 5, 6, 7],
        [4, 5, 6, 7, 8],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [11, 12, 13, 14, 15],
        [12, 13, 14, 15, 16],
        [13, 14, 15, 16, 17],
        [14, 15, 16, 17, 18],
        [15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24],
        [21, 22, 23, 24, 25],
        [22, 23, 24, 25, 26],
        [23, 24, 25, 26, 27],
        [24, 25, 26, 27, 28],
        [25, 26, 27, 28, 29],
        [30, 31, 32, 33, 34],
        [31, 32, 33, 34, 35],
        [32, 33, 34, 35, 36],
        [33, 34, 35, 36, 37],
        [34, 35, 36, 37, 38],
        [35, 36, 37, 38, 39],
        [40, 41, 42, 43, 44],
        [41, 42, 43, 44, 45],
        [42, 43, 44, 45, 46],
        [43, 44, 45, 46, 47],
        [44, 45, 46, 47, 48],
        [45, 46, 47, 48, 49],
        [50, 51, 52, 53, 54],
        [51, 52, 53, 54, 55],
        [52, 53, 54, 55, 56],
        [53, 54, 55, 56, 57],
        [54, 55, 56, 57, 58],
        [55, 56, 57, 58, 59],
        [60, 61, 62, 63, 64],
        [61, 62, 63, 64, 65],
        [62, 63, 64, 65, 66],
        [63, 64, 65, 66, 67],
        [64, 65, 66, 67, 68],
        [65, 66, 67, 68, 69],
        [70, 71, 72, 73, 74],
        [71, 72, 73, 74, 75],
        [72, 73, 74, 75, 76],
        [73, 74, 75, 76, 77],
        [74, 75, 76, 77, 78],
        [75, 76, 77, 78, 79],
        [80, 81, 82, 83, 84],
        [81, 82, 83, 84, 85],
        [82, 83, 84, 85, 86],
        [83, 84, 85, 86, 87],
        [84, 85, 86, 87, 88],
        [85, 86, 87, 88, 89],
        [90, 91, 92, 93, 94],
        [91, 92, 93, 94, 95],
        [92, 93, 94, 95, 96],
        [93, 94, 95, 96, 97],
        [94, 95, 96, 97, 98],
        [95, 96, 97, 98, 99],
        //vertical postitions
        [0, 10, 20, 30, 40],
        [10, 20, 30, 40, 50],
        [20, 30, 40, 50, 60],
        [30, 40, 50, 60, 70],
        [40, 50, 60, 70, 80],
        [50, 60, 70, 80, 90],
        [1, 11, 21, 31, 41],
        [11, 21, 31, 41, 51],
        [21, 31, 41, 51, 61],
        [31, 41, 51, 61, 71],
        [41, 51, 61, 71, 81],
        [51, 61, 71, 81, 91],
        [2, 12, 22, 32, 42],
        [12, 22, 32, 42, 52],
        [22, 32, 42, 52, 62],
        [32, 42, 52, 62, 72],
        [42, 52, 62, 72, 82],
        [52, 62, 72, 82, 92],
        [3, 13, 23, 33, 43],
        [13, 23, 33, 43, 53],
        [23, 33, 43, 53, 63],
        [33, 43, 53, 63, 73],
        [43, 53, 63, 73, 83],
        [53, 63, 73, 83, 93],
        [4, 14, 24, 34, 44],
        [14, 24, 34, 44, 54],
        [24, 34, 44, 54, 64],
        [34, 44, 54, 64, 74],
        [44, 54, 64, 74, 84],
        [54, 64, 74, 84, 94],
        [5, 15, 25, 35, 45],
        [15, 25, 35, 45, 55],
        [25, 35, 45, 55, 65],
        [35, 45, 55, 65, 75],
        [45, 55, 65, 75, 85],
        [55, 65, 75, 85, 95],
        [6, 16, 26, 36, 46],
        [16, 26, 36, 46, 56],
        [26, 36, 46, 56, 66],
        [36, 46, 56, 66, 76],
        [46, 56, 66, 76, 86],
        [56, 66, 76, 86, 96],
        [7, 17, 27, 37, 47],
        [17, 27, 37, 47, 57],
        [27, 37, 47, 57, 67],
        [37, 47, 57, 67, 77],
        [47, 57, 67, 77, 87],
        [57, 67, 77, 87, 97],
        [8, 18, 28, 38, 48],
        [18, 28, 38, 48, 58],
        [28, 38, 48, 58, 68],
        [38, 48, 58, 68, 78],
        [48, 58, 68, 78, 88],
        [58, 68, 78, 88, 98],
        [9, 19, 29, 39, 49],
        [19, 29, 39, 49, 59],
        [29, 39, 49, 59, 69],
        [39, 49, 59, 69, 79],
        [49, 59, 69, 79, 89],
        [59, 69, 79, 89, 99],
        //L>R Diagonal 
        [5, 16, 27, 38, 49],
        [4, 15, 26, 37, 48],
        [15, 26, 37, 48, 59],
        [3, 14, 25, 36, 57],
        [14, 25, 36, 47, 48],
        [25, 36, 47, 58, 69],
        [2, 13, 24, 35, 46],
        [13, 24, 35, 46, 57],
        [24, 35, 46, 57, 68],
        [35, 46, 57, 68, 79],
        [1, 12, 23, 34, 45],
        [12, 23, 34, 45, 56],
        [23, 34, 45, 56, 67],
        [34, 45, 56, 67, 78],
        [45, 56, 67, 78, 89],
        [0, 11, 22, 33, 44],
        [11, 22, 33, 44, 55],
        [22, 33, 44, 55, 66],
        [33, 44, 55, 66, 77],
        [44, 55, 66, 77, 88],
        [55, 66, 77, 88, 99],
        [10, 21, 32, 43, 54],
        [21, 32, 43, 54, 65],
        [32, 43, 54, 65, 76],
        [43, 54, 65, 76, 87],
        [54, 65, 76, 87, 98],
        [20, 31, 42, 53, 64],
        [31, 42, 53, 64, 75],
        [42, 53, 64, 75, 86],
        [53, 64, 75, 86, 97],
        [30, 41, 52, 63, 74],
        [41, 52, 63, 74, 85],
        [52, 63, 74, 85, 96],
        [40, 51, 62, 73, 84],
        [51, 62, 73, 84, 95],
        [50, 61, 72, 83, 94],
        //R>L Diagonally
        [40, 31, 22, 13, 4],
        [50, 41, 32, 23, 14],
        [41, 32, 23, 14, 5],
        [60, 51, 42, 33, 24],
        [51, 42, 33, 24, 15],
        [42, 33, 24, 15, 6],
        [70, 61, 52, 43, 34],
        [61, 52, 43, 34, 25],
        [52, 43, 34, 25, 16],
        [43, 34, 25, 16, 7],
        [80, 71, 62, 53, 44],
        [71, 62, 53, 44, 35],
        [62, 53, 44, 35, 26],
        [53, 44, 35, 26, 17],
        [44, 35, 26, 17, 8],
        [90, 81, 72, 63, 54],
        [81, 72, 63, 54, 45],
        [72, 63, 54, 45, 36],
        [63, 54, 45, 36, 27],
        [54, 45, 36, 27, 18],
        [45, 36, 27, 18, 9],
        [91, 82, 73, 64, 55],
        [82, 73, 64, 55, 46],
        [73, 64, 55, 46, 37],
        [64, 55, 46, 37, 28],
        [55, 46, 37, 28, 19],
        [92, 83, 74, 65, 56],
        [83, 74, 65, 56, 47],
        [74, 65, 56, 47, 38],
        [65, 56, 47, 38, 29],
        [93, 84, 75, 66, 57],
        [84, 75, 66, 57, 48],
        [75, 66, 57, 48, 39],
        [94, 85, 76, 67, 58],
        [85, 76, 67, 58, 49],
        [95, 86, 77, 68, 59]        
    ]
    for (let pos of positions) {
        const symbol = cells[pos[0]];
        let winner = symbol;
        for (let i of pos) {
          if (cells[i] != symbol) {
            winner = null;
            break;
          }
        }
        if (winner != null) return true;
      }
    
      return false;
}

//return true if all 'cells ' are occupied
function IsDraw(cells) {
    return cells.filter(c => c === null).length == 0;
}


const fir  = {
    setup: initialState, 
    moves: { dealCards },
    turn: {
      order: TurnOrder.RESET,
      stages: {
        play: {
          moves: {playOnSpace}
        }
      }
    },
    phases: {
      getCards: {
        moves: {dealCards},
        onBegin: dealCards,
        endIf: (G,ctx) => (G.board.deck.length <= (100 - (ctx.numPlayers*4))),
        start: true,
        next: 'playGame',
      },
      playGame: {
        // onBegin: ctx => {ctx.playOrderPos= 0},
        moves: {drawCard, playCard}
      }
    },

    endIf: (G, ctx) => {
            if (IsVictory(G.cells)) {
                return { winner: ctx.currentPlayer };
            }
            if (IsDraw(G.cells)) {
                return { draw: true };
            }
    }
};

const FiveInARow = Client({
    game: fir,
    board: firBoard,
   //multiplayer: {local: true},
    // multiplayer: { server: 'localhost:3000'},
    //numOfPlayers: 2, 
    debug: true
});


export default FiveInARow;