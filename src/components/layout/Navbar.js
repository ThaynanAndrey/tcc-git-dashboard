import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { isAuthenticated, logout } from '../../store/actions/authAction';

const styles = {
  marginRight: "50px",
  marginLeft: "50px"
};

/**
 * Component with the function of presenting a
 * main menu for redirects within the application.
 * 
 * @author Thaynan Nunes
 */
export class Navbar extends Component {
  constructor(props) {
    super(props);

    this.signOut = this.signOut.bind(this);
  }

  /**
   * Sign out user and redirect to login page.
   */
  signOut() {
    this.props.logout();
  };
  
  render() {
    const links = isAuthenticated() ? <SignedInLinks signOut={this.signOut}/> : <SignedOutLinks />;

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
}

const mapStateToProps = (state) => ({
  user: state.auth.user
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);