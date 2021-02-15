import React from 'react';
// import { Redirect } from 'react-router-dom';
// import SearchBar from './SearchBar'
import './Login.css'


class Login extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            loggedIn: false,
            username: "",
            password: ""
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        
        fetch('http://localhost:3000/sessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                // 'Authorization': `Bear ${localStorage.token}`
            },
            body: JSON.stringify(
                this.state
            )
        })
        .then(res => res.json())
            .then(data => {
                localStorage.setItem('user_id', data.user.id)
                localStorage.setItem('first_name', data.user.first_name)
                localStorage.setItem('last_name', data.user.last_name)
                localStorage.setItem('username', data.user.username)
                localStorage.setItem('bio', data.user.bio)
                localStorage.setItem('avatar', data.user.avatar)
                localStorage.setItem('token', data.jwt)
                this.setState({
                    loggedIn: true
                })
            })
    }

    handleClick(event) {
        localStorage.clear()
        event.preventDefault()
        this.setState({
            loggedIn: false
        })
    }

    render(){
        return (
            <div>
                { this.state.loggedIn === false ?
                <div>
                    <h4>Already a User? Login or <a href="http://localhost:3001">Register</a></h4>
                    <form className="form-input" onSubmit={this.handleSubmit}><br/>
                        <input className='usrname' type="text" placeholder="username or email" name='username' onChange={this.handleChange}></input><br/>
                        <input className='pssword' type="password" placeholder="password" name='password' onChange={this.handleChange}></input><br/>
                        <button className="login-btn">Login</button><br/><br/>
                    </form>
                </div> :
                <div>
                    <h3>Welcome {localStorage.first_name}!</h3>
                    <button className="logout-btn" onClick={(event) => this.handleClick(event)}>Logout</button><br/>
                </div>    
                }
            </div>
          );

    }


}

export default Login;