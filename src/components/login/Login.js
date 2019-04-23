import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { login, isLogged } from '../../store/actions/authAction';

const styles = {
    textAlign: "center",
    width: "38vw",
    margin: "0 auto",
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
};

/**
 * Component with the function of presenting Login Screen.
 * 
 * @author Thaynan Nunes
 */
class Login extends Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
  }

  /**
   * Login user.
   */
  async login() {
    await this.props.login();

    if(isLogged()) {
        this.props.history.push('/pullRequests');
    }
  }

  render() {
    return (
        <div style={styles}>
            <div className="card grey darken-3">
                <div className="card-content white-text">
                    <span className="card-title">Git DashBoard</span>
                </div>
                <div className="card-action">
                    <a className="waves-effect waves-light btn blue lighten-1"
                        onClick={() => this.login()}>
                        <FontAwesomeIcon icon={['fab', 'github']} />
                        &nbsp;
                        Login com GitHub
                    </a>
                </div>
            </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    error: state.auth.error
});

const mapDispatchToProps = (dispatch) => ({
    login: () => dispatch(login())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);