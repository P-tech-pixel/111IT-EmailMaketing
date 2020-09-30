import React from 'react'
import {Link} from 'react-router-dom';
import SignOutLinks from './NavbarItems';

const Navbar = () => {
    return(
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to='/' className="brand-logo">111IT Email Marketing</Link>
               
                <SignOutLinks />
            </div>
        </nav>
    );
}
export default Navbar;