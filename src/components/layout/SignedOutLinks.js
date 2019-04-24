import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Stateless Component with links to Navbar when user isn't authenticated.
 * 
 * @author Thaynan Nunes
 */
const SignedOutLinks = () => {
    return (
        <ul className="right hide-on-med-and-down">
            <li><NavLink to='/login'>Login</NavLink></li>
        </ul>
    );
};

export default SignedOutLinks;