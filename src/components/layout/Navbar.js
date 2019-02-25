import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <Link to='/' className="brand-logo">Git Dashboard</Link>
      </div>
    </nav>
  )
}

export default Navbar;