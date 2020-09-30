import React from 'react'
import {NavLink} from 'react-router-dom';

const SignOutLink = () => {
    return(
        <div>
            <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>        
            <ul className="right hide-on-med-and-down">
            <li>
                <NavLink to='/addproduct'> Add Product </NavLink>
            </li>
            <li>
                <NavLink to='/addcustomer'> Add Customer </NavLink>
            </li>
            <li>
                <NavLink to='/'>Sign Out</NavLink>
            </li>
            <li>
                <NavLink to='/' className='btn btn-floating blue lighten-1'>SS</NavLink>
            </li>
        </ul>
        <ul class="sidenav" id="mobile-demo">
        <li><NavLink to='/'> Add Product </NavLink></li>
        <li><NavLink to='/'> Add Customer </NavLink></li>
        <li><NavLink to='/'>Sign Out</NavLink></li>
         </ul>
        </div>
    ); 
}
export default SignOutLink;