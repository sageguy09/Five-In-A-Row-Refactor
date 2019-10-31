import React from 'react';
import Rules from './rules';

// import {Link} from 'react-router-dom'
import cardback from './cardback.png'

class FirBoard extends React.Component {
  state = {
    showrules: false
  }
  handleRulesClick = (evnt) => {
    evnt.preventDefault();
    //console.log(this.state)//return {showrules: !state.showrules}
    this.setState((state) => {
      return {showrules: !state.showrules}
    })

  }
  onClick = id => {
      if (this.isActive(id) && this.isAvailable(this.props.G.board.boardArray[id])) {
        this.props.moves.playOnSpace(id);
      }
    };
  isActive(id) {
    if (!this.props.isActive) return false;
    if (this.props.G.cells[id] !== null) return false;
    return true;
  }
  isAvailable = (id) => {
  let playedCard = this.props.G.board.burn[this.props.G.board.burn.length-1] 
  if (this.props.ctx.activePlayers === null) return false

  if (id < playedCard) return false
  return true;
  }
  setPlayedSpaceColor = (id) => {
   if (!this.props.isActive) return false;
   if (this.props.G.cells[id] !== null) {
     let playedBy = this.props.G.cells[id]
     return ('plyrClr'+playedBy)
   }
  }
  playCardById = (id) => {
    this.props.moves.playCard(id)
  }

  drawCard = (evnt) => {
    evnt.preventDefault();
    this.props.moves.drawCard()
  }
  undoPlay = () => {
    this.props.undo()
  }


  currentPlayerCards = (cards) => (
    // <button onClick={() => this.playCardById(cards)}>{cards}</button> 
    <div class="handCard" onClick={() => this.playCardById(cards)}><p class="cardVal">{cards}</p></div>
    )
  getOpponentCardCount = (players) => {
    let playerids = Object.keys(players)
    playerids.forEach((player) => {
      console.log(player, players[player].hand)
      return players[player].hand.map(this.opponentCards)
    })
  }
  opponentsHands = (player) => {
    // <div class="opponents">{player.hand.map(this.opponentCards)}</div>
    // Object.keys(players).forEach(player => {
    //   console.log(player)
    // })
    let playercards = this.props.G.players[player].hand.map(this.opponentCards);
    if (this.props.playerID != player){
    return <div>
      <p>Player {player}'s Remaining Cards</p>
      {playercards}
      {/* <img class="oppponentCard" src={cardback}/> */}
      </div>
    }
  }
  opponentCards = (cards) => (
  // <img class="oppponentCard" src="../public/card_back_orange.png"/>
  <img class="opponentCard" src={cardback}/>
   
      //console.log(cards)
    
  )

  // lastMove = () => {
  //   move = this.props.G.board.lastMove
  //   if (move == "")
  //   // <p>{this.props.log[this.props.log.length-1]}</p>
  // }  

  render() {
    
    let tbody = [];
    for (let i = 0; i < 10; i++) {
      let cells = [];
      for (let j = 0; j < 10; j++) {
        const id = 10 * i + j;
        cells.push(
          <td
            key={id}
            className={`
            
            ${this.isAvailable(this.props.G.board.boardArray[id]) ? 'available': `plyrClr${this.props.G.cells[id]}`} 
            ${this.isActive(id) ? 'active' : 'disabled'}
             `} 
            onClick={() => this.onClick(id)}
            id={id}
          >
            {this.props.G.board.boardArray[id]}
            <div hidden>{this.props.G.cells[id]}</div>
          </td>
        );
      }
      tbody.push(<tr key={i}>{cells}</tr>);
    }

    let winner = null;
    if (this.props.ctx.gameover) {
      winner =
        this.props.ctx.gameover.winner !== undefined ? (
          <div id="winner"><h3 align="center">Winner: {this.props.ctx.gameover.winner}</h3></div>
        ) : (
            <div id="winner">Draw!</div>
          );
    }
    let awaitPlayer = null;
    if (!this.props.isActive) {
      awaitPlayer = 
      <div class="playerControls">
        <div id="winner"><h5 align="center">Awaiting other player to make move...</h5></div>
        <div class="playerHand" disabled>
          {this.props.G.players[this.props.playerID].hand != undefined ? this.props.G.players[this.props.playerID].hand.map(this.currentPlayerCards) : null }
        </div>
      </div>
      }
    else {
      awaitPlayer = 
    <div class="playerControls">
      <button onClick={this.drawCard}>Draw Card</button>
      {/* broken due to phases/move assignment <button onClick={() => this.props.undo()}>Undo Play</button> */}
      <div class="playerHand">
        {this.props.G.players[this.props.playerID].hand != undefined ? this.props.G.players[this.props.playerID].hand.map(this.currentPlayerCards) : null }
      </div>
      </div>}
    let prevMove = null;
    if (this.props.G.board.lastMove != null){
      prevMove = 
      <div><h5>Move Log: </h5><p>{this.props.G.board.lastMove}</p></div>
    }
        
    
    return (
      <div>
        <h1 align="center">Five in a Row</h1>
        
        {/* {this.props.G.players != undefined ? this.getOpponentCardCount(this.props.G.players): null} */}
        
        {/* {this.props.G.players != undefined ? this.props.players.forEach(this.opponentsHands): null} */}
        <table id="board" align="center">
          <tbody>{tbody}</tbody>
        </table>
        <div align="center">
          <h5>Current Player: <span class={`plyrClr${this.props.ctx.currentPlayer}`} >{this.props.ctx.currentPlayer}</span></h5>
          {/* <h5>Last Played Card: {this.props.G.board.burn[this.props.G.board.burn.length-1]} on space {this.props.G.board.playedSpaces[this.props.G.board.playedSpaces.length-1]}</h5> */}
          {prevMove}
        </div>
        {winner}
        {/* <Link to="/">Home</Link> */}
        <br/>
        <div align="center">
        
        {awaitPlayer}
        {this.props.G.players != undefined ? Object.keys(this.props.G.players).map(this.opponentsHands) : null}
        {this.state.showrules ? <Rules hideRules={this.handleRulesClick}/>: <button onClick={this.handleRulesClick}>Show Rules</button> }
        {/* {this.props.board.lastMove != undefined ? Object.keys(this.props.log).map(this.lastMove): null} */}
        
        </div>
        
      </div>
    );
  }
}

export default FirBoard;