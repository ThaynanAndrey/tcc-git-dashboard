import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const styles = {
  marginRight: "50px",
  marginLeft: "50px"
};

/**
 * Stateless Component with the function of presenting a
 * main menu for redirects within the application.
 * 
 * @author Thaynan Nunes
 */
const Navbar = () => {
  return (
    <div className="navbar-fixed">
      <nav className="nav-wrapper grey darken-3">
        <div style={styles}>
          <Link to='/' className="brand-logo">Git Dashboard</Link>
          <ul className="right hide-on-med-and-down">
            <li><NavLink to='/projetos'>Projetos</NavLink></li>
            <li><NavLink to='/repositories'>Repositórios</NavLink></li>
            <li><NavLink to='/login'>Login</NavLink></li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;