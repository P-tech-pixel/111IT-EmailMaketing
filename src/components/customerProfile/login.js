import React, { Component} from 'react'
import { Link, Redirect } from 'react-router-dom'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

class Login extends Component{
    constructor(props){
        super(props)
        const token =localStorage.getItem("token")

        let loggedIn = true
        if(token == null){
            loggedIn = false
        }
        this.state ={
            username:'',
            password: '',
            loggedIn: false,
            //Registration section
            newRegisterData: {
                name: '',
                email: '',
                password: '',
                re_password: ''
            },
            newRegisterModal: false
        }
        this.onChange = this.onChange.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }
    toggleNewRegisterModal() {
        this.setState({
            newRegisterModal: !this.state.newRegisterModal
        });
      }
    register(){
          // something about registration goes here
    }
    onChange(e){
    this.setState({
        [e.target.name]: e.target.value
    })
    }
    submitForm(e){
        e.preventDefault()
        const {username, password} = this.state
        //logic magic
        if(username === "prashanta927pandit@gmail.com" && password === "Password1"){
            localStorage.setItem ("token", "shgdsgdjghsdjghs")
            this.setState({
                loggedIn: true
        })
      }
    }


render(){
    if(this.state.loggedIn ){
       return <Redirect to="/dashboard"/> // && <Redirect to='/customNavBar' />

    }

    return(
        <div>
                    <div>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                                    <div id='card-form' claseName="card card-signin my-5">
                                    <div className="card-body">
                                        <h4 className="card-title text-center">Sign In</h4>
                                        <form className="form-signin" onSubmit ={this.submitForm}>
                                        <div className="form-label-group">
                                            <label for="inputEmail">Email address</label><br/><br/>
                                            <input type="email" id="inputEmail" className="form-control" name='username' value={this.state.username} onChange={this.onChange} placeholder="Email address" required autofocus />
                                        </div>

                                        <div className="form-label-group">
                                            <label for="inputPassword">Password</label><br/><br/>
                                            <input type="password" id="inputPassword" className="form-control" name='password' value={this.state.password} onChange={this.onChange} placeholder="Password" required />
                                        </div>

                                        <div className="custom-control custom-checkbox mb-3">
                                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                            <label className="custom-control-label" for="customCheck1">Remember password</label>
                                        </div>
                                        <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                                        <hr className="my-4"/>
                                        </form>
                                    </div>
                                    </div>
                                    <Link
                                         onClick={this.toggleNewRegisterModal.bind(this)}>
                                         Create a new account
                                    </Link>{' '}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal isOpen={this.state.newRegisterModal} toggle={this.toggleNewRegisterModal.bind(this)}>
                    <ModalHeader toggle={this.toggleNewRegisterModal.bind(this)}>
                        Register
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input
                                id="name"
                                value={this.state.newRegisterData.name}
                                onChange={e => {
                                    let { newRegisterData } = this.state;
                                    newRegisterData.name = e.target.value;
                                    this.setState({ newRegisterData });
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                id="email"
                                value={this.state.newRegisterData.email}
                                onChange={e => {
                                    let { newRegisterData } = this.state;
                                    newRegisterData.email = e.target.value;
                                    this.setState({ newRegisterData });
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                id="password"
                                value={this.state.newRegisterData.password}
                                onChange={e => {
                                    let { newRegisterData } = this.state;
                                    newRegisterData.password = e.target.value;
                                    this.setState({ newRegisterData });
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="re_password">Re Password</Label>
                            <Input
                                id="re_password"
                                value={this.state.newRegisterData.re_password}
                                onChange={e => {
                                    let { newRegisterData } = this.state;
                                    newRegisterData.re_password = e.target.value;
                                    this.setState({ newRegisterData });
                                }}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.register.bind(this)}>
                            Register
                        </Button>{' '}
                        <Button color="secondary" onClick={this.toggleNewRegisterModal.bind(this)}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
        </div>
    )
}

}
export default Login