import React from 'react';
import { Link } from 'react-router-dom';

import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { isAuthenticated, logout } from '../../store/actions/authAction';

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
  
  /**
   * Sign out user and redirect to login page.
   */
  const signOut = () => {
    logout();
  };

  const links = isAuthenticated() ? <SignedInLinks signOut={signOut}/> : <SignedOutLinks />;
  
  return (
    <div className="navbar-fixed">
      <nav className="nav-wrapper blue-grey darken-2">
        <div style={styles}>
          <Link to='/' className="brand-logo">Git Dashboard</Link>
          { links }
        </div>
      </nav>
    </div>
  )
}

export default Navbar;