import React, {Component} from 'react';

class gameBoard extends Component {
/*
onClick = id => {
        if (this.isActive(id)) {
          this.props.moves.clickCell(id);
        }
      };
    
      isActive(id) {
        if (!this.props.isActive) return false;
        if (this.props.G.cells[id] !== null) return false;
        return true;
      }
    */
   //called by onClick event. checks if cell is active
   //if active allow move to happen
    onClick = id => {
        if (this.isActive(id)) {
          this.props.moves.playOnSpace(id);
        }
      };
      
      isActive(id) {
        if (!this.props.isActive) return false;
        if (this.props.G.spaces[id] !== null) return false;
        return true;
      }
    
      render() {
        let tbody = [];
        for (let i = 0; i < 10; i++) {
          let cells = [];
          for (let j = 0; j < 10; j++) {
            const id = 10 * i + j;
            cells.push(
              <td
                key={id}
                className={this.isActive(id) ? 'active' : ''}
                onClick={() => this.onClick(id)}
              >{id}
                {this.props.G.cells[id]}
              </td>
            );
          }
          tbody.push(<tr key={i}>{cells}</tr>);
        }
    
        let winner = null;
        if (this.props.ctx.gameover) {
          winner =
            this.props.ctx.gameover.winner !== undefined ? (
              <div id="winner">Winner: {this.props.ctx.gameover.winner}</div>
            ) : (
                <div id="winner">Draw!</div>
              );
        }
    
        return (
          <div>
            <table id="board">
              <tbody>{tbody}</tbody>
            </table>
            {winner}
          </div>
        );
      }
    }

export default gameBoard;

boardArray = [
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