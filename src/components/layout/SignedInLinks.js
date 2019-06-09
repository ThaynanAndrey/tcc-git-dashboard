import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Stateless Component with links to Navbar when user is authenticated.
 * 
 * @author Thaynan Nunes
 */
const SignedInLinks = (props) => {
    return (
        <ul className="right hide-on-med-and-down">
            <li><NavLink to='/projetos'>Projetos</NavLink></li>
            <li><NavLink to='/login' onClick={props.signOut}>
                Sair
            </NavLink></li>
        </ul>
    );
};

export default SignedInLinks;