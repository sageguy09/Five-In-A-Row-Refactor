import React, { Component } from 'react';


const userComp = (userObj) => {
    return (<div>
        <h2> { userObj.userName }</h2>
        <ul>
            <li>{userObj.password}</li>
            <li>{userObj.firstName}</li>
            <li>{userObj.email}</li>
            <li>{userObj.location}</li>
        </ul>
        </div>
    )
}
class singleUser extends React.Component {
    state = 
        { user: 
                {userName: "testUserState",
                password: "testPassState",
                firstName: "testNameState",
                email: "testemailState",
                location: "testLocState"
                //games: [{gameID: "5d83ea5a0fb61640b1698a7c"}]  
                }
              
        }
    
    componentDidMount() {
        this.getOne();
    }


    getOne = () => {
        fetch('api/user/user/5d87e46eb06f86f183ad6e59')
        .then(res => res.json())
        .then((res) => {
            //console.log('from getOne: ' + res)
            this.setState({ user: {...res}})
        })
    }


    render()  {
        return (
        <div>
            <h1>message list h1</h1>
            {userComp(this.state.user)}
            {/* {this.state.user.map(user => (
                userComp(user)
            ))} */}
        </div>
        )
    }
}

export default singleUser;




/*
    getUsersFromServer = () => {
        fetch('api/user/users')
            .then(res => res.json())
            .then ( users => {
                //console.log(users);
                //this.setListOfUsers(users)
                this.getUser()
            })
        }

        //this line is just returngin the first user
        getUser() {
            getFirstUser()
                .then(user => {
                    this.setState({ users: {...user}})
                })
        }

        //this line is no longer working...
        setListOfUsers = (users) => {
            let userList = {...this.state.users}
            console.log(userList)
            userList.users = users
            console.log(users)
            this.setState({ users: {...userList.users} })
        }
        */



    //         {
    //             console.log(listOfUsers)
    //             this.setListOfUsers(listOfUsers)
    //         })
    // }

    /*

      getUsersFromServer() {
        fetch('api/fir/user/users')
            .then(listOfUsers => {
                console.log(listOfUsers)
                this.setListOfUsers(listOfUsers)
            })
    }
   

    
    }*/
/*

    getUsersFromServer = () => {
        fetch('api/fir/user/users')
        .then(res => res.json()) //converts from jso string to js object
                                //e.g: "{messages: ["message
        .then(listOfMessages => {
            this.setMessageList(listOfMessages)
        })
    }*/

    /*
const getAllUsers = () =>
    fetch('api/user/users')
    .then(res => res.json())
    .catch(() => [])

const getFirstUser = () =>
    getAllUsers().then(usr => usr.length < 1 ? { 
        userName: "naUser", 
        password: "naPass", 
        firstName: "naName", 
        email: "naEmail", 
        location: "naLocation"} : usr[0])
        */