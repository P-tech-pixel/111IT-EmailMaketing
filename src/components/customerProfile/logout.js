import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//import './logout.js'

class Logout extends Component {
    constructor(props){
        super(props)
        localStorage.removeItem('token')
    }
    render(){
        return(
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div id='card-form' claseName="card card-signin my-5">
                                <div className="card-body ">
                                    <span className="fas fa-lock"></span>
                                    <h4>You are successfully logged out.</h4>
                                    <button type="button" class="btn btn-outline-secondary btn-lg btn-block"><Link to='/'>Login again</Link></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Logout 