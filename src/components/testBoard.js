import React, {Component} from 'react';

class gameBoardTest extends Component {
    render() {
        let tsbody = [];
        for (let i = 0; i < 10; i++) {
          let spaces = [];
          for (let j = 0; j < 10; j++) {
            const spaceId = 10 * i + j;
            spaces.push(
              <td
                key={spaceId}
                className={this.isActive(spaceId) ? 'active' : ''}
                onClick={() => this.onClick(id)}
              >{id}
                {this.props.G.spaces[id]}
              </td>
            );
          }
          tsbody.push(<tr key={i}>{spaces}</tr>);
        }
    }


}

export default gameBoardTest