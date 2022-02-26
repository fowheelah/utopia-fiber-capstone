import React from "react";
import { ReactComponent as Logo } from '../../data/camera.svg'
class Login extends React.Component{
    state={
        email:'',
        pwd:''
    }
    handleChange = (e) =>{
        const {name, value} = e.target
        this.setState({[name]:value})
    }
    handleSubmit = (e) =>{

    }
    render(){
        return(
            <div>
                <div>
                    <Logo/>
                </div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input type='email' name='email' placeholder='email...' required onChange={this.handleChange}/>
                        <input type='password' name='pwd' placeholder='password...' required onChange={this.handleChange}/>
                        <button onSubmit={this.handleSubmit}>Log In</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;