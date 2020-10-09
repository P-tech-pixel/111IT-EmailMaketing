import React from 'react'
import {Link} from 'react-router-dom';
import SignOutLinks from './NavbarItemsSignOut';
import SignInLinks from './NavbarItemsSignIn';

const Navbar = () => {

    return(
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to='/dashboard' className="brand-logo">111IT Email Marketing</Link>
               
                <SignInLinks />

            </div>
        </nav>
    );
}
export default Navbar;