import React, {Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './components/Home'
import './App.css';
import {Link} from 'react-router-dom'
import FiveInARow from './components/gameLogic'
import CreateGame from './components/createGame'
class App extends Component {


  render() {
    return ( 
      <div>
        <FiveInARow />
      </div>
    )
  }
}
export default App;
/*Ryan
<CardsLogic gameID="test" playerID="0" />
Allison
<CardsLogic gameID="test"  playerID="1" />*/
