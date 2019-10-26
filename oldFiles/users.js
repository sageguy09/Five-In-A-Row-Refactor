import React, { Component } from 'react';


const userComp = (userObj) => {
    console.log("log from userComp:" + userObj)
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

const userListing = (users) => 
    (<div>{users.map(userComp)}</div>)


class usersList extends React.Component {
    state = 
    { users: [] }

    componentDidMount   () {
        this.getAll()
    }

    getAll = () => {
        fetch('api/user/users')
        .then(res => res.json())
        .then((res) => {
            console.log('from getALL: ' + res)
            this.setState({ users: res})
        })
    }
    render()  {
        return (
        <div>
            <h1>message list h1</h1>
            {/* {userListing(this.state.users)} */}
            {this.state.users.map(users => (
                userComp(users)
            ))}
        </div>
        )
    }
}

export default usersList;





    /*


    const getAllUsers = () =>
    fetch('api/user/users')
    .then(res => res.json())
    .catch(() => [])

    getAllUsers() {
        getAllUsers()
            //.then(users => Promise.all(users.map(userListing)))
            .then(users => {
                this.setState({ users: [...users]})
            });
    }
    */




/*

    getUsersFromServer = () => {
        fetch('api/user/users')
            .then(res => res.json())
            .then ( users => {
                //console.log(users);
                //this.setListOfUsers(users)
                this.getUsers()
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
        //this line is just returngin the first user
        getUsers(){
            getFirstUser()
                .then(user => {
                    this.setState({ users: {...user}})
                })
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