import React, { Component } from 'react'
import {Route, Switch} from 'react-router-dom'
/*
import Users from './components/users'
import User from './components/user'
import AddUserForm from './components/addUser'
import CreateGame from './components/createGame'*/
import CardsLogic from './gameLogic.js'
import {Link} from 'react-router-dom'
class Home extends Component {



    render() {
        return (
            <div>
               
                {/* <Route path="/game" component={CardsLogic} /> */}
                <h1>Home</h1>
                <Link to="/game">Game</Link>
            </div>
        )
    }
}

export default Home;