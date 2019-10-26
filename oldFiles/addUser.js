import React  from 'react';
import { Redirect } from 'react-router-dom'
export default class addUserForm extends React.Component {
    state = 
        { newUser: 
                {userName: "",
                password: "",
                firstName: "",
                email: "",
                location: ""
                //games: [{gameID: "5d83ea5a0fb61640b1698a7c"}]  
                },
                redirect: false
        }
    handleTextInput = (evnt) => {
        //1. copy from state
        let newUser = {...this.state.newUser}
    
        //2. modify state
        newUser[evnt.target.name] = evnt.target.value
    
        //3. setState
        this.setState({ newUser })
      }
    
      handleSubmit = (evnt) => {
        evnt.preventDefault();
        console.log(this.state.newUser)
        this.addNewUser(this.state.newUser)
        this.setState({redirect: true})
      }

      addNewUser = (newUser) => {
        fetch("/api/user/users/addUser", 
            {
                method: 'POST', 
                headers:{ 'Content-Type': 'application/json'},
                body: JSON.stringify(newUser) 
                }
            )
        }

    render()  {
        if (this.state.redirect) {
            return (<Redirect to="/"/>)
        }
        return (
        <div>
        <h1 align="center">Add User</h1>
            <form class="myForm" onSubmit={this.handleSubmit}>

                <input type="text" name="userName"
                onChange={this.handleTextInput} placeholder="Enter A UserName"/>

                <input type="text" name="firstName"
                onChange={this.handleTextInput} placeholder="First Name"/>

                <input type="text" name="location"
                onChange={this.handleTextInput} placeholder="City Name"/>
        
                <input class="myFormSubmit" type="submit" value="Add User" />
            </form>
        </div>
        )
    }
}




