import React from 'react';
import './Signup.css'
import { Redirect } from 'react-router-dom';
import SearchBar from './SearchBar'


class Signup extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            first_name: "",
            last_name: "",
            username: "",
            password: "",
            bio: "",
            avatar: ""
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
        // debugger
        fetch('http://localhost:3000/api/v1/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(
                this.state
            )
        })
        .then(res => res.json())
            .then(data => {
                localStorage.setItem('first_name', data.user.first_name)
                localStorage.setItem('last_name', data.user.last_name)
                localStorage.setItem('username', data.user.username)
                localStorage.setItem('bio', data.user.bio)
                localStorage.setItem('avatar', data.user.avatar)
                localStorage.setItem('token', data.jwt)
                this.props.history.push('/target')
                // return <Redirect to='/target' />   
            })
    }

    render(){
        return (
            <div>
                <h4>Register User</h4>
                <form className="form-input" onSubmit={this.handleSubmit}><br/>
                    <input className="first_name" type="text" placeholder="first name" name='first_name' onChange={this.handleChange}></input><br/>
                    <input className="last_name" type="text" placeholder="last name" name='last_name' onChange={this.handleChange}></input><br/>
                    <input className="user_email" type="text" placeholder="username or email" name='username' onChange={this.handleChange}></input><br/>
                    <input className="password" type="password" placeholder="password" name='password' onChange={this.handleChange}></input><br/>
                    <input className="bio" type="text" placeholder="bio" name='bio' onChange={this.handleChange}></input><br/>
                    <input className="img" type="text" placeholder="link to image" name='avatar' onChange={this.handleChange}></input><br/>
                    <button className="Signup-btn">Submit</button><br/><br/>
                </form>
            </div>
          );

    }


}

export default Signup;







