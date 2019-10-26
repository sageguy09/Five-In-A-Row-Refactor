import React, {Component} from 'react';
// import {Link} from 'react-router-dom'

class gameBoard extends Component {
  onClick = id => {
      if (this.isActive(id) && this.isAvailable(this.props.G.board.boardArray[id])) {
        this.props.moves.playOnSpace(id);
      }
    };
  drawCard = (evnt) => {
    evnt.preventDefault();
    this.props.moves.drawCard()
  }
  playCardById = (id) => {
    this.props.moves.playCard(id)
  }
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
  // playerSwitch = (player) => {
  //   // if (player != this.ctx.currentPlayer) return false
  //   // return true
  //   if (player = "player_0"){
  //   let player0div = document.querySelector('#player_0')
  //   player0div.toggleAttribute("disabled", true)
  //   }
  // }
  playerDivs = (player) => (
  <div className="playerView">
    <ul>
      {this.props.G.players[this.props.ctx.currentPlayer] != undefined ? this.props.G.players[this.props.ctx.currentPlayer].hand.map(this.playerCards) : null }
    </ul>
  </div>
  )
  playerCards = (cards) => (
  <button onClick={() => this.playCardById(cards)}>{cards}</button> 
  )
  currentPlayerCards = (cards) => (
    <button onClick={() => this.playCardById(cards)}>{cards}</button> 
    )
  

  render() {
    
    let tbody = [];
    for (let i = 0; i < 10; i++) {
      let cells = [];
      for (let j = 0; j < 10; j++) {
        const id = 10 * i + j;
        cells.push(
          <td
            key={id}
            className={`${this.isAvailable(this.props.G.board.boardArray[id]) ? 'available': ''} ${this.isActive(id) ? 'active' : 'played'} `} 
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
    
    return (
      <div>
        <h1 align="center">Five in a row</h1>
        <table id="board" align="center">
          <tbody>{tbody}</tbody>
        </table>
        <div align="center">{this.props.G.board.burn[this.props.G.board.burn.length-1]}</div>
        {winner}
        {/* <Link to="/">Home</Link> */}
        <div class="playerView">
          <h3>Current Player: {this.props.ctx.currentPlayer}</h3>
          {this.props.G.players[this.props.ctx.currentPlayer].hand != undefined ? this.props.G.players[this.props.ctx.currentPlayer].hand.map(this.currentPlayerCards) : null }
        </div>
        <div id="player_0" class="playerView playerCont">
          <h3>Player 1</h3>
          <ul>
            {this.props.G.players[0].hand != undefined ? this.props.G.players[0].hand.map(this.playerCards) : null }
          </ul>
          <button onClick={this.drawCard}>Draw Card</button>
          {/* <button onClick={this.playerSwitch("player_0")}>Switch Player</button> */}
        </div>
        
        <div id="player_1" class="playerView playerCont">
          <h3>Player 2</h3>
          <ul>
            {this.props.G.players[1].hand != undefined ? this.props.G.players[1].hand.map(this.playerCards) : null }
          </ul>
          <button onClick={this.drawCard}>Draw Card</button>
        </div>
      </div>
    );
  }
}

export default gameBoard;