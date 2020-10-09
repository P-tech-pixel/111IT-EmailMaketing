import React from 'react'
import {NavLink} from 'react-router-dom';

const SignInLink = () => {
    return(
        <div>
            <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>        
            <ul className="right hide-on-med-and-down">
            <li>
                <NavLink to='/login'>Sign In</NavLink>
            </li>
        </ul>
        <ul class="sidenav" id="mobile-demo">
        <li><NavLink to='/login'> Sign In</NavLink></li>
         </ul>
        </div>
    ); 
}
export default SignInLink;